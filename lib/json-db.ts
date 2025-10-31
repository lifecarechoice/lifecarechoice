/**
 * JSON-based database (replacement for SQLite)
 * Works on any Node.js version without native compilation
 */
import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const DATA_DIR = process.env.DATA_DIR || './data';
const DB_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface LeadRecord {
  id?: string;
  created_at?: string;
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

interface Database {
  leads: LeadRecord[];
  version: number;
}

/**
 * Read database from disk
 */
function readDB(): Database {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading database:', error);
  }
  
  return { leads: [], version: 1 };
}

/**
 * Write database to disk
 */
function writeDB(db: Database): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing database:', error);
    throw error;
  }
}

/**
 * Initialize database (equivalent to running migrations)
 */
export function initDB(): void {
  if (!fs.existsSync(DB_FILE)) {
    writeDB({ leads: [], version: 1 });
    console.log('✓ Database initialized: leads.json');
  }
}

/**
 * Get database (for compatibility)
 */
export function getDB(): void {
  initDB();
}

/**
 * Insert a new lead into the database
 */
export function insertLead(lead: LeadRecord): string {
  const db = readDB();
  const id = lead.id || nanoid();
  
  const newLead: LeadRecord = {
    id,
    created_at: new Date().toISOString(),
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    zip: lead.zip,
    state: lead.state,
    productInterest: lead.productInterest,
    bestTime: lead.bestTime,
    message: lead.message,
    gender: lead.gender,
    birthDate: lead.birthDate,
    tobacco: lead.tobacco,
    coverage: lead.coverage,
    agentLicense: lead.agentLicense,
    experience: lead.experience,
    ipAddress: lead.ipAddress,
    userAgent: lead.userAgent,
    referrer: lead.referrer,
    landing_url: lead.landing_url,
    utm_source: lead.utm_source,
    utm_medium: lead.utm_medium,
    utm_campaign: lead.utm_campaign,
    utm_term: lead.utm_term,
    utm_content: lead.utm_content,
    gclid: lead.gclid,
    fbclid: lead.fbclid,
    click_id: lead.click_id,
  };
  
  db.leads.push(newLead);
  writeDB(db);
  
  return id;
}

/**
 * Query leads with filters
 */
export function queryLeads(filters: {
  startDate?: string;
  endDate?: string;
  email?: string;
  productInterest?: string;
  limit?: number;
  offset?: number;
}): LeadRecord[] {
  const db = readDB();
  let results = db.leads;
  
  // Apply filters
  if (filters.startDate) {
    results = results.filter(lead => 
      (lead.created_at || '') >= filters.startDate!
    );
  }
  
  if (filters.endDate) {
    results = results.filter(lead => 
      (lead.created_at || '') <= filters.endDate!
    );
  }
  
  if (filters.email) {
    results = results.filter(lead => 
      lead.email === filters.email
    );
  }
  
  if (filters.productInterest) {
    results = results.filter(lead => 
      lead.productInterest === filters.productInterest
    );
  }
  
  // Sort by created_at descending
  results.sort((a, b) => {
    const dateA = new Date(a.created_at || 0).getTime();
    const dateB = new Date(b.created_at || 0).getTime();
    return dateB - dateA;
  });
  
  // Apply pagination
  const offset = filters.offset || 0;
  const limit = filters.limit || results.length;
  
  return results.slice(offset, offset + limit);
}

/**
 * Get all leads (for export)
 */
export function getAllLeads(): LeadRecord[] {
  const db = readDB();
  return db.leads;
}

/**
 * Get lead by ID
 */
export function getLeadById(id: string): LeadRecord | null {
  const db = readDB();
  return db.leads.find(lead => lead.id === id) || null;
}

/**
 * Delete lead by ID
 */
export function deleteLead(id: string): boolean {
  const db = readDB();
  const initialLength = db.leads.length;
  db.leads = db.leads.filter(lead => lead.id !== id);
  
  if (db.leads.length < initialLength) {
    writeDB(db);
    return true;
  }
  
  return false;
}

/**
 * Get lead count
 */
export function getLeadCount(): number {
  const db = readDB();
  return db.leads.length;
}

/**
 * Close database (for compatibility, no-op for JSON)
 */
export function closeDB(): void {
  // No-op for JSON database
}

// Initialize on import
initDB();

