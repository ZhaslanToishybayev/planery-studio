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
