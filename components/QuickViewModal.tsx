"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onBuyClick: (product: Product) => void;
}

export default function QuickViewModal({
  isOpen,
  onClose,
  product,
  onBuyClick,
}: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentImageIndex(0);
      setIsProcessing(false);
    }
  }, [isOpen, product?.id]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!product) return null;

  const priceLabel = `${product.price.toLocaleString("ru-RU")}₸`;
  const originalPriceLabel = product.originalPrice
    ? `${product.originalPrice.toLocaleString("ru-RU")}₸`
    : null;

  const gallery = product.gallery.length > 0 ? product.gallery : ["/assets/placeholder.png"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 transition-colors shadow-xl group"
                aria-label="Закрыть"
              >
                <svg
                  className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="overflow-y-auto max-h-[90vh]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8">
                    <div className="w-full">
                      <div className="relative bg-white border border-purple-100 rounded-2xl mb-4 p-6 sm:p-8 overflow-hidden">
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                          {product.isPopular && (
                            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                              🔥 Популярный
                            </span>
                          )}
                          {product.isBestSeller && (
                            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                              ⭐ Хит продаж
                            </span>
                          )}
                          {product.discount && (
                            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              <span>🎯</span>
                              <span>-{product.discount}%</span>
                            </span>
                          )}
                        </div>

                      <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[5/6] lg:aspect-[3/4]">
                        <Image
                          src={gallery[currentImageIndex]}
                          alt={product.name}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 560px"
                        />
                      </div>

                      {gallery.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-20"
                            aria-label="Предыдущее фото"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-20"
                            aria-label="Следующее фото"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>

                    {gallery.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {gallery.map((img, idx) => (
                          <button
                            key={`${img}-${idx}`}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              currentImageIndex === idx
                                ? "border-purple-600 scale-105"
                                : "border-gray-200 opacity-60 hover:opacity-100"
                            }`}
                            aria-label={`Показать изображение ${idx + 1}`}
                          >
                            <Image
                              src={img}
                              alt={`${product.name} ${idx + 1}`}
                              width={80}
                              height={80}
                              className="object-contain w-full h-full bg-white"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h2>
                      <p className="text-purple-600 font-semibold mb-4">{product.tagline}</p>

                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-semibold text-sm">{product.rating}</span>
                          <span className="text-gray-500 text-xs">
                            ({product.reviewCount} отзывов)
                          </span>
                        </div>
                        {product.isPopular && (
                          <span className="text-sm text-gray-600">🔥 Популярный выбор</span>
                        )}
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed">{product.shortDescription}</p>

                      <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">Основные возможности:</h3>
                        <div className="space-y-3">
                          {product.features.slice(0, 4).map((feature, idx) => (
                            <div key={`${feature.title}-${idx}`} className="flex items-start gap-3">
                              <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                              <div>
                                <p className="font-semibold text-sm text-gray-900 mb-1">
                                  {feature.title}
                                </p>
                                <p className="text-xs text-gray-600 line-clamp-2">
                                  {feature.description}
                                </p>
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

                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          {originalPriceLabel && (
                            <div className="text-gray-400 line-through text-sm">
                              {originalPriceLabel}
                            </div>
                          )}
                          <div className="text-4xl font-bold text-purple-600">{priceLabel}</div>
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
                            setIsProcessing(true);
                            onBuyClick(product);
                            onClose();
                          }}
                          disabled={isProcessing}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                          aria-live="polite"
                        >
                          {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Открываем оплату...
                            </span>
                          ) : (
                            "Купить сейчас"
                          )}
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
