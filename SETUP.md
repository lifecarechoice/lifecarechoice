# Quick Setup Guide

## Installation & Running

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## What You Need to Customize

### 1. Contact Information (Search & Replace)

Replace these placeholders throughout the codebase:

- **Phone Number**: 
  - Display: `954-833-0290`
  - Tel link: `tel:+19548330290`
  
- **Email Addresses**:
  - `support@lifecarechoice.com`
  - `agents@lifecarechoice.com`
  - `privacy@lifecarechoice.com`
  - `legal@lifecarechoice.com`
  - `donotcall@lifecarechoice.com`
  - `unsubscribe@lifecarechoice.com`

- **Physical Address**:
  - `123 Insurance Way, Suite 400`
  - `Your City, ST 12345`

### 2. Team Member Information

Edit `/app/team/page.tsx`:
- Update names, roles, bios
- Add real headshots (replace placeholder images)

### 3. Carrier Logos

Edit `/app/carriers/page.tsx`:
- Add actual carrier logo images to `/public/carriers/`
- Update the carrier list to match your active appointments
- Replace placeholder SVG icons with real monochrome logos

### 4. Form Integrations

Connect forms to your backend API:

**Quote Form** (`/components/QuoteForm.tsx`):
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Replace with your API endpoint
  const response = await fetch('/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  // Handle response...
};
```

**Agent Application** (`/app/agents/page.tsx`)
**Contact Form** (`/app/contact/page.tsx`)

### 5. Analytics & Tracking

Add tracking codes in `/app/layout.tsx`:

```typescript
// Google Analytics
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />

// Ringba for dynamic number insertion
<Script src="your-ringba-script.js" />
```

### 6. Images

Add high-quality images:
- Team member headshots
- Hero/banner images (optional)
- Product images (optional)
- Use WebP or AVIF format for best performance

### 7. Legal Pages Review

Before launch, have an attorney review:
- `/app/privacy-policy/page.tsx`
- `/app/terms-of-use/page.tsx`
- `/app/do-not-call/page.tsx`

Update with your actual data practices and policies.

## Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### Option 2: Other Hosts

Build for production:
```bash
npm run build
npm start
```

Then deploy the `.next` folder to any Node.js host.

## Testing Checklist

- [ ] Test all forms (quote, agent application, contact)
- [ ] Test language toggle (EN/ES)
- [ ] Test mobile navigation menu
- [ ] Test on multiple devices and browsers
- [ ] Verify all links work
- [ ] Check accessibility with keyboard navigation
- [ ] Run Lighthouse audit (aim for 90+ score)
- [ ] Test form consent tracking
- [ ] Verify TCPA compliance language

## Support

Questions? Contact the developer or refer to the main README.md file.

