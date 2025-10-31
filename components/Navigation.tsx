"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    console.log("Toggle language clicked, current:", language);
    const newLang = language === "en" ? "es" : "en";
    console.log("Setting language to:", newLang);
    setLanguage(newLang);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg border-b border-gold/20" : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="w-full px-2 sm:px-3 lg:px-4">
        <div className="flex items-center h-24 max-w-[1600px] mx-auto">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="transition-transform duration-300 hover:scale-105">
              <Image
                src="/LOGO WEBSITE BROWN - TRANSPARENT BACKGROUND.png"
                alt="Life Care Choice"
                width={200}
                height={60}
                className="h-10 sm:h-12 md:h-14 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center min-w-0">
            <Link href="/" className="whitespace-nowrap px-3 py-2 text-sm text-charcoal hover:text-gold font-semibold transition-all duration-300 relative group">
              <span>{t.nav.home}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/products" className="whitespace-nowrap px-3 py-2 text-sm text-charcoal hover:text-gold font-semibold transition-all duration-300 relative group">
              <span>{t.nav.products}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="whitespace-nowrap px-3 py-2 text-sm text-charcoal hover:text-gold font-semibold transition-all duration-300 relative group">
              <span>{t.nav.about}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/resources" className="whitespace-nowrap px-3 py-2 text-sm text-charcoal hover:text-gold font-semibold transition-all duration-300 relative group">
              <span>{t.nav.resources}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/team" className="whitespace-nowrap px-3 py-2 text-sm text-charcoal hover:text-gold font-semibold transition-all duration-300 relative group">
              <span>{t.nav.team}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/carriers" className="whitespace-nowrap px-3 py-2 text-sm text-charcoal hover:text-gold font-semibold transition-all duration-300 relative group">
              <span>{t.nav.carriers}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="whitespace-nowrap px-3 py-2 text-sm text-charcoal hover:text-gold font-semibold transition-all duration-300 relative group">
              <span>{t.nav.contact}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* CTAs and Language Toggle */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 ml-auto">
            <Link href="/agents" className="whitespace-nowrap btn-secondary py-1.5 px-4 min-h-0 text-sm">
              {t.nav.agents}
            </Link>
            <Link href="/get-a-quote" className="whitespace-nowrap btn-primary py-1.5 px-4 min-h-0 text-sm">
              {t.nav.getQuote}
            </Link>
            <div className="flex items-center gap-1.5 relative z-50">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`whitespace-nowrap px-2 md:px-3 py-1 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                  language === "en"
                    ? "bg-gold text-white border-2 border-gold"
                    : "text-charcoal border-2 border-taupe/30 hover:border-gold hover:text-gold"
                }`}
                aria-label="Switch to English"
              >
                <span>🇺🇸</span>
                <span className="hidden xl:inline">English</span>
                <span className="xl:hidden">EN</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`whitespace-nowrap px-2 md:px-3 py-1 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                  language === "es"
                    ? "bg-gold text-white border-2 border-gold"
                    : "text-charcoal border-2 border-taupe/30 hover:border-gold hover:text-gold"
                }`}
                aria-label="Cambiar a Español"
              >
                <span>🇪🇸</span>
                <span className="hidden xl:inline">Español</span>
                <span className="xl:hidden">ES</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button - Right Corner on Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal relative z-50 ml-auto"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-taupe relative z-50">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-charcoal hover:bg-sand rounded transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/products"
              className="block px-4 py-2 text-charcoal hover:bg-sand rounded transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.products}
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-charcoal hover:bg-sand rounded transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/resources"
              className="block px-4 py-2 text-charcoal hover:bg-sand rounded transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.resources}
            </Link>
            <Link
              href="/team"
              className="block px-4 py-2 text-charcoal hover:bg-sand rounded transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.team}
            </Link>
            <Link
              href="/carriers"
              className="block px-4 py-2 text-charcoal hover:bg-sand rounded transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.carriers}
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-charcoal hover:bg-sand rounded transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>
            <Link
              href="/agents"
              className="block px-4 py-2 text-charcoal hover:bg-sand rounded transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.agents}
            </Link>
            <Link
              href="/get-a-quote"
              className="block px-4 py-2 bg-gold text-charcoal font-semibold rounded hover:shadow-lift transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.getQuote}
            </Link>
            <div className="flex gap-2 px-4 py-2">
              <button
                type="button"
                onClick={() => {
                  setLanguage("en");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                  language === "en"
                    ? "bg-gold text-white border-2 border-gold"
                    : "text-charcoal border-2 border-taupe/30"
                }`}
                aria-label="Switch to English"
              >
                <span>🇺🇸</span>
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage("es");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                  language === "es"
                    ? "bg-gold text-white border-2 border-gold"
                    : "text-charcoal border-2 border-taupe/30"
                }`}
                aria-label="Switch to Spanish"
              >
                <span>🇪🇸</span>
                <span>Español</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

