# 📋 ПЛАН: Отдельные страницы продуктов

## 🎯 ЦЕЛЬ
Создать индивидуальные страницы для каждого планера с детальной информацией, галереями и CTA.

---

## 📁 СТРУКТУРА СТРАНИЦ

```
app/
├── page.tsx (главная - уже готова)
├── products/
│   ├── page.tsx (каталог всех продуктов)
│   ├── [slug]/
│   │   └── page.tsx (динамическая страница продукта)
│   ├── productivity/
│   │   └── page.tsx (или используем slug)
│   ├── student/
│   │   └── page.tsx
│   └── bundle/
│       └── page.tsx
```

**Рекомендую:** Использовать динамический роутинг `[slug]` для гибкости.

---

## 🗂️ СТРУКТУРА ДАННЫХ

### Создадим JSON с информацией о продуктах:

```typescript
// data/products.ts
interface Product {
  id: string;
  slug: string; // для URL
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  
  features: Feature[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faq: FAQ[];
  
  included: string[]; // что входит
  requirements: string; // требования
  deliveryTime: string; // время доставки
  
  isPopular?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
}
```

---

## 📄 СТРАНИЦЫ КОТОРЫЕ СОЗДАДИМ

### 1. **Главная страница** ✅ (уже готова)
- `/` - Landing page со всеми продуктами

### 2. **Каталог продуктов** 🆕
- `/products` - Список всех продуктов
- Сетка карточек
- Фильтры (цена, тип)
- Сортировка

### 3. **Страница продукта** 🆕 (3 штуки)
- `/products/productivity` - Набор продуктивности
- `/products/student` - Для студента  
- `/products/bundle` - Полный набор

**На каждой странице:**
- Hero с изображением
- Детальное описание
- Список всех фич
- Галерея скриншотов (5-10 шт)
- Видео preview (опционально)
- Что включено
- FAQ по продукту
- Отзывы
- Связанные продукты
- CTA блоки
- Breadcrumbs

---

## 🎨 КОМПОНЕНТЫ ДЛЯ СОЗДАНИЯ

### 1. **ProductHero** 
```
- Изображение продукта
- Название + цена
- Короткое описание
- Badges (популярный, скидка)
- Primary CTA
- Rating + отзывы
```

### 2. **ProductFeaturesList**
```
- Детальный список фич
- Иконки для каждой
- Expandable секции
- Screenshots для каждой фичи
```

### 3. **ProductGalleryFull**
```
- Большая галерея (5-10 изображений)
- Lightbox
- Thumbnails навигация
- Fullscreen mode
```

### 4. **ProductIncludes**
```
- Что входит в пакет
- Checklist визуал
- Иконки
```

### 5. **ProductRequirements**
```
- Требования (Notion account и тд)
- Совместимость
```

### 6. **ProductDelivery**
```
- Процесс доставки
- Timeline визуализация
- Что ожидать
```

### 7. **RelatedProducts**
```
- 2-3 похожих продукта
- Carousel или сетка
- Quick view
```

### 8. **ProductBreadcrumbs**
```
- Главная > Продукты > [Название]
- SEO friendly
```

### 9. **StickyProductCTA**
```
- Прилипает при скролле
- Показывает цену + кнопку
- Для мобильных - floating button
```

### 10. **ProductFAQ**
```
- Специфичные вопросы по продукту
- Accordion
```

---

## 📊 ДАННЫЕ ДЛЯ ПРОДУКТОВ

### **1. Набор продуктивности**
```typescript
{
  id: "prod-productivity",
  slug: "productivity",
  name: "Набор продуктивности",
  price: 4990,
  
  features: [
    {
      title: "База задач с умными фильтрами",
      description: "Детальное описание...",
      screenshot: "/screens/tasks-1.png",
      icon: "tasks"
    },
    // ... еще 4-5 фич
  ],
  
  gallery: [
    "/gallery/prod-1.png",
    "/gallery/prod-2.png",
    // ... 5-10 изображений
  ],
  
  included: [
    "База задач (Kanban + List + Calendar)",
    "Трекер привычек с визуализацией",
    "Проектная система",
    "База заметок",
    "Дашборд Overview",
    "Видео инструкция",
    "Пожизненные обновления",
    "Email поддержка"
  ],
  
  faq: [
    {
      q: "Как долго займет настройка?",
      a: "5-10 минут. Просто дублируете и готово."
    },
    // ...
  ]
}
```

