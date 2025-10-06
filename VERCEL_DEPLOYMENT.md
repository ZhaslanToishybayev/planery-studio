# 🚀 ПОШАГОВАЯ ИНСТРУКЦИЯ: ДЕПЛОЙ НА VERCEL

## Planery Studio - Deployment Guide

**Время:** 5-10 минут  
**Сложность:** Легко  
**Статус проекта:** ✅ Ready для деплоя

---

## 📋 ЧТО УЖЕ ГОТОВО

✅ Git репозиторий инициализирован  
✅ Первый коммит создан  
✅ .gitignore настроен  
✅ TypeScript без ошибок  
✅ Все компоненты работают  
✅ Mobile версия идеальна  

---

## 🎯 СПОСОБЫ ДЕПЛОЯ

### **Способ 1: Через Vercel Dashboard (Рекомендуется)** ⭐
Самый простой способ - без командной строки

### **Способ 2: Через Vercel CLI**
Для продвинутых пользователей

### **Способ 3: GitHub + Vercel**
С автоматическими деплоями при push

---

## 🌟 СПОСОБ 1: VERCEL DASHBOARD (Рекомендуется)

### Шаг 1: Создайте GitHub репозиторий

1. **Перейдите на GitHub:**
   ```
   https://github.com/new
   ```

2. **Создайте новый репозиторий:**
   - Repository name: `planery-studio`
   - Description: `Landing page for Planery Studio - Notion Templates`
   - Visibility: `Public` или `Private` (на ваш выбор)
   - ❌ НЕ ВКЛЮЧАЙТЕ "Initialize with README" (у нас уже есть)
   - Нажмите **"Create repository"**

3. **Подключите локальный репозиторий к GitHub:**
   
   Откройте терминал в папке проекта и выполните:
   ```bash
   # Добавьте remote (замените YOUR_USERNAME на ваш username)
   git remote add origin https://github.com/YOUR_USERNAME/planery-studio.git
   
   # Отправьте код на GitHub
   git push -u origin main
   ```

   **Пример:**
   ```bash
   git remote add origin https://github.com/zhaslan/planery-studio.git
   git push -u origin main
   ```

   При первом push GitHub может попросить авторизацию:
   - Username: ваш GitHub username
   - Password: используйте Personal Access Token (не обычный пароль!)

   **Как получить Token:**
   1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   2. Generate new token → Classic
   3. Выберите: `repo` (все галочки в разделе)
   4. Generate token
   5. Скопируйте и используйте вместо пароля

---

### Шаг 2: Деплой на Vercel

1. **Перейдите на Vercel:**
   ```
   https://vercel.com/signup
   ```

2. **Зарегистрируйтесь через GitHub:**
   - Нажмите "Continue with GitHub"
   - Авторизуйте Vercel

3. **Создайте новый проект:**
   - Нажмите **"Add New..."** → **"Project"**
   - Выберите репозиторий `planery-studio` из списка
   - Нажмите **"Import"**

4. **Настройте проект:**
   ```
   Project Name: planery-studio (или любое другое)
   Framework Preset: Next.js (должно определиться автоматически)
   Root Directory: ./ (оставьте по умолчанию)
   Build Command: npm run build (автоматически)
   Output Directory: .next (автоматически)
   Install Command: npm install (автоматически)
   ```

5. **Environment Variables (опционально, добавите позже):**
   Пока оставьте пустым, добавите после деплоя:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_YM_ID`

6. **Нажмите "Deploy"**
   
   Vercel начнет:
   - ✅ Клонировать репозиторий
   - ✅ Устанавливать зависимости
   - ✅ Собирать проект
   - ✅ Деплоить на CDN

   **Время деплоя:** 2-3 минуты

7. **Получите URL:**
   
   После успешного деплоя вы получите:
   ```
   https://planery-studio.vercel.app
   ```
   
   Или свой собственный URL вида:
   ```
   https://planery-studio-abc123.vercel.app
   ```

---

### Шаг 3: Настройка собственного домена (опционально)

1. **В Vercel Dashboard:**
   - Откройте проект
   - Перейдите в **Settings** → **Domains**
   - Нажмите **"Add"**

2. **Добавьте домен:**
   ```
   planery.studio
   ```
   или
   ```
   planery.kz
   ```

3. **Настройте DNS записи:**
   
   Vercel покажет инструкции. Обычно нужно добавить:
   
   **Для домена с www:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
   
   **Для корневого домена:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

4. **Ждите проверку:**
   - DNS обновление: 5-60 минут
   - SSL сертификат: автоматически
   - После проверки домен будет активен

---

## 🖥️ СПОСОБ 2: VERCEL CLI

### Установка Vercel CLI

```bash
# Установите Vercel CLI глобально
npm install -g vercel

