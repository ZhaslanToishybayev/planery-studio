"use client";
import AngledStack from "@/components/AngledStack";
import PricingCard from "@/components/PricingCard";
import CheckoutModal from "@/components/CheckoutModal";
import TestimonialCard from "@/components/TestimonialCard";
import TrustBadges from "@/components/TrustBadges";
import SocialProof from "@/components/SocialProof";
import Header from "@/components/Header";
import HeroBadges from "@/components/HeroBadges";
import ProductFeatures from "@/components/ProductFeatures";
import FAQAccordion from "@/components/FAQAccordion";
import Footer from "@/components/Footer";
import FloatingElement from "@/components/FloatingElement";
import ScrollProgress from "@/components/ScrollProgress";

import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ComparisonTable from "@/components/ComparisonTable";
import StickyCTA from "@/components/StickyCTA";
import CountdownTimer from "@/components/CountdownTimer";
import ProductGallery from "@/components/ProductGallery";
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

  const handleBuyClick = (title: string, price: string) => {
    setSelectedProduct({ title, price });
    setIsCheckoutOpen(true);
  };

  const handleQuizComplete = (recommendation: string) => {
    setIsQuizOpen(false);
    
    // Scroll to pricing и выделяем рекомендованный план
    setTimeout(() => {
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
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
          {/* Decorative Elements */}
          <DecorativeBlob color="brand" size="xl" position="top-right" opacity={15} />
          <DecorativeBlob color="purple" size="lg" position="bottom-left" opacity={10} animated={false} />
          
          <div className="container-1200 py-10 md:py-14 lg:py-20 grid lg:grid-cols-2 gap-8 items-center relative z-10">
            <AnimatedSection animation="fadeLeft">
              <div className="mb-6 flex flex-wrap gap-3">
                <HeroBadges />
              </div>
              <h1 className="display-lg mb-4">
                Перестаньте тратить время на настройку.{" "}
                <span className="gradient-text-hero">Начните за 5 минут</span>
              </h1>
              <p className="body-lg text-gray-600 mb-8">
                Эстетичные <strong>Notion</strong>-шаблоны с готовыми дашбордами. Планируйте задачи, трекеры, цели и учёбу — всё в одном месте.{" "}
                <span className="text-accent">Более 500 пользователей</span> уже повысили свою продуктивность.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="#pricing" className="btn text-lg px-8 h-14">Смотреть планеры</a>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <SocialProof />
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeRight" delay={0.2}>
              <div className="relative">
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

      {/* Productivity Section */}
      <section id="productivity" className="border-t border-gray-100">
        <div className="container-1200 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 lg:order-1">
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
              Оплатить <span className="font-bold">4 990₸</span> <span className="line-through text-gray-400 ml-2">10 000₸</span>
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
              Оплатить <span className="font-bold">3 490₸</span> <span className="line-through text-gray-400 ml-2">7 000₸</span>
            </button>
          </div>
          <div className="relative">
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
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <div className="text-center mt-12">
              <a href="#pricing" className="btn-success text-lg px-8 h-14">
                Смотреть планеры
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative border-t border-gray-100 bg-gradient-to-b from-white via-[var(--brand-50)]/30 to-white overflow-hidden">
        <DecorativeBlob color="purple" size="xl" position="top-right" opacity={8} />
        <DecorativeBlob color="pink" size="lg" position="bottom-left" opacity={8} />
        
        <div className="container-1200 py-16 md:py-20 relative z-10">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="display-md mb-4">
                <span className="gradient-text-hero">Наши продукты</span>
              </h2>
              <p className="body-lg text-gray-600">
                Разовый платёж. Пожизненный доступ. Все обновления бесплатно.
              </p>
            </div>
          </AnimatedSection>

          {/* Countdown Timer */}
          <div className="mb-12 max-w-2xl mx-auto">
            <CountdownTimer />
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 px-2 md:px-0">
            <PricingCard
              title="Набор продуктивности"
              price="4 990 ₸"
              originalPrice="10 000 ₸"
              description="Полный набор для управления задачами и проектами"
              features={[
                "База задач с умными фильтрами",
                "Трекер привычек",
                "Система проектов",
                "База заметок и идей",
                "Готовые представления (канбан, календарь)",
                "Пожизненные обновления",
              ]}
              onBuyClick={() => handleBuyClick("Набор продуктивности", "4 990 ₸")}
              buttonText="Оплатить"
            />

            <PricingCard
              title="Полный набор"
              price="6 990 ₸"
              originalPrice="9 980 ₸"
              description="Все шаблоны со скидкой 30%"
              features={[
                "Всё из набора продуктивности",
                "Дэшборд студента",
                "Расписание занятий",
                "Трекинг дедлайнов",
                "База конспектов",
                "Экономия 2 990 ₸",
                "Приоритетная поддержка",
              ]}
              isPopular={true}
              badge="🔥 Выгоднее на 30%"
              onBuyClick={() => handleBuyClick("Полный набор", "6 990 ₸")}
              buttonText="Оплатить со скидкой"
            />

            <PricingCard
              title="Дэшборд студента"
              price="3 490 ₸"
              originalPrice="7 000 ₸"
              description="Идеально для учёбы в университете или школе"
              features={[
                "Расписание занятий",
                "Календарь дедлайнов",
                "База конспектов по предметам",
                "Трекинг оценок",
                "Учебные цели",
                "Пожизненные обновления",
              ]}
              onBuyClick={() => handleBuyClick("Дэшборд студента", "3 490 ₸")}
              buttonText="Оплатить"
            />
          </div>

          <div className="mb-12">
            <TrustBadges />
          </div>


        </div>
      </section>

      {/* Product Gallery */}
      <section className="border-t border-gray-100">
        <div className="container-1200 py-20">
          <div className="text-center mb-12">
            <h2 className="heading mb-4">Заглянем внутрь</h2>
            <p className="subheading">
              Посмотрите, как выглядят шаблоны изнутри
            </p>
          </div>
          <ProductGallery />
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-gray-100">
        <div className="container-1200 py-20">
          <div className="text-center mb-12">
            <h2 className="heading mb-4">Что говорят пользователи</h2>
            <p className="subheading">
              Более 500 человек уже улучшили свою продуктивность с нашими шаблонами
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
              Присоединяйтесь к 500+ пользователям, которые уже повысили свою продуктивность
            </p>
            <a href="#pricing" className="btn text-lg px-8 h-14 inline-flex items-center gap-2">
              <span>Выбрать планер</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <div className="mt-6 text-sm text-gray-600 flex items-center justify-center gap-6 flex-wrap">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Моментальный доступ
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Пожизненные обновления
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Безопасная оплата
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="border-t border-gray-100">
        <div className="container-1200 py-20">
          <div className="text-center mb-12">
            <h2 className="heading mb-4">Часто задаваемые вопросы</h2>
            <p className="subheading">
              Всё, что нужно знать перед покупкой
            </p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Sticky CTA */}
      <StickyCTA />



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
      </main>
    </>
  );
}
