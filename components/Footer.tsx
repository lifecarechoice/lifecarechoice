"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-charcoal text-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <Link href="/privacy-policy" className="hover:text-gold transition-colors">
            {t.footer.privacy}
          </Link>
          <span className="text-taupe">·</span>
          <Link href="/terms-of-use" className="hover:text-gold transition-colors">
            {t.footer.terms}
          </Link>
          <span className="text-taupe">·</span>
          <Link href="/do-not-call" className="hover:text-gold transition-colors">
            {t.footer.doNotCall}
          </Link>
        </div>

        {/* Disclosure */}
        <div className="max-w-4xl mx-auto text-center text-sm leading-relaxed mb-6 opacity-90">
          <p>{t.footer.disclosure}</p>
        </div>

        {/* Tagline */}
        <div className="text-center text-xs text-sand/80 mb-4">
          <p>{t.footer.tagline}</p>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} Life Care Choice. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

