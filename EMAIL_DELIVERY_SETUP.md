# 📧 НАСТРОЙКА EMAIL ДОСТАВКИ

## Обзор системы

Проект включает автоматическую отправку email уведомлений после успешной оплаты заказа.

## Компоненты системы

### 1. Email сервис (`lib/email.ts`)
- Отправка писем через Resend API
- HTML и текстовая версия уведомления
- Автоматический подбор ссылок доступа по продукту

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
# Resend
EMAIL_SERVICE_API_KEY=your-resend-api-key
EMAIL_FROM="Planery Studio <support@planery.studio>"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Robokassa
ROBOKASSA_LOGIN=your-merchant-id
ROBOKASSA_PASSWORD1=your-password-1
ROBOKASSA_PASSWORD2=your-password-2
ROBOKASSA_PAYMENT_URL=https://auth.robokassa.kz/Merchant/Index.aspx
ROBOKASSA_TEST_MODE=1
ROBOKASSA_ENABLE_RECEIPT=1
ROBOKASSA_DISABLE_REDIRECT=0
ROBOKASSA_CURRENCY=KZT
```

### 2. Настройка Resend

1. Зарегистрируйтесь на [resend.com](https://resend.com)
2. Создайте API-ключ в разделе **API Keys**
3. Укажите домен отправителя или используйте `onboarding@resend.dev` для тестов
4. Сохраните ключ в `EMAIL_SERVICE_API_KEY`, адрес отправителя в `EMAIL_FROM`

### 3. Настройка Vercel

В Vercel Dashboard → Settings → Environment Variables добавьте:

```
EMAIL_SERVICE_API_KEY=your-resend-api-key
EMAIL_FROM="Planery Studio <support@planery.studio>"
ROBOKASSA_LOGIN=your-merchant-id
ROBOKASSA_PASSWORD1=your-password-1
ROBOKASSA_PASSWORD2=your-password-2
ROBOKASSA_PAYMENT_URL=https://auth.robokassa.kz/Merchant/Index.aspx
ROBOKASSA_TEST_MODE=0
ROBOKASSA_ENABLE_RECEIPT=1
ROBOKASSA_DISABLE_REDIRECT=0
ROBOKASSA_CURRENCY=KZT
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
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
    "productSlug": "productivity",
    "email": "test@example.com",
    "name": "Test User"
  }'
```

### Тестирование email

1. Убедитесь, что переменные окружения настроены
2. Создайте тестовый заказ
3. Проверьте логи в консоли на наличие ошибок
4. Проверьте папку "Спам" в Gmail

## Безопасность

- ✅ Используйте App Passwords для Gmail
- ✅ Храните пароли и сервисные ключи Supabase только на сервере
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
1. Проверьте корректность `EMAIL_SERVICE_API_KEY`
2. Убедитесь, что домен отправителя подтвержден в Resend
3. Проверьте логи на ошибки при вызове Resend API

### Robokassa не работает
1. Проверьте `ROBOKASSA_LOGIN` и пароли
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
