/**
 * CSV file operations with monthly rotation
 */
import fs from 'fs';
import path from 'path';

const CSV_DIR = process.env.CSV_DIR || './data';

// Ensure CSV directory exists
if (!fs.existsSync(CSV_DIR)) {
  fs.mkdirSync(CSV_DIR, { recursive: true });
}

/**
 * Get current month's CSV file path
 */
export function getCurrentCSVPath(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const filename = `submissions-${year}-${month}.csv`;
  
  return path.join(CSV_DIR, filename);
}

/**
 * CSV header row
 */
const CSV_HEADERS = [
  'id',
  'timestamp',
  'first_name',
  'last_name',
  'email',
  'phone',
  'zip',
  'state',
  'product_interest',
  'best_time',
  'message',
  'gender',
  'birth_date',
  'tobacco',
  'coverage',
  'agent_license',
  'experience',
  'ip_address',
  'user_agent',
  'referrer',
  'landing_url',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'click_id',
];

/**
 * Escape CSV field
 */
function escapeCSVField(field: any): string {
  if (field === null || field === undefined) {
    return '';
  }
  
  const value = String(field);
  
  // If field contains comma, quote, or newline, wrap in quotes and escape quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  
  return value;
}

/**
 * Append lead to CSV file
 */
export interface CSVLeadData {
  id: string;
  timestamp: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zip?: string;
  state?: string;
  productInterest?: string;
  bestTime?: string;
  message?: string;
  gender?: string;
  birthDate?: string;
  tobacco?: string;
  coverage?: string;
  agentLicense?: string;
  experience?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  landing_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  click_id?: string;
}

export function appendToCSV(data: CSVLeadData): void {
  const filePath = getCurrentCSVPath();
  const fileExists = fs.existsSync(filePath);
  
  // Create header row if file doesn't exist
  if (!fileExists) {
    const headerRow = CSV_HEADERS.join(',') + '\n';
    fs.writeFileSync(filePath, headerRow, 'utf-8');
  }
  
  // Build data row
  const row = [
    data.id,
    data.timestamp,
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.zip || '',
    data.state || '',
    data.productInterest || '',
    data.bestTime || '',
    data.message || '',
    data.gender || '',
    data.birthDate || '',
    data.tobacco || '',
    data.coverage || '',
    data.agentLicense || '',
    data.experience || '',
    data.ipAddress || '',
    data.userAgent || '',
    data.referrer || '',
    data.landing_url || '',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
    data.utm_term || '',
    data.utm_content || '',
    data.gclid || '',
    data.fbclid || '',
    data.click_id || '',
  ];
  
  const csvRow = row.map(escapeCSVField).join(',') + '\n';
  
  // Append to file
  fs.appendFileSync(filePath, csvRow, 'utf-8');
}

/**
 * Get all CSV files
 */
export function listCSVFiles(): string[] {
  const files = fs.readdirSync(CSV_DIR);
  return files
    .filter(file => file.startsWith('submissions-') && file.endsWith('.csv'))
    .sort()
    .reverse(); // Most recent first
}

/**
 * Read CSV file
 */
export function readCSVFile(filename: string): string {
  const filePath = path.join(CSV_DIR, filename);
  return fs.readFileSync(filePath, 'utf-8');
}

