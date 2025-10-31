/**
 * Google Analytics 4 event tracking helpers
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Push event to Google Analytics 4
 */
export function pushGA4Event(eventName: string, eventParams: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
    
    console.log(`GA4 Event: ${eventName}`, eventParams);
  } catch (error) {
    console.error('GA4 event error:', error);
  }
}

/**
 * Track form submission attempt
 */
export function trackFormAttempt(formType: string): void {
  pushGA4Event('lead_submit_attempt', {
    form_type: formType,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track successful form submission
 */
export function trackFormSuccess(formType: string, latencyMs: number): void {
  pushGA4Event('lead_submit_success', {
    form_type: formType,
    latency_ms: latencyMs,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track form submission error
 */
export function trackFormError(formType: string, errorCode: string, latencyMs: number): void {
  pushGA4Event('lead_submit_error', {
    form_type: formType,
    error_code: errorCode,
    latency_ms: latencyMs,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track form field validation error
 */
export function trackValidationError(formType: string, fieldName: string): void {
  pushGA4Event('form_validation_error', {
    form_type: formType,
    field_name: fieldName,
    timestamp: new Date().toISOString(),
  });
}

