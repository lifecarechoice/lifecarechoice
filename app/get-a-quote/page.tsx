"use client";

import { useLanguage } from "@/lib/language-context";
import QuoteForm from "@/components/QuoteForm";

export default function GetAQuote() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-sand to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-charcoal">
            {t.nav.getQuote}
          </h1>
          <p className="text-xl md:text-2xl text-charcoal/80 leading-relaxed">
            {(t as any).getQuotePage.subtitle}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>

      {/* Call Now Section */}
      <section className="py-12 bg-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl mb-4 text-charcoal">
            {(t as any).getQuotePage.callNowTitle}
          </h2>
          <p className="text-lg text-charcoal/80 mb-6">
            {(t as any).getQuotePage.callNowSubtitle}
          </p>
          <a
            href="tel:+19548330290"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {(t as any).getQuotePage.callButton}
          </a>
          <p className="text-sm text-charcoal/60 mt-4">
            {(t as any).getQuotePage.hours}
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-charcoal text-center">
            {(t as any).getQuotePage.whatToExpectTitle}
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-charcoal">{(t as any).getQuotePage.step1Title}</h3>
                <p className="text-charcoal/80">
                  {(t as any).getQuotePage.step1Desc}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-charcoal">{(t as any).getQuotePage.step2Title}</h3>
                <p className="text-charcoal/80">
                  {(t as any).getQuotePage.step2Desc}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-charcoal">{(t as any).getQuotePage.step3Title}</h3>
                <p className="text-charcoal/80">
                  {(t as any).getQuotePage.step3Desc}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-xl">4</span>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-charcoal">{(t as any).getQuotePage.step4Title}</h3>
                <p className="text-charcoal/80">
                  {(t as any).getQuotePage.step4Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

