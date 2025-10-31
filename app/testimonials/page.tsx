"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function Testimonials() {
  const { t, language } = useLanguage();

  const testimonials = t.testimonialsPage.items;

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-gradient-radial py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="feature-badge mb-6">{t.testimonialsPage.badge}</span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-charcoal">
            {t.testimonialsPage.titleA} <span className="gradient-text">{t.testimonialsPage.titleB}</span>
          </h1>
          <p className="text-xl md:text-2xl text-charcoal/70 leading-relaxed max-w-4xl mx-auto">
            {t.testimonialsPage.subtitle}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-card">
              <div className="text-4xl font-bold text-gold mb-2">4.9★</div>
              <div className="text-sm text-charcoal/70 font-semibold">{t.testimonialsPage.stats.avgRating}</div>
            </div>
            <div className="stat-card">
              <div className="text-4xl font-bold text-gold mb-2">15K+</div>
              <div className="text-sm text-charcoal/70 font-semibold">{t.testimonialsPage.stats.happyFamilies}</div>
            </div>
            <div className="stat-card">
              <div className="text-4xl font-bold text-gold mb-2">98%</div>
              <div className="text-sm text-charcoal/70 font-semibold">{t.testimonialsPage.stats.wouldRecommend}</div>
            </div>
            <div className="stat-card">
              <div className="text-4xl font-bold text-gold mb-2">24hr</div>
              <div className="text-sm text-charcoal/70 font-semibold">{t.testimonialsPage.stats.responseTime}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-divider bg-gradient-to-br from-sand via-white to-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-premium">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-taupe/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-gold">{testimonial.initials}</span>
                    </div>
                    <div>
                      <div className="font-bold text-charcoal">{testimonial.name}</div>
                      <div className="text-sm text-charcoal/70">{testimonial.policy}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                
                <p className="text-charcoal/80 leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-taupe/20">
                  <div className="text-sm text-gold font-semibold">— {testimonial.location}</div>
                  <div className="text-xs text-charcoal/60">{testimonial.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-charcoal via-taupe to-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            {t.testimonialsPage.ctaTitle}
          </h2>
          <p className="text-xl mb-10 opacity-90 leading-relaxed">
            {t.testimonialsPage.ctaSubtitle}
          </p>
          <Link href="/get-a-quote" className="btn-primary">
            {t.nav.getQuote}
          </Link>
        </div>
      </section>
    </div>
  );
}

