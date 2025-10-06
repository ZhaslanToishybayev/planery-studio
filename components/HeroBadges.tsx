"use client";
import { motion } from "framer-motion";

const badges = [
  { text: "Для Notion", icon: "📓" },
  { text: "На русском", icon: "🇷🇺" },
  { text: "Пожизненный доступ", icon: "♾️" },
  { text: "500+ пользователей", icon: "⭐" },
];

export default function HeroBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <span>{badge.icon}</span>
          <span>{badge.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
