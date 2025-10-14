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
