/**
 * File-based rate limiting (no external dependencies)
 */
import fs from 'fs';
import path from 'path';

const DATA_DIR = process.env.DATA_DIR || './data';
const RATE_LIMIT_DIR = path.join(DATA_DIR, 'ratelimit');
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '10', 10);
const RATE_LIMIT_WINDOW_SEC = parseInt(process.env.RATE_LIMIT_WINDOW_SEC || '600', 10);

// Ensure rate limit directory exists
if (!fs.existsSync(RATE_LIMIT_DIR)) {
  fs.mkdirSync(RATE_LIMIT_DIR, { recursive: true });
}

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

/**
 * Get rate limit file path for an IP
 */
function getRateLimitPath(ip: string): string {
  const sanitizedIp = ip.replace(/[^a-zA-Z0-9.-]/g, '_');
  return path.join(RATE_LIMIT_DIR, `${sanitizedIp}.json`);
}

/**
 * Check if IP is rate limited
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const filePath = getRateLimitPath(ip);
  const now = Date.now();
  
  let entry: RateLimitEntry;
  
  // Try to read existing entry
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      entry = JSON.parse(data);
      
      // Check if window has expired
      const windowMs = RATE_LIMIT_WINDOW_SEC * 1000;
      if (now - entry.firstAttempt > windowMs) {
        // Reset the window
        entry = {
          count: 1,
          firstAttempt: now,
          lastAttempt: now,
        };
      } else {
        // Increment count
        entry.count += 1;
        entry.lastAttempt = now;
      }
    } else {
      // First attempt
      entry = {
        count: 1,
        firstAttempt: now,
        lastAttempt: now,
      };
    }
  } catch (error) {
    console.error('Rate limit read error:', error);
    // On error, allow the request
    return { allowed: true };
  }
  
  // Write updated entry
  try {
    fs.writeFileSync(filePath, JSON.stringify(entry), 'utf-8');
  } catch (error) {
    console.error('Rate limit write error:', error);
  }
  
  // Check if rate limit exceeded
  if (entry.count > RATE_LIMIT_MAX) {
    const windowMs = RATE_LIMIT_WINDOW_SEC * 1000;
    const retryAfter = Math.ceil((entry.firstAttempt + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  return { allowed: true };
}

/**
 * Clean up old rate limit files (run periodically)
 */
export function cleanupRateLimitFiles(): void {
  const now = Date.now();
  const windowMs = RATE_LIMIT_WINDOW_SEC * 1000;
  
  try {
    const files = fs.readdirSync(RATE_LIMIT_DIR);
    
    for (const file of files) {
      const filePath = path.join(RATE_LIMIT_DIR, file);
      const stats = fs.statSync(filePath);
      
      // Delete files older than 2x the window
      if (now - stats.mtimeMs > windowMs * 2) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (error) {
    console.error('Rate limit cleanup error:', error);
  }
}

// Run cleanup every hour
setInterval(cleanupRateLimitFiles, 60 * 60 * 1000);

