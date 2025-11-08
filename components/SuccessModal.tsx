"use client";

import { useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  redirectUrl?: string;
  redirectDelay?: number;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title = "Thank You!",
  message = "Your information has been received. A licensed professional will contact you within 24 hours.",
  redirectUrl = "/",
  redirectDelay = 0,
}: SuccessModalProps) {
  // Auto-redirect after delay if specified
  useEffect(() => {
    if (isOpen && redirectDelay > 0 && redirectUrl) {
      const timer = setTimeout(() => {
        window.location.href = redirectUrl;
      }, redirectDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, redirectDelay, redirectUrl]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-in-up">
        {/* Success Icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-taupe/20 flex items-center justify-center animate-float">
          <svg
            className="w-10 h-10 text-gold"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        {/* Title */}
        <h2 className="font-serif text-3xl md:text-4xl text-center text-charcoal mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-center text-charcoal/70 text-base md:text-lg leading-relaxed mb-6">
          {message}
        </p>

        {/* Additional Info */}
        <div className="bg-sand/20 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-charcoal/60">
            📱 We'll follow up with a confirmation message to your phone momentarily.
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-primary w-full group"
        >
          <span className="flex items-center justify-center gap-2">
            Got it!
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </span>
        </button>

        {/* Close X Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors duration-200"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

