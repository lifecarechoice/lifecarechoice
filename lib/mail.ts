/**
 * Email notifications via SMTP
 */
import nodemailer from 'nodemailer';
import type { CSVLeadData } from './csv';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;

let transporter: nodemailer.Transporter | null = null;

/**
 * Initialize email transporter
 */
function getTransporter(): nodemailer.Transporter | null {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) {
    console.warn('SMTP not configured. Email notifications disabled.');
    return null;
  }
  
  if (transporter) {
    return transporter;
  }
  
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
  
  return transporter;
}

/**
 * Send lead notification email
 */
export async function sendLeadNotification(lead: CSVLeadData): Promise<boolean> {
  const transport = getTransporter();
  
  if (!transport || !NOTIFY_EMAIL) {
    return false;
  }
  
  try {
    // Build plain text email body
    const textBody = `
New Lead Submission - Life Care Choice
=====================================

Contact Information:
--------------------
Name: ${lead.firstName} ${lead.lastName}
Email: ${lead.email}
Phone: ${lead.phone}
${lead.zip ? `ZIP: ${lead.zip}` : ''}
${lead.state ? `State: ${lead.state}` : ''}

${lead.productInterest ? `Product Interest: ${lead.productInterest}` : ''}
${lead.bestTime ? `Best Time to Call: ${lead.bestTime}` : ''}
${lead.message ? `\nMessage:\n${lead.message}` : ''}

${lead.coverage ? `Coverage Amount: $${lead.coverage}` : ''}
${lead.tobacco ? `Tobacco User: ${lead.tobacco}` : ''}

Tracking Information:
---------------------
Timestamp: ${lead.timestamp}
IP Address: ${lead.ipAddress}
${lead.utm_source ? `Source: ${lead.utm_source}` : ''}
${lead.utm_campaign ? `Campaign: ${lead.utm_campaign}` : ''}
${lead.gclid ? `Google Click ID: ${lead.gclid}` : ''}
${lead.fbclid ? `Facebook Click ID: ${lead.fbclid}` : ''}

Lead ID: ${lead.id}
    `.trim();
    
    // Send email
    await transport.sendMail({
      from: SMTP_USER,
      to: NOTIFY_EMAIL,
      subject: `New Lead: ${lead.firstName} ${lead.lastName} - ${lead.productInterest || 'General Inquiry'}`,
      text: textBody,
      attachments: [
        {
          filename: `lead-${lead.id}.json`,
          content: JSON.stringify(lead, null, 2),
          contentType: 'application/json',
        },
      ],
    });
    
    console.log(`✓ Email sent to ${NOTIFY_EMAIL} for lead ${lead.id}`);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

/**
 * Test email configuration
 */
export async function testEmailConfig(): Promise<boolean> {
  const transport = getTransporter();
  
  if (!transport) {
    return false;
  }
  
  try {
    await transport.verify();
    console.log('✓ SMTP configuration is valid');
    return true;
  } catch (error) {
    console.error('✗ SMTP configuration error:', error);
    return false;
  }
}

