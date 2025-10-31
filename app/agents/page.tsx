"use client";

import { useState } from "react";
import Link from "next/link";
import ConsentOptIn from "@/components/ConsentOptIn";
import { useLanguage } from "@/lib/language-context";

export default function Agents() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    licensed: "",
    experience: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    phone: false,
  });

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, "");
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "";
    if (!emailRegex.test(email)) return "Please enter a valid email.";
    return "";
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.length !== 10) return "Please enter a valid phone number.";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData({ ...formData, [name]: formatted });
      if (touched.phone) {
        setErrors({ ...errors, phone: validatePhone(formatted) });
      }
    } else if (name === "email") {
      setFormData({ ...formData, [name]: value });
      if (touched.email) {
        setErrors({ ...errors, email: validateEmail(value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlur = (field: "email" | "phone") => {
    setTouched({ ...touched, [field]: true });
    if (field === "email") {
      setErrors({ ...errors, email: validateEmail(formData.email) });
    } else if (field === "phone") {
      setErrors({ ...errors, phone: validatePhone(formData.phone) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);

    if (emailError || phoneError) {
      setErrors({ email: emailError, phone: phoneError });
      setTouched({ email: true, phone: true });
      return;
    }

    setIsSubmitting(true);

    console.log("Agent application submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Thank you! We'll review your application and be in touch soon.");
    setIsSubmitting(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      state: "",
      licensed: "",
      experience: "",
    });
    setErrors({ email: "", phone: "" });
    setTouched({ email: false, phone: false });
  };

  const isFieldValid = (field: "email" | "phone") => {
    if (!touched[field]) return false;
    if (field === "email") return formData.email && !errors.email;
    if (field === "phone") return formData.phone.replace(/\D/g, "").length === 10 && !errors.phone;
    return false;
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-charcoal to-taupe text-sand py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            {(t as any).agentsPage.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            {(t as any).agentsPage.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-charcoal text-center">
            {(t as any).agentsPage.whyTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <div className="w-12 h-12 mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-3 text-charcoal">{(t as any).agentsPage.benefit1Title}</h3>
              <p className="text-charcoal/70">
                {(t as any).agentsPage.benefit1Desc}
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-3 text-charcoal">{(t as any).agentsPage.benefit2Title}</h3>
              <p className="text-charcoal/70">
                {(t as any).agentsPage.benefit2Desc}
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-3 text-charcoal">{(t as any).agentsPage.benefit3Title}</h3>
              <p className="text-charcoal/70">
                {(t as any).agentsPage.benefit3Desc}
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gold"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-3 text-charcoal">{(t as any).agentsPage.benefit4Title}</h3>
              <p className="text-charcoal/70">
                {(t as any).agentsPage.benefit4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 md:py-24 bg-sand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 shadow-subtle">
            <h2 className="font-serif text-3xl mb-6 text-center text-charcoal">
              {(t as any).agentsPage.formTitle}
            </h2>
            <p className="text-center text-charcoal/70 mb-8">
              {(t as any).agentsPage.formSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="label">
                  {(t as any).agentsPage.fullName} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="phone" className="label">
                    {(t as any).agentsPage.phone} *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phone")}
                      required
                      placeholder="(555) 123-4567"
                      className={`w-full px-3 py-3 border rounded-md transition-all duration-200 focus:outline-none ${
                        errors.phone && touched.phone
                          ? "border-red-500 focus:border-red-500"
                          : isFieldValid("phone")
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-300 focus:border-gold"
                      }`}
                      style={{
                        borderRadius: "6px",
                        padding: "12px",
                      }}
                    />
                    {isFieldValid("phone") && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                        ✓
                      </span>
                    )}
                  </div>
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="email" className="label">
                    {(t as any).agentsPage.email} *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      required
                      placeholder="john.doe@example.com"
                      className={`w-full px-3 py-3 border rounded-md transition-all duration-200 focus:outline-none ${
                        errors.email && touched.email
                          ? "border-red-500 focus:border-red-500"
                          : isFieldValid("email")
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-300 focus:border-gold"
                      }`}
                      style={{
                        borderRadius: "6px",
                        padding: "12px",
                      }}
                    />
                    {isFieldValid("email") && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                        ✓
                      </span>
                    )}
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="state" className="label">
                  {(t as any).agentsPage.state} *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  maxLength={2}
                  placeholder="CA"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="licensed" className="label">
                  {(t as any).agentsPage.licensed} *
                </label>
                <select
                  id="licensed"
                  name="licensed"
                  value={formData.licensed}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="label">
                  {(t as any).agentsPage.experience} *
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select...</option>
                  <option value="new">{(t as any).agentsPage.expNew}</option>
                  <option value="less-1">{(t as any).agentsPage.expLess1}</option>
                  <option value="1-3">{(t as any).agentsPage.exp1to3}</option>
                  <option value="3-plus">{(t as any).agentsPage.exp3plus}</option>
                </select>
              </div>

              {/* Consent */}
              <ConsentOptIn idPrefix="agent" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (t as any).agentsPage.sending : (t as any).agentsPage.submit}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl mb-6 text-charcoal">
            {(t as any).agentsPage.questionsTitle}
          </h2>
          <p className="text-lg text-charcoal/80 mb-8">
            {(t as any).agentsPage.questionsText}
          </p>
        </div>
      </section>
    </div>
  );
}

