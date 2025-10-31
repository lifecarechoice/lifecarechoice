"use client";

import Image from "next/image";

interface CompaniesSectionProps {
  title?: string;
  subtitle?: string;
  showDisclaimer?: boolean;
  hideHeader?: boolean;
}

export default function CompaniesSection({
  title = "Trusted Insurance Partners",
  subtitle = "We work with America's leading insurance carriers to bring you the best coverage options",
  showDisclaimer = true,
  hideHeader = false,
}: CompaniesSectionProps) {
  const companies = [
    { name: "Aetna", logo: "/companies/Aetna-Logo-light-white.webp" },
    { name: "Aflac", logo: "/companies/aflac-white-logo-carrier.webp" },
    { name: "AIG", logo: "/companies/AIG_logo-light-2048x1054.webp" },
    { name: "American National", logo: "/companies/American_National_Insurance_Company_Logo-light.webp" },
    { name: "American Amicable", logo: "/companies/american-amicable-logo-light.webp" },
    { name: "Americo", logo: "/companies/americo-logo-light.webp" },
    { name: "Athene", logo: "/companies/athene-white-logo.webp" },
    { name: "Columbus Life", logo: "/companies/columbus-logo.webp" },
    { name: "Ethos", logo: "/companies/ethos-logo-white.webp" },
    { name: "Transamerica", logo: "/companies/Transamerica-Logo-light.webp" },
    { name: "Family First Life", logo: "/companies/fg-logo-white-v2.webp" },
    { name: "Foresters Financial", logo: "/companies/foresters-financial-logo.webp" },
    { name: "Global Atlantic", logo: "/companies/global-atlantic-financial-logo.webp" },
    { name: "Liberty Bankers", logo: "/companies/liberty-bankers-logo-white.webp" },
    { name: "Lincoln Financial", logo: "/companies/Lincoln-Financial-white-Logo.webp" },
    { name: "Mutual of Omaha", logo: "/companies/Mutual-of-Omaha-logo-white.webp" },
    { name: "Nassau", logo: "/companies/nassau-white-stack-1000.webp" },
    { name: "National Life", logo: "/companies/national-life-logo-light.webp" },
    { name: "North American", logo: "/companies/north-american-logo-white-v2.webp" },
    { name: "Royal Neighbors", logo: "/companies/royal-white-shaded.webp" },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-charcoal via-charcoal/95 to-taupe/90 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {!hideHeader && (
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 md:mb-6 text-white px-4">
              {title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
              {subtitle}
            </p>
          </div>
        )}

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all duration-300 group"
            >
              <div className="relative w-full h-12 sm:h-14 md:h-16 flex items-center justify-center">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  className="object-contain grayscale-0 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        {showDisclaimer && (
          <p className="text-center text-xs sm:text-sm text-white/50 italic px-4">
            Logos are trademarks of their respective owners. Carrier availability varies by state and agent appointment.
          </p>
        )}
      </div>
    </section>
  );
}

