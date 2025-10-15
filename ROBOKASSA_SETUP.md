# 💳 НАСТРОЙКА ROBOKASSA

## Обзор интеграции

Проект интегрирован с платежной системой Robokassa для приема платежей за шаблоны Notion.

## Компоненты системы

### 1. API создания платежей (`app/api/robokassa/create/route.ts`)
- Генерация подписи для платежа
- Создание URL для перенаправления на Robokassa
- Поддержка тестового режима

### 2. API обработки результатов (`app/api/robokassa/result/route.ts`)
- Проверка подписи от Robokassa
- Подтверждение успешной оплаты
- Обновление статуса заказа

### 3. Страницы результатов (`app/checkout/`)
- Страница успешной оплаты
- Страница неудачной оплаты
- Отображение информации о заказе

## Настройка

### 1. Регистрация в Robokassa

1. Перейдите на [robokassa.ru](https://robokassa.ru)
2. Зарегистрируйтесь как юридическое лицо или ИП
3. Пройдите верификацию документов
4. Получите доступ к личному кабинету

### 2. Получение параметров

В личном кабинете Robokassa найдите:

```
Merchant Login: ваш_merchant_id
Password #1: ваш_пароль_1
Password #2: ваш_пароль_2
```

### 3. Настройка URL'ов

В настройках Robokassa укажите:

```
Result URL: https://ваш-домен.com/api/robokassa/result
Success URL: https://ваш-домен.com/checkout/success
Fail URL: https://ваш-домен.com/checkout/fail
```

### 4. Переменные окружения

Добавьте в `.env.local` (пример для тестовой среды):

```env
ROBOKASSA_LOGIN=ваш_merchant_id
ROBOKASSA_PASSWORD1=ваш_пароль_1
ROBOKASSA_PASSWORD2=ваш_пароль_2
ROBOKASSA_PAYMENT_URL=https://auth.robokassa.kz/Merchant/Index.aspx
ROBOKASSA_TEST_MODE=1
ROBOKASSA_ENABLE_RECEIPT=1
ROBOKASSA_DISABLE_REDIRECT=0
ROBOKASSA_CURRENCY=KZT

EMAIL_SERVICE_API_KEY=ваш_resend_api_key
EMAIL_FROM='Planery Studio <support@planery.studio>'
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=ваш_service_key
```

### 5. Настройка Vercel

В Vercel Dashboard → Settings → Environment Variables:

```
ROBOKASSA_LOGIN=ваш_merchant_id
ROBOKASSA_PASSWORD1=ваш_пароль_1
ROBOKASSA_PASSWORD2=ваш_пароль_2
ROBOKASSA_PAYMENT_URL=https://auth.robokassa.kz/Merchant/Index.aspx
ROBOKASSA_TEST_MODE=0
ROBOKASSA_ENABLE_RECEIPT=1
ROBOKASSA_DISABLE_REDIRECT=0
ROBOKASSA_CURRENCY=KZT

EMAIL_SERVICE_API_KEY=боевой_resend_api_key
EMAIL_FROM='Planery Studio <support@planery.studio>'
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=боевой_service_key
```

### 6. Создание таблиц в Supabase

В панели Supabase откройте **SQL Editor** и выполните запрос:

```sql
create extension if not exists "uuid-ossp";

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz,
  email text not null,
  customer_name text,
  product_slug text not null,
  product_name text not null,
  amount integer not null,
  currency text not null default 'KZT',
  invoice_id integer not null unique,
  checksum text,
  status text not null default 'PENDING'
);

create or replace function set_orders_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_orders_updated_at on orders;
create trigger trg_orders_updated_at
before update on orders
for each row execute function set_orders_updated_at();

create table if not exists order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  created_at timestamptz not null default now(),
  type text not null,
  payload jsonb not null
);
```

> ⚠️ Service role ключ (`SUPABASE_SERVICE_ROLE_KEY`) — секрет. Храните его только в серверных переменных окружения и не отдавайте на клиент.

## Процесс работы

### 1. Создание платежа

```javascript
const response = await fetch('/api/robokassa/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productSlug: 'productivity', // slug из data/products.ts
    email: 'user@example.com',
    name: 'Имя покупателя'
  })
});

const { paymentUrl } = await response.json();
window.location.href = paymentUrl;
```

### 2. Обработка результата

Robokassa автоматически отправляет POST запрос на `/api/robokassa/result` с параметрами:
- `OutSum` - сумма платежа
- `InvId` - ID заказа
- `SignatureValue` - подпись

### 3. Перенаправление пользователя

После обработки Robokassa перенаправляет пользователя на:
- **Успех**: `/checkout/success?InvId=123&OutSum=1000`
- **Ошибка**: `/checkout/fail?ErrorCode=1&ErrorMessage=Отменено`

## Тестирование

### Тестовый режим

1. Установите `ROBOKASSA_TEST_MODE=true`
2. Используйте тестовые карты Robokassa:
   - **Успешная оплата**: 4000000000000002
   - **Недостаточно средств**: 4000000000000036
   - **Карта заблокирована**: 4000000000000044

### Проверка интеграции

```bash
# Тест создания платежа
curl -X POST http://localhost:3000/api/robokassa/create \
  -H "Content-Type: application/json" \
  -d '{
    "productSlug": "productivity",
    "email": "test@example.com",
    "name": "Test User"
  }'
```

## Безопасность

### Проверка подписи

Все запросы от Robokassa проверяются по подписи:

```javascript
const signatureString = `${outSum}:${invId}:${ROBOKASSA_PASSWORD2}`;
const calculatedSignature = crypto.createHash('md5').update(signatureString).digest('hex');
```

### Защита от повторных платежей

1. Сохраняйте статус заказа в базе данных
2. Проверяйте, не был ли заказ уже оплачен
3. Используйте уникальные ID заказов

### HTTPS обязательно

Robokassa работает только по HTTPS в production. Убедитесь, что:
- Домен имеет SSL сертификат
- Все URL'ы начинаются с `https://`

## Мониторинг

### Логирование

Все операции логируются:

```javascript
console.log(`Payment received: ${outSum} for order ${invId}`);
console.error('Signature verification failed');
```

### Отслеживание статусов

- `PENDING` — заказ создан, ожидает оплаты
- `PAID` — заказ оплачен успешно
- `FAILED` — ошибка оплаты или отмена
- `CANCELLED` — отменен вручную

## Troubleshooting

### Ошибка "Invalid signature"

1. Проверьте правильность `ROBOKASSA_PASSWORD2`
2. Убедитесь, что параметры передаются в правильном порядке
3. Проверьте кодировку (должна быть UTF-8)

### Платеж не проходит

1. Проверьте `ROBOKASSA_LOGIN`
2. Убедитесь, что аккаунт активирован в Robokassa
3. Проверьте настройки URL'ов

### Email не отправляется

1. Проверьте настройки email сервиса
2. Убедитесь, что `sendEmail` вызывается после подтверждения
3. Проверьте логи на ошибки SMTP

## Дополнительные возможности

### Множественные способы оплаты

Robokassa поддерживает:
- Банковские карты (Visa, MasterCard, МИР)
- Электронные кошельки (ЮMoney, QIWI, WebMoney)
- Мобильные платежи
- Банковские переводы

### Возвраты

Для обработки возвратов используйте API Robokassa:

```javascript
// Пример запроса возврата
const refundData = {
  MerchantLogin: ROBOKASSA_LOGIN,
  TransactionID: transactionId,
  OutSum: amount,
  // ... другие параметры
};
```

### Уведомления

Настройте webhook уведомления для:
- Успешных платежей
- Неудачных платежей
- Возвратов
- Отмен

## Поддержка

- **Документация Robokassa**: https://docs.robokassa.ru
- **Техподдержка**: support@robokassa.ru
- **API Reference**: https://docs.robokassa.ru/api
