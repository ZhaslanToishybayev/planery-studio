import { NextResponse } from "next/server";
import { allProducts, getProductBySlug } from "@/data/products";
import { sendPurchaseEmail } from "@/lib/email";
import {
  appendOrderEvent,
  getOrderByInvoiceId,
  markOrderAsPaid,
} from "@/lib/orders";
import {
  buildResultSignature,
  fromMinorUnits,
  getRobokassaConfig,
  parseOutSum,
  toMinorUnits,
} from "@/lib/robokassa";

function extractFormData(formData: FormData) {
  const entries: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    entries[key] = value?.toString() ?? "";
  }
  return entries;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = extractFormData(formData);

    const outSum = payload.OutSum;
    const invId = payload.InvId;
    const signature = payload.SignatureValue;

    if (!outSum || !invId || !signature) {
      return NextResponse.json(
        { error: "Недостаточно данных для проверки платежа" },
        { status: 400 }
      );
    }

    const robokassa = getRobokassaConfig();
    if (!robokassa.password2) {
      console.error("[Robokassa] ROBOKASSA_PASSWORD2 не задан");
      return NextResponse.json(
        { error: "Robokassa не настроена" },
        { status: 500 }
      );
    }

    const expectedSignature = buildResultSignature({
      outSum,
      invoiceId: invId,
      password2: robokassa.password2,
    }).toUpperCase();

    if (expectedSignature !== signature.toUpperCase()) {
      console.error(
        "[Robokassa] Неверная подпись",
        { invId, outSum, signature, expectedSignature }
      );
      return NextResponse.json(
        { error: "Неверная подпись Robokassa" },
        { status: 400 }
      );
    }

    const invoiceIdNumber = Number.parseInt(invId, 10);
    const order = Number.isNaN(invoiceIdNumber)
      ? null
      : await getOrderByInvoiceId(invoiceIdNumber);

    if (order) {
      await appendOrderEvent({
        orderId: order.id,
        type: "RESULT_CALLBACK",
        payload,
      });
    } else {
      console.warn(
        "[Robokassa] Заказ с таким InvId не найден",
        { invId: invoiceIdNumber }
      );
    }

    const normalizedSum = parseOutSum(outSum);
    const sumInMinorUnits = toMinorUnits(normalizedSum);

    if (order && sumInMinorUnits !== order.amount) {
      console.warn(
        "[Robokassa] Несовпадение сумм заказа и платежа",
        {
          invId: order.invoiceId,
          expected: fromMinorUnits(order.amount),
          received: normalizedSum,
        }
      );
    }

    const customerEmail = payload.Email ?? order?.email ?? undefined;
    const description = payload.Description;
    const nameFromDescription = description?.match(/\((.+)\)\s*$/)?.[1];
    const customerName = order?.customerName ?? nameFromDescription ?? undefined;

    let product = order ? getProductBySlug(order.productSlug) : null;

    if (!product) {
      product = allProducts.find((item) => item.price === normalizedSum) ?? null;
    }
    if (!product && description) {
      product = allProducts.find((item) => description.startsWith(item.name)) ?? null;
    }

    if (order && order.status !== "PAID") {
      await markOrderAsPaid(order.id);
      await appendOrderEvent({
        orderId: order.id,
        type: "PAID",
        payload: {
          amount: normalizedSum,
          currency: robokassa.currency,
        },
      });
    }

    if (!customerEmail) {
      console.error("[Robokassa] Не удалось определить email покупателя");
    } else if (!product) {
      console.error(
        "[Robokassa] Не удалось сопоставить продукт",
        { normalizedSum, description }
      );
    } else {
      try {
        await sendPurchaseEmail({
          email: customerEmail,
          name: customerName,
          product,
        });
        if (order) {
          await appendOrderEvent({
            orderId: order.id,
            type: "DELIVERY_EMAIL_SENT",
            payload: { email: customerEmail },
          });
        }
      } catch (emailError) {
        console.error("[Robokassa] Ошибка отправки письма", emailError);
        if (order) {
          await appendOrderEvent({
            orderId: order.id,
            type: "DELIVERY_EMAIL_FAILED",
            payload: { error: String(emailError) },
          });
        }
      }
    }

    return new NextResponse(`OK${invId}`);
  } catch (error) {
    console.error("[Robokassa] Ошибка обработки result", error);
    return NextResponse.json(
      { error: "Ошибка обработки уведомления Robokassa" },
      { status: 500 }
    );
  }
}
