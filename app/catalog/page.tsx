"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsent from "@/components/CookieConsent";
import CheckoutModal from "@/components/CheckoutModal";
import AnimatedTitle from "@/components/AnimatedTitle";
import ProductCardBalanced from "@/components/ProductCardBalanced";
import QuickViewModal from "@/components/QuickViewModal";
import { allProducts, type Product } from "@/data/products";

type SortOption = "popular" | "price-asc" | "price-desc" | "rating";
export default function CatalogPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    title: "",
    price: "",
    slug: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const totalProducts = allProducts.length;

  const handleBuyClick = (product: Product) => {
    if (isQuickViewOpen) {
      setIsQuickViewOpen(false);
      setQuickViewProduct(null);
    }
    setSelectedProduct({
      title: product.name,
      price: `${product.price.toLocaleString("ru-RU")} ₸`,
      slug: product.slug,
    });
    setIsCheckoutOpen(true);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const categories = useMemo(
    () => [
      { id: "all", name: "Все товары" },
      { id: "productivity", name: "Продуктивность" },
      { id: "education", name: "Образование" },
      { id: "business", name: "Бизнес" },
      { id: "special", name: "Специальные" },
    ],
    []
  );

  const getCategoryForProduct = useMemo(
    () => (tags: string[]) => {
      if (tags.some((tag) => ["productivity", "para", "habits"].includes(tag))) {
        return "productivity";
      }
      if (tags.some((tag) => ["student", "education", "school", "study"].includes(tag))) {
        return "education";
      }
      if (tags.some((tag) => ["freelance", "clients", "projects", "business"].includes(tag))) {
        return "business";
      }
      if (tags.some((tag) => ["muslim", "spiritual", "fitness", "workout", "content"].includes(tag))) {
        return "special";
      }
      return "productivity";
    },
    []
  );

  const tagUsage = useMemo(() => {
    const usage: Record<string, number> = {};
    allProducts.forEach((product) => {
      product.tags.forEach((tag) => {
        usage[tag] = (usage[tag] || 0) + 1;
      });
    });
    return usage;
  }, []);

  const allTags = useMemo(() => {
    return Object.keys(tagUsage).sort((a, b) => {
      const diff = (tagUsage[b] || 0) - (tagUsage[a] || 0);
      return diff === 0 ? a.localeCompare(b, "ru") : diff;
    });
  }, [tagUsage]);

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
      study: "Учёба",
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
      gamification: "Геймификация",
      creator: "Креаторы",
      marketing: "Маркетинг",
      premium: "Premium",
      complete: "Полный набор",
      bestseller: "Хит",
      consulting: "Консалтинг",
      faith: "Вера",
      parents: "Родителям",
      learning: "Обучение",
    }),
    []
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProducts.length };
    categories.forEach((category) => {
      if (category.id !== "all") {
        counts[category.id] = allProducts.filter(
          (product) => getCategoryForProduct(product.tags) === category.id
        ).length;
      }
    });
    return counts;
  }, [categories, getCategoryForProduct]);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => getCategoryForProduct(product.tags) === selectedCategory
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((product) =>
        selectedTags.some((tag) => product.tags.includes(tag))
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.tagline.toLowerCase().includes(query) ||
          product.shortDescription.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "popular":
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, selectedTags, searchQuery, sortBy, getCategoryForProduct]);

  const searchActive = searchQuery.trim().length > 0;
  const activeFiltersCount =
    selectedTags.length + (selectedCategory === "all" ? 0 : 1) + (searchActive ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSelectedTags([]);
    setSearchQuery("");
  };

  return (
    <>
      <ScrollProgress />
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white pt-24 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <AnimatedTitle />
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Готовые решения для продуктивности, учёбы, бизнеса и личного развития.
              Выберите свой идеальный планер!
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Поиск по названию, описанию, тегам..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full px-6 py-4 pr-12 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-lg transition-colors shadow-md focus:shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Очистить поиск"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6"
            >
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {category.name}
                    <span className="text-xs text-gray-400">
                      {categoryCounts[category.id] ?? 0}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as SortOption)}
                  className="px-4 py-2 rounded-xl border-2 border-gray-200 bg-white text-sm font-medium focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-asc">Цена ↑</option>
                  <option value="price-desc">Цена ↓</option>
                  <option value="rating">По рейтингу</option>
                </select>
                <div className="hidden sm:flex items-center rounded-xl border-2 border-gray-200 bg-white overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 text-sm font-medium transition flex items-center gap-1 ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    aria-label="Вид сеткой"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 6v-6h6v6h-6z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 text-sm font-medium transition flex items-center gap-1 ${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    aria-label="Вид списком"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 6h12v2H4V6zm0 4h12v2H4v-2zm0 4h12v2H4v-2z" />
                    </svg>
                  </button>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Сбросить фильтры ({activeFiltersCount})
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedTags.includes(tag)
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>#{tagLabels[tag] ?? tag}</span>
                <span className="text-xs opacity-80">{tagUsage[tag] ?? 0}</span>
              </button>
            ))}
          </motion.div>

          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 border border-purple-100 rounded-2xl px-4 py-3 md:px-6 md:py-4 mb-8 flex flex-wrap items-center gap-2 md:gap-3"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-purple-500">
                Активные фильтры
              </span>
              {selectedCategory !== "all" && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="flex items-center gap-2 text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full hover:bg-purple-200 transition"
                >
                  Категория: {categories.find((c) => c.id === selectedCategory)?.name}
                  <span aria-hidden="true">×</span>
                </button>
              )}
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
                >
                  #{tagLabels[tag] ?? tag}
                  <span aria-hidden="true">×</span>
                </button>
              ))}
              {searchActive && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="flex items-center gap-2 text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-200 transition"
                >
                  Поиск: “{searchQuery.trim()}”
                  <span aria-hidden="true">×</span>
                </button>
              )}
              <button
                onClick={resetAllFilters}
                className="text-xs font-medium text-purple-600 hover:text-purple-700 ml-auto"
              >
                Очистить всё
              </button>
            </motion.div>
          )}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
            <p className="text-sm text-gray-500">
              Найдено {filteredProducts.length} из {totalProducts} планеров
            </p>
            <div className="flex sm:hidden items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-2 py-1 text-xs font-medium transition ${
                  viewMode === "grid" ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Сетка
              </button>
              <span className="h-4 w-px bg-gray-200" />
              <button
                onClick={() => setViewMode("list")}
                className={`px-2 py-1 text-xs font-medium transition ${
                  viewMode === "list" ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Список
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${sortBy}-${selectedTags.join(",")}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white/60 rounded-3xl border border-dashed border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Ничего не найдено
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Попробуйте снять часть фильтров или измените поисковый запрос.
                  </p>
                  <button onClick={resetAllFilters} className="btn px-6">
                    Сбросить фильтры
                  </button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "list"
                      ? "grid gap-6 grid-cols-1"
                      : "grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
                  }
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCardBalanced
                      key={product.id}
                      product={product}
                      index={index}
                      onQuickView={handleQuickView}
                      onBuyClick={handleBuyClick}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border border-purple-100">
              <span className="text-sm text-gray-600">
                Не нашли подходящий шаблон?
              </span>
              <Link
                href="/#contact"
                className="text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                Напишите нам, соберём персональный
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieConsent />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        productTitle={selectedProduct.title}
        productPrice={selectedProduct.price}
        productSlug={selectedProduct.slug}
      />

      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        product={quickViewProduct}
        onBuyClick={handleBuyClick}
      />
    </>
  );
}
