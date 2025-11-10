"use client";

import { useMemo, useState } from "react";
import SuccessModal from "@/components/SuccessModal";

type CoverageAmount =
  | "$5,000"
  | "$10,000"
  | "$15,000"
  | "$20,000"
  | "$25,000"
  | "$30,000+";

type Gender = "male" | "female" | "";
type YesNo = "yes" | "no" | "";
type BeneficiaryRelationship = "spouse" | "children" | "other" | "";

interface FormState {
  coverage: CoverageAmount | "";
  state: string;
  gender: Gender;
  birthDate: string;
  beneficiaryRelationship: BeneficiaryRelationship;
  hasLifeInsurance: YesNo;
  hasBankAccount: YesNo;
  healthHistory: YesNo;
  beneficiaryName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

const INITIAL_STATE: FormState = {
  coverage: "",
  state: "",
  gender: "",
  birthDate: "",
  beneficiaryRelationship: "",
  hasLifeInsurance: "",
  hasBankAccount: "",
  healthHistory: "",
  beneficiaryName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  consent: false,
};

const COVERAGE_OPTIONS: CoverageAmount[] = [
  "$5,000",
  "$10,000",
  "$15,000",
  "$20,000",
  "$25,000",
  "$30,000+",
];

const STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const RELATIONSHIP_OPTIONS: { value: BeneficiaryRelationship; label: string }[] =
  [
    { value: "spouse", label: "Spouse" },
    { value: "children", label: "My Children" },
    { value: "other", label: "Other" },
  ];

const STEP_TITLES = [
  "How much coverage would give you peace of mind?",
  "Great! Which state do you live in?",
  "What is your gender?",
  "When were you born?",
  "Who will be the beneficiary?",
  "Do you currently have life insurance?",
  "Do you have a bank account?",
  "Do you have a history of cancer, heart attack, diabetes, or stroke?",
  "Beneficiary name",
  "What's your name?",
  "Where should we send your personalized coverage details?",
];

const TOTAL_STEPS = STEP_TITLES.length;

async function submitLeadStub(data: FormState) {
  console.log("Final expense lead ready to submit:", data);
  return Promise.resolve(true);
}

export default function FinalExpenseQuotePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const progress = useMemo(
    () => Math.round(((step - 1) / TOTAL_STEPS) * 100),
    [step]
  );

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!form.coverage) newErrors.coverage = "Select an amount.";
        break;
      case 2:
        if (!form.state) newErrors.state = "Select your state.";
        break;
      case 3:
        if (!form.gender) newErrors.gender = "Select your gender.";
        break;
      case 4:
        if (!form.birthDate) newErrors.birthDate = "Enter your birth date.";
        break;
      case 5:
        if (!form.beneficiaryRelationship)
          newErrors.beneficiaryRelationship = "Select a beneficiary.";
        break;
      case 6:
        if (!form.hasLifeInsurance)
          newErrors.hasLifeInsurance = "Choose an option.";
        break;
      case 7:
        if (!form.hasBankAccount) newErrors.hasBankAccount = "Choose an option.";
        break;
      case 8:
        if (!form.healthHistory) newErrors.healthHistory = "Choose an option.";
        break;
      case 9:
        if (!form.beneficiaryName.trim())
          newErrors.beneficiaryName = "Enter a beneficiary name.";
        break;
      case 10:
        if (!form.firstName.trim()) newErrors.firstName = "First name required.";
        if (!form.lastName.trim()) newErrors.lastName = "Last name required.";
        break;
      case 11: {
        if (!form.email.trim()) newErrors.email = "Email required.";
        else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(form.email)) {
            newErrors.email = "Enter a valid email.";
          }
        }
        const digits = form.phone.replace(/\D/g, "");
        if (digits.length !== 10) newErrors.phone = "Enter a valid phone.";
        if (!form.consent)
          newErrors.consent = "Consent is required to proceed.";
        break;
      }
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    setErrors({});
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (step === TOTAL_STEPS) {
      setIsSubmitting(true);
      try {
        await submitLeadStub(form);
        setShowSuccess(true);
        setForm(INITIAL_STATE);
        setStep(1);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    goToNextStep();
  };

  const handleBack = () => {
    if (step === 1 || isSubmitting) return;
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return !!form.coverage;
      case 2:
        return !!form.state;
      case 3:
        return !!form.gender;
      case 4:
        return !!form.birthDate;
      case 5:
        return !!form.beneficiaryRelationship;
      case 6:
        return !!form.hasLifeInsurance;
      case 7:
        return !!form.hasBankAccount;
      case 8:
        return !!form.healthHistory;
      case 9:
        return form.beneficiaryName.trim().length > 0;
      case 10:
        return (
          form.firstName.trim().length > 0 && form.lastName.trim().length > 0
        );
      case 11: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const digits = form.phone.replace(/\D/g, "");
        return (
          emailRegex.test(form.email) && digits.length === 10 && form.consent
        );
      }
      default:
        return false;
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Thank You!"
        message="Your information has been received. A licensed professional will reach out to you soon."
      />

      <div className="bg-sand/30 min-h-screen flex items-center mt-24">
        <main className="w-full py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="card-premium p-6 sm:p-8 lg:p-10 shadow-xl shadow-gold/10">
              <div className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">
                  Final Expense Coverage In Minutes
                </h1>
                <p className="mt-3 text-charcoal/70">
                  Answer a few quick questions so we can match you with the best
                  final expense options.
                </p>
              </div>

              <div className="w-full bg-sand/40 h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold/80 transition-all duration-300"
                  style={{ width: `${Math.min(progress + 100 / TOTAL_STEPS, 100)}%` }}
                ></div>
              </div>

              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-sm uppercase tracking-wide text-gold font-semibold mb-2">
                    Step {step}
                  </p>
                  <h2 className="font-serif text-2xl text-charcoal">
                    {STEP_TITLES[step - 1]}
                  </h2>
                </div>

                {step === 1 && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {COVERAGE_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                    onClick={() => {
                      updateForm("coverage", option);
                    }}
                        className={`rounded-lg border px-4 py-4 text-left transition-shadow ${
                          form.coverage === option
                            ? "border-gold bg-gold/10 shadow-lg shadow-gold/10"
                            : "border-sand hover:border-gold/60 bg-white"
                        }`}
                      >
                        <span className="block text-lg font-semibold text-charcoal">
                          {option}
                        </span>
                        <span className="text-sm text-charcoal/60">
                          Guaranteed coverage option
                        </span>
                      </button>
                    ))}
                    {errors.coverage && (
                      <p className="text-sm text-red-500">{errors.coverage}</p>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <select
                      value={form.state}
                      onChange={(e) => updateForm("state", e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select your state...</option>
                      {STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-sm text-red-500 mt-2">{errors.state}</p>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateForm("gender", option.value as Gender)}
                        className={`rounded-lg border px-4 py-4 text-left transition-shadow ${
                          form.gender === option.value
                            ? "border-gold bg-gold/10 shadow-lg shadow-gold/10"
                            : "border-sand hover:border-gold/60 bg-white"
                        }`}
                      >
                        <span className="block text-lg font-semibold text-charcoal">
                          {option.label}
                        </span>
                      </button>
                    ))}
                    {errors.gender && (
                      <p className="text-sm text-red-500">{errors.gender}</p>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <input
                      type="date"
                      value={form.birthDate}
                      onChange={(e) => updateForm("birthDate", e.target.value)}
                      className="input-field"
                      max={new Date().toISOString().split("T")[0]}
                    />
                    {errors.birthDate && (
                      <p className="text-sm text-red-500 mt-2">{errors.birthDate}</p>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <div className="grid sm:grid-cols-3 gap-3">
                    {RELATIONSHIP_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          updateForm("beneficiaryRelationship", option.value)
                        }
                        className={`rounded-lg border px-4 py-4 text-left transition-shadow ${
                          form.beneficiaryRelationship === option.value
                            ? "border-gold bg-gold/10 shadow-lg shadow-gold/10"
                            : "border-sand hover:border-gold/60 bg-white"
                        }`}
                      >
                        <span className="block text-lg font-semibold text-charcoal">
                          {option.label}
                        </span>
                      </button>
                    ))}
                    {errors.beneficiaryRelationship && (
                      <p className="text-sm text-red-500">
                        {errors.beneficiaryRelationship}
                      </p>
                    )}
                  </div>
                )}

                {step === 6 && (
                  <YesNoButtons
                    value={form.hasLifeInsurance}
                    onChange={(value) => updateForm("hasLifeInsurance", value)}
                    error={errors.hasLifeInsurance}
                  />
                )}

                {step === 7 && (
                  <YesNoButtons
                    value={form.hasBankAccount}
                    onChange={(value) => updateForm("hasBankAccount", value)}
                    error={errors.hasBankAccount}
                  />
                )}

                {step === 8 && (
                  <YesNoButtons
                    value={form.healthHistory}
                    onChange={(value) => updateForm("healthHistory", value)}
                    error={errors.healthHistory}
                  />
                )}

                {step === 9 && (
                  <div>
                    <input
                      type="text"
                      value={form.beneficiaryName}
                      onChange={(e) => updateForm("beneficiaryName", e.target.value)}
                      className="input-field"
                      placeholder="Who should receive the benefit?"
                    />
                    {errors.beneficiaryName && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.beneficiaryName}
                      </p>
                    )}
                  </div>
                )}

                {step === 10 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => updateForm("firstName", e.target.value)}
                        className="input-field"
                        placeholder="First name"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => updateForm("lastName", e.target.value)}
                        className="input-field"
                        placeholder="Last name"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === 11 && (
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      className="input-field"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-2">{errors.email}</p>
                    )}
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm("phone", formatPhone(e.target.value))}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-2">{errors.phone}</p>
                    )}
                    <label className="flex items-start gap-3 text-sm text-charcoal/70">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => updateForm("consent", e.target.checked)}
                        className="mt-1 h-4 w-4 accent-gold"
                      />
                      <span>
                        By checking this box and submitting, I agree that Life Care Choice
                        and its licensed professionals may contact me about final expense
                        options at the number and email provided, including by text, call,
                        or email. Message and data rates may apply. Consent is not required
                        to make a purchase.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-sm text-red-500">{errors.consent}</p>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-sand/60">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 1 || isSubmitting}
                    className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="btn-primary min-w-[160px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : step === TOTAL_STEPS
                      ? "See My Quotes →"
                      : "Next →"}
                  </button>
                </div>

                <p className="text-xs text-charcoal/60 text-center">
                  Your information is encrypted and secure. We never sell your data.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

interface YesNoButtonsProps {
  value: YesNo;
  onChange: (value: YesNo) => void;
  error?: string;
}

function YesNoButtons({ value, onChange, error }: YesNoButtonsProps) {
  return (
    <div className="space-y-2">
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { value: "yes" as YesNo, label: "Yes" },
          { value: "no" as YesNo, label: "No" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-lg border px-4 py-4 text-left transition-shadow ${
              value === option.value
                ? "border-gold bg-gold/10 shadow-lg shadow-gold/10"
                : "border-sand hover:border-gold/60"
            }`}
          >
            <span className="block text-lg font-semibold text-charcoal">
              {option.label}
            </span>
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

