import { supabaseServerClient } from "@/lib/supabaseServer";

export const ORDER_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

const TABLE_ORDERS = "orders";
const TABLE_EVENTS = "order_events";

export interface OrderRecord {
  id: string;
  email: string;
  customerName: string | null;
  productSlug: string;
  productName: string;
  amount: number;
  currency: string;
  invoiceId: number;
  status: OrderStatus;
  checksum: string | null;
  paidAt: string | null;
}

function mapOrder(row: any): OrderRecord {
  return {
    id: row.id,
    email: row.email,
    customerName: row.customer_name ?? null,
    productSlug: row.product_slug,
    productName: row.product_name,
    amount: row.amount,
    currency: row.currency,
    invoiceId: row.invoice_id,
    status: row.status,
    checksum: row.checksum ?? null,
    paidAt: row.paid_at ?? null,
  };
}

function ensureClient() {
  if (!supabaseServerClient) {
    throw new Error("Supabase клиент не инициализирован. Проверьте переменные окружения.");
  }
  return supabaseServerClient;
}

export async function createOrder({
  email,
  customerName,
  productSlug,
  productName,
  amount,
  currency,
  invoiceId,
}: {
  email: string;
  customerName?: string;
  productSlug: string;
  productName: string;
  amount: number;
  currency: string;
  invoiceId: number;
}): Promise<OrderRecord> {
  const client = ensureClient();
  const { data, error } = await client
    .from(TABLE_ORDERS)
    .insert({
      email,
      customer_name: customerName ?? null,
      product_slug: productSlug,
      product_name: productName,
      amount,
      currency,
      invoice_id: invoiceId,
      status: ORDER_STATUS.PENDING,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }
  return mapOrder(data);
}

export async function getOrderByInvoiceId(invoiceId: number): Promise<OrderRecord | null> {
  const client = ensureClient();
  const { data, error } = await client
    .from(TABLE_ORDERS)
    .select("*")
    .eq("invoice_id", invoiceId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data ? mapOrder(data) : null;
}

export async function updateOrderChecksum(orderId: string, checksum: string): Promise<OrderRecord> {
  const client = ensureClient();
  const { data, error } = await client
    .from(TABLE_ORDERS)
    .update({ checksum })
    .eq("id", orderId)
    .select()
    .single();
  if (error) throw error;
  return mapOrder(data);
}

export async function markOrderAsPaid(orderId: string): Promise<OrderRecord> {
  const client = ensureClient();
  const { data, error } = await client
    .from(TABLE_ORDERS)
    .update({
      status: ORDER_STATUS.PAID,
      paid_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select()
    .single();
  if (error) throw error;
  return mapOrder(data);
}

export async function markOrderAsFailed(orderId: string): Promise<OrderRecord> {
  const client = ensureClient();
  const { data, error } = await client
    .from(TABLE_ORDERS)
    .update({
      status: ORDER_STATUS.FAILED,
    })
    .eq("id", orderId)
    .select()
    .single();
  if (error) throw error;
  return mapOrder(data);
}

export async function appendOrderEvent({
  orderId,
  type,
  payload,
}: {
  orderId: string;
  type: string;
  payload: unknown;
}) {
  const client = ensureClient();
  const { data, error } = await client
    .from(TABLE_EVENTS)
    .insert({
      order_id: orderId,
      type,
      payload,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export function generateInvoiceId() {
  return Math.floor(Date.now() / 1000);
}
