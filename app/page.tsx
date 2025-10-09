"use client";
import AngledStack from "@/components/AngledStack";
import CheckoutModal from "@/components/CheckoutModal";
import TestimonialCard from "@/components/TestimonialCard";
import SocialProof from "@/components/SocialProof";
import Header from "@/components/Header";
import HeroBadges from "@/components/HeroBadges";
import ProductFeatures from "@/components/ProductFeatures";
import Footer from "@/components/Footer";
import FloatingElement from "@/components/FloatingElement";
import ScrollProgress from "@/components/ScrollProgress";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CountdownTimer from "@/components/CountdownTimer";
import CookieConsent from "@/components/CookieConsent";
import DecorativeBlob from "@/components/DecorativeBlob";
import AnimatedSection from "@/components/AnimatedSection";
import ProductQuiz from "@/components/ProductQuiz";
import { useState } from "react";

export default function Page() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    title: "",
    price: "",
  });
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBuyClick = (title: string, price: string) => {
    setSelectedProduct({ title, price });
    setIsCheckoutOpen(true);
  };

  const handleImageClick = (images: string[]) => {
    setGalleryImages(images);
    setCurrentImageIndex(0);
    setIsGalleryOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleQuizComplete = (recommendation: string) => {
    setIsQuizOpen(false);
    setTimeout(() => {
      const section = document.getElementById("productivity");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const productivityFeatures = [
    {
      title: "База задач",
      description: "Умная система задач с фильтрами, тегами и приоритетами",
      icon: "✅"
    },
    {
      title: "Трекер привычек",
      description: "Визуализация прогресса с календарём и статистикой",
      icon: "📊"
    },
    {
      title: "Проекты",
      description: "Организация больших целей с подзадачами и дедлайнами",
      icon: "🎯"
    },
    {
      title: "База заметок",
      description: "Структурированное хранилище идей и конспектов",
      icon: "📝"
    },
    {
      title: "Дашборд обзора",
      description: "Все важное на одном экране: задачи, цели, привычки",
      icon: "🖥️"
    },
  ];

  const studentFeatures = [
    {
      title: "Расписание",
      description: "Автоматический календарь занятий на семестр",
      icon: "📅"
    },
    {
      title: "Дедлайны",
      description: "Трекинг всех заданий с уведомлениями",
      icon: "⏰"
    },
    {
      title: "База конспектов",
      description: "Структурированные заметки по всем предметам",
      icon: "📚"
    },
    {
      title: "Оценки",
      description: "Отслеживание успеваемости и среднего балла",
      icon: "⭐"
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative border-t border-gray-100 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
          <DecorativeBlob color="brand" size="xl" position="top-right" opacity={15} />
          <DecorativeBlob color="purple" size="lg" position="bottom-left" opacity={10} animated={false} />
          
          <div className="container-1200 py-10 md:py-14 lg:py-20 grid lg:grid-cols-2 gap-8 items-center relative z-10">
            <AnimatedSection animation="fadeLeft">
              <div className="mb-6 flex flex-wrap gap-3">
                <HeroBadges />
              </div>
              <h1 className="display-lg mb-4" style={{ fontWeight: 900 }}>
                Планеры для <span className="gradient-text-hero" style={{ fontWeight: 900 }}>Жизни и учебы</span>
              </h1>
              <p className="body-lg text-gray-600 mb-8">
                Эстетичные шаблоны Notion для учёбы, работы и жизни
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="#productivity" className="btn text-lg px-8 h-14">Смотреть планеры</a>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <SocialProof />
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeRight" delay={0.2}>
              <div 
                className="relative cursor-pointer" 
                onClick={() => handleImageClick([
                  "/assets/middle(productivity).png",
                  "/assets/head(productivity).png",
                  "/assets/under(productivity).png",
                  "/assets/middle(student).png",
                  "/assets/header(student).png",
                  "/assets/under(student).png",
                ])}
              >
                <FloatingElement delay={0} duration={4}>
                  <AngledStack
                    images={[
                      "/assets/middle(productivity).png",
                      "/assets/head(productivity).png",
                      "/assets/under(productivity).png",
                    ]}
                    angles={[14, 3, -15]}
                    scales={[1.08, 1.0, 1.08]}
                    aspect="1410/768"
                  />
                </FloatingElement>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Countdown Timer */}
        <section className="relative border-t border-gray-100 bg-white">
          <div className="container-1200 py-12">
            <div className="max-w-2xl mx-auto">
              <CountdownTimer />
            </div>
          </div>
        </section>

        {/* Productivity Section */}
        <section id="productivity" className="border-t border-gray-100">
          <div className="container-1200 py-16 grid lg:grid-cols-2 gap-10 items-center">
            <div 
              className="relative order-2 lg:order-1 cursor-pointer"
              onClick={() => handleImageClick([
                "/assets/middle(productivity).png",
                "/assets/head(productivity).png",
                "/assets/under(productivity).png",
              ])}
            >
              <AngledStack
                images={[
                  "/assets/middle(productivity).png",
                  "/assets/head(productivity).png",
                  "/assets/under(productivity).png",
                ]}
                angles={[14, 3, -15]}
                scales={[1.08, 1.0, 1.08]}
                aspect="1410/768"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="heading mb-4">Набор продуктивности</h2>
              <p className="subheading mb-6">
                Задачи, привычки, проекты и заметки — с умными связями и видами.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>База задач с умными фильтрами</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Трекер привычек с визуализацией</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Система проектов и заметок</span>
                </li>
              </ul>
              <div className="mb-6">
                <ProductFeatures features={productivityFeatures} title="Что включено" />
              </div>
              <button 
                onClick={() => handleBuyClick("Набор продуктивности", "4 990 ₸")}
                className="btn"
              >
                Оплатить <span className="font-bold ml-1">4 990₸</span> <span className="line-through text-gray-400 ml-2">10 000₸</span>
              </button>
            </div>
          </div>
        </section>

        {/* Student Section */}
        <section id="student" className="border-t border-gray-100">
          <div className="container-1200 py-16 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="heading mb-4">Дэшборд студента</h2>
              <p className="subheading mb-6">
                Расписание, дедлайны, конспекты и прогресс по предметам.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Расписание занятий</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Трекинг дедлайнов</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>База конспектов по предметам</span>
                </li>
              </ul>
              <div className="mb-6">
                <ProductFeatures features={studentFeatures} title="Что включено" />
              </div>
              <button 
                onClick={() => handleBuyClick("Дэшборд студента", "3 490 ₸")}
                className="btn"
              >
                Оплатить <span className="font-bold ml-1">3 490₸</span> <span className="line-through text-gray-400 ml-2">7 000₸</span>
              </button>
            </div>
            <div 
              className="relative cursor-pointer"
              onClick={() => handleImageClick([
                "/assets/middle(student).png",
                "/assets/header(student).png",
                "/assets/under(student).png",
              ])}
            >
              <AngledStack
                images={[
                  "/assets/middle(student).png",
                  "/assets/header(student).png",
                  "/assets/under(student).png",
                ]}
                angles={[14, 3, -15]}
                scales={[1.08, 1.0, 1.08]}
                aspect="1410/768"
              />
            </div>
          </div>
        </section>

        {/* Before/After Comparison */}
        <section className="relative border-t border-gray-100 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
          <DecorativeBlob color="green" size="md" position="top-left" opacity={12} />
          <div className="container-1200 py-20 relative z-10">
            <AnimatedSection animation="fadeUp">
              <div className="text-center mb-12">
                <h2 className="display-md mb-4">
                  Жизнь <span className="gradient-text">до</span> и <span className="gradient-text-accent">после</span> Planery
                </h2>
                <p className="body-lg text-gray-600">
                  Перетяните слайдер, чтобы увидеть разницу
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={0.2}>
              <div className="max-w-4xl mx-auto">
                <BeforeAfterSlider />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-gray-100">
          <div className="container-1200 py-20">
            <div className="text-center mb-12">
              <h2 className="heading mb-4">Что говорят пользователи</h2>
              <p className="subheading">
                Мы помогли 500+ людям повысить продуктивность
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard
                name="Алина Касымова"
                role="Студентка, 3 курс"
                avatar="АК"
                rating={5}
                text="Раньше у меня были дедлайны везде: в блокноте, телефоне, стикерах. Теперь всё в одном месте. За семестр ни разу не пропустила задание!"
              />
              <TestimonialCard
                name="Данияр Нурланов"
                role="Фрилансер-дизайнер"
                avatar="ДН"
                rating={5}
                text="Перепробовал кучу систем. Planery — единственное, что не забросил. Простой, но мощный. Все проекты под контролем, клиенты довольны."
              />
              <TestimonialCard
                name="Айгерим Сарсенова"
                role="Менеджер проектов"
                avatar="АС"
                rating={5}
                text="Купила набор продуктивности и влюбилась в трекер привычек. За 2 месяца внедрила утреннюю зарядку и чтение. Визуализация прогресса реально мотивирует!"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative border-t border-gray-100 bg-gradient-to-br from-[var(--brand-50)] via-[var(--accent-purple)]/5 to-[var(--accent-pink)]/5 overflow-hidden">
          <DecorativeBlob color="brand" size="xl" position="center" opacity={10} animated />
          
          <div className="container-1200 py-20 text-center relative z-10">
            <AnimatedSection animation="scale">
              <h3 className="display-md mb-4">
                Начните организовывать <span className="gradient-text-animated">жизнь сегодня</span>
              </h3>
              <p className="body-lg text-gray-600 mb-8">
                Мы помогли 500+ людям повысить продуктивность
              </p>
              <a href="#productivity" className="btn text-lg px-8 h-14 inline-flex items-center gap-2">
                <span>Выбрать планер</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </AnimatedSection>
          </div>
        </section>

        {/* Tech Support Section */}
        <section id="support" className="border-t border-gray-100">
          <div className="container-1200 py-20">
            <div className="text-center mb-12">
              <h2 className="heading mb-4">Отдел тех поддержки</h2>
              <p className="subheading">
                Остались вопросы? Мы всегда на связи
              </p>
            </div>
            
            <div className="max-w-md mx-auto text-center">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Свяжитесь с нами в Telegram</h3>
                <p className="text-gray-600 mb-6">
                  Ответим на все вопросы и поможем с настройкой шаблонов
                </p>
                <a 
                  href="https://t.me/planery_studio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  Получить помощь
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Cookie Consent */}
        <CookieConsent />

        {/* Product Quiz */}
        {isQuizOpen && (
          <ProductQuiz
            onComplete={handleQuizComplete}
            onClose={() => setIsQuizOpen(false)}
          />
        )}

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          productTitle={selectedProduct.title}
          productPrice={selectedProduct.price}
        />

        {/* Image Gallery Modal */}
        {isGalleryOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4" 
            onClick={() => setIsGalleryOpen(false)}
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Counter */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>

              {/* Previous button */}
              {galleryImages.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Image */}
              <div className="relative">
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`Screenshot ${currentImageIndex + 1}`}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>

              {/* Next button */}
              {galleryImages.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Dots navigation */}
              {galleryImages.length > 1 && (
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
