"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function ThankYou() {
  const { t } = useLanguage();

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-gradient-radial">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lift">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/20 to-taupe/20 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gold"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 text-charcoal">
            Thank You!
          </h1>

          {/* Message */}
          <p className="text-lg sm:text-xl text-charcoal/70 mb-6 leading-relaxed">
            Your information has been received. A licensed professional will contact you within 24 hours.
          </p>

          <p className="text-base text-charcoal/60 mb-8">
            Check your email for confirmation. If you don't see it, please check your spam folder.
          </p>

          {/* What's Next */}
          <div className="bg-sand/20 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-bold text-lg text-charcoal mb-3">What happens next?</h2>
            <ul className="space-y-2 text-charcoal/70">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>We'll review your information and match you with the best coverage options</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>A licensed agent will call you at your preferred time</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>We'll answer all your questions and help you make an informed decision</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary inline-block">
              Return to Home
            </Link>
            <Link href="/resources" className="btn-secondary inline-block">
              Browse Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