# Или используйте через npx (без установки)
npx vercel
```

### Деплой через CLI

1. **Авторизуйтесь:**
   ```bash
   vercel login
   ```
   Выберите метод авторизации (GitHub/Email)

2. **Первый деплой:**
   ```bash
   cd /home/zhaslan/Downloads/planery-next-fullzip/planery-next-full
   vercel
   ```

3. **Vercel спросит:**
   ```
   ? Set up and deploy "~/planery-next-full"? [Y/n] y
   ? Which scope do you want to deploy to? Your Personal Account
   ? Link to existing project? [y/N] n
   ? What's your project's name? planery-studio
   ? In which directory is your code located? ./
   ```

4. **Vercel автоматически:**
   - ✅ Определит Next.js
   - ✅ Соберет проект
   - ✅ Задеплоит
   - ✅ Даст preview URL

5. **Production деплой:**
   ```bash
   vercel --prod
   ```

---

## 🔄 СПОСОБ 3: GITHUB + AUTO-DEPLOY

### Настройка автоматических деплоев

После подключения GitHub к Vercel (Способ 1), каждый push автоматически деплоится!

```bash
# Внесите изменения
git add .
git commit -m "Update: ваши изменения"
git push

# Vercel автоматически:
# ✅ Обнаружит push
# ✅ Соберет проект
# ✅ Задеплоит
# ✅ Пришлет уведомление
```

### Типы деплоев:

1. **Preview Deploys:**
   - Автоматически для каждой ветки
   - Каждый pull request
   - URL вида: `https://planery-studio-git-feature-abc.vercel.app`

2. **Production Deploys:**
   - Только ветка `main`
   - URL: `https://planery-studio.vercel.app`

---

## ⚙️ POST-DEPLOYMENT: НАСТРОЙКА

### 1. Environment Variables

В Vercel Dashboard → Settings → Environment Variables добавьте:

```env
# Site URL
NEXT_PUBLIC_SITE_URL=https://planery-studio.vercel.app

# Google Analytics (если есть)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Yandex Metrika (если есть)
NEXT_PUBLIC_YM_ID=12345678

# Платежная система (когда подключите)
LEMON_SQUEEZY_API_KEY=ваш_ключ
LEMON_SQUEEZY_STORE_ID=ваш_id
```

После добавления нажмите **"Redeploy"** для применения.

---

### 2. Обновите URL в коде

После получения production URL обновите:

1. **app/sitemap.ts:**
   ```typescript
   const BASE_URL = 'https://planery-studio.vercel.app';
   ```

2. **app/robots.ts:**
   ```typescript
   host: 'https://planery-studio.vercel.app',
   ```

3. **app/layout.tsx:**
   ```typescript
   metadataBase: new URL("https://planery-studio.vercel.app"),
   ```

4. **Сделайте commit и push:**
   ```bash
   git add .
   git commit -m "Update: production URLs"
   git push
   ```

---

### 3. Настройте Google Search Console

1. **Перейдите:**
   ```
   https://search.google.com/search-console
   ```

2. **Добавьте сайт:**
   - URL prefix: `https://planery-studio.vercel.app`

3. **Верификация:**
   - Скачайте HTML файл
   - Положите в `public/`
   - Или добавьте meta tag в layout.tsx

4. **Submit Sitemap:**
   ```
   https://planery-studio.vercel.app/sitemap.xml
   ```

---

### 4. Настройте Yandex Webmaster

1. **Перейдите:**
   ```
   https://webmaster.yandex.ru
   ```

2. **Добавьте сайт**

