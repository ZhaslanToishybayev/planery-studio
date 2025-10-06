"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
  icon?: string;
}

const faqData: FAQItem[] = [
  {
    question: "Как установить шаблон в Notion?",
    answer: "После оплаты вы получите на email ссылку на дублирование шаблона. Просто нажмите на ссылку, и шаблон автоматически скопируется в ваш Notion. Весь процесс занимает меньше минуты!",
    icon: "📥",
  },
  {
    question: "Можно ли кастомизировать шаблоны под себя?",
    answer: "Да, абсолютно! После дублирования шаблон полностью ваш. Вы можете менять цвета, добавлять/удалять разделы, настраивать поля и представления как угодно. Это ваш персональный планер.",
    icon: "🎨",
  },
  {
    question: "Нужна ли подписка Notion?",
    answer: "Базовая версия Notion (бесплатная) полностью подходит для использования наших шаблонов. Платная подписка Notion не требуется, хотя она открывает дополнительные возможности.",
    icon: "💰",
  },
  {
    question: "Получу ли я обновления шаблонов?",
    answer: "Да! Все обновления шаблонов бесплатны и навсегда. Когда мы добавим новые функции или улучшим дизайн, вы получите уведомление на email с ссылкой на обновлённую версию.",
    icon: "🔄",
  },
  {
    question: "Как происходит возврат средств?",
    answer: "У вас есть 30 дней на тест шаблонов. Если они вам не подойдут, просто напишите на support@planery.studio, и мы вернём деньги в течение 3 рабочих дней. Никаких вопросов и бумажной волокиты.",
    icon: "✅",
  },
  {
    question: "Поддержка русского языка?",
    answer: "Да, все шаблоны полностью на русском языке. Все названия, инструкции, примеры — всё адаптировано под русскоязычную аудиторию.",
    icon: "🇷🇺",
  },
  {
    question: "На каких устройствах работает?",
    answer: "Notion работает везде: компьютер (Windows/Mac/Linux), браузер, iPhone, iPad, Android. Все ваши данные синхронизируются автоматически между устройствами.",
    icon: "📱",
  },
  {
    question: "Есть ли поддержка?",
    answer: "Конечно! Если возникнут вопросы по настройке или использованию шаблонов, пишите на support@planery.studio или в Telegram. Обычно отвечаем в течение 24 часов.",
    icon: "💬",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqData.map((item, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[var(--brand)]/30 transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50 transition"
          >
            <div className="flex items-start gap-3 flex-1">
              {item.icon && <span className="text-2xl">{item.icon}</span>}
              <span className="font-semibold text-gray-900 pt-1">
                {item.question}
              </span>
            </div>
            <motion.svg
              className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1 ml-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-5 pt-0 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
