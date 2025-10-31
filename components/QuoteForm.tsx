"use client";

import { useState } from "react";
import Link from "next/link";
import ConsentOptIn from "@/components/ConsentOptIn";
import { useLanguage } from "@/lib/language-context";
import SuccessModal from "./SuccessModal";

interface QuoteFormProps {
  showTitle?: boolean;
}

export default function QuoteForm({ showTitle = true }: QuoteFormProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zip: "",
    state: "",
    productInterest: "",
    bestTime: "",
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

    // Track TCPA consent
    const consentData = {
      ...formData,
      timestamp: new Date().toISOString(),
      ipAddress: "tracked-server-side",
      consent: true,
    };

    console.log("Form submitted:", consentData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success modal instead of alert
    setShowSuccessModal(true);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      zip: "",
      state: "",
      productInterest: "",
      bestTime: "",
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
    <>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Thank You!"
        message="Your information has been received. A licensed professional will reach out to you soon."
      />

      <div className="bg-gradient-to-br from-white to-sand/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-lift border-2 border-gold/20 max-w-3xl mx-auto backdrop-blur-sm">
        {showTitle && (
            <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-2 sm:mb-3">{t.nav.getQuote}</h3>
                <p className="text-sm sm:text-base text-charcoal/70">{t.home.formTitle}</p>
              </div>
        )}
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="label">
              {t.form.firstName} *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="label">
              {t.form.lastName} *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="phone" className="label">
              {t.form.phone} *
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
              {t.form.email} *
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="zip" className="label">
              {t.form.zip} *
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              pattern="[0-9]{5}"
              placeholder="12345"
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="state" className="label">
              {t.form.state} *
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
        </div>

        <div>
          <label htmlFor="productInterest" className="label">
            {t.form.productInterest} *
          </label>
          <select
            id="productInterest"
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select...</option>
            <option value="final-expense">Final Expense</option>
            <option value="mortgage-protection">Mortgage Protection</option>
            <option value="iul">Indexed Universal Life (IUL)</option>
            <option value="not-sure">Not Sure</option>
          </select>
        </div>

        <div>
          <label htmlFor="bestTime" className="label">
            {t.form.bestTime}
          </label>
          <select
            id="bestTime"
            name="bestTime"
            value={formData.bestTime}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select...</option>
            <option value="morning">Morning (8am-12pm)</option>
            <option value="afternoon">Afternoon (12pm-5pm)</option>
            <option value="evening">Evening (5pm-8pm)</option>
          </select>
        </div>

        {/* TCPA Consent */}
        <ConsentOptIn idPrefix="quote" />

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.form.sending}
              </>
            ) : (
              <>
                {t.form.submit}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </>
            )}
          </span>
        </button>
        
            {/* Security Notice */}
            <p className="text-xs text-center text-charcoal/60 mt-4">
              🔒 {t.home.securityNotice}
            </p>
      </form>
    </div>
    </>
  );
}
