# Planery Studio — Developer Handbook

Этот документ даёт контекст по проекту, чтобы новому разработчику было проще разобраться и поддерживать код.

---

## 1. Архитектура

- **Фреймворк**: Next.js 14 (App Router), TypeScript, React 18.
- **UI**: Tailwind CSS, framer-motion для анимаций.
- **Интеграции**:
  - **Robokassa** — платёжная система (поток описан ниже).
  - **Supabase** — хранение заказов (`orders`) и лога событий (`order_events`).
  - **Resend** — отправка e-mail с доступом к шаблонам.
- **Данные**: каталоги продуктов хранятся в `data/products.ts`, UI компоненты — в `components/`.
- **Главные страницы**:
  - `app/page.tsx`: лендинг с продуктами и модалкой оплаты.
  - `app/products/[slug]/`: страницы отдельных продуктов.
  - `app/checkout/success` и `app/checkout/fail`: статусы после оплаты.
- **API роуты**:
  - `app/api/robokassa/create/route.ts`: создаёт счёт, пишет заказ в Supabase, возвращает URL Robokassa.
  - `app/api/robokassa/result/route.ts`: обрабатывает уведомления от Robokassa, переводит заказ в `PAID`, отправляет письмо через Resend.

---

## 2. Переменные окружения

### Базовые (`.env.local` и Vercel)

```env
NEXT_PUBLIC_SITE_URL=https://www.planerystudio.com
SITE_URL=https://www.planerystudio.com

# Robokassa
ROBOKASSA_LOGIN=
ROBOKASSA_PASSWORD1=
ROBOKASSA_PASSWORD2=
ROBOKASSA_PAYMENT_URL=https://auth.robokassa.kz/Merchant/Index.aspx
ROBOKASSA_TEST_MODE=1            # 0 для продакшена
ROBOKASSA_ENABLE_RECEIPT=1
ROBOKASSA_DISABLE_REDIRECT=0
ROBOKASSA_CURRENCY=KZT

# Resend
EMAIL_SERVICE_API_KEY=re_...
EMAIL_FROM="Planery Studio <support@planerystudio.com>"

# Ссылки на материалы (используются в письме)
DELIVERY_LINK_PRODUCTIVITY_MAIN=
DELIVERY_LINK_STUDENT_MAIN=
DELIVERY_LINK_BUNDLE_PRODUCTIVITY=
DELIVERY_LINK_BUNDLE_STUDENT=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://*.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...   # только на сервере!
```

> **Важно**: `EMAIL_FROM` должен совпадать с подтверждённым в Resend доменом (`planerystudio.com`). Service-role ключ Supabase хранить только в серверных переменных.

### Локальный запуск

1. Скопировать `.env.example` в `.env.local` и заполнить.
2. Установить зависимости `npm install`.
3. Запустить `npm run dev`.

---

## 3. Поток оплаты

1. Пользователь нажимает «Купить» → `components/CheckoutModal` отправляет POST на `/api/robokassa/create`.
2. Роут `create`:
   - Проверяет поля, получает продукт из `data/products.ts`.
   - Генерирует `invoiceId`, сохраняет заказ в Supabase (`status = PENDING`).
   - Формирует подпись Robokassa, возвращает URL платёжной формы.
3. Пользователь попадает на Robokassa, оплачивает.
4. Robokassa вызывает `/api/robokassa/result`:
   - Проверяет подпись, ищет заказ по `invoiceId`.
   - Обновляет статус на `PAID`, логирует событие.
   - Вызывает `sendPurchaseEmail` (Resend). Письмо содержит ссылки из `DELIVERY_LINK_*`.
5. Пользователь редиректится на `/checkout/success` или `/checkout/fail` (Robokassa делает GET).

---

## 4. Supabase: структура таблиц

Создать через SQL Editor:

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

---

## 5. Resend / DNS настройка

Для домена `planerystudio.com` должны быть:

- SPF: `v=spf1 include:amazonses.com include:spf.resend.com ~all` (или аналогичная объединённая запись).
- DKIM: `resend._domainkey` (CNAME / TXT, значение Resend даёт при добавлении домена).
- DMARC: `_dmarc` → `v=DMARC1; p=none; rua=mailto:dmarc@planerystudio.com` (адрес корректируйте под себя).

Проверка:
```bash
dig TXT _dmarc.planerystudio.com +short
dig TXT resend._domainkey.planerystudio.com +short
```

Тестовое письмо:
```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $EMAIL_SERVICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Planery Studio <support@planerystudio.com>",
    "to": ["ваш.email@gmail.com"],
    "subject": "Resend тест",
    "html": "<p>Привет!</p>"
  }'
```

---

## 6. Отладка и типовые ошибки

| Симптом | Возможная причина | Что делать |
| --- | --- | --- |
| `P1001` от Prisma | Используется старый flow (Prisma). Сейчас Supabase подключается через `@supabase/supabase-js`. Убедитесь, что код не тянет Prisma. |
| `[Email] Resend API error 401/403` | Неверный или неактивный `EMAIL_SERVICE_API_KEY`. Сгенерировать новый ключ, обновить переменные, redeploy. |
| `[Email] Resend API error 422` | Неправильный `EMAIL_FROM` (без кавычек/неверный домен). Привести к `Name <email@verified-domain>`. |
| Платёж не проходит | Проверить Robokassa переменные, убедиться что `ROBOKASSA_TEST_MODE=1` и используется URL `auth.robokassa.kz`. |
| Заказ не появляется в Supabase | Проверить логи `appendOrderEvent`/`createOrder`, значение `SUPABASE_SERVICE_ROLE_KEY`, что таблицы созданы. |

Команда для просмотра логов Vercel: `vercel logs planery-studio --scope <account>`.

---

## 7. Чек-лист перед продакшеном

- [ ] Переключить `ROBOKASSA_TEST_MODE=0`.
- [ ] В Robokassa обновить Result/Success/Fail URL на прод-домен.
- [ ] Подтвердить домен в Resend, заменить `EMAIL_SERVICE_API_KEY` на боевой.
- [ ] Убедиться, что DNS (SPF/DKIM/DMARC) синхронизированы.
- [ ] Прогнать тестовый платеж (минимальная сумма) и проверить письмо.
- [ ] Настроить мониторинг: проверка таблиц `orders`, не обрабатываются ли повторные Result webhook.

---

## 8. Контакты и полезные команды

- Запуск: `npm run dev`.
- Линт: `npm run lint` (если нужна настройка – добавить ESLint config).
- Билд: `npm run build`.
- Deploy: push в `main` → Vercel auto deploy.
- Локальный тест API: `curl` запросы в разделах выше.

Если нужно, можно добавить локальную мок-интеграцию: выставить `ROBOKASSA_DISABLE_REDIRECT=1`, и `/api/robokassa/create` вернёт ссылку на `/checkout/success?mock=1`.

---

Обновляйте этот документ, если интеграции меняются, добавляются новые эндпоинты или переменные окружения. Это сократит время на передачу контекста. Удачи!
