"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductBreadcrumbsProps {
  productName: string;
}

export default function ProductBreadcrumbs({ productName }: ProductBreadcrumbsProps) {
  return (
    <motion.div
      className="border-b border-gray-100 bg-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container-1200 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[var(--brand)] transition">
            Главная
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/products" className="hover:text-[var(--brand)] transition">
            Продукты
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">{productName}</span>
        </nav>
      </div>
    </motion.div>
  );
}
