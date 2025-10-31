"use client";

import { useState } from "react";
import ConsentOptIn from "@/components/ConsentOptIn";
import { useLanguage } from "@/lib/language-context";

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    const phoneError = formData.phone ? validatePhone(formData.phone) : ""; // Phone is optional

    if (emailError || phoneError) {
      setErrors({ email: emailError, phone: phoneError });
      setTouched({ email: true, phone: true });
      return;
    }

    setIsSubmitting(true);

    console.log("Contact form submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Thank you for reaching out! We'll respond shortly.");
    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({ email: "", phone: "" });
    setTouched({ email: false, phone: false });
  };

  const isFieldValid = (field: "email" | "phone") => {
    if (!touched[field]) return false;
    if (field === "email") return formData.email && !errors.email;
    if (field === "phone") return formData.phone && formData.phone.replace(/\D/g, "").length === 10 && !errors.phone;
    return false;
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-sand to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-charcoal">
            {t.nav.contact}
          </h1>
          <p className="text-xl md:text-2xl text-charcoal/80 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-sand rounded-lg p-8 border border-taupe/20">
              <h2 className="font-serif text-2xl mb-6 text-charcoal">{t.contact.formTitle}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="label">
                    {t.contact.name} *
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

                <div className="relative">
                  <label htmlFor="email" className="label">
                    {t.contact.email} *
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

                <div className="relative">
                  <label htmlFor="phone" className="label">
                    {t.contact.phone}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phone")}
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

                <div>
                  <label htmlFor="message" className="label">
                    {t.contact.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-field resize-none"
                  />
                </div>

                <ConsentOptIn idPrefix="contact" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t.contact.sending : t.contact.sendMessage}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-2xl mb-6 text-charcoal">{t.contact.getInTouch}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gold/20 flex items-center justify-center">
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
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">{t.contact.phoneLabel}</h3>
                    <p className="text-charcoal/70">
                      <a href="tel:+18001234567" className="hover:text-gold transition-colors">
                        {t.contact.phoneNumber}
                      </a>
                    </p>
                    <p className="text-sm text-charcoal/60 mt-1">
                      {t.contact.phoneHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gold/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gold"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">{t.contact.emailLabel}</h3>
                    <p className="text-charcoal/70">
                      <a href="mailto:info@lifecarechoice.com" className="hover:text-gold transition-colors">
                        {t.contact.emailAddress}
                      </a>
                    </p>
                    <p className="text-sm text-charcoal/60 mt-1">
                      {t.contact.emailResponse}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gold/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gold"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">{t.contact.officeLabel}</h3>
                    <p className="text-charcoal/70">
                      {t.contact.officeAddress}
                    </p>
                    <p className="text-sm text-charcoal/60 mt-2 italic">
                      {t.contact.officeNote}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-taupe/10 rounded-lg border border-taupe/20">
                <h3 className="font-semibold text-charcoal mb-2">{t.contact.urgentTitle}</h3>
                <p className="text-charcoal/70 mb-4">
                  {t.contact.urgentText}
                </p>
                <a href="tel:+18001234567" className="btn-primary inline-block">
                  {t.contact.urgentButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