### **2. Для студента**
```typescript
{
  id: "prod-student",
  slug: "student",
  name: "Дэшборд студента",
  price: 3490,
  // аналогично...
}
```

### **3. Полный набор**
```typescript
{
  id: "prod-bundle",
  slug: "bundle",
  name: "Полный набор",
  price: 6990,
  originalPrice: 9980,
  discount: 30,
  isPopular: true,
  // аналогично + всё из обоих наборов
}
```

---

## 🎯 ПЛАН РЕАЛИЗАЦИИ

### Этап 1: Структура данных ✅
- [ ] Создать `data/products.ts` с интерфейсами
- [ ] Заполнить данные для 3 продуктов
- [ ] Экспортировать функции `getProduct()`, `getAllProducts()`

### Этап 2: Базовые компоненты 🔨
- [ ] ProductHero
- [ ] ProductFeaturesList
- [ ] ProductIncludes
- [ ] ProductBreadcrumbs
- [ ] StickyProductCTA

### Этап 3: Галерея и медиа 🖼️
- [ ] ProductGalleryFull
- [ ] Lightbox компонент
- [ ] Video player (опционально)

### Этап 4: Дополнительные секции 📄
- [ ] ProductFAQ (специфичный для продукта)
- [ ] RelatedProducts
- [ ] ProductTestimonials (фильтр по продукту)
- [ ] ProductDelivery

### Этап 5: Роутинг 🛣️
- [ ] `/products/page.tsx` - каталог
- [ ] `/products/[slug]/page.tsx` - динамическая страница
- [ ] generateStaticParams() для 3 продуктов
- [ ] generateMetadata() для SEO

### Этап 6: SEO оптимизация 🔍
- [ ] Уникальные meta теги для каждого продукта
- [ ] Structured Data (Product Schema)
- [ ] Breadcrumbs Schema
- [ ] Open Graph изображения
- [ ] Обновить sitemap.xml

### Этап 7: Интеграция с главной 🔗
- [ ] Обновить ссылки с главной на продукты
- [ ] Кнопки "Купить" → страница продукта
- [ ] "Смотреть цены" → страница продукта
- [ ] Навигация в Header

### Этап 8: Мобильная адаптация 📱
- [ ] Все компоненты responsive
- [ ] Мобильная галерея (swipe)
- [ ] Sticky CTA для мобильных
- [ ] Touch-friendly

### Этап 9: Тестирование ✅
- [ ] Все 3 страницы работают
- [ ] SEO проверка
- [ ] Lighthouse audit
- [ ] Mobile testing

---

## 📐 ДИЗАЙН СТРАНИЦЫ ПРОДУКТА

```
┌─────────────────────────────────────┐
│ Header (Sticky)                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Breadcrumbs                         │
│ Главная > Продукты > [Название]    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ HERO SECTION                        │
│ ┌───────────┬─────────────────────┐ │
│ │           │ Название            │ │
│ │  Image    │ Цена (скидка)      │ │
│ │ (большое) │ Rating ★★★★★       │ │
│ │           │ Короткое описание  │ │
│ │           │ [Купить сейчас]    │ │
│ └───────────┴─────────────────────┘ │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ BADGES / TRUST                      │
│ ✓ 500+ покупок  ✓ Гарантия 30 дней│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ DESCRIPTION                         │
│ Полное описание продукта...        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ FEATURES DETAILED                   │
│ ┌─────────────────────────────────┐ │
│ │ 📊 Фича 1                       │ │
│ │ Описание + Screenshot           │ │
│ └─────────────────────────────────┘ │
│ [... еще 4-5 фич]                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ GALLERY                             │
│ ┌───┬───┬───┬───┬───┐              │
│ │ 1 │ 2 │ 3 │ 4 │ 5 │              │
│ └───┴───┴───┴───┴───┘              │
│ (кликабельно → Lightbox)           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ WHAT'S INCLUDED                     │
│ ✓ Пункт 1                          │
│ ✓ Пункт 2                          │
│ [... список включений]             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ HOW IT WORKS / DELIVERY             │
│ 1 → 2 → 3 (timeline)               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ PRODUCT FAQ                         │
│ (специфичные вопросы)              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ TESTIMONIALS                        │
│ (отзывы по этому продукту)         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ RELATED PRODUCTS                    │
│ ┌─────┬─────┬─────┐                │
│ │ Пр1 │ Пр2 │ Пр3 │                │
│ └─────┴─────┴─────┘                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ FINAL CTA                           │
│ "Начните организовывать жизнь"     │
│ [Купить за X₸]                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ STICKY CTA (float bottom)           │
│ [Цена] [Купить]                    │
└─────────────────────────────────────┘
```

