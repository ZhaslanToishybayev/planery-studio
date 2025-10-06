import "./../styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://planery.studio"),
  title: {
    default: "Planery Studio — Цифровые планеры для Notion | Готовые шаблоны",
    template: "%s | Planery Studio",
  },
  description:
    "Эстетичные Notion-шаблоны для продуктивности и учёбы. ✅ Более 500 пользователей ✅ Пожизненный доступ ✅ Гарантия возврата 30 дней. Начните организовывать жизнь за 5 минут!",
  keywords: [
    "notion шаблоны",
    "планер notion",
    "notion templates",
    "цифровой планер",
    "продуктивность",
    "notion для студентов",
    "организация задач",
    "трекер привычек",
    "планирование",
    "notion на русском",
  ],
  authors: [{ name: "Planery Studio" }],
  creator: "Planery Studio",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://planery.studio",
    title: "Planery Studio — Цифровые планеры для Notion",
    description:
      "Эстетичные Notion-шаблоны для продуктивности и учёбы. Более 500 пользователей уже повысили свою продуктивность.",
    siteName: "Planery Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Planery Studio — Цифровые планеры для Notion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planery Studio — Цифровые планеры для Notion",
    description:
      "Эстетичные Notion-шаблоны для продуктивности и учёбы. Начните за 5 минут!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

import StructuredData from "@/components/StructuredData";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <StructuredData />
      </head>
      <body className={inter.className + " min-h-screen antialiased"}>{children}</body>
    </html>
  );
}
