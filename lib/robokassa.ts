import { createHash } from "crypto";

export const DEFAULT_PAYMENT_URL =
  "https://auth.robokassa.kz/Merchant/Index.aspx";

interface RobokassaEnvConfig {
  login: string | null;
  password1: string | null;
  password2: string | null;
  paymentUrl: string;
  currency: string;
  testMode: boolean;
  enableReceipt: boolean;
  disableRedirect: boolean;
}

const parseBoolean = (value: string | undefined | null) => {
  if (!value) return false;
  return value === "1" || value.toLowerCase() === "true";
};

export function getRobokassaConfig(): RobokassaEnvConfig {
  const paymentUrl =
    process.env.ROBOKASSA_PAYMENT_URL || DEFAULT_PAYMENT_URL;

  const testMode = parseBoolean(process.env.ROBOKASSA_TEST_MODE);
  const enableReceipt = parseBoolean(process.env.ROBOKASSA_ENABLE_RECEIPT);

  const disableRedirect =
    parseBoolean(process.env.ROBOKASSA_DISABLE_REDIRECT) ||
    (process.env.NODE_ENV !== "production" &&
      process.env.ROBOKASSA_DISABLE_REDIRECT !== "0");

  return {
    login: process.env.ROBOKASSA_LOGIN ?? null,
    password1: process.env.ROBOKASSA_PASSWORD1 ?? null,
    password2: process.env.ROBOKASSA_PASSWORD2 ?? null,
    paymentUrl,
    currency: process.env.ROBOKASSA_CURRENCY || "KZT",
    testMode,
    enableReceipt,
    disableRedirect,
  };
}

export function formatAmountForGateway(amount: number) {
  return amount.toFixed(2);
}

export function parseOutSum(outSum: string) {
  return Number.parseFloat(outSum.replace(",", "."));
}

export function toMinorUnits(amount: number) {
  return Math.round(amount * 100);
}

export function fromMinorUnits(amount: number) {
  return amount / 100;
}

export function buildInvoiceSignature({
  login,
  outSum,
  invoiceId,
  password1,
  receipt,
}: {
  login: string;
  outSum: string;
  invoiceId: number;
  password1: string;
  receipt?: string;
}) {
  const parts = [login, outSum, invoiceId.toString()];
  if (receipt) {
    parts.push(receipt);
  }
  parts.push(password1);
  return createHash("md5").update(parts.join(":"), "utf8").digest("hex");
}

export function buildResultSignature({
  outSum,
  invoiceId,
  password2,
}: {
  outSum: string;
  invoiceId: string;
  password2: string;
}) {
  return createHash("md5")
    .update(`${outSum}:${invoiceId}:${password2}`, "utf8")
    .digest("hex");
}

export function buildReceipt({
  productName,
  amount,
}: {
  productName: string;
  amount: number;
}) {
  return JSON.stringify({
    items: [
      {
        name: productName.slice(0, 128),
        quantity: 1,
        sum: Number(amount.toFixed(2)),
        tax: "vat0",
        payment_method: "full_prepayment",
        payment_object: "service",
      },
    ],
    sno: "usn_income",
  });
}
