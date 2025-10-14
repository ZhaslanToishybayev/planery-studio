import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { allProducts } from "@/data/products";
import { sendPurchaseEmail } from "@/lib/email";
import { consumeInvoice } from "@/lib/orders";

function buildSignature(outSum: string, invId: string, password: string) {
  return createHash("md5")
    .update(`${outSum}:${invId}:${password}`, "utf8")
    .digest("hex")
    .toUpperCase();
}

function normalizeAmount(outSum: string) {
  return Number.parseFloat(outSum.replace(",", "."));
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const outSum = formData.get("OutSum")?.toString();
    const invId = formData.get("InvId")?.toString();
    const signature = formData.get("SignatureValue")?.toString();

    const password2 = process.env.ROBOKASSA_PASSWORD2;

    if (!outSum || !invId || !signature || !password2) {
      return NextResponse.json(
        { error: "Недостаточно данных для проверки платежа" },
        { status: 400 }
      );
    }

    const expectedSignature = buildSignature(outSum, invId, password2);

    if (expectedSignature !== signature.toUpperCase()) {
      return NextResponse.json(
        { error: "Неверная подпись Robokassa" },
        { status: 400 }
      );
    }

    console.log(`[Robokassa] Оплата подтверждена. InvId=${invId}, сумма=${outSum}`);

    const invoiceIdNumber = Number.parseInt(invId, 10);
    const storedInvoice = Number.isNaN(invoiceIdNumber)
      ? undefined
      : consumeInvoice(invoiceIdNumber);

    const customerEmail =
      formData.get("Email")?.toString() ?? storedInvoice?.email ?? undefined;
    const description =
      formData.get("Description")?.toString() ?? (storedInvoice ? "" : undefined);
    const normalizedSum = normalizeAmount(outSum);
    const productByPrice = allProducts.find((item) => item.price === normalizedSum);

    let product = productByPrice;

    if (!product && storedInvoice?.productSlug) {
      product = allProducts.find((item) => item.slug === storedInvoice.productSlug);
    }

    if (!product && description) {
      const matched = allProducts.find((item) => description.startsWith(item.name));
      if (matched) {
        product = matched;
      }
    }

    if (!customerEmail) {
      console.error("[Robokassa] Не удалось определить email покупателя");
    } else {
      if (!product) {
        console.error(
          `[Robokassa] Не удалось сопоставить продукт. Сумма=${outSum}, описание=${description ?? "—"}`
        );
      } else {
        const nameMatch = description?.match(/\((.+)\)\s*$/);
        const customerName = storedInvoice?.name ?? nameMatch?.[1];

        try {
          await sendPurchaseEmail({
            email: customerEmail,
            name: customerName,
            product,
          });
          console.log(`[Robokassa] Письмо с доступом отправлено на ${customerEmail}`);
        } catch (emailError) {
          console.error("[Robokassa] Не удалось отправить письмо с доступом", emailError);
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
