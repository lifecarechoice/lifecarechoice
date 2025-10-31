/**
 * Capture tracking parameters and metadata
 */

/**
 * Extract UTM parameters from URL
 */
export function extractUTMParams(url: string): Record<string, string> {
  try {
    const urlObj = new URL(url);
    const params: Record<string, string> = {};
    
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    for (const key of utmKeys) {
      const value = urlObj.searchParams.get(key);
      if (value) {
        params[key] = value;
      }
    }
    
    return params;
  } catch {
    return {};
  }
}

/**
 * Extract ad click IDs from URL
 */
export function extractClickIDs(url: string): Record<string, string> {
  try {
    const urlObj = new URL(url);
    const params: Record<string, string> = {};
    
    const clickIdKeys = ['gclid', 'fbclid', 'msclkid', 'click_id'];
    
    for (const key of clickIdKeys) {
      const value = urlObj.searchParams.get(key);
      if (value) {
        params[key] = value;
      }
    }
    
    return params;
  } catch {
    return {};
  }
}

/**
 * Get client IP from request
 */
export function getClientIP(headers: Headers): string {
  // Check various headers in order of preference
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return '0.0.0.0';
}

/**
 * Get user agent from request
 */
export function getUserAgent(headers: Headers): string {
  return headers.get('user-agent') || 'Unknown';
}

/**
 * Get referrer from request
 */
export function getReferrer(headers: Headers): string {
  return headers.get('referer') || headers.get('referrer') || '';
}

/**
 * Store tracking data in session storage (client-side)
 */
export function storeTrackingData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const currentUrl = window.location.href;
    const referrer = document.referrer;
    
    // Store landing URL only if not already stored
    if (!sessionStorage.getItem('landing_url')) {
      sessionStorage.setItem('landing_url', currentUrl);
    }
    
    // Store referrer
    if (referrer && !sessionStorage.getItem('referrer')) {
      sessionStorage.setItem('referrer', referrer);
    }
    
    // Extract and store UTM parameters
    const utmParams = extractUTMParams(currentUrl);
    const clickIds = extractClickIDs(currentUrl);
    
    // Store each parameter
    Object.entries({ ...utmParams, ...clickIds }).forEach(([key, value]) => {
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, value);
      }
    });
  } catch (error) {
    console.error('Error storing tracking data:', error);
  }
}

/**
 * Get all stored tracking data (client-side)
 */
export function getStoredTrackingData(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  try {
    const keys = [
      'landing_url',
      'referrer',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
      'fbclid',
      'msclkid',
      'click_id',
    ];
    
    const data: Record<string, string> = {};
    
    keys.forEach(key => {
      const value = sessionStorage.getItem(key);
      if (value) {
        data[key] = value;
      }
    });
    
    return data;
  } catch (error) {
    console.error('Error getting stored tracking data:', error);
    return {};
  }
}

