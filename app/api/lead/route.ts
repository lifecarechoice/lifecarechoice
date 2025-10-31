/**
 * Lead submission API endpoint
 * POST /api/lead
 */
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { leadSchema, sanitizeObject } from '@/lib/validation';
import { verifyCSRFToken } from '@/lib/csrf';
import { checkRateLimit } from '@/lib/ratelimit';
import { getClientIP, getUserAgent, getReferrer } from '@/lib/capture';
import { insertLead } from '@/lib/json-db';
import { appendToCSV } from '@/lib/csv';
import { sendLeadNotification } from '@/lib/mail';
import { sendWebhook } from '@/lib/sign';
import { logRequest, logError } from '@/lib/logger';

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
const MIN_SUBMIT_TIME_MS = 3000; // Minimum 3 seconds to fill form

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = getClientIP(request.headers);
  const userAgent = getUserAgent(request.headers);
  const referrer = getReferrer(request.headers);
  
  try {
    // 1. CORS Check
    const origin = request.headers.get('origin') || '';
    if (!ALLOWED_ORIGINS.includes(origin) && process.env.NODE_ENV === 'production') {
      logRequest(ip, '/api/lead', 403, Date.now() - startTime, 'CORS_DENIED');
      return NextResponse.json(
        { ok: false, code: 'CORS_DENIED', message: 'Origin not allowed' },
        { status: 403 }
      );
    }
    
    // 2. Rate Limiting
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      logRequest(ip, '/api/lead', 429, Date.now() - startTime, 'RATE_LIMIT');
      return NextResponse.json(
        { ok: false, code: 'RATE_LIMIT', message: 'Too many requests', retryAfter: rateLimit.retryAfter },
        { 
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfter || 60),
          },
        }
      );
    }
    
    // 3. Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      logRequest(ip, '/api/lead', 400, Date.now() - startTime, 'INVALID_JSON');
      return NextResponse.json(
        { ok: false, code: 'INVALID_JSON', message: 'Invalid JSON body' },
        { status: 400 }
      );
    }
    
    // 4. Sanitize input
    const sanitized = sanitizeObject(body);
    
    // 5. Honeypot check
    if (sanitized.honeypot && sanitized.honeypot.length > 0) {
      logRequest(ip, '/api/lead', 400, Date.now() - startTime, 'BOT_DETECTED');
      return NextResponse.json(
        { ok: false, code: 'BOT_DETECTED', message: 'Suspicious activity detected' },
        { status: 400 }
      );
    }
    
    // 6. Minimum time check (anti-bot)
    if (sanitized.timestamp) {
      const submittedAt = new Date(sanitized.timestamp).getTime();
      const timeTaken = Date.now() - submittedAt;
      
      if (timeTaken < MIN_SUBMIT_TIME_MS) {
        logRequest(ip, '/api/lead', 400, Date.now() - startTime, 'TOO_FAST');
        return NextResponse.json(
          { ok: false, code: 'TOO_FAST', message: 'Form submitted too quickly' },
          { status: 400 }
        );
      }
    }
    
    // 7. CSRF verification
    if (!sanitized.csrf || !verifyCSRFToken(sanitized.csrf, ip)) {
      logRequest(ip, '/api/lead', 419, Date.now() - startTime, 'INVALID_CSRF');
      return NextResponse.json(
        { ok: false, code: 'INVALID_CSRF', message: 'Invalid or expired CSRF token' },
        { status: 419 }
      );
    }
    
    // 8. Validate with Zod
    const validation = leadSchema.safeParse(sanitized);
    if (!validation.success) {
      const errors = validation.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      logRequest(ip, '/api/lead', 422, Date.now() - startTime, 'VALIDATION_FAILED');
      return NextResponse.json(
        { ok: false, code: 'VALIDATION_FAILED', message: 'Validation failed', errors },
        { status: 422 }
      );
    }
    
    const data = validation.data;
    
    // 9. Generate unique ID
    const leadId = nanoid();
    
    // 10. Prepare lead record
    const leadRecord = {
      id: leadId,
      timestamp: new Date().toISOString(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      zip: data.zip,
      state: data.state,
      productInterest: data.productInterest,
      bestTime: data.bestTime,
      message: data.message,
      gender: data.gender,
      birthDate: data.birthDate,
      tobacco: data.tobacco,
      coverage: data.coverage,
      agentLicense: data.agentLicense,
      experience: data.experience,
      ipAddress: ip,
      userAgent: userAgent,
      referrer: referrer,
      landing_url: data.landing_url,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_term: data.utm_term,
      utm_content: data.utm_content,
      gclid: data.gclid,
      fbclid: data.fbclid,
      click_id: data.click_id,
    };
    
    const stored: string[] = [];
    
    // 11. Store in SQLite
    try {
      insertLead(leadRecord);
      stored.push('sqlite');
    } catch (error) {
      logError('Failed to insert lead into SQLite', error, { leadId });
    }
    
    // 12. Append to CSV
    try {
      appendToCSV(leadRecord);
      stored.push('csv');
    } catch (error) {
      logError('Failed to append lead to CSV', error, { leadId });
    }
    
    // 13. Send email notification (async, don't wait)
    sendLeadNotification(leadRecord).catch(error => {
      logError('Failed to send email notification', error, { leadId });
    });
    
    // 14. Send webhook (async, don't wait)
    sendWebhook(leadRecord).catch(error => {
      logError('Failed to send webhook', error, { leadId });
    });
    
    // 15. Log success
    logRequest(ip, '/api/lead', 200, Date.now() - startTime);
    
    // 16. Return success response
    return NextResponse.json(
      {
        ok: true,
        id: leadId,
        stored,
        message: 'Lead submitted successfully',
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
  } catch (error) {
    logError('Unexpected error in lead submission', error, { ip });
    logRequest(ip, '/api/lead', 500, Date.now() - startTime, 'INTERNAL_ERROR');
    
    return NextResponse.json(
      { ok: false, code: 'INTERNAL_ERROR', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || '';
  
  if (!ALLOWED_ORIGINS.includes(origin) && process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 403 });
  }
  
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

