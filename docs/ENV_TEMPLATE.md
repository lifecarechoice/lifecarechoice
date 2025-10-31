# Environment Variables Template

Copy this to `.env.local` in your project root:

```bash
# Environment Configuration
NODE_ENV=production

# Security & CORS
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
CSRF_SECRET=CHANGE_THIS_TO_RANDOM_32_BYTE_STRING

# Rate Limiting
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_SEC=600

# Data Storage
DATA_DIR=./data
LOG_DIR=./logs
SQLITE_PATH=./data/leads.db
CSV_DIR=./data

# SMTP Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFY_EMAIL=notifications@your-domain.com

# Webhook (Optional)
WEBHOOK_URL=https://your-webhook-endpoint.com/leads
WEBHOOK_SECRET=CHANGE_THIS_TO_RANDOM_SECRET

# Google Analytics
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

## Generate Secure Secrets

```bash
# Generate CSRF_SECRET
openssl rand -hex 32

# Generate WEBHOOK_SECRET
openssl rand -hex 32
```

## Gmail App Password Setup

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in to your Google Account
3. Select app: "Mail"
4. Select device: "Other" → "Life Care Choice"
5. Click "Generate"
6. Copy the 16-character password → Use as `SMTP_PASS`

