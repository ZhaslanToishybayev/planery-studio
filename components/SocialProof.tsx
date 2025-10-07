"use client";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: 500, suffix: "+", label: "Довольных клиентов", type: "counter" },
  { value: "4.9", label: "Средний рейтинг", type: "text" },
  { value: 10, suffix: "+", label: "Готовых шаблонов", type: "counter" },
  { value: 300, suffix: "%", label: "Эффективности", type: "counter" },
];

export default function SocialProof() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="text-4xl md:text-5xl font-bold mb-2">
            {stat.type === "counter" ? (
              <AnimatedCounter
                value={stat.value as number}
                suffix={stat.suffix || ""}
                className="gradient-text-hero"
              />
            ) : (
              <span className="gradient-text-hero">{stat.value}</span>
            )}
          </div>
          <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
