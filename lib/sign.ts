/**
 * HMAC signing for webhooks
 */
import { generateHMAC } from './csrf';

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

/**
 * Send webhook with HMAC signature
 */
export async function sendWebhook(payload: any): Promise<boolean> {
  if (!WEBHOOK_URL || !WEBHOOK_SECRET) {
    return false;
  }
  
  try {
    const payloadString = JSON.stringify(payload);
    const signature = generateHMAC(payloadString, WEBHOOK_SECRET);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Signature': `sha256=${signature}`,
        'User-Agent': 'LifeCareChoice-Webhook/1.0',
      },
      body: payloadString,
    });
    
    if (!response.ok) {
      console.error(`Webhook failed: ${response.status} ${response.statusText}`);
      return false;
    }
    
    console.log(`✓ Webhook sent successfully to ${WEBHOOK_URL}`);
    return true;
  } catch (error) {
    console.error('Webhook error:', error);
    return false;
  }
}

