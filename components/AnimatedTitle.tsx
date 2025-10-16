"use client";
import { motion } from "framer-motion";

export default function AnimatedTitle() {
  const text = "Каталог шаблонов Notion";

  return (
    <div className="relative inline-block">
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {text}
      </motion.h1>

      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 blur-2xl -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
