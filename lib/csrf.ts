/**
 * CSRF token generation and verification
 */
import { nanoid } from 'nanoid';
import crypto from 'crypto';

const CSRF_TOKEN_LENGTH = 32;
const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

interface CSRFToken {
  token: string;
  timestamp: number;
  ip: string;
}

// In-memory token store (consider Redis for multi-instance deployments)
const tokenStore = new Map<string, CSRFToken>();

// Clean up expired tokens every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of tokenStore.entries()) {
    if (now - data.timestamp > TOKEN_EXPIRY_MS) {
      tokenStore.delete(token);
    }
  }
}, 5 * 60 * 1000);

/**
 * Generate a new CSRF token
 */
export function generateCSRFToken(ip: string): string {
  const token = nanoid(CSRF_TOKEN_LENGTH);
  
  tokenStore.set(token, {
    token,
    timestamp: Date.now(),
    ip,
  });
  
  return token;
}

/**
 * Verify a CSRF token
 */
export function verifyCSRFToken(token: string, ip: string): boolean {
  const storedToken = tokenStore.get(token);
  
  if (!storedToken) {
    return false;
  }
  
  // Check if token is expired
  if (Date.now() - storedToken.timestamp > TOKEN_EXPIRY_MS) {
    tokenStore.delete(token);
    return false;
  }
  
  // Verify IP matches (optional but recommended)
  if (storedToken.ip !== ip) {
    return false;
  }
  
  // Token is valid - remove it (one-time use)
  tokenStore.delete(token);
  
  return true;
}

/**
 * Generate HMAC signature for webhook
 */
export function generateHMAC(payload: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
}

/**
 * Verify HMAC signature
 */
export function verifyHMAC(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = generateHMAC(payload, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

