"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    value: string;
    icon: string;
    description?: string;
  }[];
}

interface ProductQuizProps {
  onComplete: (recommendation: string) => void;
  onClose: () => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Вы студент или работаете?",
    options: [
      { 
        label: "Студент", 
        value: "student", 
        icon: "🎓",
        description: "Учусь в университете или школе"
      },
      { 
        label: "Работаю", 
        value: "professional", 
        icon: "💼",
        description: "Работаю или фрилансер"
      },
      { 
        label: "И то, и то", 
        value: "both", 
        icon: "🚀",
        description: "Совмещаю работу и учёбу"
      },
    ],
  },
  {
    id: 2,
    question: "Что для вас важнее всего?",
    options: [
      { 
        label: "Задачи и проекты", 
        value: "tasks", 
        icon: "✅",
        description: "Управление задачами, проекты, цели"
      },
      { 
        label: "Учеба и расписание", 
        value: "study", 
        icon: "📚",
        description: "Расписание занятий, дедлайны, конспекты"
      },
      { 
        label: "Всё вместе", 
        value: "all", 
        icon: "🎯",
        description: "Комплексная система для всего"
      },
    ],
  },
  {
    id: 3,
    question: "Сколько готовы инвестировать?",
    options: [
      { 
        label: "Минимум", 
        value: "min", 
        icon: "💰",
        description: "Только самое необходимое"
      },
      { 
        label: "Оптимально", 
        value: "optimal", 
        icon: "💎",
        description: "Лучшее соотношение цена/качество"
      },
      { 
        label: "Всё и сразу", 
        value: "max", 
        icon: "🔥",
        description: "Полный набор со скидкой"
      },
    ],
  },
];

export default function ProductQuiz({ onComplete, onClose }: ProductQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const calculateRecommendation = (finalAnswers: Record<number, string>) => {
    const answer1 = finalAnswers[0];
    const answer2 = finalAnswers[1];
    const answer3 = finalAnswers[2];

    // Логика рекомендации
    if (answer3 === "max" || answer2 === "all") {
      return "bundle"; // Полный набор
    } else if (answer1 === "student" || answer2 === "study") {
      return "student"; // Дэшборд студента
    } else {
      return "productivity"; // Набор продуктивности
    }
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const recommendation = calculateRecommendation(newAnswers);
      onComplete(recommendation);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Подберём идеальный план
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--gradient-hero)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Вопрос {currentQuestion + 1} из {questions.length}
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-8 text-center text-gray-900">
                {questions[currentQuestion].question}
              </h3>

              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="group relative p-6 rounded-xl border-2 border-gray-200 hover:border-[var(--brand)] bg-white hover:bg-gradient-to-r hover:from-[var(--brand-50)] hover:to-transparent transition-all duration-300 text-left"
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl md:text-5xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-lg md:text-xl font-semibold mb-1 text-gray-900 group-hover:text-[var(--brand)] transition">
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-sm text-gray-600">
                            {option.description}
                          </div>
                        )}
                      </div>
                      <svg 
                        className="w-6 h-6 text-gray-300 group-hover:text-[var(--brand)] transition flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 p-6 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад
            </button>
            
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Пропустить викторину
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
