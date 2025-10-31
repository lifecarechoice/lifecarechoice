# Life Care Choice - Production-Ready Lead Management System

## 🎯 Overview

Self-hosted, production-ready form submission system for Next.js with:
- ✅ **Security**: CSRF tokens, honeypot, rate limiting, input sanitization
- ✅ **Storage**: Dual persistence (SQLite + CSV with monthly rotation)
- ✅ **Notifications**: SMTP email + HMAC-signed webhooks
- ✅ **Analytics**: GA4 event tracking (no PII)
- ✅ **Compliance**: TCPA consent tracking, IP logging, UTM capture

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd /Users/mac/Desktop/llc-lifecarechoice
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```bash
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
CSRF_SECRET=$(openssl rand -hex 32)

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
NOTIFY_EMAIL=alerts@yourcompany.com

# Webhook (optional)
WEBHOOK_URL=https://your-crm.com/webhook
WEBHOOK_SECRET=$(openssl rand -hex 32)
```

### 3. Initialize Database & Directories

```bash
mkdir -p data logs
chmod 755 data logs
```

### 4. Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 📁 Project Structure

```
/app
  /api
    /lead/route.ts          # Main form submission endpoint
    /csrf/route.ts          # CSRF token generation
    /healthz/route.ts       # Health check
  /thank-you/page.tsx       # Success page
  
/lib
  validation.ts             # Zod schemas & sanitization
  csrf.ts                   # CSRF token management
  ratelimit.ts              # File-based rate limiting
  capture.ts                # UTM & tracking helpers
  db.ts                     # SQLite operations
  csv.ts                    # CSV writer with rotation
  mail.ts                   # SMTP notifications
  sign.ts                   # Webhook HMAC signing
  ga4.ts                    # Google Analytics helpers
  logger.ts                 # JSON-lines logging

/components
  QuoteForm.tsx             # Enhanced form component

/data                       # Created at runtime
  submissions-YYYY-MM.csv   # Monthly CSV files
  leads.db                  # SQLite database
  /ratelimit/               # Rate limit tracking

/logs
  app.log                   # JSON-lines application logs
```

---

## 🔒 Security Features

### 1. CSRF Protection
- Tokens generated per-session with IP binding
- 1-hour expiry, one-time use
- Verified on every submission

### 2. Rate Limiting
- **10 requests per 10 minutes** per IP (configurable)
- File-based tracking (no Redis required)
- Automatic cleanup of old entries

### 3. Bot Detection
- **Honeypot field** (hidden from users)
- **Minimum 3-second** form fill time
- User-agent validation

### 4. Input Sanitization
- Zod schema validation for all fields
- XSS prevention (angle brackets, javascript: protocol)
- Length limits on all inputs
- Email normalization

### 5. CORS
- Locked to `ALLOWED_ORIGINS` in production
- Preflight OPTIONS handling

---

## 📊 Data Storage

### SQLite Database

**Location**: `./data/leads.db`

**Schema**:
```sql
CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  zip TEXT,
  state TEXT,
  product_interest TEXT,
  best_time TEXT,
  message TEXT,
  gender TEXT,
  birth_date TEXT,
  tobacco TEXT,
  coverage TEXT,
  agent_license TEXT,
  experience TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  landing_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  gclid TEXT,
  fbclid TEXT,
  click_id TEXT
);
```

**Indexes**:
- `idx_leads_email` - For duplicate detection
- `idx_leads_created_at` - For time-based queries
- `idx_leads_product` - For product filtering

### CSV Files

**Location**: `./data/submissions-YYYY-MM.csv`

**Features**:
- Monthly rotation (automatic)
- Header row included
- Proper CSV escaping (quotes, commas, newlines)
- Excel-compatible format

**Example**:
```csv
id,timestamp,first_name,last_name,email,phone,zip,state...
abc123,2025-10-28T10:30:00Z,John,Doe,john@example.com,(555) 123-4567,90210,CA...
```

---

## 📧 Email Notifications

### Configuration

Set these in `.env.local`:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password        # Generate at: myaccount.google.com/apppasswords
NOTIFY_EMAIL=team@yourcompany.com
```

### Gmail Setup

1. Enable 2FA on your Google account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password as `SMTP_PASS`

### Email Format

**Subject**: `New Lead: John Doe - Final Expense`

**Body**:
```
New Lead Submission - Life Care Choice
=====================================

