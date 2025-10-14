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

Добавьте в `.env.local`:

```env
ROBOKASSA_MERCHANT_ID=ваш_merchant_id
ROBOKASSA_PASSWORD_1=ваш_пароль_1
ROBOKASSA_PASSWORD_2=ваш_пароль_2
ROBOKASSA_TEST_MODE=true
```

### 5. Настройка Vercel

В Vercel Dashboard → Settings → Environment Variables:

```
ROBOKASSA_MERCHANT_ID=ваш_merchant_id
ROBOKASSA_PASSWORD_1=ваш_пароль_1
ROBOKASSA_PASSWORD_2=ваш_пароль_2
ROBOKASSA_TEST_MODE=false
```

## Процесс работы

### 1. Создание платежа

```javascript
const response = await fetch('/api/robokassa/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 1000, // сумма в рублях
    description: 'Планировщик студента',
    orderId: 'ORD-12345',
    email: 'user@example.com'
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
    "amount": 1000,
    "description": "Test payment",
    "orderId": "TEST-001",
    "email": "test@example.com"
  }'
```

## Безопасность

### Проверка подписи

Все запросы от Robokassa проверяются по подписи:

```javascript
const signatureString = `${outSum}:${invId}:${ROBOKASSA_PASSWORD_2}`;
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

- `pending` - заказ создан, ожидает оплаты
- `paid` - заказ оплачен успешно
- `failed` - ошибка оплаты
- `cancelled` - отменен пользователем

## Troubleshooting

### Ошибка "Invalid signature"

1. Проверьте правильность `ROBOKASSA_PASSWORD_2`
2. Убедитесь, что параметры передаются в правильном порядке
3. Проверьте кодировку (должна быть UTF-8)

### Платеж не проходит

1. Проверьте `ROBOKASSA_MERCHANT_ID`
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
  MerchantLogin: ROBOKASSA_MERCHANT_ID,
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