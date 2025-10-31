"use client";

import { useState } from "react";
import Link from "next/link";

interface FormData {
  gender: string;
  birthDate: string;
  state: string;
  tobacco: string;
  coverage: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

interface Quote {
  carrier: string;
  monthlyRate: number;
  annualRate: number;
  rating: string;
  features: string[];
}

export default function CoverageCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    birthDate: "",
    state: "",
    tobacco: "",
    coverage: "",
  });
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [showQuotes, setShowQuotes] = useState(false);

  const totalSteps = 6;

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const generateQuotes = () => {
    const age = calculateAge(formData.birthDate);
    const coverageAmount = parseInt(formData.coverage);
    const isSmoker = formData.tobacco === "yes";
    const isMale = formData.gender === "male";

    // Base rate per $1000 of coverage (Final Expense rates - higher than term)
    let baseRate = 3.5; // Starting rate for healthy 50-year-old
    
    // Age adjustments for Final Expense (seniors)
    if (age < 50) baseRate = 2.0;
    else if (age >= 50 && age < 60) baseRate = 3.5;
    else if (age >= 60 && age < 70) baseRate = 6.5;
    else if (age >= 70 && age < 80) baseRate = 12.0;
    else if (age >= 80) baseRate = 20.0;

    // Gender adjustment (males typically pay slightly more)
    if (isMale) baseRate *= 1.15;

    // Tobacco adjustment (smokers pay significantly more)
    if (isSmoker) baseRate *= 2.0;

    // Generate quotes from different carriers with variation
    const carriers = [
      { 
        name: "American General (AIG)", 
        variance: 0.95, 
        rating: "A+",
        features: ["No medical exam options", "Flexible payment terms", "24/7 customer service"]
      },
      { 
        name: "Mutual of Omaha", 
        variance: 1.0, 
        rating: "A+",
        features: ["Guaranteed acceptance options", "Living benefits rider", "Fast approval process"]
      },
      { 
        name: "Transamerica", 
        variance: 0.92, 
        rating: "A",
        features: ["Conversion options", "Premium discount programs", "Online account management"]
      },
      { 
        name: "Foresters Financial", 
        variance: 1.05, 
        rating: "A",
        features: ["Member benefits included", "Competitive rates", "Community giving programs"]
      },
      { 
        name: "SBLI", 
        variance: 0.88, 
        rating: "A",
        features: ["Direct-to-consumer savings", "Simple application", "No hidden fees"]
      },
    ];

    const generatedQuotes: Quote[] = carriers.map(carrier => {
      const monthlyRate = Math.round((baseRate * (coverageAmount / 1000) * carrier.variance) * 100) / 100;
      return {
        carrier: carrier.name,
        monthlyRate: monthlyRate,
        annualRate: Math.round(monthlyRate * 12 * 100) / 100,
        rating: carrier.rating,
        features: carrier.features,
      };
    });

    // Sort by monthly rate (lowest first)
    generatedQuotes.sort((a, b) => a.monthlyRate - b.monthlyRate);

    setQuotes(generatedQuotes);
    setShowQuotes(true);
  };

  const handleNext = () => {
    if (step === totalSteps) {
      generateQuotes();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.gender !== "";
      case 2: return formData.birthDate !== "";
      case 3: return formData.state !== "";
      case 4: return formData.tobacco !== "";
      case 5: return formData.coverage !== "";
      case 6: return formData.firstName && formData.lastName && formData.email && formData.phone;
      default: return false;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (showQuotes) {
    return (
      <div className="pt-24">
        <section className="bg-gradient-radial py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-30"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-block mb-4">
              <svg className="w-16 h-16 text-gold mx-auto mb-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-charcoal">
              Your <span className="gradient-text">Personalized Quotes</span>
            </h1>
            <p className="text-xl text-charcoal/70">
              Based on your information, here are your estimated rates from top carriers
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Summary Card */}
            <div className="card-premium mb-12 max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl mb-4 text-charcoal text-center">Your Information</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-sand rounded-lg">
                  <div className="text-sm text-charcoal/70 mb-1">Coverage Amount</div>
                  <div className="text-2xl font-bold text-gold">{formatCurrency(parseInt(formData.coverage))}</div>
                </div>
                <div className="p-4 bg-sand rounded-lg">
                  <div className="text-sm text-charcoal/70 mb-1">Age</div>
                  <div className="text-2xl font-bold text-gold">{calculateAge(formData.birthDate)}</div>
                </div>
                <div className="p-4 bg-sand rounded-lg">
                  <div className="text-sm text-charcoal/70 mb-1">State</div>
                  <div className="text-2xl font-bold text-gold">{formData.state}</div>
                </div>
                <div className="p-4 bg-sand rounded-lg">
                  <div className="text-sm text-charcoal/70 mb-1">Tobacco Use</div>
                  <div className="text-2xl font-bold text-gold">{formData.tobacco === "yes" ? "Yes" : "No"}</div>
                </div>
              </div>
            </div>

            {/* Quotes */}
            <div className="space-y-6">
              {quotes.map((quote, index) => (
                <div key={index} className={`card-premium relative overflow-hidden ${index === 0 ? 'border-4 border-gold' : ''}`}>
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-gold to-gold/70 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm">
                      BEST RATE
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold/30 to-taupe/20 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
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
                          <li key={idx} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-center py-6 bg-gradient-to-br from-sand/50 to-white rounded-xl">
                      <div className="text-sm text-charcoal/70 mb-2">Estimated Monthly Premium</div>
                      <div className="text-5xl font-bold text-charcoal mb-1">{formatCurrency(quote.monthlyRate)}</div>
                      <div className="text-sm text-charcoal/60">
                        {formatCurrency(quote.annualRate)}/year
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Link href="/get-a-quote" className="btn-primary text-center">
                        Apply Now
                      </Link>
                      <button className="btn-secondary">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-12 p-6 bg-sand/50 rounded-xl border border-taupe/20">
              <p className="text-sm text-charcoal/70 leading-relaxed">
                <strong className="text-charcoal">Important:</strong> These are estimated rates based on the information provided and industry averages. Actual rates may vary based on detailed underwriting, health exam results, and carrier-specific criteria. Final rates are determined by the insurance carrier after full application review. Coverage availability varies by state.
              </p>
            </div>

            {/* Next Steps */}
            <div className="mt-12 text-center">
              <h3 className="font-serif text-3xl mb-4 text-charcoal">Ready to Lock in Your Rate?</h3>
              <p className="text-lg text-charcoal/70 mb-8 max-w-2xl mx-auto">
                Connect with a licensed agent who can help you apply, answer questions, and get you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-a-quote" className="btn-primary">
                  Speak with an Agent
                </Link>
                <button onClick={() => {
                  setShowQuotes(false);
                  setStep(1);
                  setFormData({
                    gender: "",
                    birthDate: "",
                    state: "",
                    tobacco: "",
                    coverage: "",
                  });
                }} className="btn-secondary">
                  Start Over
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
          <span className="feature-badge mb-4">Get Your Quote</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-charcoal">
            Find Your <span className="gradient-text">Perfect Rate</span>
          </h1>
          <p className="text-lg text-charcoal/70">Answer a few quick questions to see personalized quotes</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-charcoal">Step {step} of {totalSteps}</span>
              <span className="text-sm text-charcoal/70">{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full h-3 bg-sand rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold to-gold/70 transition-all duration-500 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Cards */}
          <div className="card-premium min-h-[400px] flex flex-col">
            {/* Step 1: Gender */}
            {step === 1 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">What is your gender?</h2>
                <p className="text-charcoal/70 mb-8">This helps us provide accurate rate estimates</p>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <button
                    onClick={() => setFormData({...formData, gender: "male"})}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.gender === "male" 
                        ? "border-gold bg-gold/10" 
                        : "border-taupe/30 hover:border-gold/50"
                    }`}
                  >
                    <svg className="w-16 h-16 mx-auto mb-4 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span className="text-xl font-bold text-charcoal">Male</span>
                  </button>
                  <button
                    onClick={() => setFormData({...formData, gender: "female"})}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.gender === "female" 
                        ? "border-gold bg-gold/10" 
                        : "border-taupe/30 hover:border-gold/50"
                    }`}
                  >
                    <svg className="w-16 h-16 mx-auto mb-4 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span className="text-xl font-bold text-charcoal">Female</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date of Birth */}
            {step === 2 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">What is your date of birth?</h2>
                <p className="text-charcoal/70 mb-8">Age is a key factor in determining your rate</p>
                <div className="flex-1 flex items-center">
                  <div className="w-full">
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      max={new Date().toISOString().split('T')[0]}
                      className="input-field text-2xl text-center"
                    />
                    {formData.birthDate && (
                      <p className="text-center mt-4 text-lg text-charcoal/70">
                        Age: <span className="font-bold text-gold">{calculateAge(formData.birthDate)} years old</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: State */}
            {step === 3 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">What state do you live in?</h2>
                <p className="text-charcoal/70 mb-8">Rates vary by state regulation</p>
                <div className="flex-1 flex items-center">
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="input-field text-xl"
                  >
                    <option value="">Select your state...</option>
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

            {/* Step 4: Tobacco */}
            {step === 4 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">Do you use tobacco products?</h2>
                <p className="text-charcoal/70 mb-8">Including cigarettes, cigars, chewing tobacco, or vaping</p>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <button
                    onClick={() => setFormData({...formData, tobacco: "no"})}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.tobacco === "no" 
                        ? "border-gold bg-gold/10" 
                        : "border-taupe/30 hover:border-gold/50"
                    }`}
                  >
                    <svg className="w-16 h-16 mx-auto mb-4 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-xl font-bold text-charcoal">No</span>
                    <p className="text-sm text-charcoal/60 mt-2">Non-tobacco user</p>
                  </button>
                  <button
                    onClick={() => setFormData({...formData, tobacco: "yes"})}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.tobacco === "yes" 
                        ? "border-gold bg-gold/10" 
                        : "border-taupe/30 hover:border-gold/50"
                    }`}
                  >
                    <svg className="w-16 h-16 mx-auto mb-4 text-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <span className="text-xl font-bold text-charcoal">Yes</span>
                    <p className="text-sm text-charcoal/60 mt-2">Tobacco user</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Coverage Amount */}
            {step === 5 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">How much coverage do you need?</h2>
                <p className="text-charcoal/70 mb-8">Final expense coverage to help with funeral costs and final bills</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                  {["5000", "10000", "15000", "20000", "25000", "30000", "35000", "40000", "50000"].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setFormData({...formData, coverage: amount})}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        formData.coverage === amount 
                          ? "border-gold bg-gold/10" 
                          : "border-taupe/30 hover:border-gold/50"
                      }`}
                    >
                      <div className="text-2xl font-bold text-charcoal mb-1">
                        {formatCurrency(parseInt(amount)).replace('.00', '')}
                      </div>
                      <div className="text-xs text-charcoal/60">
                        {amount === "5000" && "Basic"}
                        {amount === "10000" && "Essential"}
                        {amount === "15000" && "Standard"}
                        {amount === "20000" && "Popular"}
                        {amount === "25000" && "Enhanced"}
                        {amount === "30000" && "Premium"}
                        {amount === "35000" && "Comprehensive"}
                        {amount === "40000" && "Maximum"}
                        {amount === "50000" && "Ultimate"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Contact Information */}
            {step === 6 && (
              <div className="flex-1 flex flex-col">
                <h2 className="font-serif text-3xl mb-3 text-charcoal">Almost there! Your contact info</h2>
                <p className="text-charcoal/70 mb-8">We'll use this to show your personalized quotes</p>
                <div className="space-y-4 flex-1">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">First Name *</label>
                      <input
                        type="text"
                        value={formData.firstName || ""}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="input-field"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="label">Last Name *</label>
                      <input
                        type="text"
                        value={formData.lastName || ""}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="input-field"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="input-field"
                      placeholder="john.doe@email.com"
                    />
                  </div>
                  <div>
                    <label className="label">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="bg-sand/50 p-4 rounded-xl text-sm text-charcoal/70">
                    <p>By proceeding, you agree to be contacted by a licensed agent about your quote.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-taupe/20">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === totalSteps ? "See My Quotes" : "Continue"} →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