Contact Information:
--------------------
Name: John Doe
Email: john@example.com
Phone: (555) 123-4567
ZIP: 90210
State: CA

Product Interest: final-expense
Best Time to Call: afternoon

Tracking Information:
---------------------
Timestamp: 2025-10-28T10:30:00Z
IP Address: 192.168.1.1
Source: google
Campaign: spring-2025
Google Click ID: abc123xyz

Lead ID: nanoid-generated-id
```

**Attachment**: `lead-{id}.json` (complete lead data)

---

## 🔗 Webhook Integration

### Configuration

```bash
WEBHOOK_URL=https://your-crm.com/api/leads
WEBHOOK_SECRET=your-secret-key
```

### Request Format

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
X-Signature: sha256=abcdef123456...
User-Agent: LifeCareChoice-Webhook/1.0
```

**Body**:
```json
{
  "id": "abc123",
  "timestamp": "2025-10-28T10:30:00Z",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "productInterest": "final-expense",
  "ipAddress": "192.168.1.1",
  "utm_source": "google",
  "utm_campaign": "spring-2025",
  "gclid": "abc123xyz"
}
```

### Signature Verification (Receiving End)

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return signature === `sha256=${expectedSignature}`;
}

// In your webhook handler
const signature = req.headers['x-signature'];
const isValid = verifySignature(req.body, signature, process.env.WEBHOOK_SECRET);

if (!isValid) {
  return res.status(401).json({ error: 'Invalid signature' });
}
```

---

## 📈 Google Analytics 4 Tracking

### Events Fired

1. **`lead_submit_attempt`**
   - Fired when form is submitted
   - Parameters: `form_type`, `timestamp`

2. **`lead_submit_success`**
   - Fired on successful submission
   - Parameters: `form_type`, `latency_ms`, `timestamp`

3. **`lead_submit_error`**
   - Fired on submission error
   - Parameters: `form_type`, `error_code`, `latency_ms`, `timestamp`

4. **`form_validation_error`**
   - Fired on client-side validation failure
   - Parameters: `form_type`, `field_name`, `timestamp`

### Setup GA4

Add to `/app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
  `}
</Script>
```

---

## 🧪 Testing

### 1. Health Check

```bash
curl http://localhost:3000/api/healthz
```

**Expected Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-10-28T10:30:00.000Z",
  "services": {
    "database": "healthy",
    "email": "configured",
    "webhook": "configured"
  },
  "environment": "development"
}
```

### 2. Get CSRF Token

```bash
curl http://localhost:3000/api/csrf
```

**Response**:
```json
{
  "token": "abcdef123456...",
  "expiresIn": 3600
}
```

### 3. Submit Valid Lead

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "zip": "90210",
    "state": "CA",
    "productInterest": "final-expense",
    "bestTime": "afternoon",
    "csrf": "your-csrf-token-here",
    "honeypot": "",
    "timestamp": "2025-10-28T10:27:00.000Z",
    "utm_source": "google",
    "utm_campaign": "test"
  }'
```

**Expected Response**:
```json
{
  "ok": true,
  "id": "abc123xyz",
  "stored": ["sqlite", "csv"],
  "message": "Lead submitted successfully"
}
```

### 4. Test Rate Limiting (Submit 11 times rapidly)

```bash
for i in {1..11}; do
  curl -X POST http://localhost:3000/api/lead \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Test", ...}'
done
```

**11th Request Response**:
```json
{
  "ok": false,
  "code": "RATE_LIMIT",
  "message": "Too many requests",
  "retryAfter": 600
}
```

### 5. Test Honeypot (Bot Detection)

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bot",
    "lastName": "User",
    "email": "bot@example.com",
    "phone": "555-123-4567",
    "honeypot": "I am a bot",
    "csrf": "valid-token",
    "timestamp": "2025-10-28T10:27:00.000Z"
  }'
```

**Response**:
```json
{
  "ok": false,
  "code": "BOT_DETECTED",
  "message": "Suspicious activity detected"
}
```

### 6. Test Too-Fast Submission

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Fast",
    "lastName": "User",
    "email": "fast@example.com",
    "phone": "555-123-4567",
    "csrf": "valid-token",
    "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'"
  }'
```

