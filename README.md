# MAFA AMAZING PEACE LTD — Website Documentation & Maintenance Guide

Welcome to the official website codebase for **MAFA AMAZING PEACE LTD** (*Tagline: ONE LOVE*).

This website is custom-crafted using standard **HTML5, CSS3, and vanilla JavaScript (ES6+)** with zero dependencies, build systems, or framework overhead. It is ultra-fast, mobile-first, fully responsive (360px to 1920px+), and built to WCAG AA accessibility standards.

---

## 1. Project Directory Structure

```text
mafa/
├── index.html              # Main website structure & semantic sections
├── favicon.svg             # Custom arched "M" SVG favicon
├── og-image.jpg            # Social media share card preview (1200x630)
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # XML sitemap for SEO discovery
├── README.md               # Plain-English client maintenance & deployment guide
├── css/
│   └── styles.css          # Design system, tokens, typography, layout, & media queries
├── js/
│   └── main.js             # Nav, smooth scroll, & WhatsApp consultation form
└── images/
    ├── logo/               # logo-mark.svg (and your high-res logo-full.jpeg)
    ├── hero/               # hero-01.jpg (1920x1080 background photography)
    └── founder/            # marie.jpeg (portrait of Marie Ange Melin)
```

---

## 2. (a) Site Sections & Custom Mugs Feature

The website consists of focused, high-converting sections:
1. **Hero:** Full-viewport banner with brand tagline "ONE LOVE", editorial typography, and direct enquiry CTAs.
2. **About / Philosophy:** "A Reflection of Your Style & Taste", highlighting personal customization and UK-wide service.
3. **Services:** 10 curated service cards, prominently featuring **Customized mugs design and printing** as a signature line.
4. **4-Step Process:** Consult, Concept, Create, and Coordinate.
5. **Meet the Founder:** Spotlight on Marie Ange Melin, British-Ivorian businesswoman and entrepreneur with 25+ years experience, and her Simon Sinek leadership philosophy.
6. **Contact & Consultation:** Direct contact cards for Marie Ange Melin and Marie France (with direct phone and WhatsApp links) plus an enquiry form validating directly to WhatsApp with email fallback.
7. **Global Footer:** Complete navigation, company details, and copyright.

---

## 3. (b) Changing Text and Phone Numbers

