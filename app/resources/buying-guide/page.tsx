export default function BuyingGuide() {
  return (
    <div className="pt-24">
      <section className="bg-gradient-radial py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="feature-badge mb-4">Complete Guide</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-charcoal">
            Life Insurance <span className="gradient-text">Buyer's Guide</span>
          </h1>
          <p className="text-xl text-charcoal/70">Everything you need to know before shopping for coverage</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl mb-6 text-charcoal">Types of Life Insurance</h2>
            
            <div className="card-premium mb-8">
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Term Life Insurance</h3>
              <p>Coverage for a specific period (10, 20, or 30 years). If you pass away during the term, your beneficiaries receive the death benefit. Most affordable option.</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Lower premiums than permanent insurance</li>
                <li>Fixed term length</li>
                <li>No cash value component</li>
                <li>Best for: Temporary needs like mortgage protection or income replacement</li>
              </ul>
            </div>

            <div className="card-premium mb-8">
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Whole Life Insurance</h3>
              <p>Permanent coverage that lasts your entire life. Includes a cash value component that grows over time at a guaranteed rate.</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Lifetime coverage guarantee</li>
                <li>Fixed premiums</li>
                <li>Builds cash value</li>
                <li>Best for: Long-term protection and guaranteed savings component</li>
              </ul>
            </div>

            <div className="card-premium mb-8">
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Indexed Universal Life (IUL)</h3>
              <p>Permanent coverage with flexible premiums and cash value growth tied to a market index. Includes downside protection.</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Growth potential linked to market performance</li>
                <li>Flexible premium payments</li>
                <li>0% floor (downside protection)</li>
                <li>Best for: Those seeking growth potential with permanent coverage</li>
              </ul>
            </div>

            <h2 className="font-serif text-3xl mb-6 text-charcoal mt-12">How Much Coverage Do You Need?</h2>
            <p>A general rule of thumb is 10-12 times your annual income, but your actual needs depend on:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Outstanding debts (mortgage, car loans, credit cards)</li>
              <li>Future expenses (college tuition, weddings)</li>
              <li>Income replacement needs</li>
              <li>Final expenses (funeral, medical bills)</li>
              <li>Existing savings and assets</li>
            </ul>

            <div className="bg-gold/10 p-8 rounded-xl border-2 border-gold/30 my-8">
              <h4 className="font-bold text-charcoal mb-4">Use Our Coverage Calculator</h4>
              <p className="mb-4">Get a personalized estimate based on your unique situation.</p>
              <a href="/resources/coverage-calculator" className="btn-primary inline-block">Calculate Your Needs</a>
            </div>

            <h2 className="font-serif text-3xl mb-6 text-charcoal mt-12">Questions to Ask</h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li><strong>What type of policy best fits my needs?</strong> - Consider your budget, timeline, and goals</li>
              <li><strong>How much coverage do I really need?</strong> - Don't over-insure or under-insure</li>
              <li><strong>What are the exclusions?</strong> - Know what's not covered</li>
              <li><strong>Can I convert my term policy later?</strong> - Look for conversion options</li>
              <li><strong>What happens if I miss a payment?</strong> - Understand grace periods and reinstatement</li>
              <li><strong>Are there any riders I should consider?</strong> - Disability waiver, accelerated death benefit, etc.</li>
            </ol>

            <div className="mt-16 p-10 bg-gradient-to-br from-charcoal via-taupe to-charcoal text-white rounded-2xl text-center">
              <h3 className="font-serif text-3xl mb-4">Ready to Get a Quote?</h3>
              <p className="text-xl mb-8 opacity-90">Talk to a licensed professional who can guide you through your options.</p>
              <a href="/get-a-quote" className="btn-primary inline-block">Get Your Free Quote</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

