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

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allProducts.forEach((product) => {
      product.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).slice(0, 10);
  }, []);

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

  const activeFiltersCount = selectedTags.length + (selectedCategory === "all" ? 0 : 1);

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
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedTags([]);
                    }}
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                #{tag}
              </button>
            ))}
          </motion.div>

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
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedTags([]);
                      setSearchQuery("");
                    }}
                    className="btn px-6"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              ) : (
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <ProductCardBalanced
                      key={product.id}
                      product={product}
                      index={index}
                      onQuickView={handleQuickView}
                      onBuyClick={handleBuyClick}
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
