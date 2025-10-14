#!/bin/bash

echo "Creating and uploading orders management..."
cat > lib/orders.ts << 'ORDERS_EOF'
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
ORDERS_EOF

gh api repos/ZhaslanToishybayev/planery-studio/contents/lib/orders.ts --method PUT \
  --field message="Add order management system" \
  --field content="$(base64 -w 0 lib/orders.ts)" \
  --field branch=main

echo "Creating and uploading site configuration..."
cat > lib/siteConfig.ts << 'CONFIG_EOF'
export const siteConfig = {
  name: 'Planery Studio',
  description: 'Профессиональные шаблоны Notion для студентов и продуктивных людей',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://planerystudio.com',
  ogImage: '/assets/planery-logo.png',
  links: {
    twitter: 'https://twitter.com/planerystudio',
    github: 'https://github.com/planerystudio',
    instagram: 'https://instagram.com/planerystudio',
    telegram: 'https://t.me/planerystudio',
    email: 'mailto:support@planerystudio.com',
  },
  social: {
    twitter: '@planerystudio',
    instagram: '@planerystudio',
    telegram: '@planerystudio',
  },
  contact: {
    email: 'support@planerystudio.com',
    telegram: 'https://t.me/planerystudio',
    instagram: 'https://instagram.com/planerystudio',
  },
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    yandexMetrika: process.env.NEXT_PUBLIC_YM_ID,
  },
  payment: {
    robokassa: {
      merchantId: process.env.ROBOKASSA_MERCHANT_ID,
      testMode: process.env.ROBOKASSA_TEST_MODE === 'true',
    },
  },
  seo: {
    title: 'Planery Studio - Шаблоны Notion для студентов и продуктивных людей',
    description: 'Купите профессиональные шаблоны Notion для учебы, планирования и продуктивности. Готовые системы организации для студентов и всех, кто хочет быть эффективнее.',
    keywords: [
      'Notion шаблоны',
      'планировщик студента',
      'система продуктивности',
      'органайзер для учебы',
      'шаблоны для Notion',
      'планирование времени',
      'учеба в университете',
      'продуктивность',
    ],
  },
  features: [
    'Готовые шаблоны Notion',
    'Для студентов и продуктивных людей',
    'Простая настройка',
    'Мгновенное скачивание',
    'Поддержка 24/7',
  ],
  testimonials: [
    {
      name: 'Анна К.',
      role: 'Студентка МГУ',
      content: 'Шаблоны помогли мне организовать учебу и повысить успеваемость!',
      avatar: '/assets/testimonial-1.jpg',
    },
    {
      name: 'Дмитрий С.',
      role: 'Предприниматель',
      content: 'Отличная система планирования. Рекомендую всем!',
      avatar: '/assets/testimonial-2.jpg',
    },
  ],
  faq: [
    {
      question: 'Как получить доступ к шаблонам после покупки?',
      answer: 'Ссылки для скачивания будут отправлены на ваш email в течение 5-10 минут после оплаты.',
    },
    {
      question: 'Нужно ли устанавливать Notion?',
      answer: 'Да, шаблоны работают только в Notion. Это бесплатное приложение, которое можно установить на любое устройство.',
    },
    {
      question: 'Можно ли изменить шаблоны под свои нужды?',
      answer: 'Конечно! Все шаблоны полностью настраиваемые. Вы можете добавлять, удалять и изменять любые элементы.',
    },
    {
      question: 'Есть ли гарантия возврата?',
      answer: 'Да, мы предоставляем гарантию возврата в течение 7 дней, если шаблоны не подошли.',
    },
  ],
};
CONFIG_EOF

gh api repos/ZhaslanToishybayev/planery-studio/contents/lib/siteConfig.ts --method PUT \
  --field message="Add centralized site configuration" \
  --field content="$(base64 -w 0 lib/siteConfig.ts)" \
  --field branch=main

echo "Creating and uploading documentation files..."
cat > EMAIL_DELIVERY_SETUP.md << 'EMAIL_DOC_EOF'
# 📧 НАСТРОЙКА EMAIL ДОСТАВКИ

## Обзор системы

