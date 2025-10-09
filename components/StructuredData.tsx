export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Planery Studio",
    url: "https://planery.studio",
    logo: "https://planery.studio/logo.png",
    description:
      "Эстетичные Notion-шаблоны для продуктивности и учёбы",
    contactPoint: {
      "@type": "ContactPoint",
      url: "https://t.me/planery_studio",
      contactType: "Customer Service",
      availableLanguage: ["Russian"],
    },
    sameAs: [
      "https://www.instagram.com/planerystudio/",
      "https://t.me/planery_studio",
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Набор продуктивности Notion",
    description:
      "Полный набор Notion-шаблонов для управления задачами, проектами, привычками и заметками",
    brand: {
      "@type": "Brand",
      name: "Planery Studio",
    },
    offers: {
      "@type": "Offer",
      price: "4990",
      priceCurrency: "KZT",
      availability: "https://schema.org/InStock",
      url: "https://planery.studio/#pricing",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Как установить шаблон в Notion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "После оплаты вы получите на email ссылку на дублирование шаблона. Просто нажмите на ссылку, и шаблон автоматически скопируется в ваш Notion. Весь процесс занимает меньше минуты!",
        },
      },
      {
        "@type": "Question",
        name: "Нужна ли подписка Notion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Базовая версия Notion (бесплатная) полностью подходит для использования наших шаблонов. Платная подписка Notion не требуется.",
        },
      },
      {
        "@type": "Question",
        name: "Получу ли я обновления шаблонов?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да! Все обновления шаблонов бесплатны и навсегда. Когда мы добавим новые функции или улучшим дизайн, вы получите уведомление на email.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
