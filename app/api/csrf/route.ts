/**
 * CSRF token generation endpoint
 * GET /api/csrf
 */
import { NextRequest, NextResponse } from 'next/server';
import { generateCSRFToken } from '@/lib/csrf';
import { getClientIP } from '@/lib/capture';
import { logRequest } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const ip = getClientIP(request.headers);
  
  try {
    const token = generateCSRFToken(ip);
    
    logRequest(ip, '/api/csrf', 200, Date.now() - startTime);
    
    return NextResponse.json(
      {
        token,
        expiresIn: 3600, // 1 hour in seconds
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    logRequest(ip, '/api/csrf', 500, Date.now() - startTime, 'INTERNAL_ERROR');
    
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

