"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import QuoteForm from "@/components/QuoteForm";
import CompaniesSection from "@/components/CompaniesSection";

export default function Home() {
  const { t, language } = useLanguage();

  const scrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Get a Quote button clicked");
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      const form = document.getElementById("quote-form");
      console.log("Looking for quote-form, found:", form);
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.log("Form not found, scrolling to bottom");
        // Fallback: scroll to bottom if form not found
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden" style={{
        backgroundImage: "url('/Individuals_home_hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}>
        {/* Color Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/75 via-charcoal/65 to-charcoal/75"></div>
        
        {/* Dark Floating Circles */}
        <div className="absolute top-10 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-charcoal/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 sm:w-96 sm:h-96 bg-charcoal/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-4 sm:mb-6 animate-fade-in">
              <span className="feature-badge text-xs sm:text-sm bg-white/10 backdrop-blur-sm border-white/30 text-white">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                {t.home.trustedBadge}
              </span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 sm:mb-8 text-white animate-fade-in leading-tight px-2">
              {(() => {
                const title = t.hero.title;
                const idx = title.lastIndexOf(" ");
                if (idx === -1) return title;
                const before = title.slice(0, idx + 1);
                const last = title.slice(idx + 1);
                return (
                  <>
                    {before}<span className="text-gold">{last}</span>
                  </>
                );
              })()}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto animate-fade-in px-4" style={{animationDelay: '0.2s'}}>
              {language === "en" ? (
                <>Driven by <span className="text-gold">care</span>. Built on <span className="text-gold">trust</span>. Obsessed with serving every client like <span className="text-gold">family</span>.</>
              ) : (
                <>Impulsados por el <span className="text-gold">cuidado</span>. Construidos sobre la <span className="text-gold">confianza</span>. Obsesionados con atender a cada cliente como <span className="text-gold">familia</span>.</>
              )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-6 animate-fade-in px-4" style={{animationDelay: '0.4s'}}>
              <button 
                type="button"
                onClick={scrollToForm} 
                className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center text-base sm:text-lg relative z-20 cursor-pointer"
              >
                {t.hero.cta}
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
              <Link href="/agents" className="text-sand hover:text-gold transition-all duration-300 font-semibold flex items-center gap-2 text-sm sm:text-base">
                {t.hero.agentLink}
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mt-10 sm:mt-16 animate-fade-in px-4" style={{animationDelay: '0.6s'}}>
              <div className="stat-card p-4 sm:p-8 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold mb-1">15K+</div>
                <div className="text-xs sm:text-sm text-white/80 font-semibold">{t.home.stats.families}</div>
              </div>
              <div className="stat-card p-4 sm:p-8 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold mb-1">50+</div>
                <div className="text-xs sm:text-sm text-white/80 font-semibold">{t.home.stats.agents}</div>
              </div>
              <div className="stat-card p-4 sm:p-8 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold mb-1">4.9 ★</div>
                <div className="text-xs sm:text-sm text-white/80 font-semibold">{t.home.stats.rating}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Value Cards */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 text-charcoal px-4">
              {t.home.whyChoose.title} <span className="gradient-text">Life Care Choice</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto px-4">
              {t.home.whyChoose.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="card-premium group">
              <div className="icon-wrapper mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-3 sm:mb-4 text-charcoal text-center">{t.values.title1}</h3>
              <p className="text-sm sm:text-base text-charcoal/70 text-center leading-relaxed">{t.values.desc1}</p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-taupe/20 text-center">
                <span className="text-xs sm:text-sm font-semibold text-gold">{t.home.whyChoose.feature1}</span>
              </div>
            </div>

            <div className="card-premium group p-6 sm:p-8 md:p-10">
              <div className="icon-wrapper mx-auto mb-4 sm:mb-6 group-hover:rotate-6 transition-transform duration-300 w-12 h-12 sm:w-16 sm:h-16">
                <svg
                  className="w-8 h-8 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-3 sm:mb-4 text-charcoal text-center">{t.values.title2}</h3>
              <p className="text-sm sm:text-base text-charcoal/70 text-center leading-relaxed">{t.values.desc2}</p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-taupe/20 text-center">
                <span className="text-xs sm:text-sm font-semibold text-gold">{t.home.whyChoose.feature2}</span>
              </div>
            </div>

            <div className="card-premium group p-6 sm:p-8 md:p-10">
              <div className="icon-wrapper mx-auto mb-4 sm:mb-6 group-hover:rotate-6 transition-transform duration-300 w-12 h-12 sm:w-16 sm:h-16">
                <svg
                  className="w-8 h-8 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-3 sm:mb-4 text-charcoal text-center">{t.values.title3}</h3>
              <p className="text-sm sm:text-base text-charcoal/70 text-center leading-relaxed">{t.values.desc3}</p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-taupe/20 text-center">
                <span className="text-xs sm:text-sm font-semibold text-gold">{t.home.whyChoose.feature3}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-sand via-white to-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="feature-badge mb-3 sm:mb-4 text-xs sm:text-sm">{t.products.badge}</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-charcoal px-4">
              {t.products.title.split(' ')[0]} {t.products.title.split(' ')[1]} <span className="gradient-text">{t.products.title.split(' ')[2]}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed px-4">
              {t.products.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Link href="/products#final-expense" className="card group cursor-pointer relative p-6 sm:p-8">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              
              <div className="icon-wrapper mb-4 sm:mb-6 group-hover:scale-110 w-12 h-12 sm:w-16 sm:h-16">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-2 sm:mb-3 text-charcoal">{t.products.fe.title}</h3>
              <p className="text-sm sm:text-base text-charcoal/70 mb-4 sm:mb-6 leading-relaxed">{t.products.fe.desc}</p>
              
              <div className="flex items-center gap-2 text-gold font-bold group-hover:gap-4 transition-all text-sm sm:text-base">
                <span>{t.products.learnMore}</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>

            <Link href="/products#mortgage-protection" className="card group cursor-pointer relative p-6 sm:p-8">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-6 h-6 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              
              <div className="icon-wrapper mb-4 sm:mb-6 group-hover:scale-110">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-2 sm:mb-3 text-charcoal">{t.products.mp.title}</h3>
              <p className="text-sm sm:text-base text-charcoal/70 mb-4 sm:mb-6 leading-relaxed">{t.products.mp.desc}</p>
              
              <div className="flex items-center gap-2 text-gold font-bold group-hover:gap-4 transition-all text-sm sm:text-base">
                <span>{t.products.learnMore}</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>

            <Link href="/products#iul" className="card group cursor-pointer relative p-6 sm:p-8">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              
              <div className="icon-wrapper mb-4 sm:mb-6 group-hover:scale-110">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-2 sm:mb-3 text-charcoal">{t.products.iul.title}</h3>
              <p className="text-sm sm:text-base text-charcoal/70 mb-4 sm:mb-6 leading-relaxed">{t.products.iul.desc}</p>
              
              <div className="flex items-center gap-2 text-gold font-bold group-hover:gap-4 transition-all text-sm sm:text-base">
                <span>{t.products.learnMore}</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-taupe/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="feature-badge mb-3 sm:mb-4 text-xs sm:text-sm">{t.home.howItWorks.badge}</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-charcoal px-4">
              {t.home.howItWorks.title.split(' ')[0]} <span className="gradient-text">{t.home.howItWorks.title.split(' ')[1]} {t.home.howItWorks.title.split(' ')[2]}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto px-4">
              {t.home.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-gold/20 via-gold/50 to-gold/20" style={{top: '80px'}}></div>

            {/* Step 1 */}
            <div className="relative group">
              <div className="text-center">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center shadow-lift relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-bold text-white mb-1">1</div>
                    <div className="text-xs text-white/90 font-semibold">{t.home.howItWorks.step1.time}</div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-charcoal mb-2 sm:mb-3">{t.home.howItWorks.step1.title}</h3>
                <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed">
                  {t.home.howItWorks.step1.desc}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center shadow-lift relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-1">2</div>
                    <div className="text-xs text-white/90 font-semibold">{t.home.howItWorks.step2.time}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{t.home.howItWorks.step2.title}</h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {t.home.howItWorks.step2.desc}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center shadow-lift relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-1">3</div>
                    <div className="text-xs text-white/90 font-semibold">{t.home.howItWorks.step3.time}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{t.home.howItWorks.step3.title}</h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {t.home.howItWorks.step3.desc}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center shadow-lift relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-1">4</div>
                    <div className="text-xs text-white/90 font-semibold">{t.home.howItWorks.step4.time}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{t.home.howItWorks.step4.title}</h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {t.home.howItWorks.step4.desc}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button 
              type="button"
              onClick={scrollToForm} 
              className="btn-primary relative z-20 cursor-pointer"
            >
              {t.home.howItWorks.cta}
            </button>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <CompaniesSection 
        title={t.companies.title}
        subtitle={t.companies.subtitle}
      />

      {/* Client Testimonials */}
      <section className="section-divider bg-gradient-to-br from-sand via-white to-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="feature-badge mb-4">{t.home.testimonials.badge}</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
              {t.home.testimonials.title.split(' ').slice(0, 2).join(' ')} <span className="gradient-text">{t.home.testimonials.title.split(' ').slice(2).join(' ')}</span>
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              {t.home.testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonialsPage.items.slice(0, 3).map((testimonial: any, index: number) => (
              <div key={index} className="card-premium">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-taupe/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-gold">{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-bold text-charcoal">{testimonial.name}</div>
                    <div className="text-sm text-charcoal/70">{testimonial.policy}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-charcoal/80 leading-relaxed mb-4">"{testimonial.text}"</p>
                <div className="text-sm text-gold font-semibold">— {testimonial.location}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials" className="text-gold font-bold text-lg hover:underline flex items-center justify-center gap-2">
              {t.home.testimonials.readMore}
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Agent Network Section */}
      <section className="section-divider bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="feature-badge mb-4">{t.agentNetwork.badge}</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
                {t.agentNetwork.title.split(' ').slice(0, 2).join(' ')} <span className="gradient-text">{t.agentNetwork.title.split(' ').slice(2).join(' ')}</span>
              </h2>
              <p className="text-xl text-charcoal/70 mb-8 leading-relaxed">
                {t.agentNetwork.subtitle}
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-2">{t.agentNetwork.feature1.title}</h4>
                    <p className="text-charcoal/70">{t.agentNetwork.feature1.desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-2">{t.agentNetwork.feature2.title}</h4>
                    <p className="text-charcoal/70">{t.agentNetwork.feature2.desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-2">{t.agentNetwork.feature3.title}</h4>
                    <p className="text-charcoal/70">{t.agentNetwork.feature3.desc}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/team" className="btn-primary">
                  {t.agentNetwork.meetTeam}
                </Link>
                <Link href="/agents" className="btn-secondary">
                  {t.agentNetwork.becomeAgent}
                </Link>
              </div>
            </div>

          {/* Right column with agent cards removed per request */}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section-divider bg-gradient-to-br from-sand via-white to-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="feature-badge mb-4">{t.home.resources.badge}</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
              {t.home.resources.title.split(' ').slice(0, 2).join(' ')} <span className="gradient-text">{t.home.resources.title.split(' ').slice(2).join(' ')}</span>
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              {t.home.resources.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Resource 1 */}
            <Link href="/resources/buying-guide" className="card-premium group cursor-pointer">
              <div className="icon-wrapper mb-6 group-hover:rotate-6">
                <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{t.home.resources.guide.title}</h3>
              <p className="text-charcoal/70 mb-4 leading-relaxed">
                {t.home.resources.guide.desc}
              </p>
              <div className="flex items-center gap-2 text-gold font-semibold group-hover:gap-4 transition-all">
                <span>{t.home.resources.guide.cta}</span>
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>

            {/* Resource 2 */}
            <Link href="/resources/coverage-calculator" className="card-premium group cursor-pointer">
              <div className="icon-wrapper mb-6 group-hover:rotate-6">
                <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{t.home.resources.calculator.title}</h3>
              <p className="text-charcoal/70 mb-4 leading-relaxed">
                {t.home.resources.calculator.desc}
              </p>
              <div className="flex items-center gap-2 text-gold font-semibold group-hover:gap-4 transition-all">
                <span>{t.home.resources.calculator.cta}</span>
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>

            {/* Resource 3 */}
            <Link href="/resources/faq" className="card-premium group cursor-pointer">
              <div className="icon-wrapper mb-6 group-hover:rotate-6">
                <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{t.home.resources.faq.title}</h3>
              <p className="text-charcoal/70 mb-4 leading-relaxed">
                {t.home.resources.faq.desc}
              </p>
              <div className="flex items-center gap-2 text-gold font-semibold group-hover:gap-4 transition-all">
                <span>{t.home.resources.faq.cta}</span>
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/resources" className="btn-secondary inline-block">
              {t.home.resources.exploreAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="section-divider bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="feature-badge mb-4">{t.home.quoteSection.badge}</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
              {t.home.quoteSection.title.split(' ').slice(0, 2).join(' ')} <span className="gradient-text">{t.home.quoteSection.title.split(' ').slice(2).join(' ')}</span>
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              {t.home.quoteSection.subtitle}
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      {/* Trust Row */}
      <section className="py-16 bg-gradient-to-r from-taupe/10 via-gold/5 to-taupe/10 border-y-2 border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20">
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-charcoal text-lg block">{t.trust.licensed}</span>
                <span className="text-sm text-charcoal/60">{t.trustRow.licensedSub}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-charcoal text-lg block">{t.trust.privacy}</span>
                <span className="text-sm text-charcoal/60">{t.trustRow.privacySub}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-charcoal text-lg block">{t.trust.senior}</span>
                <span className="text-sm text-charcoal/60">{t.trustRow.seniorSub}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
