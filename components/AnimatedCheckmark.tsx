"use client";
import { motion } from "framer-motion";

interface AnimatedCheckmarkProps {
  size?: number;
  color?: string;
  delay?: number;
}

export default function AnimatedCheckmark({
  size = 24,
  color = "var(--success)",
  delay = 0,
}: AnimatedCheckmarkProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ color }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      <motion.path
        d="M5 13l4 4L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      />
    </motion.svg>
  );
}