**Response**:
```json
{
  "ok": false,
  "code": "TOO_FAST",
  "message": "Form submitted too quickly"
}
```

---

## 🚀 Production Deployment

### 1. Build for Production

```bash
npm run build
npm start
```

### 2. File Permissions (Linux)

```bash
# Create directories
mkdir -p data logs

# Set permissions
chmod 755 data logs
chown www-data:www-data data logs  # Replace with your user

# Make database writable
chmod 644 data/leads.db  # After first run
```

### 3. Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Request size limit
    client_max_body_size 1M;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/m;
    limit_req zone=api burst=5 nodelay;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Block access to data directory
    location /data {
        deny all;
        return 404;
    }

    # Block access to logs
    location /logs {
        deny all;
        return 404;
    }
}
```

### 4. PM2 Process Manager

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "lifecarechoice" -- start

# Save process list
pm2 save

# Auto-start on reboot
pm2 startup
```

### 5. Backup Strategy

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/lifecarechoice"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup database
cp data/leads.db "$BACKUP_DIR/leads_$DATE.db"

# Backup CSV files
tar -czf "$BACKUP_DIR/csv_$DATE.tar.gz" data/*.csv

# Backup logs
tar -czf "$BACKUP_DIR/logs_$DATE.tar.gz" logs/*.log

# Delete backups older than 30 days
find "$BACKUP_DIR" -name "*.db" -mtime +30 -delete
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

**Add to crontab**:
```bash
crontab -e
# Run daily at 2 AM
0 2 * * * /path/to/backup.sh
```

---

## 🔧 Troubleshooting

### CORS Error (403)

**Problem**: `Origin not allowed`

**Solution**:
```bash
# .env.local
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

### CSRF Error (419)

**Problem**: `Invalid or expired CSRF token`

**Solutions**:
1. Ensure CSRF token is fetched before form submission
2. Check token hasn't expired (1 hour limit)
3. Verify IP address matches token generation

### Rate Limit (429)

**Problem**: `Too many requests`

**Solutions**:
1. Wait for retry period (`retryAfter` seconds)
2. Adjust limits in `.env.local`:
   ```bash
   RATE_LIMIT_MAX=20
   RATE_LIMIT_WINDOW_SEC=600
   ```

### Body Too Large (413)

**Problem**: Request body exceeds limit

**Solutions**:
1. Check Nginx `client_max_body_size`
2. Ensure form data isn't too large

### SMTP Fails

**Problem**: Email not sending

**Solutions**:
1. Check SMTP credentials
2. Enable "Less Secure Apps" or use App Password (Gmail)
3. Check firewall allows port 587/465
4. Test with:
   ```bash
   curl http://localhost:3000/api/healthz
   ```

### SQLite Locked

**Problem**: `database is locked`

**Solutions**:
1. Enable WAL mode (done automatically)
2. Check file permissions:
   ```bash
   chmod 644 data/leads.db
   ```
3. Ensure only one process accesses database

---

## ✅ Go-Live Checklist

- [ ] Environment variables configured in `.env.local`
- [ ] `ALLOWED_ORIGINS` set to production domain
- [ ] `CSRF_SECRET` generated (32+ random bytes)
- [ ] SMTP credentials tested (send test email)
- [ ] Webhook URL configured and tested
- [ ] Data directories created (`data/`, `logs/`)
- [ ] File permissions set correctly (755 for dirs, 644 for files)
- [ ] Database initialized (run app once)
- [ ] Nginx configured with security headers
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] Rate limiting tested
- [ ] Backup script configured and tested
- [ ] PM2 auto-start enabled
- [ ] GA4 tracking ID added
- [ ] Forms tested on production domain
- [ ] CSRF token generation working
- [ ] Email notifications arriving
- [ ] CSV files rotating monthly
- [ ] SQLite database recording leads
- [ ] Logs writing to `logs/app.log`
- [ ] Thank you page displaying correctly

---

## 📞 Support

For questions or issues:
- Check logs: `tail -f logs/app.log`
- Test health: `curl https://your-domain.com/api/healthz`
- Review this documentation

---

**Built with ❤️ for Life Care Choice**

Version: 1.0.0  
Last Updated: October 2025

