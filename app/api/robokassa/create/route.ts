import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getProductBySlug } from "@/data/products";
import {
  appendOrderEvent,
  createOrder,
  generateInvoiceId,
  getOrderByInvoiceId,
  updateOrderChecksum,
} from "@/lib/orders";
import {
  FALLBACK_DEV_URL,
  SITE_URL,
  getRequestBaseUrl,
  normalizeSiteUrl,
} from "@/lib/siteConfig";
import {
  buildInvoiceSignature,
  buildReceipt,
  formatAmountForGateway,
  getRobokassaConfig,
  toMinorUnits,
} from "@/lib/robokassa";

interface CreatePaymentRequest {
  productSlug?: string;
  email?: string;
  name?: string;
}

const MAX_INVOICE_ATTEMPTS = 8;

function sanitizeName(name?: string) {
  if (!name) return undefined;
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreatePaymentRequest | null;
    const productSlug = typeof body?.productSlug === "string" ? body.productSlug : null;
    const email = typeof body?.email === "string" ? body.email.trim() : null;
    const name = sanitizeName(body?.name);

    if (!productSlug || !email) {
      return NextResponse.json(
        { error: "productSlug и email обязательны" },
        { status: 400 }
      );
    }

    const product = getProductBySlug(productSlug);
    if (!product) {
      return NextResponse.json({ error: "Продукт не найден" }, { status: 404 });
    }

    const robokassa = getRobokassaConfig();
    const headersList = headers();

    const resolvedBaseUrl =
      headersList.get("origin") ||
      getRequestBaseUrl(request, headersList) ||
      SITE_URL;
    const envBase = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || null;
    const baseCandidate =
      envBase ||
      (process.env.NODE_ENV !== "production"
        ? FALLBACK_DEV_URL
        : resolvedBaseUrl);
    const normalizedBaseUrl = normalizeSiteUrl(baseCandidate);

    const successUrl = `${normalizedBaseUrl}/checkout/success`;
    const failUrl = `${normalizedBaseUrl}/checkout/fail`;
    const resultUrl = `${normalizedBaseUrl}/api/robokassa/result`;

    const amountString = formatAmountForGateway(product.price);
    const amountMinor = toMinorUnits(product.price);

    let invoiceId = generateInvoiceId();
    for (let attempt = 0; attempt < MAX_INVOICE_ATTEMPTS; attempt += 1) {
      const existing = await getOrderByInvoiceId(invoiceId);
      if (!existing) break;
      invoiceId += 1;
      if (attempt === MAX_INVOICE_ATTEMPTS - 1) {
        throw new Error("Не удалось подобрать уникальный номер счета");
      }
    }

    const order = await createOrder({
      email,
      customerName: name,
      productSlug: product.slug,
      productName: product.name,
      amount: amountMinor,
      currency: robokassa.currency,
      invoiceId,
    });

    await appendOrderEvent({
      orderId: order.id,
      type: "INITIATE",
      payload: {
        productSlug,
        email,
        name,
        amount: amountString,
        currency: robokassa.currency,
        successUrl,
        failUrl,
        resultUrl,
      },
    });

    const isMockedPayment =
      robokassa.disableRedirect ||
      !robokassa.login ||
      !robokassa.password1;

    if (isMockedPayment) {
      const mockParams = new URLSearchParams({
        InvId: invoiceId.toString(),
        OutSum: amountString,
        Email: email,
        mock: "1",
      });
      const mockUrl = `${successUrl}?${mockParams.toString()}`;
      await appendOrderEvent({
        orderId: order.id,
        type: "MOCK_REDIRECT",
        payload: { url: mockUrl },
      });
      return NextResponse.json({ paymentUrl: mockUrl, mock: true });
    }

    const receipt = robokassa.enableReceipt
      ? buildReceipt({ productName: product.name, amount: product.price })
      : undefined;

    const signature = buildInvoiceSignature({
      login: robokassa.login!,
      outSum: amountString,
      invoiceId,
      password1: robokassa.password1!,
      receipt,
    }).toUpperCase();

    await updateOrderChecksum(order.id, signature);
    await appendOrderEvent({
      orderId: order.id,
      type: "SIGNATURE_PREPARED",
      payload: { signature },
    });

    const params = new URLSearchParams({
      MerchantLogin: robokassa.login!,
      OutSum: amountString,
      InvId: invoiceId.toString(),
      Description: name
        ? `${product.name} — Planery Studio (${name})`
        : `${product.name} — Planery Studio`,
      Email: email,
      Culture: "ru",
      Encoding: "utf-8",
      SignatureValue: signature,
      SuccessURL: successUrl,
      FailURL: failUrl,
      ResultURL: resultUrl,
    });

    if (receipt) {
      params.set("Receipt", receipt);
    }

    if (robokassa.testMode) {
      params.set("IsTest", "1");
    }

    const paymentLink = `${robokassa.paymentUrl}?${params.toString()}`;

    await appendOrderEvent({
      orderId: order.id,
      type: "PAYMENT_LINK_READY",
      payload: { paymentLink },
    });

    return NextResponse.json({ paymentUrl: paymentLink });
  } catch (error) {
    console.error("[Robokassa] Ошибка создания платежа", error);
    return NextResponse.json(
      { error: "Не удалось создать платеж Robokassa" },
      { status: 500 }
    );
  }
}
