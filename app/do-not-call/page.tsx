export default function DoNotCall() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-sand to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-charcoal">Do Not Call / Opt-Out</h1>
          <p className="text-sm text-charcoal/60">Last Updated: October 30, 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-2xl mb-4 text-charcoal">Your Right to Opt Out</h2>
            <p>
              At Life Care Choice, we believe communication should always be respectful and transparent.
            </p>
            <p>
              You have the right to control how and when we contact you. If you no longer wish to receive phone calls, text messages, or emails from Life Care Choice or any licensed agents we partner with, you can opt out at any time using the methods below.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-charcoal mt-8">Phone Calls</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tell any representative who calls that you wish to be placed on our internal Do Not Call list.</li>
              <li>Email us at info@lifecarechoice.com with your full name, phone number, and "Do Not Call" in the subject line.</li>
            </ul>

            <h2 className="font-serif text-2xl mb-4 text-charcoal mt-8">Text Messages (SMS/MMS)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reply STOP to any text message you receive from us.</li>
              <li>You'll receive a confirmation message that you've been unsubscribed.</li>
              <li>If you need assistance, reply HELP or contact us at info@lifecarechoice.com.</li>
            </ul>

            <h2 className="font-serif text-2xl mb-4 text-charcoal mt-8">Email Communications</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Click the "Unsubscribe" link at the bottom of any marketing email we send, or</li>
              <li>Email info@lifecarechoice.com with "Unsubscribe" in the subject line.</li>
            </ul>
            <p className="mt-4">
              <em>Note: You may still receive service or transactional messages related to quotes or policies you've requested.</em>
            </p>

            <h2 className="font-serif text-2xl mb-4 text-charcoal mt-8">Leads and Consent</h2>
            <p>
              If your information was submitted through a third-party website or lead vendor, please note that Life Care Choice only contacts individuals who have given prior express written consent. If you believe you were contacted in error, notify us immediately and we'll verify and remove your contact information from all active systems.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-charcoal mt-8">Processing Time</h2>
            <p>We honor opt-out requests promptly:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Phone: up to 30 days</li>
              <li>Text Messages: immediate (upon STOP)</li>
              <li>Email: up to 10 business days</li>
            </ul>
            <p className="mt-4">
              You may still receive messages already in progress during this short period.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-charcoal mt-8">National Do Not Call Registry</h2>
            <p>
              You can further reduce telemarketing calls by registering your number at www.donotcall.gov or calling 1-888-382-1222.
            </p>
            <p className="mt-4">
              Even if you are on the National Do Not Call Registry, we may still contact you if you provided consent or requested information from us.
            </p>

            <h2 className="font-serif text-2xl mb-4 text-charcoal mt-8">Questions or Concerns</h2>
            <p>
              If you continue receiving unwanted communications after opting out, please contact us:
            </p>
            <p className="mt-4">
              <strong>Life Care Choice</strong><br />
              c/o Bousmah Capital Investment LLC<br />
              555 NE 15th St TS-A, Miami, FL 33132<br />
              Email:{" "}
              <a href="mailto:info@lifecarechoice.com" className="text-gold hover:underline">
                info@lifecarechoice.com
              </a>
            </p>

            <div className="mt-8 pt-6 border-t-2 border-gold/30 text-center">
              <p className="text-sm italic text-charcoal/70">
                Driven by care. Built on trust. Obsessed with serving every client like family.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