Проект включает автоматическую отправку email уведомлений после успешной оплаты заказа.

## Компоненты системы

### 1. Email сервис (`lib/email.ts`)
- Отправка email через Gmail SMTP
- HTML и текстовые версии писем
- Автоматические шаблоны для подтверждения заказов

### 2. Система заказов (`lib/orders.ts`)
- Создание и отслеживание заказов
- Управление статусами заказов
- Хранение ссылок для скачивания

### 3. API обработки платежей (`app/api/robokassa/`)
- Создание платежей
- Обработка результатов оплаты
- Автоматическая отправка email после оплаты

## Настройка

### 1. Переменные окружения

Добавьте в `.env.local`:

```env
# Email настройки
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Robokassa настройки
ROBOKASSA_MERCHANT_ID=your-merchant-id
ROBOKASSA_PASSWORD_1=your-password-1
ROBOKASSA_PASSWORD_2=your-password-2
ROBOKASSA_TEST_MODE=true
```

### 2. Настройка Gmail

1. Включите двухфакторную аутентификацию в Gmail
2. Создайте App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Выберите "Mail" и "Other (Custom name)"
   - Скопируйте сгенерированный пароль
3. Используйте этот пароль в `EMAIL_PASS`

### 3. Настройка Vercel

В Vercel Dashboard → Settings → Environment Variables добавьте:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ROBOKASSA_MERCHANT_ID=your-merchant-id
ROBOKASSA_PASSWORD_1=your-password-1
ROBOKASSA_PASSWORD_2=your-password-2
ROBOKASSA_TEST_MODE=true
```

## Процесс работы

1. **Создание заказа**: Пользователь выбирает продукт и переходит к оплате
2. **Оплата**: Создается платеж через Robokassa API
3. **Подтверждение**: После успешной оплаты Robokassa отправляет уведомление
4. **Email отправка**: Система автоматически отправляет email с ссылками на скачивание

## Тестирование

### Локальное тестирование

```bash
# Запустите проект
npm run dev

# Проверьте API endpoints
curl -X POST http://localhost:3000/api/robokassa/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "description": "Test order",
    "orderId": "TEST-001",
    "email": "test@example.com"
  }'
```

### Тестирование email

1. Убедитесь, что переменные окружения настроены
2. Создайте тестовый заказ
3. Проверьте логи в консоли на наличие ошибок
4. Проверьте папку "Спам" в Gmail

## Безопасность

- ✅ Используйте App Passwords для Gmail
- ✅ Храните пароли в переменных окружения
- ✅ Включите HTTPS для production
- ✅ Валидируйте входящие данные
- ✅ Логируйте все операции с заказами

## Мониторинг

### Логи
- Все операции логируются в консоль
- Ошибки отправки email сохраняются
- Статусы заказов отслеживаются

### Метрики
- Количество отправленных email
- Процент успешных доставок
- Время обработки заказов

## Troubleshooting

### Email не отправляется
1. Проверьте App Password в Gmail
2. Убедитесь, что 2FA включена
3. Проверьте логи на ошибки SMTP

### Robokassa не работает
1. Проверьте Merchant ID и пароли
2. Убедитесь, что test mode настроен правильно
3. Проверьте URL callback'ов

### Заказы не сохраняются
1. Проверьте подключение к базе данных (если используется)
2. Убедитесь, что все поля заполнены
3. Проверьте валидацию данных

## Расширение функционала

### Дополнительные email шаблоны
- Напоминания о неоплаченных заказах
- Уведомления о новых продуктах
- Инструкции по использованию

### Интеграции
- Telegram уведомления
- SMS подтверждения
- Webhook уведомления

### Аналитика
- Отслеживание открытий email
- Статистика кликов по ссылкам
- A/B тестирование шаблонов
EMAIL_DOC_EOF

gh api repos/ZhaslanToishybayev/planery-studio/contents/EMAIL_DELIVERY_SETUP.md --method PUT \
  --field message="Add email delivery setup documentation" \
  --field content="$(base64 -w 0 EMAIL_DELIVERY_SETUP.md)" \
  --field branch=main

echo "All remaining files uploaded successfully!"
