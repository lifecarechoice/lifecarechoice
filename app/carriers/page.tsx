"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import CompaniesSection from "@/components/CompaniesSection";

export default function Carriers() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-radial py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="feature-badge mb-6">{(t as any).carriersPage.badge}</span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-charcoal">
            {(t as any).carriersPage.headerA} <span className="gradient-text">{(t as any).carriersPage.headerB}</span>
          </h1>
          <p className="text-xl md:text-2xl text-charcoal/70 leading-relaxed max-w-4xl mx-auto">
            {(t as any).carriersPage.intro}
          </p>
        </div>
      </section>

      {/* Carriers Grid */}
      <CompaniesSection 
        hideHeader={true}
      />

      {/* Additional Info */}
      <section className="section-divider bg-gradient-to-br from-sand via-white to-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
              {(t as any).carriersPage.whyTitleA} <span className="gradient-text">{(t as any).carriersPage.whyTitleB}</span>
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              {(t as any).carriersPage.intro}
            </p>
          </div>
            
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-premium group">
              <div className="icon-wrapper mb-6 mx-auto group-hover:rotate-6">
                <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal text-center">{(t as any).carriersPage.strengthTitle}</h3>
              <p className="text-charcoal/70 text-center leading-relaxed">
                {(t as any).carriersPage.strengthDesc}
              </p>
            </div>
            
            <div className="card-premium group">
              <div className="icon-wrapper mb-6 mx-auto group-hover:rotate-6">
                <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal text-center">{(t as any).carriersPage.varietyTitle}</h3>
              <p className="text-charcoal/70 text-center leading-relaxed">
                {(t as any).carriersPage.varietyDesc}
              </p>
            </div>
            
            <div className="card-premium group">
              <div className="icon-wrapper mb-6 mx-auto group-hover:rotate-6">
                <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal text-center">{(t as any).carriersPage.ratesTitle}</h3>
              <p className="text-charcoal/70 text-center leading-relaxed">
                {(t as any).carriersPage.ratesDesc}
              </p>
            </div>
            
            <div className="card-premium group">
              <div className="icon-wrapper mb-6 mx-auto group-hover:rotate-6">
                <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal text-center">{(t as any).carriersPage.statesTitle}</h3>
              <p className="text-charcoal/70 text-center leading-relaxed">
                {(t as any).carriersPage.statesDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-charcoal">
            {(t as any).carriersPage.ctaTitle}
          </h2>
          <p className="text-xl text-charcoal/80 mb-8">
            {(t as any).carriersPage.ctaSubtitle}
          </p>
          <Link href="/get-a-quote" className="btn-primary">
            {t.nav.getQuote}
          </Link>
        </div>
      </section>
    </div>
  );
}

