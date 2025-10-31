# Life Care Choice Website

A modern, accessible, and compliance-focused website for Life Care Choice — a marketing and support organization helping families find the right life insurance coverage through licensed independent agents.

## Features

- **Modern Design System**: Warm, futuristic aesthetic with accessible color palette
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **Bilingual Support**: Complete English/Spanish language toggle (EN/ES)
- **TCPA Compliant**: Proper consent language and tracking for all forms
- **Multiple Product Pages**: Final Expense, Mortgage Protection, and Indexed Universal Life (IUL)
- **Agent Portal**: Dedicated application funnel for licensed professionals
- **Accessibility**: AA contrast ratios, keyboard navigation, semantic HTML
- **Performance Optimized**: Next.js 14 with automatic code splitting and image optimization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: DM Serif Display (headings) + Inter (body/UI)
- **Form Handling**: React Hook Form + Zod validation (ready to implement)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Move your logo files:

Place your logo files in the `/public` directory:
- `LOGO WEBSITE BROWN - TRANSPARENT BACKGROUND.png`
- `LOGO WEBSITE INVERTED - TRANSPARENT BACKGROUND.png`

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
llc-lifecarechoice/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── agents/              # Agent application page
│   ├── carriers/            # Carrier partners page
│   ├── contact/             # Contact form page
│   ├── do-not-call/         # Opt-out policy page
│   ├── get-a-quote/         # Quote form page
│   ├── privacy-policy/      # Privacy policy page
│   ├── products/            # Products overview page
│   ├── team/                # Team bios page
│   ├── terms-of-use/        # Terms of use page
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout with fonts
│   └── globals.css          # Global styles
├── components/              # Reusable React components
│   ├── Navigation.tsx       # Sticky header with language toggle
│   ├── Footer.tsx           # Footer with disclosures
│   ├── QuoteForm.tsx        # Reusable quote form with TCPA consent
│   └── Providers.tsx        # Client-side providers wrapper
├── lib/                     # Utilities and context
│   ├── translations.ts      # EN/ES translation strings
│   └── language-context.tsx # Language switching context
├── public/                  # Static assets (logos, images)
└── [config files]           # Next.js, TypeScript, Tailwind configs
```

## Pages

### Client-Facing Pages
- **Home** (`/`) - Hero, value cards, products preview, quote form
- **Products** (`/products`) - Detailed info on Final Expense, Mortgage Protection, IUL
- **About** (`/about`) - Company purpose, values, how we work
- **Team** (`/team`) - Team member bios with headshots
- **Carriers** (`/carriers`) - Partner carrier logos and information
- **Get a Quote** (`/get-a-quote`) - Full quote form with call-to-action
- **Contact** (`/contact`) - Contact form and business information

### Agent Portal
- **Agents** (`/agents`) - Agent benefits and application form

### Legal Pages
- **Privacy Policy** (`/privacy-policy`) - Data collection and usage
- **Terms of Use** (`/terms-of-use`) - Terms and conditions
- **Do Not Call** (`/do-not-call`) - Opt-out instructions

## Design System

### Colors
- **Sand** (#F7F5F1) - Background
- **Charcoal** (#2C2C2C) - Primary text
- **Taupe** (#8A7D6B) - Accent/borders
- **Gold** (#C89B3C) - CTA buttons and highlights

### Typography
- **Headings**: DM Serif Display (elegant, modern-classic)
- **Body**: Inter (18-20px base, generous line height)

### Components
- Large buttons (48-52px height) with pill radius
- Cards with subtle shadows and hover effects
- Generous padding and whitespace
- Accessible focus states

## Compliance Features

### TCPA Consent
All forms include proper TCPA consent language covering:
- Autodialer and prerecorded message disclosure
- SMS/MMS text messaging consent
- Message and data rate disclaimer
- STOP/HELP instructions
- "Consent not required to purchase" language
- Links to Privacy Policy and Terms

### Form Data Tracking
Forms capture:
- User input data
- Timestamp of submission
- IP address (server-side)
- Consent checkbox state

### Disclosures
Footer includes:
- Role clarification (marketing org, not insurance company)
- Agent licensing disclosure
- Carrier underwriting disclaimer

## Customization

### Update Contact Information

Search for the following placeholders and replace with actual information:
- Phone: `(800) 123-4567` and `tel:+18001234567`
- Emails: `support@lifecarechoice.com`, `agents@lifecarechoice.com`, etc.
- Address: `123 Insurance Way, Suite 400, Your City, ST 12345`

### Add Real Images

Replace placeholder images:
1. Team member headshots in `/app/team/page.tsx`
2. Carrier logos in `/app/carriers/page.tsx`
3. Consider adding hero images and product photos

### Form Integration

To connect forms to your backend:
1. Update `handleSubmit` functions in:
   - `/components/QuoteForm.tsx`
   - `/app/agents/page.tsx`
   - `/app/contact/page.tsx`
2. Add your API endpoint URLs
3. Implement proper error handling
4. Set up email notifications or CRM integration

### Analytics & Tracking

Add tracking in `app/layout.tsx`:
```typescript
// Google Analytics 4
// Ringba DNI for phone tracking
// Facebook Pixel (if using)
// Other marketing pixels
```

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables (if any)
4. Deploy

### Other Hosting Options

Works with any Node.js hosting:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Traditional VPS with Node.js

## Performance Checklist

- [ ] Compress and optimize all images (WebP/AVIF)
- [ ] Add real carrier logos (monochrome, equal sizing)
- [ ] Configure caching headers
- [ ] Set up CDN for static assets
- [ ] Run Lighthouse audit (target: 90+)
- [ ] Test on real devices (mobile, tablet, desktop)

## Accessibility Checklist

- [x] AA color contrast ratios
- [x] Keyboard navigation support
- [x] Focus visible states
- [x] Semantic HTML structure
- [ ] Add alt text to all images (when added)
- [x] Base font size ≥18px
- [ ] Test with screen readers

## Legal & Compliance Checklist

- [x] TCPA consent language on all forms
- [x] Privacy Policy page
- [x] Terms of Use page
- [x] Do Not Call/Opt-Out page
- [ ] Update privacy policy with actual practices
- [ ] Review legal pages with attorney
- [ ] Ensure state licensing compliance
- [ ] Verify carrier partnership disclosures

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Support

For questions or issues, contact:
- Email: support@lifecarechoice.com
- Phone: (800) 123-4567

## License

Proprietary - © 2025 Life Care Choice. All rights reserved.

