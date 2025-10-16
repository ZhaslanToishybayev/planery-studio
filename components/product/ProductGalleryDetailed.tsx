"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryDetailedProps {
  gallery: string[];
  productName: string;
}

export default function ProductGalleryDetailed({
  gallery,
  productName,
}: ProductGalleryDetailedProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <section className="border-t border-gray-100 bg-white">
        <div className="container-1200 py-20">
          <div className="text-center mb-12">
            <h2 className="heading mb-4">Галерея скриншотов</h2>
            <p className="subheading">
              Подробный обзор всех экранов шаблона
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image, index) => (
              <motion.div
                key={index}
                className="relative cursor-pointer group"
                onClick={() => setSelectedImage(index)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative rounded-[32px] bg-gradient-to-br from-[#7f5af0] via-[#ff8ba7] to-[#ffd803] p-4 sm:p-6 shadow-[0_30px_60px_-40px_rgba(127,90,240,0.6)] overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_70%)]" />
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(140deg,rgba(255,255,255,0.4)_0%,transparent_45%,transparent_55%,rgba(255,255,255,0.4)_100%)]" />

                  <div className="relative rounded-[24px] border border-white/30 bg-white/10 backdrop-blur-sm overflow-hidden">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={image || "/assets/catalog/client-portal.png"}
                        alt={`${productName} — скриншот ${index + 1}`}
                        fill
                        className="object-contain scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/15" />
                    <div className="absolute inset-0 border border-white/10 rounded-[24px] pointer-events-none" />
                  </div>

                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center font-bold text-sm z-10">
                    {index + 1}
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 rounded-[32px] bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[70]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <motion.div
                className="relative max-w-6xl w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Image */}
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-2xl">
                  <div className="relative aspect-[4/5] bg-white">
                    <Image
                      src={gallery[selectedImage] || "/assets/catalog/client-portal.png"}
                      alt={`${productName} — крупный план ${selectedImage + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-lg font-semibold text-gray-900">
                      {productName} - Экран {selectedImage + 1}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) =>
                        prev! > 0 ? prev! - 1 : gallery.length - 1
                      );
                    }}
                    className="text-white hover:text-gray-300 transition p-2 hover:bg-white/10 rounded-full"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div className="text-white text-sm">
                    {selectedImage + 1} / {gallery.length}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) =>
                        prev! < gallery.length - 1 ? prev! + 1 : 0
                      );
                    }}
                    className="text-white hover:text-gray-300 transition p-2 hover:bg-white/10 rounded-full"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
