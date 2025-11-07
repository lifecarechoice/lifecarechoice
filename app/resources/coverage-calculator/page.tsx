"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

interface FormData {
  gender: string;
  birthDate: string;
  state: string;
  tobacco: string;
  coverage: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Quote {
  carrier: string;
  monthlyRate: number;
  annualRate: number;
  rating: string;
  features: string[];
}

interface ConsentState {
  marketing: boolean;
  nonMarketing: boolean;
}

const coverageAmounts = ["5000", "10000", "15000", "20000", "25000", "30000", "35000", "40000", "50000"];

export default function CoverageCalculator() {
  const { t, language } = useLanguage();
  const calculatorCopy = (t as any).calculatorPage;
  const formErrors = (t as any).formErrors || {};
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    birthDate: "",
    state: "",
    tobacco: "",
    coverage: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [showQuotes, setShowQuotes] = useState(false);
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [touched, setTouched] = useState({ email: false, phone: false });
  const [consent, setConsent] = useState<ConsentState>({ marketing: false, nonMarketing: false });

  const totalSteps = 6;
  const locale = language === "es" ? "es-US" : "en-US";

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const validateEmail = (email: string) => {
    if (!email) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : formErrors.invalidEmail || "Please enter a valid email.";
  };

  const validatePhone = (phone: string) => {
    if (!phone) return "";
    const digits = phone.replace(/\D/g, "");
    return digits.length === 10 ? "" : formErrors.invalidPhone || "Please enter a valid phone number.";
  };

  const generateQuotes = () => {
    const age = calculateAge(formData.birthDate);
    const coverageAmount = parseInt(formData.coverage || "0", 10);
    const isSmoker = formData.tobacco === "yes";
    const isMale = formData.gender === "male";

    let baseRate = 3.5;
    if (age < 50) baseRate = 2.0;
    else if (age >= 50 && age < 60) baseRate = 3.5;
    else if (age >= 60 && age < 70) baseRate = 6.5;
    else if (age >= 70 && age < 80) baseRate = 12.0;
    else if (age >= 80) baseRate = 20.0;

    if (isMale) baseRate *= 1.15;
    if (isSmoker) baseRate *= 2.0;

    const carriers = [
      {
        name: "American General (AIG)",
        variance: 0.95,
        rating: "A+",
        features: {
          en: ["No medical exam options", "Flexible payment terms", "24/7 customer service"],
          es: ["Opciones sin examen médico", "Términos de pago flexibles", "Servicio al cliente 24/7"],
        },
      },
      {
        name: "Mutual of Omaha",
        variance: 1.0,
        rating: "A+",
        features: {
          en: ["Guaranteed acceptance options", "Living benefits rider", "Fast approval process"],
          es: ["Opciones de aceptación garantizada", "Beneficio en vida disponible", "Proceso de aprobación rápido"],
        },
      },
      {
        name: "Transamerica",
        variance: 0.92,
        rating: "A",
        features: {
          en: ["Conversion options", "Premium discount programs", "Online account management"],
          es: ["Opciones de conversión", "Programas de descuento en primas", "Gestión de cuenta en línea"],
        },
      },
      {
        name: "Foresters Financial",
        variance: 1.05,
        rating: "A",
        features: {
          en: ["Member benefits included", "Competitive rates", "Community giving programs"],
          es: ["Beneficios para miembros incluidos", "Tarifas competitivas", "Programas de apoyo comunitario"],
        },
      },
      {
        name: "SBLI",
        variance: 0.88,
        rating: "A",
        features: {
          en: ["Direct-to-consumer savings", "Simple application", "No hidden fees"],
          es: ["Ahorros directos al consumidor", "Solicitud sencilla", "Sin cargos ocultos"],
        },
      },
    ];

    const generatedQuotes: Quote[] = carriers.map((carrier) => {
      const monthlyRate = Math.round(baseRate * (coverageAmount / 1000) * carrier.variance * 100) / 100;
      return {
        carrier: carrier.name,
        monthlyRate,
        annualRate: Math.round(monthlyRate * 12 * 100) / 100,
        rating: carrier.rating,
        features: carrier.features[language] || carrier.features.en,
      };
    });

    generatedQuotes.sort((a, b) => a.monthlyRate - b.monthlyRate);

    setQuotes(generatedQuotes);
    setShowQuotes(true);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleContactChange = (field: keyof Pick<FormData, "firstName" | "lastName" | "email" | "phone">, value: string) => {
    if (field === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, phone: formatted }));
      if (touched.phone) {
        setErrors((prev) => ({ ...prev, phone: validatePhone(formatted) }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "email" && touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handleContactBlur = (field: "email" | "phone") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(formData.email) }));
    } else {
      setErrors((prev) => ({ ...prev, phone: validatePhone(formData.phone) }));
    }
  };

  const handleNext = () => {
    if (step === totalSteps) {
      const emailError = validateEmail(formData.email);
      const phoneError = validatePhone(formData.phone);
      setErrors({ email: emailError, phone: phoneError });
      setTouched({ email: true, phone: true });

      if (emailError || phoneError || !consent.marketing || !consent.nonMarketing) {
        return;
      }

      generateQuotes();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.gender !== "";
      case 2:
        return formData.birthDate !== "";
      case 3:
        return formData.state !== "";
      case 4:
        return formData.tobacco !== "";
      case 5:
        return formData.coverage !== "";
      case 6: {
        const hasNames = formData.firstName.trim() !== "" && formData.lastName.trim() !== "";
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);
        return (
          hasNames &&
          formData.email.trim() !== "" &&
          formData.phone.trim() !== "" &&
          emailError === "" &&
          phoneError === "" &&
          consent.marketing &&
          consent.nonMarketing
        );
      }
      default:
        return false;
    }
  };

  const coverageLabels = calculatorCopy.coverageNames || {};
  const ageDisplay = calculatorCopy.steps.birthDate.ageDisplay.replace(
    "{{value}}",
    calculateAge(formData.birthDate).toString()
  );
  const progressStepText = calculatorCopy.progress.step
    .replace("{{current}}", step.toString())
    .replace("{{total}}", totalSteps.toString());
  const progressCompleteText = calculatorCopy.progress.complete.replace(
    "{{value}}",
    Math.round((step / totalSteps) * 100).toString()
  );

  if (showQuotes) {
    return (
      <div className="pt-24">
        <section className="bg-gradient-radial py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-30"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-block mb-4">
              <svg
                className="w-16 h-16 text-gold mx-auto mb-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-charcoal">
              {calculatorCopy.results.title}{" "}
              <span className="gradient-text">{calculatorCopy.results.highlight}</span>
            </h1>
            <p className="text-xl text-charcoal/70">{calculatorCopy.results.subtitle}</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card-premium mb-12 max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl mb-4 text-charcoal text-center">
                {calculatorCopy.results.title} {calculatorCopy.results.highlight}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-sand rounded-lg">
                  <div className="text-sm text-charcoal/70 mb-1">{calculatorCopy.results.summary.coverage}</div>
                  <div className="text-2xl font-bold text-gold">
                    {formatCurrency(parseInt(formData.coverage || "0", 10))}
                  </div>
                </div>
                <div className="p-4 bg-sand rounded-lg">
                  <div className="text-sm text-charcoal/70 mb-1">{calculatorCopy.results.summary.age}</div>
                  <div className="text-2xl font-bold text-gold">{calculateAge(formData.birthDate)}</div>
                </div>
                <div className="p-4 bg-sand rounded-lg">
                  <div className="text-sm text-charcoal/70 mb-1">{calculatorCopy.results.summary.state}</div>
                  <div className="text-2xl font-bold text-gold">{formData.state}</div>
                </div>
                <div className="p-4 bg-sand rounded-lg">
                  <div className="text-sm text-charcoal/70 mb-1">{calculatorCopy.results.summary.tobacco}</div>
                  <div className="text-2xl font-bold text-gold">
                    {formData.tobacco === "yes"
                      ? calculatorCopy.results.tobaccoYes
                      : calculatorCopy.results.tobaccoNo}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {quotes.map((quote, index) => (
                <div
                  key={quote.carrier}
                  className={`card-premium relative overflow-hidden ${index === 0 ? "border-4 border-gold" : ""}`}
                >
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-gold to-gold/70 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm">
                      {calculatorCopy.results.bestRateTag}
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold/30 to-taupe/20 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-gold"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-charcoal">{quote.carrier}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gold font-semibold">Rating: {quote.rating}</span>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-1 text-sm text-charcoal/70">
                        {quote.features.map((feature, idx) => (
                          <li key={`${quote.carrier}-feature-${idx}`} className="flex items-start gap-2">
                            <svg
                              className="w-4 h-4 text-gold flex-shrink-0 mt-0.5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-center py-6 bg-gradient-to-br from-sand/50 to-white rounded-xl">
                      <div className="text-sm text-charcoal/70 mb-2">{calculatorCopy.results.monthlyLabel}</div>
                      <div className="text-5xl font-bold text-charcoal mb-1">{formatCurrency(quote.monthlyRate)}</div>
                      <div className="text-sm text-charcoal/60">
                        {formatCurrency(quote.annualRate)}/{calculatorCopy.results.annualSuffix}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Link href="/get-a-quote" className="btn-primary text-center">
                        {calculatorCopy.results.applyNow}
                      </Link>
                      <button className="btn-secondary">{calculatorCopy.results.learnMore}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-sand/50 rounded-xl border border-taupe/20">
              <p className="text-sm text-charcoal/70 leading-relaxed">
                <strong className="text-charcoal">{calculatorCopy.results.disclaimerTitle} </strong>
                {calculatorCopy.results.disclaimerText}
              </p>
            </div>

            <div className="mt-12 text-center">
              <h3 className="font-serif text-3xl mb-4 text-charcoal">{calculatorCopy.results.readyTitle}</h3>
              <p className="text-lg text-charcoal/70 mb-8 max-w-2xl mx-auto">{calculatorCopy.results.readySubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-a-quote" className="btn-primary">
                  {calculatorCopy.results.ctaPrimary}
                </Link>
                <button
                  onClick={() => {
                    setShowQuotes(false);
                    setStep(1);
                    setFormData({
                      gender: "",
                      birthDate: "",
                      state: "",
                      tobacco: "",
                      coverage: "",
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                    });
                    setConsent({ marketing: false, nonMarketing: false });
                    setErrors({ email: "", phone: "" });
                    setTouched({ email: false, phone: false });
                  }}
                  className="btn-secondary"
                >
                  {calculatorCopy.results.ctaSecondary}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="bg-gradient-radial py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="feature-badge mb-4">{calculatorCopy.hero.badge}</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-charcoal">
            {calculatorCopy.hero.title} <span className="gradient-text">{calculatorCopy.hero.highlight}</span>
          </h1>
          <p className="text-lg text-charcoal/70">{calculatorCopy.hero.subtitle}</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-charcoal">{progressStepText}</span>
              <span className="text-sm text-charcoal/70">{progressCompleteText}</span>
            </div>
            <div className="w-full h-3 bg-sand rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold to-gold/70 transition-all duration-500 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="card-premium min-h-[400px] flex flex-col">
            {step === 1 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">
                  {calculatorCopy.steps.gender.question}
                </h2>
                <p className="text-charcoal/70 mb-8">{calculatorCopy.steps.gender.detail}</p>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, gender: "male" }))}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.gender === "male" ? "border-gold bg-gold/10" : "border-taupe/30 hover:border-gold/50"
                    }`}
                  >
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gold"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span className="text-xl font-bold text-charcoal">
                      {calculatorCopy.steps.gender.options.male}
                    </span>
                  </button>
                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, gender: "female" }))}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.gender === "female" ? "border-gold bg-gold/10" : "border-taupe/30 hover:border-gold/50"
                    }`}
                  >
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gold"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span className="text-xl font-bold text-charcoal">
                      {calculatorCopy.steps.gender.options.female}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">
                  {calculatorCopy.steps.birthDate.question}
                </h2>
                <p className="text-charcoal/70 mb-8">{calculatorCopy.steps.birthDate.detail}</p>
                <div className="flex-1 flex items-center">
                  <div className="w-full">
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
                      max={new Date().toISOString().split("T")[0]}
                      className="input-field text-2xl text-center"
                    />
                    {formData.birthDate && (
                      <p className="text-center mt-4 text-lg text-charcoal/70">
                        {ageDisplay}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">
                  {calculatorCopy.steps.state.question}
                </h2>
                <p className="text-charcoal/70 mb-8">{calculatorCopy.steps.state.detail}</p>
                <div className="flex-1 flex items-center">
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                    className="input-field text-xl"
                  >
                    <option value="">{calculatorCopy.steps.state.placeholder}</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">
                  {calculatorCopy.steps.tobacco.question}
                </h2>
                <p className="text-charcoal/70 mb-8">{calculatorCopy.steps.tobacco.detail}</p>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, tobacco: "no" }))}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.tobacco === "no" ? "border-gold bg-gold/10" : "border-taupe/30 hover:border-gold/50"
                    }`}
                  >
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gold"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-xl font-bold text-charcoal">
                      {calculatorCopy.steps.tobacco.options.no}
                    </span>
                    <p className="text-sm text-charcoal/60 mt-2">{calculatorCopy.steps.tobacco.noDetail}</p>
                  </button>
                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, tobacco: "yes" }))}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.tobacco === "yes" ? "border-gold bg-gold/10" : "border-taupe/30 hover:border-gold/50"
                    }`}
                  >
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gold"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <span className="text-xl font-bold text-charcoal">
                      {calculatorCopy.steps.tobacco.options.yes}
                    </span>
                    <p className="text-sm text-charcoal/60 mt-2">{calculatorCopy.steps.tobacco.yesDetail}</p>
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">
                  {calculatorCopy.steps.coverage.question}
                </h2>
                <p className="text-charcoal/70 mb-8">{calculatorCopy.steps.coverage.detail}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                  {coverageAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setFormData((prev) => ({ ...prev, coverage: amount }))}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        formData.coverage === amount ? "border-gold bg-gold/10" : "border-taupe/30 hover:border-gold/50"
                      }`}
                    >
                      <div className="text-2xl font-bold text-charcoal mb-1">
                        {formatCurrency(parseInt(amount, 10)).replace(".00", "")}
                      </div>
                      <div className="text-xs text-charcoal/60">
                        {coverageLabels[amount] || amount}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">
                  {calculatorCopy.steps.contact.question}
                </h2>
                <p className="text-charcoal/70 mb-8">{calculatorCopy.steps.contact.detail}</p>
                <div className="space-y-4 flex-1">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">{(t as any).form.firstName} *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleContactChange("firstName", e.target.value)}
                        className="input-field"
                        placeholder="John"
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <label className="label">{(t as any).form.lastName} *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleContactChange("lastName", e.target.value)}
                        className="input-field"
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">{(t as any).form.email} *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleContactChange("email", e.target.value)}
                      onBlur={() => handleContactBlur("email")}
                      className={`input-field ${
                        touched.email && errors.email
                          ? "border-red-500 focus:border-red-500"
                          : touched.email && !errors.email
                          ? "border-green-500 focus:border-green-500"
                          : ""
                      }`}
                      placeholder="john.doe@email.com"
                      autoComplete="email"
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="label">{(t as any).form.phone} *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleContactChange("phone", e.target.value)}
                      onBlur={() => handleContactBlur("phone")}
                      className={`input-field ${
                        touched.phone && errors.phone
                          ? "border-red-500 focus:border-red-500"
                          : touched.phone && !errors.phone
                          ? "border-green-500 focus:border-green-500"
                          : ""
                      }`}
                      placeholder="(555) 123-4567"
                      inputMode="tel"
                      maxLength={14}
                      autoComplete="tel"
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div className="bg-sand/50 p-4 rounded-xl text-sm text-charcoal/70 space-y-3">
                    <p>{calculatorCopy.steps.contact.disclaimer}</p>
                    <label className="flex items-start gap-2 text-sm text-charcoal/70">
                      <input
                        type="checkbox"
                        checked={consent.marketing}
                        onChange={(e) => setConsent((prev) => ({ ...prev, marketing: e.target.checked }))}
                        className="mt-0.5 h-4 w-4 accent-gold"
                      />
                      <span>{(t as any).consent.marketing}</span>
                    </label>
                    <label className="flex items-start gap-2 text-sm text-charcoal/70">
                      <input
                        type="checkbox"
                        checked={consent.nonMarketing}
                        onChange={(e) => setConsent((prev) => ({ ...prev, nonMarketing: e.target.checked }))}
                        className="mt-0.5 h-4 w-4 accent-gold"
                      />
                      <span>{(t as any).consent.nonMarketing}</span>
                    </label>
                    <p className="text-center text-xs text-charcoal/60">
                      <a href="/terms-of-use" className="text-gold hover:underline">
                        {(t as any).consent.termsOfService}
                      </a>{" "}
                      &amp;{" "}
                      <a href="/privacy-policy" className="text-gold hover:underline">
                        {(t as any).consent.privacyPolicy}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-taupe/20">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← {calculatorCopy.buttons.back}
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === totalSteps ? calculatorCopy.buttons.seeQuotes : calculatorCopy.buttons.continue} →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
