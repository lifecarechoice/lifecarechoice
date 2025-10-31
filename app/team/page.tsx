"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export default function Team() {
  const { t } = useLanguage();
  const tt = t as any;

  const teamMembers = [
    // Showing founder only per request (localized)
    {
      name: tt.teamPage.founderName,
      role: tt.teamPage.role,
      bio: tt.teamPage.bio,
      why: tt.teamPage.quote,
    },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-radial py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="feature-badge mb-6">{tt.teamPage.badge}</span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-charcoal">
            {tt.teamPage.header.split(' ').slice(0, 2).join(' ')} <span className="gradient-text">{tt.teamPage.header.split(' ').slice(2).join(' ')}</span>
          </h1>
          {/* Optional: If you want a subline here, add to translations and render it */}
        </div>
      </section>

      {/* Team Members */}
      <section className="section-divider bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-start mt-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="card-premium group hover:border-gold/50">
                {/* Headshot or placeholder */}
                <div className="w-36 h-36 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/30 via-taupe/30 to-gold/20 flex items-center justify-center shadow-lg ring-4 ring-white group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  {member.name === "Ach Bousmah" ? (
                    <Image
                      src="/assets/ach-avatar.png"
                      alt={member.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg
                      className="w-20 h-20 text-gold/70"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="font-serif text-2xl md:text-3xl mb-2 text-charcoal">{member.name}</h3>
                  <span className="badge mb-4 inline-block">{member.role}</span>
                  <p className="text-charcoal/80 mb-6 leading-relaxed text-base">{member.bio}</p>
                  <div className="pt-6 border-t-2 border-gold/20">
                    <em className="text-sm italic text-charcoal/70 font-medium">
                      <span className="text-gold">"</span>{member.why}<span className="text-gold">"</span>
                    </em>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="py-20 bg-gradient-to-br from-charcoal via-taupe to-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Need Help Deciding?
          </h2>
          <p className="text-xl mb-10 opacity-90 leading-relaxed">
            Our team works with licensed professionals who can guide you through your options with patience and expertise.
          </p>
          <Link href="/get-a-quote" className="btn-primary inline-block">
            {t.nav.getQuote}
          </Link>
        </div>
      </section>
    </div>
  );
}