---

## 🔗 НАВИГАЦИЯ И ССЫЛКИ

### С главной страницы:
```
Hero CTA → /products (или /products/bundle)
Карточка продукта → /products/[slug]
"Смотреть цены" → /products/[slug]
```

### Header навигация:
```
Добавить: Продукты → dropdown
  - Набор продуктивности
  - Для студента
  - Полный набор (рекомендуем!)
  - Все продукты
```

### Breadcrumbs:
```
Главная > Продукты > [Название продукта]
```

---

## 📈 SEO УЛУЧШЕНИЯ

### Для каждой страницы продукта:

```typescript
// Уникальные meta
export async function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  
  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.gallery[0]],
      type: 'product',
    },
  };
}

// Product Schema
{
  "@type": "Product",
  "name": "Набор продуктивности",
  "description": "...",
  "image": [...],
  "brand": "Planery Studio",
  "offers": {
    "@type": "Offer",
    "price": "4990",
    "priceCurrency": "KZT",
    "availability": "InStock"
  },
  "aggregateRating": {
    "ratingValue": "4.9",
    "reviewCount": "150"
  }
}

// Breadcrumb Schema
{
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

---

## 💾 ФАЙЛЫ ДЛЯ СОЗДАНИЯ

```
Новые файлы:
├── data/
│   └── products.ts (данные продуктов)
│
├── app/products/
│   ├── page.tsx (каталог)
│   └── [slug]/
│       └── page.tsx (динамическая)
│
├── components/
│   ├── ProductHero.tsx
│   ├── ProductFeaturesList.tsx
│   ├── ProductGalleryFull.tsx
│   ├── ProductIncludes.tsx
│   ├── ProductRequirements.tsx
│   ├── ProductDelivery.tsx
│   ├── ProductBreadcrumbs.tsx
│   ├── StickyProductCTA.tsx
│   ├── ProductFAQ.tsx
│   └── RelatedProducts.tsx
│
└── public/
    └── products/
        ├── productivity/
        │   ├── hero.png
        │   ├── feature-1.png
        │   ├── feature-2.png
        │   └── gallery/ (5-10 шт)
        ├── student/
        │   └── ... (аналогично)
        └── bundle/
            └── ... (аналогично)
```

---

## ⏱️ ОЦЕНКА ВРЕМЕНИ

- **Этап 1:** Структура данных - 30 мин
- **Этап 2:** Базовые компоненты - 1-1.5 часа
- **Этап 3:** Галерея - 30 мин
- **Этап 4:** Дополнительные секции - 1 час
- **Этап 5:** Роутинг - 30 мин
- **Этап 6:** SEO - 30 мин
- **Этап 7:** Интеграция - 30 мин
- **Этап 8-9:** Адаптация + тесты - 1 час

**Итого:** ~5-6 часов чистого времени

---

## 🎯 ПРИОРИТЕТЫ

### Must Have (критично):
✅ Структура данных
✅ Динамический роутинг [slug]
✅ ProductHero
✅ ProductFeaturesList
✅ Галерея
✅ CTA блоки
✅ SEO meta

### Should Have (важно):
✅ Breadcrumbs
✅ Related products
✅ Product FAQ
✅ Sticky CTA
✅ Mobile optimization

### Nice to Have (опционально):
- Video preview
- 360° view
- Live chat
- Wishlist
- Share buttons

---

## 📱 МОБИЛЬНАЯ ВЕРСИЯ

### Особенности:
- Stack layout (не grid)
- Swipeable галерея
- Sticky "Купить" button (bottom)
- Collapsed описания (читать далее)
- Touch-friendly
- Optimized images

---

## 🚀 СЛЕДУЮЩИЙ ШАГ

**Готов начать реализацию!**

С чего начнем?
1. Создадим структуру данных (data/products.ts)
2. Базовые компоненты (Hero, Features)
3. Динамический роутинг
4. Или всё сразу? 😊

Ваши пожелания? 🎨
