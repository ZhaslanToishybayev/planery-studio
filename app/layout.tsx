import "./../styles/globals.css";
import { Nunito_Sans } from "next/font/google";
import type { Metadata } from "next";

const nunitoSans = Nunito_Sans({ 
  subsets: ["latin", "cyrillic"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: "swap" 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://planery.studio"),
  title: {
    default: "Planery Studio — Цифровые планеры для Notion | Готовые шаблоны",
    template: "%s | Planery Studio",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/assets/planery-logo.png',
  },
  description:
    "Эстетичные Notion-шаблоны для продуктивности и учёбы. ✅ Более 500 покупателей ✅ Пожизненный доступ ✅ Для Notion. Начните организовывать жизнь за 5 минут!",
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
      <body className={nunitoSans.className + " min-h-screen antialiased"}>{children}</body>
    </html>
  );
}
