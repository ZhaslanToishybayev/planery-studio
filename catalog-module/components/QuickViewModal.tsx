"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../data/products";
import { useState, useEffect } from "react";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onBuyClick: (title: string, price: number) => void;
}

export default function QuickViewModal({ isOpen, onClose, product, onBuyClick }: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when product changes or modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, product?.id]);

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 transition-colors shadow-xl group"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="overflow-y-auto max-h-[90vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8">
                {/* Left: Gallery */}
                <div className="w-full">
                  <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={product.gallery[currentImageIndex] || "/assets/placeholder.png"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/assets/placeholder.png";
                      }}
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isPopular && (
                        <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          🔥 Популярный
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          ⭐ Хит продаж
                        </span>
                      )}
                      {product.discount && (
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    {/* Navigation Arrows */}
                    {product.gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {product.gallery.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {product.gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            currentImageIndex === idx ? "border-purple-600 scale-105" : "border-gray-200 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={img || "/assets/placeholder.png"}
                            alt={`${product.name} ${idx + 1}`}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/assets/placeholder.png";
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2 text-gray-900">
                      {product.name}
                    </h2>
                    <p className="text-purple-600 font-semibold mb-4">
                      {product.tagline}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold text-sm">{product.rating}</span>
                        <span className="text-gray-500 text-xs">({product.reviewCount} отзывов)</span>
                      </div>
                      {product.isPopular && (
                        <span className="text-sm text-gray-600">🔥 Популярный выбор</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-3">Основные возможности:</h3>
                      <div className="space-y-3">
                        {product.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                            <div>
                              <p className="font-semibold text-sm text-gray-900 mb-1">{feature.title}</p>
                              <p className="text-xs text-gray-600 line-clamp-2">{feature.description}</p>
                            </div>
                          </div>
                        ))}
                        {product.features.length > 4 && (
                          <p className="text-xs text-purple-600 font-medium">
                            + ещё {product.features.length - 4} возможностей
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.tags.slice(0, 5).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="border-t pt-6 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {product.originalPrice && (
                          <div className="text-gray-400 line-through text-sm">
                            {product.originalPrice}₸
                          </div>
                        )}
                        <div className="text-4xl font-bold text-purple-600">
                          {product.price}₸
                        </div>
                      </div>
                      {product.discount && (
                        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold">
                          Скидка {product.discount}%
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center"
                        onClick={onClose}
                      >
                        Полное описание
                      </Link>
                      <button
                        onClick={() => {
                          onBuyClick(product.name, product.price);
                          onClose();
                        }}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
                      >
                        Купить сейчас
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
