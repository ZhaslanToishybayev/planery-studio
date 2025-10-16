"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        }`}
        style={{ transition: 'background-color 0.3s, box-shadow 0.3s' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-1200 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 hover:opacity-80 transition group">
            <div className="transform transition-transform group-hover:scale-110">
              <Image 
                src="/assets/planery-logo.png" 
                alt="Planery Studio" 
                width={40} 
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <div className="text-base font-bold text-gray-900">Planery Studio</div>
              <div className="text-xs text-gray-500">Notion Templates</div>
            </div>
          </a>

          {/* Slogan */}
          <div className="hidden md:block text-xl text-gray-700 font-bold">
            Преврати хаос в порядок
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              className="btn-secondary hidden md:inline-flex"
            >
              Каталог
            </Link>
            <Link
              href="#pricing"
              className="btn hidden md:inline-flex"
            >
              Купить
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-40 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="container-1200 py-6 flex flex-col gap-4">
                <div className="text-xl text-gray-700 font-bold py-2">
                  Преврати хаос в порядок
                </div>
                <Link
                  href="/catalog"
                  className="btn-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Каталог
                </Link>
                <Link
                  href="#pricing"
                  className="btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Купить
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[73px]" />
    </>
  );
}
