"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function Products() {
  const { t } = useLanguage();

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-gradient-radial py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="feature-badge mb-4 sm:mb-6 text-xs sm:text-sm">{(t as any).productsPage.badge}</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 text-charcoal">
            {(t as any).productsPage.headerA} <span className="gradient-text">{(t as any).productsPage.headerB}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoal/70 leading-relaxed max-w-3xl mx-auto">
            {t.products.intro}
          </p>
        </div>
      </section>

      {/* Final Expense */}
      <section id="final-expense" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="icon-wrapper mb-4 sm:mb-6">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-gold"
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
              
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-charcoal">
                {t.products.fe.title}
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-charcoal/70 leading-relaxed">{t.products.fe.desc}</p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-0.5 sm:mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-charcoal mb-0.5 sm:mb-1 text-sm sm:text-base">{(t as any).productsPage.fe.feature1Title}</h4>
                    <p className="text-charcoal/70 text-sm sm:text-base">{(t as any).productsPage.fe.feature1Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-0.5 sm:mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-charcoal mb-0.5 sm:mb-1 text-sm sm:text-base">{(t as any).productsPage.fe.feature2Title}</h4>
                    <p className="text-charcoal/70 text-sm sm:text-base">{(t as any).productsPage.fe.feature2Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-0.5 sm:mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-charcoal mb-0.5 sm:mb-1 text-sm sm:text-base">{(t as any).productsPage.fe.feature3Title}</h4>
                    <p className="text-charcoal/70 text-sm sm:text-base">{(t as any).productsPage.fe.feature3Desc}</p>
                  </div>
                </div>
              </div>

              <Link href="/get-a-quote" className="btn-primary inline-block text-sm sm:text-base">
                {t.nav.getQuote}
              </Link>
            </div>

            <div className="order-1 md:order-2">
              <div className="card-premium">
                <h3 className="font-serif text-2xl mb-6 text-charcoal">{(t as any).productsPage.perfectFor}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.fe.perfect1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.fe.perfect2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.fe.perfect3}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.fe.perfect4}</span>
                  </li>
                </ul>
                
                <div className="mt-8 pt-6 border-t border-taupe/20">
                  <div className="text-sm font-semibold text-gold mb-2">{(t as any).productsPage.fastFacts}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-charcoal">{(t as any).productsPage.ages}</div>
                      <div className="text-charcoal/70">{(t as any).productsPage.fe.agesValue}</div>
                    </div>
                    <div>
                      <div className="font-bold text-charcoal">{(t as any).productsPage.term}</div>
                      <div className="text-charcoal/70">{(t as any).productsPage.fe.termValue}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Protection */}
      <section id="mortgage-protection" className="section-divider bg-gradient-to-br from-sand via-white to-sand scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="card-premium">
                <h3 className="font-serif text-2xl mb-6 text-charcoal">{(t as any).productsPage.perfectFor}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.mp.perfect1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.mp.perfect2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.mp.perfect3}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.mp.perfect4}</span>
                  </li>
                </ul>
                
                <div className="mt-8 pt-6 border-t border-taupe/20">
                  <div className="text-sm font-semibold text-gold mb-2">{(t as any).productsPage.coverageOptions}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-charcoal">{(t as any).productsPage.terms}</div>
                      <div className="text-charcoal/70">{(t as any).productsPage.mp.termsValue}</div>
                    </div>
                    <div>
                      <div className="font-bold text-charcoal">{(t as any).productsPage.amount}</div>
                      <div className="text-charcoal/70">{(t as any).productsPage.mp.amountValue}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-2">
              <div className="icon-wrapper mb-6">
                <svg
                  className="w-10 h-10 text-gold"
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
              
              <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
                {t.products.mp.title}
              </h2>
              
              <p className="text-xl mb-8 text-charcoal/70 leading-relaxed">{t.products.mp.desc}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">{(t as any).productsPage.mp.feature1Title}</h4>
                    <p className="text-charcoal/70">{(t as any).productsPage.mp.feature1Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">{(t as any).productsPage.mp.feature2Title}</h4>
                    <p className="text-charcoal/70">{(t as any).productsPage.mp.feature2Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">{(t as any).productsPage.mp.feature3Title}</h4>
                    <p className="text-charcoal/70">{(t as any).productsPage.mp.feature3Desc}</p>
                  </div>
                </div>
              </div>

              <Link href="/get-a-quote" className="btn-primary inline-block">
                {t.nav.getQuote}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Indexed Universal Life (IUL) */}
      <section id="iul" className="section-divider bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="icon-wrapper mb-6">
                <svg
                  className="w-10 h-10 text-gold"
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
              
              <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
                {t.products.iul.title}
              </h2>
              
              <p className="text-xl mb-8 text-charcoal/70 leading-relaxed">{t.products.iul.desc}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">{(t as any).productsPage.iul.feature1Title}</h4>
                    <p className="text-charcoal/70">{(t as any).productsPage.iul.feature1Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">{(t as any).productsPage.iul.feature2Title}</h4>
                    <p className="text-charcoal/70">{(t as any).productsPage.iul.feature2Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">{(t as any).productsPage.iul.feature3Title}</h4>
                    <p className="text-charcoal/70">{(t as any).productsPage.iul.feature3Desc}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gold/10 to-taupe/10 p-6 rounded-xl border-l-4 border-gold mb-8">
                <p className="text-sm text-charcoal/80 leading-relaxed">
                  <strong className="text-gold">{(t as any).productsPage.iul.important}</strong> {(t as any).productsPage.iul.importantText}
                </p>
              </div>

              <Link href="/get-a-quote" className="btn-primary inline-block">
                {t.nav.getQuote}
              </Link>
            </div>

            <div className="order-1 md:order-2">
              <div className="card-premium">
                <h3 className="font-serif text-2xl mb-6 text-charcoal">{(t as any).productsPage.perfectFor}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.iul.perfect1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.iul.perfect2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.iul.perfect3}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                    <span className="text-charcoal/80">{(t as any).productsPage.iul.perfect4}</span>
                  </li>
                </ul>
                
                <div className="mt-8 pt-6 border-t border-taupe/20">
                  <div className="text-sm font-semibold text-gold mb-2">{(t as any).productsPage.keyFeatures}</div>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <div>• {(t as any).productsPage.iul.keyFeature1}</div>
                    <div>• {(t as any).productsPage.iul.keyFeature2}</div>
                    <div>• {(t as any).productsPage.iul.keyFeature3}</div>
                    <div>• {(t as any).productsPage.iul.keyFeature4}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-charcoal via-taupe to-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            {(t as any).productsPage.ctaTitle}
          </h2>
          <p className="text-xl mb-10 opacity-90 leading-relaxed">
            {(t as any).productsPage.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote" className="btn-primary">
              {t.nav.getQuote}
            </Link>
            <Link href="/contact" className="bg-white/10 backdrop-blur-sm text-white font-bold px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-lg min-h-[56px] flex items-center justify-center">
              {(t as any).productsPage.askQuestion}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