### Updating Business Copy & Headlines
All headlines, service descriptions, and editorial text live in [index.html](file:///c:/Users/munee/Desktop/mafa/index.html).
- **Hero & Philosophy:** Lines ~120–205.
- **10 Services:** Lines ~230–445.
- **Process Steps:** Lines ~470–545.
- **Founder Bio & Pull Quote:** Lines ~570–630.

### Updating Contact Phone Numbers & WhatsApp Links
Contact numbers appear in three places across the site:
1. **Direct Contact Cards** in `#contact` ([index.html](file:///c:/Users/munee/Desktop/mafa/index.html))
2. **Footer Quick Contacts** in `#site-footer` ([index.html](file:///c:/Users/munee/Desktop/mafa/index.html))
3. **Form WhatsApp Submission Logic** in [js/main.js](file:///c:/Users/munee/Desktop/mafa/js/main.js)

#### Current Numbers:
- **Marie Ange Melin:**
  - Phone link: `href="tel:+447852591933"`
  - WhatsApp link: `href="https://wa.me/447852591933"`
  - Visual display text: `07852 591933`
  - WhatsApp submit handler in `js/main.js`:
    ```javascript
    const waUrl = `https://wa.me/447852591933?text=${encodeURIComponent(formattedMessage)}`;
    ```
- **Marie France:**
  - Phone link: `href="tel:+447449790586"`
  - WhatsApp link: `href="https://wa.me/447449790586"`
  - Visual display text: `07449 790586`

---

## 4. (c) Replacing Placeholders & Checklist of TODOs

In strict compliance with the project guidelines, **no fake facts, fake addresses, or unverified emails have been invented**. Every pending client asset or item is marked in the source code with an HTML comment.

| Asset / Detail | Current State | Location in Code | Action Needed |
| :--- | :--- | :--- | :--- |
| **Official Business Email** | `hello@mafaamazingpeace.co.uk` placeholder | `index.html` (Contact & Footer), `js/main.js` (mailto fallback) | Replace placeholder email once custom domain email (e.g., Google Workspace or Microsoft 365) is active. |
| **Hero High-Res Photo** | Branded ambient photography included | `images/hero/hero-01.jpg` | Replace with preferred 1920×1080 photograph from an actual MAFA event. |
| **Founder Portrait** | Applied &amp; Active (`marie.jpeg`) | `images/founder/marie.jpeg` | High-resolution portrait active in arched frame. |
| **Primary Logo File** | Inline SVG brand mark active | `images/logo/logo-full.jpeg` | Place your full official logo image at `images/logo/logo-full.jpeg`. |
| **Service Area / Address** | `United Kingdom (UK-wide)` | `index.html` & JSON-LD schema | If you have specific regional hubs or workshop addresses, update line 51 in `index.html`. |
| **Domain Canonical URL** | `https://www.mafaamazingpeace.co.uk/` | `index.html` (Head & JSON-LD) | Confirm domain URL matches your registered live address. |
| **Draft Wording Services** | Services 1, 4, and 8 have `<!-- CONFIRM WORDING -->` | `index.html` (Services section) | Client to confirm final phrasing for services marked with draft wording badges. |

---

## 5. (d) Deploying for Free & Connecting a Custom Domain

This site has no build step and can be hosted for **free forever** with automatic global SSL certificates on any modern static web host.

### Option A: Vercel (Recommended & Connected via GitHub)
1. Log in to [vercel.com](https://vercel.com/) with your GitHub account.
2. Click **"Add New..."** &rarr; **"Project"**.
3. Import your GitHub repository: `muneebarif48/mafa`.
4. Keep the default settings (**Framework Preset: Other**, **Root Directory: ./**).
5. Click **"Deploy"**. Your site is now live with global edge CDN, automatic HTTPS, and instant preview deployments on every `git push`.
6. **Connect Custom Domain:** Go to **Project Settings** &rarr; **Domains** &rarr; Add `mafaamazingpeace.co.uk` and configure the DNS records as prompted.

### Option B: Netlify (Drag & Drop)
1. Go to [netlify.com](https://www.netlify.com/) and create a free account.
2. Under **Sites**, click **"Add new site"** &rarr; **"Deploy manually"**.
3. Drag and drop the entire `mafa` folder into your browser window.
4. Your site will go live immediately on a free `.netlify.app` URL.
5. **Connect Your Domain:**
   - Go to **Site Configuration** &rarr; **Domain Management** &rarr; **Add a domain**.
   - Type your domain (e.g. `mafaamazingpeace.co.uk`).
   - Follow Netlify's instructions to add the DNS records (`CNAME` for www, `A` record for root domain) at your domain registrar (GoDaddy, 123 Reg, Namecheap, etc.).

### Option B: Cloudflare Pages
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Click **Create Application** &rarr; **Pages** &rarr; **Upload Assets**.
3. Name your project (e.g. `mafa-amazing-peace`) and upload the project files.
4. Go to **Custom Domains** &rarr; **Set up a custom domain**. Cloudflare manages lightning-fast caching and free automatic SSL renewal.

### Option C: GitHub Pages
1. Create a repository on GitHub (e.g., `mafa-website`).
2. Push all project files to the `main` branch.
3. In repository **Settings** &rarr; **Pages**, select **Deploy from a branch** (`main` / root).
4. Enter your custom domain in the **Custom domain** field and check **Enforce HTTPS**.

---

## 6. Accessibility & Quality Standards Implemented

- **Color Contrast:** Deep Plum (`#521F50`) and Lime (`#C6D64B`) meet or exceed WCAG AA standards (7:1+ contrast ratio). No lime text is ever displayed against white backgrounds.
- **Keyboard Navigation:** Includes a skip-to-content link, accessible navigation menus with Esc closing, and form input validation with focus trapping.
- **Mobile Responsive:** Fluid `clamp()` typography and CSS grid breakpoints tuned for 360px (compact mobile), 768px (tablets), 1080px (laptops), and 1440px+ (desktop).
- **Reduced Motion:** Fully complies with `prefers-reduced-motion` operating system preferences.
