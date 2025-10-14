export interface Order {
  id: string;
  email: string;
  productId: string;
  productName: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  createdAt: Date;
  paidAt?: Date;
  downloadLinks: string[];
}

// В реальном проекте здесь была бы база данных
// Для демонстрации используем простой массив
const orders: Order[] = [];

interface PendingInvoice {
  email: string;
  productSlug?: string;
  name?: string;
}

const pendingInvoices = new Map<number, PendingInvoice>();

export function createOrder(
  email: string,
  productId: string,
  productName: string,
  amount: number,
  downloadLinks: string[]
): Order {
  const order: Order = {
    id: generateOrderId(),
    email,
    productId,
    productName,
    amount,
    status: 'pending',
    createdAt: new Date(),
    downloadLinks,
  };

  orders.push(order);
  return order;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find(order => order.id === id);
}

export function updateOrderStatus(id: string, status: Order['status']): boolean {
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = status;
    if (status === 'paid') {
      order.paidAt = new Date();
    }
    return true;
  }
  return false;
}

export function getOrdersByEmail(email: string): Order[] {
  return orders.filter(order => order.email === email);
}

export function saveInvoice(id: number, payload: PendingInvoice) {
  pendingInvoices.set(id, payload);
}

export function consumeInvoice(id: number): PendingInvoice | undefined {
  const invoice = pendingInvoices.get(id);
  if (invoice) {
    pendingInvoices.delete(id);
  }
  return invoice;
}

function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

// Функция для получения ссылок на скачивание для продукта
export function getProductDownloadLinks(productId: string): string[] {
  // В реальном проекте это было бы в базе данных
  const productLinks: Record<string, string[]> = {
    'student-planner': [
      'https://drive.google.com/file/d/1ABC123/view',
      'https://drive.google.com/file/d/1DEF456/view',
    ],
    'productivity-system': [
      'https://drive.google.com/file/d/1GHI789/view',
      'https://drive.google.com/file/d/1JKL012/view',
    ],
  };

  return productLinks[productId] || [];
}
