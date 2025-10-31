# Life Care Choice - Quick Start Guide

## 🎯 Complete Form Submission System Setup

Your **production-ready, self-hosted form management system** is now installed!

---

## ✅ System Created

### ✨ **What You Have:**

✅ **API Endpoints:**
- `/api/lead` - Form submission handler
- `/api/csrf` - CSRF token generation
- `/api/healthz` - Health check

✅ **Security Features:**
- CSRF protection (per-session tokens)
- Rate limiting (file-based, no Redis needed)
- Honeypot bot detection
- Minimum fill-time validation
- Input sanitization & XSS prevention

✅ **Data Storage:**
- SQLite database (`./data/leads.db`)
- CSV files with monthly rotation (`./data/submissions-YYYY-MM.csv`)

✅ **Notifications:**
- SMTP email notifications (optional)
- HMAC-signed webhooks (optional)

✅ **Analytics:**
- GA4 event tracking (no PII)

✅ **Components:**
- Enhanced `QuoteForm` component with all security features

---

## 🚀 Installation

### 1. Install Dependencies

**Note**: `better-sqlite3` requires Node.js <= v23. If you're on Node v24+, switch versions:

```bash
# Check your Node version
node -v

# If v24+, switch to v22 (recommended)
nvm install 22
nvm use 22

# Or use v20 (LTS)
nvm install 20
nvm use 20
```

**Then install**:

```bash
cd /Users/mac/Desktop/llc-lifecarechoice
npm install
```

### 2. Create Environment File

```bash
# Create from template
cp docs/ENV_TEMPLATE.md .env.local

# Edit with your settings
nano .env.local
```

**Minimum config**:

```.env
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
CSRF_SECRET=$(openssl rand -hex 32)
```

### 3. Initialize Data Directories

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

## 📧 Optional: Email Setup (Gmail)

1. Go to: https://myaccount.google.com/apppasswords
2. Generate an "App Password"
3. Add to `.env.local`:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
NOTIFY_EMAIL=notifications@your-company.com
```

---

## 🧪 Test It Works

### 1. Health Check

```bash
curl http://localhost:3000/api/healthz
```

**Expected**: `{"status":"ok"}`

### 2. Submit Test Lead

**Open browser console** (http://localhost:3000):

```javascript
// Get CSRF token
const csrf = await fetch('/api/csrf').then(r => r.json());

// Submit form
const result = await fetch('/api/lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    csrf: csrf.token,
    honeypot: '',
    timestamp: new Date(Date.now() - 5000).toISOString(),
  }),
}).then(r => r.json());

console.log(result); // Should show: { ok: true, id: "...", stored: ["sqlite", "csv"] }
```

### 3. Verify Data Stored

```bash
# Check SQLite
sqlite3 data/leads.db "SELECT * FROM leads;"

# Check CSV
cat data/submissions-$(date +%Y-%m).csv
```

---

## 📱 Use in Your Forms

### Update Existing Forms

Your `QuoteForm` component has been enhanced with security features. **Just ensure it imports**:

```tsx
import { storeTrackingData, getStoredTrackingData } from '@/lib/capture';
import { trackFormAttempt, trackFormSuccess, trackFormError } from '@/lib/ga4';
```

### For Other Forms (Coverage Calculator, Contact, Agents)

Follow the same pattern:

```tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storeTrackingData, getStoredTrackingData } from '@/lib/capture';
import { trackFormAttempt, trackFormSuccess, trackFormError } from '@/lib/ga4';

export default function MyForm() {
  const router = useRouter();
  const [csrfToken, setCSRFToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formStartTime, setFormStartTime] = useState<number>(0);
  
  // Fetch CSRF token on mount
  useEffect(() => {
    storeTrackingData();
    setFormStartTime(Date.now());
    
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => setCSRFToken(data.token))
      .catch(err => console.error('CSRF fetch error:', err));
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    trackFormAttempt('my-form-type');
    const startTime = Date.now();
    
    try {
      const trackingData = getStoredTrackingData();
      
      const payload = {
        ...formData,
        csrf: csrfToken,
        honeypot: '',
        timestamp: new Date(formStartTime).toISOString(),
        ...trackingData,
      };
      
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      const latency = Date.now() - startTime;
      
      if (response.ok && result.ok) {
        trackFormSuccess('my-form-type', latency);
        setTimeout(() => router.push('/thank-you'), 500);
      } else {
        trackFormError('my-form-type', result.code, latency);
        setError(result.message || 'An error occurred');
        setIsSubmitting(false);
      }
    } catch (err) {
      trackFormError('my-form-type', 'NETWORK_ERROR', Date.now() - startTime);
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  // ... rest of your form JSX
}
```

**Don't forget the honeypot field**:

```tsx
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  style={{ position: 'absolute', left: '-9999px' }}
  aria-hidden="true"
/>
```

---

## 🗂️ Where Data is Stored

### SQLite Database

**File**: `./data/leads.db`

**View all leads**:
```bash
sqlite3 data/leads.db "SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;"
```

**Export to JSON**:
```bash
sqlite3 data/leads.db ".mode json" "SELECT * FROM leads;" > leads.json
```

### CSV Files

**Files**: `./data/submissions-YYYY-MM.csv`

**View latest**:
```bash
tail -n 10 data/submissions-$(date +%Y-%m).csv
```

**Open in Excel**: Just double-click the CSV file

---

## 📊 View Logs

```bash
# Real-time logs
tail -f logs/app.log

# Parse JSON logs
cat logs/app.log | jq 'select(.level == "error")'

# Count errors today
cat logs/app.log | jq 'select(.level == "error")' | wc -l
```

---

## 🔒 Security Checklist

Before going live:

- [ ] `CSRF_SECRET` is random and secure (32+ bytes)
- [ ] `ALLOWED_ORIGINS` set to your production domain
- [ ] Rate limiting configured (`RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_SEC`)
- [ ] SMTP credentials secured (use App Password, not main password)
- [ ] `.env.local` added to `.gitignore` (never commit secrets!)
- [ ] SSL certificate installed (HTTPS only)
- [ ] Data directories (`data/`, `logs/`) have correct permissions
- [ ] Nginx/proxy configured with security headers

---

## 🐛 Troubleshooting

### "Cannot find module '@/lib/...'

**Fix**: TypeScript path alias issue. Check `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### "Database is locked"

**Fix**: Stop all Node processes and restart:

```bash
pkill -f "node"
npm run dev
```

### "better-sqlite3" won't install

**Fix**: Use Node.js v20 or v22 (not v24):

```bash
nvm use 22
npm install
```

### "CORS_DENIED" error

**Fix**: Add your domain to `ALLOWED_ORIGINS` in `.env.local`

### Email not sending

**Fix**: Check SMTP config. Test with:

```bash
curl http://localhost:3000/api/healthz | jq '.services.email'
```

---

## 📚 Full Documentation

- **Complete API Reference**: `FORM_SYSTEM_README.md`
- **Testing Guide**: `docs/TESTING_GUIDE.md`
- **Environment Template**: `docs/ENV_TEMPLATE.md`

---

## 🎉 You're All Set!

Your form submission system is **production-ready** with:

✅ Enterprise-grade security  
✅ Dual data persistence (SQLite + CSV)  
✅ Email & webhook notifications  
✅ GA4 analytics  
✅ TCPA compliance  
✅ UTM tracking  

**Start collecting leads! 🚀**

Need help? Check the full documentation or review the code in `/lib` and `/app/api`.

---

**Version**: 1.0.0  
**Last Updated**: October 2025

