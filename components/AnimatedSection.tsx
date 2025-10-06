"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "rotate";
  delay?: number;
  className?: string;
}

export default function AnimatedSection({
  children,
  animation = "fadeUp",
  delay = 0,
  className = "",
}: AnimatedSectionProps) {
  const animations = {
    fadeUp: {
      initial: { opacity: 0, y: 60 },
      whileInView: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      initial: { opacity: 0, x: -60 },
      whileInView: { opacity: 1, x: 0 },
    },
    fadeRight: {
      initial: { opacity: 0, x: 60 },
      whileInView: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      whileInView: { opacity: 1, scale: 1 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      whileInView: { opacity: 1, rotate: 0 },
    },
  };

  return (
    <motion.div
      {...animations[animation]}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
