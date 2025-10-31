/**
 * JSON-lines logging utility
 */
import fs from 'fs';
import path from 'path';

const LOG_DIR = process.env.LOG_DIR || './logs';
const LOG_FILE = path.join(LOG_DIR, 'app.log');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

export interface LogEntry {
  ts?: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  ip?: string;
  path?: string;
  status?: number;
  duration_ms?: number;
  error_code?: string;
  [key: string]: any;
}

/**
 * Write log entry
 */
export function log(entry: LogEntry): void {
  const logLine = JSON.stringify({
    ts: new Date().toISOString(),
    ...entry,
  }) + '\n';
  
  try {
    fs.appendFileSync(LOG_FILE, logLine, 'utf-8');
  } catch (error) {
    console.error('Failed to write log:', error);
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV !== 'production') {
    const level = entry.level || 'info';
    console[level]?.(`[${entry.ts}]`, entry.message, entry);
  }
}

/**
 * Log info message
 */
export function logInfo(message: string, data?: Record<string, any>): void {
  log({ level: 'info', message, ...data });
}

/**
 * Log warning message
 */
export function logWarn(message: string, data?: Record<string, any>): void {
  log({ level: 'warn', message, ...data });
}

/**
 * Log error message
 */
export function logError(message: string, error?: any, data?: Record<string, any>): void {
  log({
    level: 'error',
    message,
    error: error?.message || String(error),
    stack: error?.stack,
    ...data,
  });
}

/**
 * Log API request
 */
export function logRequest(
  ip: string,
  path: string,
  status: number,
  durationMs: number,
  errorCode?: string
): void {
  log({
    level: status >= 400 ? 'error' : 'info',
    message: 'API Request',
    ip,
    path,
    status,
    duration_ms: durationMs,
    error_code: errorCode,
  });
}

