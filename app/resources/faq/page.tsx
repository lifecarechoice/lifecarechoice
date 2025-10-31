"use client";

import { useState } from "react";
import Link from "next/link";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I get a quote?",
          a: "Simply fill out our online form or call us directly. A licensed agent will contact you within 24 hours to discuss your needs and provide personalized quotes from multiple carriers."
        },
        {
          q: "How long does the application process take?",
          a: "It varies by policy type. For simplified issue policies (often used for Final Expense), approval can take just a few days. Traditional underwritten policies may take 4-6 weeks, including medical exams and review."
        },
        {
          q: "Do I need a medical exam?",
          a: "Not always. Many Final Expense and some term policies offer no-exam options. The requirement depends on your age, coverage amount, and health history. Your agent will explain your options."
        },
      ]
    },
    {
      category: "Coverage & Costs",
      questions: [
        {
          q: "How much life insurance do I need?",
          a: "A general guideline is 10-12 times your annual income, but your actual needs depend on debts, future expenses (like college), and your family's financial situation. Use our Coverage Calculator for a personalized estimate."
        },
        {
          q: "What factors affect my premium?",
          a: "Age, health, lifestyle (smoking, hobbies), coverage amount, policy type, and term length all impact your premium. Younger, healthier applicants typically get lower rates."
        },
        {
          q: "Can I get coverage if I have health issues?",
          a: "Yes! Many carriers offer policies for people with pre-existing conditions. Options include simplified issue, guaranteed issue, or rated policies. Your agent will help find the best fit."
        },
      ]
    },
    {
      category: "Policy Management",
      questions: [
        {
          q: "What happens if I miss a payment?",
          a: "Most policies have a 30-day grace period. If you miss payment during that time, your policy remains active. After the grace period, your policy may lapse. Some permanent policies can use cash value to cover missed premiums."
        },
        {
          q: "Can I cancel my policy?",
          a: "Yes, you can cancel anytime. Term policies have no cash value, so you simply stop paying. Permanent policies may have surrender charges and tax implications if you cash out. Consult your agent before canceling."
        },
        {
          q: "Can I increase my coverage later?",
          a: "Some policies offer guaranteed insurability riders that let you increase coverage at specific life events without new medical underwriting. Otherwise, you'd need to apply for a new policy."
        },
      ]
    },
    {
      category: "About Life Care Choice",
      questions: [
        {
          q: "Is Life Care Choice an insurance company?",
          a: "No, we're a marketing and support organization. We connect you with licensed independent insurance agents who represent multiple carriers. This means you get objective advice and can compare options."
        },
        {
          q: "Do you charge any fees?",
          a: "No. Our services are completely free to you. We're compensated by insurance carriers when you purchase a policy, but this doesn't affect your premium—you pay the same price as buying directly."
        },
        {
          q: "Are your agents licensed?",
          a: "Yes! All agents in our network are state-licensed and required to maintain continuing education. They're authorized to sell in their specific states and follow all regulatory requirements."
        },
      ]
    },
    {
      category: "Claims & Beneficiaries",
      questions: [
        {
          q: "How do beneficiaries file a claim?",
          a: "Beneficiaries should contact the insurance company directly with the policy number and a certified death certificate. Most claims are paid within 30-60 days. Your agent can guide your family through the process."
        },
        {
          q: "Can I change my beneficiaries?",
          a: "Yes, as long as you haven't designated an irrevocable beneficiary (rare). You can update beneficiaries anytime by completing a form with your insurance company."
        },
        {
          q: "What if my beneficiary dies before me?",
          a: "The death benefit goes to contingent (secondary) beneficiaries if named. If no contingent beneficiaries exist, it typically goes to your estate and is distributed according to your will or state law."
        },
      ]
    },
  ];

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const index = categoryIndex * 100 + questionIndex;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-24">
      <section className="bg-gradient-radial py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="feature-badge mb-4">Quick Answers</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-charcoal">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-xl text-charcoal/70">Get instant answers to common questions about life insurance</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="font-serif text-3xl mb-6 text-charcoal flex items-center gap-3">
                <span className="w-2 h-10 bg-gold rounded-full"></span>
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const index = catIndex * 100 + qIndex;
                  const isOpen = openIndex === index;
                  
                  return (
                    <div key={qIndex} className="card cursor-pointer" onClick={() => toggleQuestion(catIndex, qIndex)}>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-bold text-charcoal text-lg flex-1">{faq.q}</h3>
                        <svg
                          className={`w-6 h-6 text-gold flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                      
                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-taupe/20">
                          <p className="text-charcoal/80 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-sand via-white to-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl mb-6 text-charcoal">
            Still Have Questions?
          </h2>
          <p className="text-xl text-charcoal/70 mb-8">
            Our licensed professionals are here to help. Get personalized answers to your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote" className="btn-primary">
              Get a Free Quote
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

