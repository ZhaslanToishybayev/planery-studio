"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface GalleryImage {
  src: string;
  title: string;
  description: string;
}

const images: GalleryImage[] = [
  {
    src: "/assets/head(productivity).png",
    title: "Дашборд продуктивности",
    description: "Все важное на одном экране: задачи, привычки, проекты",
  },
  {
    src: "/assets/middle(productivity).png",
    title: "База задач и проектов",
    description: "Умные фильтры, теги, приоритеты и дедлайны",
  },
  {
    src: "/assets/header(student).png",
    title: "Студенческий планер",
    description: "Расписание, дедлайны, конспекты и оценки",
  },
  {
    src: "/assets/middle(student).png",
    title: "База конспектов",
    description: "Структурированные заметки по всем предметам",
  },
];

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border-2 border-gray-200"
            onClick={() => setSelectedImage(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="font-semibold text-sm">{image.title}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[70]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <motion.div
                className="relative max-w-4xl w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="relative aspect-video bg-gray-900">
                    <Image
                      src={images[selectedImage].src}
                      alt={images[selectedImage].title}
                      fill
                      className="object-contain"
                      sizes="90vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      {images[selectedImage].title}
                    </h3>
                    <p className="text-gray-600">
                      {images[selectedImage].description}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) =>
                        prev! > 0 ? prev! - 1 : images.length - 1
                      );
                    }}
                    className="text-white hover:text-gray-300 transition p-2"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="text-white text-sm">
                    {selectedImage + 1} / {images.length}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) =>
                        prev! < images.length - 1 ? prev! + 1 : 0
                      );
                    }}
                    className="text-white hover:text-gray-300 transition p-2"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
