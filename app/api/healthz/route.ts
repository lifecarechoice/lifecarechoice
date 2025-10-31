/**
 * Health check endpoint
 * GET /api/healthz
 */
import { NextResponse } from 'next/server';
import { getDB, getLeadCount } from '@/lib/json-db';
import { testEmailConfig } from '@/lib/mail';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Check database file exists
    const dbPath = path.join(process.env.DATA_DIR || './data', 'leads.json');
    const dbHealthy = fs.existsSync(dbPath);
    
    if (dbHealthy) {
      getDB(); // Initialize if needed
    }
    
    // Check email configuration (optional)
    let emailConfigured = false;
    if (process.env.SMTP_HOST) {
      emailConfigured = await testEmailConfig();
    }
    
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealthy ? 'healthy' : 'unhealthy',
        email: emailConfigured ? 'configured' : 'not configured',
        webhook: process.env.WEBHOOK_URL ? 'configured' : 'not configured',
      },
      environment: process.env.NODE_ENV || 'development',
    };
    
    return NextResponse.json(health, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

