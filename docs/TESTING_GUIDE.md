# Testing Guide - Lead Management System

## 📋 Table of Contents

1. [Quick Health Check](#quick-health-check)
2. [API Endpoint Testing](#api-endpoint-testing)
3. [Security Feature Testing](#security-feature-testing)
4. [Browser Testing](#browser-testing)
5. [Load Testing](#load-testing)

---

## Quick Health Check

### Test System is Running

```bash
curl http://localhost:3000/api/healthz | jq
```

**Expected Output**:
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

---

## API Endpoint Testing

### 1. Get CSRF Token

```bash
curl http://localhost:3000/api/csrf | jq
```

**Save the token** for next tests:
```bash
TOKEN=$(curl -s http://localhost:3000/api/csrf | jq -r '.token')
echo $TOKEN
```

### 2. Submit Valid Lead

```bash
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z" -d "5 seconds ago")

curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "555-123-4567",
    "zip": "90210",
    "state": "CA",
    "productInterest": "final-expense",
    "bestTime": "afternoon",
    "csrf": "'$TOKEN'",
    "honeypot": "",
    "timestamp": "'$TIMESTAMP'",
    "utm_source": "test",
    "utm_campaign": "api-test"
  }' | jq
```

**Expected Output**:
```json
{
  "ok": true,
  "id": "abc123xyz789",
  "stored": ["sqlite", "csv"],
  "message": "Lead submitted successfully"
}
```

### 3. Verify Data Stored

**Check SQLite**:
```bash
sqlite3 data/leads.db "SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;"
```

**Check CSV**:
```bash
tail -n 1 data/submissions-$(date +%Y-%m).csv
```

---

## Security Feature Testing

### Test 1: Rate Limiting

Submit 11 requests rapidly (limit is 10):

```bash
for i in {1..11}; do
  echo "Request $i:"
  curl -X POST http://localhost:3000/api/lead \
    -H "Content-Type: application/json" \
    -d '{
      "firstName": "Test'$i'",
      "lastName": "User",
      "email": "test'$i'@example.com",
      "phone": "555-123-456'$i'",
      "csrf": "'$TOKEN'",
      "honeypot": "",
      "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z" -d "5 seconds ago")'"
    }' | jq '.ok, .code'
  echo "---"
done
```

**Expected**: First 10 succeed, 11th returns `RATE_LIMIT`

### Test 2: Honeypot Detection

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bot",
    "lastName": "Detector",
    "email": "bot@example.com",
    "phone": "555-123-4567",
    "honeypot": "I am a bot",
    "csrf": "'$TOKEN'",
    "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z" -d "5 seconds ago")'"
  }' | jq
```

**Expected Output**:
```json
{
  "ok": false,
  "code": "BOT_DETECTED",
  "message": "Suspicious activity detected"
}
```

### Test 3: Too-Fast Submission

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Fast",
    "lastName": "User",
    "email": "fast@example.com",
    "phone": "555-123-4567",
    "csrf": "'$TOKEN'",
    "honeypot": "",
    "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'"
  }' | jq
```

**Expected Output**:
```json
{
  "ok": false,
  "code": "TOO_FAST",
  "message": "Form submitted too quickly"
}
```

### Test 4: Invalid CSRF Token

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Invalid",
    "lastName": "CSRF",
    "email": "invalid@example.com",
    "phone": "555-123-4567",
    "csrf": "invalid-token-12345",
    "honeypot": "",
    "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z" -d "5 seconds ago")'"
  }' | jq
```

**Expected Output**:
```json
{
  "ok": false,
  "code": "INVALID_CSRF",
  "message": "Invalid or expired CSRF token"
}
```

### Test 5: Validation Errors

**Missing required field**:
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "email": "invalid-email",
    "phone": "555-123-4567",
    "csrf": "'$TOKEN'",
    "honeypot": "",
    "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z" -d "5 seconds ago")'"
  }' | jq
```

**Expected Output**:
```json
{
  "ok": false,
  "code": "VALIDATION_FAILED",
  "message": "Validation failed",
  "errors": [
    { "field": "lastName", "message": "Last name is required" },
    { "field": "email", "message": "Invalid email address" }
  ]
}
```

---

## Browser Testing

### Open Developer Console

```javascript
// 1. Fetch CSRF token
const csrfResponse = await fetch('/api/csrf');
const { token } = await csrfResponse.json();
console.log('CSRF Token:', token);

// 2. Submit form
const formData = {
  firstName: 'Browser',
  lastName: 'Test',
  email: 'browser@example.com',
  phone: '555-123-4567',
  zip: '90210',
  state: 'CA',
  productInterest: 'final-expense',
  bestTime: 'afternoon',
  csrf: token,
  honeypot: '',
  timestamp: new Date(Date.now() - 5000).toISOString(),
  utm_source: 'browser-test',
};

const response = await fetch('/api/lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

const result = await response.json();
console.log('Result:', result);
```

---

## Load Testing

### Using Apache Bench

**Install** (if not already):
```bash
# macOS
brew install httpd

# Linux
sudo apt-get install apache2-utils
```

**Simple Load Test**:
```bash
# 100 requests, 10 concurrent
ab -n 100 -c 10 http://localhost:3000/api/healthz
```

### Using Artillery

**Install**:
```bash
npm install -g artillery
```

**Create test file** (`load-test.yml`):
```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 5
      name: "Sustained load"
scenarios:
  - name: "Submit leads"
    flow:
      - get:
          url: "/api/csrf"
          capture:
            json: "$.token"
            as: "csrfToken"
      - post:
          url: "/api/lead"
          json:
            firstName: "Load"
            lastName: "Test"
            email: "load{{ $randomNumber() }}@example.com"
            phone: "555-{{ $randomNumber() }}"
            csrf: "{{ csrfToken }}"
            honeypot: ""
            timestamp: "{{ $timestamp }}"
```

**Run test**:
```bash
artillery run load-test.yml
```

---

## Verification Checklist

After testing, verify:

- [ ] Health endpoint returns `200 OK`
- [ ] CSRF tokens are generated successfully
- [ ] Valid submissions return `200` with lead ID
- [ ] Data is stored in SQLite (`leads` table)
- [ ] Data is appended to CSV file
- [ ] Email notifications are sent (if configured)
- [ ] Webhooks are sent (if configured)
- [ ] Rate limiting kicks in at 11th request
- [ ] Honeypot detects bot submissions
- [ ] Too-fast submissions are rejected
- [ ] Invalid CSRF tokens are rejected
- [ ] Validation errors are returned with field details
- [ ] Logs are written to `logs/app.log`
- [ ] GA4 events are fired (check dataLayer)

---

## Common Issues

### "ECONNREFUSED" Error
**Problem**: Server not running

**Solution**:
```bash
npm run dev
```

### "Database is locked"
**Problem**: Multiple processes accessing SQLite

**Solution**:
```bash
# Stop all Node processes
pkill -f "node"
# Restart
npm run dev
```

### "CORS_DENIED"
**Problem**: Origin not allowed

**Solution**: Add origin to `ALLOWED_ORIGINS` in `.env.local`

### CSV file not found
**Problem**: Data directory doesn't exist

**Solution**:
```bash
mkdir -p data logs
chmod 755 data logs
```

---

## Advanced: Integration Tests

Create `tests/integration.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from '@jest/globals';

describe('Lead API Integration', () => {
  let csrfToken: string;
  
  beforeAll(async () => {
    const response = await fetch('http://localhost:3000/api/csrf');
    const data = await response.json();
    csrfToken = data.token;
  });
  
  it('should submit a valid lead', async () => {
    const response = await fetch('http://localhost:3000/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '555-123-4567',
        csrf: csrfToken,
        honeypot: '',
        timestamp: new Date(Date.now() - 5000).toISOString(),
      }),
    });
    
    const result = await response.json();
    
    expect(response.status).toBe(200);
    expect(result.ok).toBe(true);
    expect(result.id).toBeDefined();
    expect(result.stored).toContain('sqlite');
    expect(result.stored).toContain('csv');
  });
  
  it('should detect bots via honeypot', async () => {
    const response = await fetch('http://localhost:3000/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Bot',
        lastName: 'User',
        email: 'bot@example.com',
        phone: '555-123-4567',
        csrf: csrfToken,
        honeypot: 'filled',
        timestamp: new Date(Date.now() - 5000).toISOString(),
      }),
    });
    
    const result = await response.json();
    
    expect(response.status).toBe(400);
    expect(result.ok).toBe(false);
    expect(result.code).toBe('BOT_DETECTED');
  });
});
```

Run with:
```bash
npm test
```

---

**Happy Testing! 🧪**

