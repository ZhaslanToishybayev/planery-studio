"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { allProducts } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const HERO_POINTS = [
  "Моментальный доступ и пошаговые инструкции по внедрению шаблонов.",
  "Пожизненные обновления и поддержка: дорабатываем продукты по обратной связи.",
  "Экосистема: шаблоны легко объединяются в единую рабочую среду.",
];

const HERO_STATS = [
  { label: "Для Notion", value: "✓" },
  { label: "500+ покупателей", value: "✓" },
  { label: "4.9★ рейтинг", value: "✓" },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const tagLabels: Record<string, string> = useMemo(
    () => ({
      productivity: "Продуктивность",
      tasks: "Задачи",
      habits: "Привычки",
      projects: "Проекты",
      notes: "Заметки",
      student: "Учёба",
      education: "Образование",
      school: "Школа",
      study: "Подготовка",
      bundle: "Комплект",
      freelance: "Фриланс",
      clients: "Клиенты",
      business: "Бизнес",
      finance: "Финансы",
      fitness: "Фитнес",
      workout: "Тренировки",
      health: "Здоровье",
      sport: "Спорт",
      muslim: "Баланс",
      spiritual: "Духовное",
      content: "Контент",
      para: "PARA",
      missions: "Миссии",
      consulting: "Консалтинг",
    }),
    []
  );

  const availableTags = useMemo(() => {
    const uniqueTags = new Set<string>();
    allProducts.forEach((product) => {
      product.tags.forEach((tag) => uniqueTags.add(tag));
    });
    return Array.from(uniqueTags).sort((a, b) => a.localeCompare(b, "ru"));
  }, []);

  const tagOptions = useMemo(
    () => ["all", ...availableTags.slice(0, 10)],
    [availableTags]
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = (value: string) => value.toLowerCase().includes(query);

    const items = allProducts.filter((product) => {
      const matchByTag = activeTag === "all" || product.tags.includes(activeTag);
      if (!matchByTag) return false;

      if (!query) return true;

      return (
        matchesSearch(product.name) ||
        matchesSearch(product.tagline) ||
        matchesSearch(product.shortDescription) ||
        product.tags.some((tag) => matchesSearch(tag))
      );
    });

    return [...items].sort((a, b) => {
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      if ((b.reviewCount || 0) !== (a.reviewCount || 0)) {
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      }
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [activeTag, searchQuery]);

  const heroProduct = useMemo(
    () => allProducts.find((product) => product.isBestSeller) ?? allProducts[0],
    []
  );

  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        <section className="bg-gradient-to-b from-gray-50 via-white to-white border-b border-gray-100">
          <div className="container-1200 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-14"
            >
              <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
                {heroProduct && (
                  <div className="relative isolate">
                    <div className="absolute -top-10 -left-12 hidden xl:block">
                      <div className="relative h-36 w-28 rounded-3xl overflow-hidden border border-white/50 shadow-2xl bg-white/40 backdrop-blur">
                        <Image
                          src={heroProduct.gallery[0] || "/assets/catalog/client-portal.png"}
                          alt={`${heroProduct.name} — мини-превью`}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </div>
                    </div>

                    <div className="relative rounded-[44px] bg-gradient-to-br from-[#7f5af0] via-[#ff8ba7] to-[#ffd803] p-6 sm:p-10 shadow-[0_45px_70px_-40px_rgba(127,90,240,0.65)] overflow-hidden">
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_65%)]" />
                      <div className="relative rounded-[32px] border border-white/30 bg-white/10 backdrop-blur-sm overflow-hidden">
                        <div className="relative aspect-[4/5] lg:aspect-[3/4]">
                          <Image
                            src={heroProduct.gallery[0] || "/assets/catalog/client-portal.png"}
                            alt={`Скриншот шаблона ${heroProduct.name}`}
                            fill
                            priority
                            className="object-contain scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 640px"
                          />
                        </div>
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/15" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-left">
                  <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 text-purple-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
                    Notion Templates
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                    Наши продукты <span className="text-[var(--brand)]">Planery</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
                    Премиальные шаблоны для продуктивности, учёбы и бизнеса на Notion. Заберите
                    весь стек инструментов или выбирайте точечно — всё адаптировано под ваши задачи.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    {heroProduct?.isBestSeller && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold shadow-lg">
                        ⭐ Хит продаж
                      </span>
                    )}
                    {heroProduct?.isPopular && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[var(--brand)] to-blue-500 text-white text-sm font-semibold shadow-lg">
                        🔥 Популярный выбор
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm">
                      <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0л4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      500+ клиентов
                    </span>
                  </div>

                  <div className="grid gap-4 text-sm text-gray-600 mb-10">
                    {HERO_POINTS.map((point, index) => (
                      <div key={point} className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <p className="leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {heroProduct && (
                      <Link
                        href={`/products/${heroProduct.slug}`}
                        className="btn text-base h-12 px-8 shadow-lg hover:shadow-xl transition"
                      >
                        Перейти к {heroProduct.name}
                      </Link>
                    )}
                    <Link
                      href="#catalog"
                      className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-gray-300 font-semibold text-gray-700 hover:border-[var(--brand)] hover:text-[var(--brand)] transition"
                    >
                      Смотреть каталог
                    </Link>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative max-w-3xl">
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Поиск по названию, описанию и тегам..."
                    className="w-full rounded-3xl border border-gray-200 bg-white px-6 py-4 pr-14 text-lg shadow-sm transition focus:border-[var(--brand)] focus:outline-none focus:shadow-xl"
                    aria-label="Поиск продуктов"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      aria-label="Очистить поиск"
                    >
                      <svg
                        className="w-5 h-5"
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
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {tagOptions.map((tag) => {
                    const isActive = tag === activeTag;
                    const label =
                      tag === "all" ? "Все категории" : tagLabels[tag] ?? `#${tag}`;

                    return (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`rounded-full border px-5 py-2 text-sm font-semibold transition backdrop-blur ${
                          isActive
                            ? "border-[var(--brand)] bg-[var(--brand)] text-white shadow-lg"
                            : "border-gray-200 bg-white/80 text-gray-600 hover:border-[var(--brand)] hover:text-[var(--brand)]"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {HERO_STATS.map((stat) => (
                    <span
                      key={stat.label}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-gray-200 shadow-sm"
                    >
                      <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0л4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {stat.label}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 border border-purple-100 text-purple-600 shadow-sm">
                    Найдено товаров: {filteredProducts.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="catalog" className="py-20">
          <div className="container-1200">
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 p-12 text-center text-gray-600">
                Ничего не найдено. Попробуйте изменить запрос или выбрать другую категорию.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => {
                  const previewImage =
                    product.gallery[0] || "/assets/catalog/client-portal.png";

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Link href={`/products/${product.slug}`} className="block group h-full">
                        <div className="h-full rounded-[28px] border border-gray-100 bg-white/85 backdrop-blur-sm p-4 flex flex-col gap-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.35)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_45px_90px_-60px_rgba(99,102,241,0.45)]">
                          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black shadow-inner">
                            <Image
                              src={previewImage}
                              alt={`Скриншот шаблона ${product.name}`}
                              fill
                              className="object-contain scale-[1.05] transition-transform duration-500 group-hover:scale-[1.1]"
                              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-black/40" />
                            <div className="absolute inset-0 border border-white/10 rounded-[24px] pointer-events-none" />

                            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                              {product.isPopular && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[var(--brand)] to-blue-500 text-white text-xs font-semibold shadow-lg">
                                  🔥 Популярный
                                </span>
                              )}
                              {product.isBestSeller && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold shadow-lg">
                                  ⭐ Бестселлер
                                </span>
                              )}
                              {product.discount && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold shadow-lg">
                                  <span>🎯</span>
                                  <span>-{product.discount}%</span>
                                </span>
                              )}
                            </div>

                            <div className="absolute bottom-4 right-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-gray-800 shadow-lg">
                              ⭐ {product.rating} ({product.reviewCount})
                            </div>
                          </div>

                          <div className="flex flex-col flex-1 px-2 pb-2">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-[var(--brand)] transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm uppercase tracking-[0.18em] text-gray-400 mb-3">
                              {product.tagline}
                            </p>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                              {product.shortDescription}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {product.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center rounded-full bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-200">
                              <div>
                                {product.originalPrice && (
                                  <div className="text-sm text-gray-400 line-through">
                                    {product.originalPrice.toLocaleString()} ₸
                                  </div>
                                )}
                                <div className="text-3xl font-bold text-[var(--brand)]">
                                  {product.price.toLocaleString()} ₸
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-[var(--brand)] font-semibold group-hover:translate-x-1 transition-transform">
                                Подробнее
                                <svg
                                  className="w-4 h-4"
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-gray-100 bg-gradient-to-br from-[var(--brand)]/5 to-blue-50">
          <div className="container-1200 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Не можете выбрать?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Возьмите Полный набор и получите девять шаблонов со скидкой 80%. Один платёж — и вся
              экосистема Planery у вас в Notion.
            </p>
            <Link href="/products/bundle" className="btn text-lg px-8 h-14">
              Смотреть Полный набор
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
