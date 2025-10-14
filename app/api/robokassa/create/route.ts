import { NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";
import { createHash } from "crypto";
import { headers } from "next/headers";
import { saveInvoice } from "@/lib/orders";
import {
  FALLBACK_DEV_URL,
  getRequestBaseUrl,
  normalizeSiteUrl,
  SITE_URL,
} from "@/lib/siteConfig";

const DEFAULT_PAYMENT_URL = "https://auth.robokassa.kz/Merchant/Index.aspx";

let lastInvoiceId = 0;

// Robokassa expects InvId to be a 32-bit positive integer; keep it monotonic and safe.
function generateInvoiceId() {
  const unixSeconds = Math.floor(Date.now() / 1000);
  if (unixSeconds <= lastInvoiceId) {
    lastInvoiceId += 1;
  } else {
    lastInvoiceId = unixSeconds;
  }
  return Math.min(lastInvoiceId, 2147483647);
}

interface CreatePaymentRequest {
  productSlug?: string;
  email?: string;
  name?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreatePaymentRequest;
    const { productSlug, email, name } = body;

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

    const requestHeaders = headers();
    const isMockedPayment =
      process.env.ROBOKASSA_DISABLE_REDIRECT === "1" ||
      (process.env.NODE_ENV !== "production" &&
        process.env.ROBOKASSA_DISABLE_REDIRECT !== "0");
    const resolvedBaseUrl =
      requestHeaders.get("origin") ||
      getRequestBaseUrl(request, requestHeaders) ||
      SITE_URL;
    const envBase =
      process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || null;

    const baseCandidate =
      envBase ||
      (process.env.NODE_ENV !== "production"
        ? FALLBACK_DEV_URL
        : resolvedBaseUrl);

    const normalizedBaseUrl = normalizeSiteUrl(baseCandidate);

    const successUrl = `${normalizedBaseUrl}/checkout/success`;
    const failUrl = `${normalizedBaseUrl}/checkout/fail`;
    const resultUrl = `${normalizedBaseUrl}/api/robokassa/result`;
    console.info("[Robokassa] baseUrl", normalizedBaseUrl);
    console.info("[Robokassa] SuccessURL", successUrl);

    const merchantLogin = process.env.ROBOKASSA_LOGIN;
    const password1 = process.env.ROBOKASSA_PASSWORD1;
    const paymentUrl = process.env.ROBOKASSA_PAYMENT_URL || DEFAULT_PAYMENT_URL;

    if (!merchantLogin || !password1) {
      if (!isMockedPayment) {
        return NextResponse.json(
          { error: "Robokassa не настроена. Проверьте переменные окружения." },
          { status: 500 }
        );
      }
    }

    const invId = generateInvoiceId();
    const outSum = product.price.toFixed(2);
    const buyerName = name?.trim();

    const includeReceipt =
      process.env.ROBOKASSA_ENABLE_RECEIPT === "1" ||
      process.env.ROBOKASSA_ENABLE_RECEIPT === "true";

    const receipt = includeReceipt
      ? JSON.stringify({
          items: [
            {
              name: product.name.slice(0, 128),
              quantity: 1,
              sum: Number(product.price.toFixed(2)),
              tax: "none",
              payment_method: "full_prepayment",
              payment_object: "service",
            },
          ],
        })
      : undefined;

    saveInvoice(invId, {
      email,
      name: buyerName ?? undefined,
      productSlug: product.slug,
    });

    if (isMockedPayment) {
      const mockParams = new URLSearchParams({
        InvId: invId.toString(),
        OutSum: outSum,
        Email: email,
        MockPayment: "1",
      });
      const mockUrl = `${normalizedBaseUrl}/checkout/success?${mockParams.toString()}`;
      console.info("[Robokassa] mocked redirect url", mockUrl);
      return NextResponse.json({ paymentUrl: mockUrl, mock: true });
    }

    const resolvedMerchantLogin = merchantLogin!;
    const resolvedPassword1 = password1!;

    const signatureParts = [
      resolvedMerchantLogin,
      outSum,
      invId.toString(),
    ];
    if (receipt) {
      signatureParts.push(receipt);
    }
    signatureParts.push(resolvedPassword1);

    const signatureSource = signatureParts.join(":");
    const signatureValue = createHash("md5")
      .update(signatureSource, "utf8")
      .digest("hex")
      .toUpperCase();

    const params = new URLSearchParams({
      MerchantLogin: resolvedMerchantLogin,
      OutSum: outSum,
      InvId: invId.toString(),
      Description: buyerName
        ? `${product.name} — Planery Studio (${buyerName})`
        : `${product.name} — Planery Studio`,
      Email: email,
      Culture: "ru",
      Encoding: "utf-8",
      SignatureValue: signatureValue,
      SuccessURL: successUrl,
      FailURL: failUrl,
      ResultURL: resultUrl,
    });

    if (receipt) {
      params.set("Receipt", receipt);
    }

    if (process.env.ROBOKASSA_TEST_MODE === "1") {
      params.set("IsTest", "1");
    }

    const fullUrl = `${paymentUrl}?${params.toString()}`;
    console.info("[Robokassa] redirect url", fullUrl);

    return NextResponse.json({ paymentUrl: fullUrl });
  } catch (error) {
    console.error("[Robokassa] Ошибка создания платежа", error);
    return NextResponse.json(
      { error: "Не удалось создать платеж Robokassa" },
      { status: 500 }
    );
  }
}
