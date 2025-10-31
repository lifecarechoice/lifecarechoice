import React from "react";
import { useLanguage } from "@/lib/language-context";

type Props = {
  termsHref?: string;
  privacyHref?: string;
  className?: string;
  idPrefix?: string;
};

export default function ConsentOptIn({
  termsHref = "/terms-of-use",
  privacyHref = "/privacy-policy",
  className = "",
  idPrefix = "consent",
}: Props) {
  const { t } = useLanguage();
  const marketingId = `${idPrefix}-marketing`;
  const nonMarketingId = `${idPrefix}-non-marketing`;

  return (
    <div className={`space-y-3 mb-3 ${className}`}>
      <label htmlFor={marketingId} className="flex items-start gap-2 text-sm text-gray-600">
        <input 
          id={marketingId} 
          type="checkbox" 
          required 
          name={`${idPrefix}_consentMarketing`} 
          className="mt-0.5 h-4 w-4 accent-gold" 
        />
        <span>
          {(t as any).consent.marketing}
        </span>
      </label>

      <label htmlFor={nonMarketingId} className="flex items-start gap-2 text-sm text-gray-600">
        <input 
          id={nonMarketingId} 
          type="checkbox" 
          required 
          name={`${idPrefix}_consentNonMarketing`} 
          className="mt-0.5 h-4 w-4 accent-gold" 
        />
        <span>
          {(t as any).consent.nonMarketing}
        </span>
      </label>

      <p className="text-center text-xs text-gray-600 mt-3">
        <a href={termsHref} className="text-gold hover:underline">{(t as any).consent.termsOfService}</a>
        {" & "}
        <a href={privacyHref} className="text-gold hover:underline">{(t as any).consent.privacyPolicy}</a>
      </p>
    </div>
  );
}