3. **Submit Sitemap:**
   ```
   https://planery-studio.vercel.app/sitemap.xml
   ```

---

## 📊 МОНИТОРИНГ

### Vercel Analytics (встроенный)

В Vercel Dashboard → Analytics видно:
- Посетители
- Pageviews
- Top pages
- Скорость загрузки
- Core Web Vitals

### Подключите внешние сервисы:

1. **Google Analytics:**
   - Создайте GA4 property
   - Добавьте ID в environment variables
   - Уже интегрирован через useAnalytics hook

2. **Yandex Metrika:**
   - Создайте счетчик
   - Добавьте ID в environment variables

---

## 🔧 TROUBLESHOOTING

### Проблема: Build failed

**Причина:** Ошибки TypeScript или сборки

**Решение:**
```bash
# Проверьте локально
npm run build

# Исправьте ошибки
# Commit и push
git add .
git commit -m "Fix: build errors"
git push
```

---

### Проблема: 404 на странице

**Причина:** Неправильные пути или роутинг

**Решение:**
- Проверьте структуру папок в `app/`
- Все файлы должны быть `page.tsx` или `layout.tsx`

---

### Проблема: Изображения не загружаются

**Причина:** Неправильные пути

**Решение:**
- Все изображения должны быть в `public/`
- Пути начинаются с `/` (например: `/assets/image.png`)
- Не используйте `../public/`

---

### Проблема: Environment variables не работают

**Причина:** Не добавлены в Vercel или нужен redeploy

**Решение:**
1. Добавьте переменные в Vercel Dashboard
2. Нажмите "Redeploy"
3. Переменные с `NEXT_PUBLIC_` доступны в браузере

---

## 🚀 CONTINUOUS DEPLOYMENT

### Workflow после деплоя:

```bash
# 1. Внесите изменения локально
# Редактируйте файлы...

# 2. Проверьте локально
npm run dev
# Тестируйте на http://localhost:3000

# 3. Commit изменения
git add .
git commit -m "Update: описание изменений"

# 4. Push на GitHub
git push

# 5. Vercel автоматически:
# ✅ Обнаружит push
# ✅ Запустит build
# ✅ Задеплоит новую версию
# ✅ Пришлет уведомление на email

# 6. Проверьте на production URL
# https://planery-studio.vercel.app
```

---

## 📈 МАСШТАБИРОВАНИЕ

### Vercel Pricing:

**Free (Hobby):**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ SSL certificate
- ✅ Custom domains
- ✅ Perfect для старта!

**Pro ($20/month):**
- Больше bandwidth
- Team collaboration
- Advanced analytics

---

## ✅ CHECKLIST ПОСЛЕ ДЕПЛОЯ

### Сразу после деплоя:
- [ ] Проверьте сайт открывается
- [ ] Проверьте все страницы
- [ ] Проверьте на мобильном
- [ ] Проверьте формы работают

### В течение часа:
- [ ] Обновите URLs в коде
- [ ] Добавьте environment variables
- [ ] Настройте домен (если есть)

### В течение дня:
- [ ] Google Search Console
- [ ] Yandex Webmaster
- [ ] Google Analytics
- [ ] Yandex Metrika

### В течение недели:
- [ ] Подключите платежи
- [ ] Настройте email
- [ ] Мониторинг ошибок (Sentry)
- [ ] A/B тестирование

---

## 🎉 ПОЗДРАВЛЯЮ!

Ваш сайт теперь в production! 🚀

**URL:** `https://planery-studio.vercel.app`

### Что дальше?

1. **Маркетинг:**
   - SEO оптимизация продолжается
   - Контент маркетинг
   - Социальные сети

2. **Аналитика:**
   - Следите за метриками
   - A/B тестирование
   - Оптимизация конверсии

3. **Улучшения:**
   - Слушайте пользователей
   - Добавляйте фичи
   - Улучшайте UX

---

## 📞 ПОДДЕРЖКА

### Документация:
- **Vercel:** https://vercel.com/docs
- **Next.js:** https://nextjs.org/docs

### Проблемы?
- Vercel Status: https://www.vercel-status.com
- Vercel Community: https://github.com/vercel/vercel/discussions

---

**Успешного запуска! 🚀💰**
