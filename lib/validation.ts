/**
 * Zod validation schemas for form submissions
 */
import { z } from 'zod';

// Base lead schema
export const leadSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required").max(50).trim(),
  lastName: z.string().min(1, "Last name is required").max(50).trim(),
  email: z.string().email("Invalid email address").max(100).toLowerCase().trim(),
  phone: z.string().regex(/^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/, "Invalid phone number").trim(),
  
  // Location
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code").optional(),
  state: z.string().min(2).max(2).toUpperCase().optional(),
  
  // Product/Intent
  productInterest: z.enum(['final-expense', 'mortgage-protection', 'iul', 'other', '']).optional(),
  bestTime: z.enum(['morning', 'afternoon', 'evening', '']).optional(),
  message: z.string().max(2000).trim().optional(),
  
  // Coverage Calculator Fields
  gender: z.enum(['male', 'female', '']).optional(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  tobacco: z.enum(['yes', 'no', '']).optional(),
  coverage: z.string().regex(/^\d+$/).optional(),
  
  // Agent Application Fields
  agentLicense: z.string().max(50).trim().optional(),
  experience: z.string().max(500).trim().optional(),
  
  // Security & Tracking
  csrf: z.string().min(32, "Invalid CSRF token"),
  honeypot: z.string().max(0, "Bot detected").optional(),
  
  // Auto-captured metadata
  timestamp: z.string().datetime(),
  referrer: z.string().url().or(z.literal('')).optional(),
  landing_url: z.string().url().optional(),
  user_agent: z.string().max(500).optional(),
  
  // UTM & Ad Tracking
  utm_source: z.string().max(100).trim().optional(),
  utm_medium: z.string().max(100).trim().optional(),
  utm_campaign: z.string().max(100).trim().optional(),
  utm_term: z.string().max(100).trim().optional(),
  utm_content: z.string().max(100).trim().optional(),
  gclid: z.string().max(200).trim().optional(),
  fbclid: z.string().max(200).trim().optional(),
  click_id: z.string().max(200).trim().optional(),
});

export type LeadData = z.infer<typeof leadSchema>;

// Rate limit schema
export const rateLimitSchema = z.object({
  ip: z.string().ip(),
  timestamp: z.number(),
  count: z.number(),
});

// CSRF token schema
export const csrfSchema = z.object({
  token: z.string().min(32),
  timestamp: z.number(),
  ip: z.string().ip(),
});

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

// Validate and sanitize all string fields in an object
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]) as any;
    }
  }
  
  return sanitized;
}

