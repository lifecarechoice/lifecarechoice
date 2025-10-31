"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-sand to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-charcoal">
            {t.aboutPage.header}
          </h1>
        </div>
      </section>

      {/* Purpose */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-charcoal text-center">
            {t.aboutPage.purposeTitle}
          </h2>
          <p className="text-xl text-charcoal/80 leading-relaxed text-center mb-12">
            {t.aboutPage.purposeSubtitle}
          </p>

          <div className="prose prose-lg max-w-none text-charcoal/80 text-center">
            <p>{t.aboutPage.purposeP1}</p>
            <p>{t.aboutPage.purposeP2}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-charcoal text-center">
            {t.aboutPage.valuesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gold"
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
              <h3 className="text-xl font-serif mb-2 text-charcoal">{t.aboutPage.values.integrityTitle}</h3>
              <p className="text-charcoal/70">{t.aboutPage.values.integrityDesc}</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-2 text-charcoal">{t.aboutPage.values.supportTitle}</h3>
              <p className="text-charcoal/70">{t.aboutPage.values.supportDesc}</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gold"
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
              <h3 className="text-xl font-serif mb-2 text-charcoal">{t.aboutPage.values.purposeTitle}</h3>
              <p className="text-charcoal/70">{t.aboutPage.values.purposeDesc}</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gold"
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
              <h3 className="text-xl font-serif mb-2 text-charcoal">{t.aboutPage.values.growthTitle}</h3>
              <p className="text-charcoal/70">{t.aboutPage.values.growthDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-charcoal text-center">
            {t.aboutPage.howTitle}
          </h2>
          
          <div className="prose prose-lg max-w-none text-charcoal/80 text-center">
            <p>{t.aboutPage.howP1}</p>
            <p>{t.aboutPage.howP2}</p>
            <p>{t.aboutPage.howP3}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-taupe/20 to-gold/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-charcoal">
            {t.aboutPage.ctaTitle}
          </h2>
          <p className="text-xl text-charcoal/80 mb-8">
            {t.aboutPage.ctaSubtitle}
          </p>
          <Link href="/get-a-quote" className="btn-primary">
            {t.nav.getQuote}
          </Link>
        </div>
      </section>
    </div>
  );
}

