"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function Resources() {
  const { t } = useLanguage();
  const tt = t as any;

  const resources = [
    {
      title: tt.resourcesPage.resource1Title,
      description: tt.resourcesPage.resource1Desc,
      icon: "book",
      link: "/resources/buying-guide",
      category: tt.resourcesPage.resource1Category
    },
    {
      title: tt.resourcesPage.resource2Title,
      description: tt.resourcesPage.resource2Desc,
      icon: "calculator",
      link: "/resources/coverage-calculator",
      category: tt.resourcesPage.resource2Category
    },
    {
      title: tt.resourcesPage.resource3Title,
      description: tt.resourcesPage.resource3Desc,
      icon: "faq",
      link: "/resources/faq",
      category: tt.resourcesPage.resource3Category
    },
  ];

  const getIcon = (icon: string) => {
    const icons = {
      book: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>,
      calculator: <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>,
      faq: <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>,
      chart: <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>,
      document: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>,
      compare: <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>,
    };
    return icons[icon as keyof typeof icons] || icons.book;
  };

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-gradient-radial py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="feature-badge mb-6">{t.nav.resources}</span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-charcoal">
            {tt.resourcesPage.headerTitle.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{tt.resourcesPage.headerTitle.split(' ').slice(-1)}</span>
          </h1>
          <p className="text-xl md:text-2xl text-charcoal/70 leading-relaxed max-w-4xl mx-auto">
            {tt.resourcesPage.subtitle}
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-divider bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Link key={index} href={resource.link} className="card-premium group cursor-pointer">
                <div className="flex items-center justify-between mb-6">
                  <span className="feature-badge text-xs">{resource.category}</span>
                  <svg className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
                
                <div className="icon-wrapper mb-6 group-hover:rotate-6">
                  <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    {getIcon(resource.icon)}
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-charcoal mb-3">{resource.title}</h3>
                <p className="text-charcoal/70 leading-relaxed">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Resources Section */}
      <section className="section-divider bg-gradient-to-br from-sand via-white to-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
              {tt.resourcesPage.whyTitleA} <span className="gradient-text">{tt.resourcesPage.whyTitleB}</span>
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              {tt.resourcesPage.whySubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="icon-wrapper mx-auto mb-6">
                <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{tt.resourcesPage.benefit1Title}</h3>
              <p className="text-charcoal/70">{tt.resourcesPage.benefit1Desc}</p>
            </div>

            <div className="card text-center">
              <div className="icon-wrapper mx-auto mb-6">
                <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{tt.resourcesPage.benefit2Title}</h3>
              <p className="text-charcoal/70">{tt.resourcesPage.benefit2Desc}</p>
            </div>

            <div className="card text-center">
              <div className="icon-wrapper mx-auto mb-6">
                <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{tt.resourcesPage.benefit3Title}</h3>
              <p className="text-charcoal/70">{tt.resourcesPage.benefit3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
            {tt.resourcesPage.ctaTitle}
          </h2>
          <p className="text-xl text-charcoal/70 mb-10 leading-relaxed">
            {tt.resourcesPage.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote" className="btn-primary">
              {t.nav.getQuote}
            </Link>
            <Link href="/contact" className="btn-secondary">
              {tt.resourcesPage.askQuestion}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

