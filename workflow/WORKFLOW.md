# Christ Church Bluffton — Master Workflow

## Phase 1: Original Site Build (src/primary/) ✅ COMPLETE
> This was the original full site build in `src/primary/`. It now serves as a **design reference** for the live site.

- [x] Initial site build (10 pages: index, about, worship, groups, events, contact, give, privacy, terms, 404)
- [x] Color scheme: forest green #1B4332 + muted gold #A0875A (original — since updated)
- [x] Fonts: Cinzel (headings), Lato (body), Cormorant Garamond (accent) (original — since updated)
- [x] Sticky header with shadow on scroll
- [x] Celtic cross SVG favicon
- [x] Active nav highlighting (works with .html and clean URLs)
- [x] Mobile menu with branding
- [x] Page header backgrounds with gradient overlay
- [x] Events system (auto-sorts, hides past, features next)
- [x] Prayer Request FAB (pill button, popup form)
- [x] Back-to-top button
- [x] Scroll animations via IntersectionObserver
- [x] Loader on index.html (skip on revisit via sessionStorage)
- [x] Newsletter form in footer (Netlify Functions → Breeze API + Resend)
- [x] Contact form (Netlify Functions → Breeze API + Resend)
- [x] Meta descriptions + OG tags on all pages
- [x] OG image for social media link previews
- [x] Footer contact info with gold icons
- [x] Unicode cross → inline SVG fix (mobile emoji issue)
- [x] Hero update: removed tradition badge, renamed title
- [x] Security headers in netlify.toml (CSP, HSTS, X-Frame, etc.)
- [x] Static asset caching (1 year for CSS/JS/images)
- [x] Custom 404 page with redirect rule
- [x] Clean URLs enabled (no .html in address bar)
- [x] .gitignore configured (excludes sensitive files, backups, PDFs, etc.)
- [x] Pushed to GitHub: ForgedDigital/christ-church-bluffton (7 commits)

## Phase 2: Client Review & Content ⏳ WAITING ON CLIENT
> Status: Live site has Give + Contact pages. Waiting on Rev. Jonathan Riddle for content as we build out additional pages in `live/`.

### Content Needed from Client (for future pages)
- [ ] **Real photos**: about page, worship, groups, pastor headshot, leadership team
- [ ] **Phone number**: needed when adding to site
- [ ] **Email verification**: confirm `pastor@`, `info@`, `treasurer@` christchurchbluffton.org are real
- [ ] **ACNA membership**: verify before adding to about page
- [ ] **Pastor quote + bio**: needs Rev. Riddle's actual words
- [ ] **Full content review**: much of `src/primary/` text is AI-generated — client needs to approve before porting to `live/`

### As Pages Get Built in live/
- [ ] Pull layout/design from `src/primary/`
- [ ] Apply current branding (navy #303b6a, gold #c3a355, Lora font)
- [ ] Use shared components (header, footer, prayer FAB via includes)
- [ ] Add page-specific CSS inline
- [ ] Update sitemap.xml with new pages
- [ ] Swap in real photos (convert to webp)

## Phase 3: Pre-Launch Dev Work 🔧 TODO
> Can be done before or after client content — no dependency.

- [x] **Tithe.ly donations**: Tithe.ly modal working on donation.html (standalone) + give.html (main site)
### Forms Strategy
> Forms use Netlify Functions + Breeze (Tithe.ly) API + Resend email notifications.
> Each submission goes two routes: (1) auto-populates in Tithe.ly People with auto-tagging, (2) sends email notification via Resend.
>
> **Current config (testing URL):**
> - `EMAIL_FROM`: `Christ Church Bluffton <notifications@christchurchbluffton.org>`
> - `NOTIFY_EMAIL`: `admin@christchurchbluffton.org`
> - Domain verified in Resend, DNS records added in GoDaddy, spam filter approved in Google Workspace Admin
>
> **All Resend/Netlify env vars must be re-added on the production Netlify site before going live.**

- [x] **Contact form**: Netlify Function → Breeze API + Resend email (tested & working)
- [x] **Prayer request form**: Netlify Function → Breeze API + Resend email (tested & working; anonymous submissions create "Anonymous (Prayer Request)" in Breeze)
- [x] **Stay Updated signup**: Netlify Function → Breeze API + Resend email (tested & working)
- [x] **Resend setup**: Account created, domain verified, API key added to Netlify env vars
- [x] **Test all forms**: All 3 forms tested on testing URL — Breeze + email working
- [ ] **Tithely Member Login Integration**:
  - [x] Get church-specific ID from Tithely admin dashboard → **12530887**
  - [x] Build login URL: `https://tithe.ly/integration-login/12530887`
  - [ ] Add "Member Login" button to site nav (desktop + mobile)
  - [ ] Style button consistent with existing nav (match Give button pattern)
  - [ ] Enable Member Directory in Tithely admin (configure visibility/privacy)
  - [ ] Test login flow end-to-end (create account → find church → view directory → manage family)
  - [ ] Copy to `live/` folder when ready for production
- [x] **Spam protection (honeypot)**: Hidden `website_url_confirm` field on all 3 forms (contact, prayer, newsletter) + server-side checks in all 3 Netlify Functions
- [x] **Spam protection (CAPTCHA)**: Cloudflare Turnstile on all 3 forms (site key: `0x4AAAAAACneNwgE844_oOI-`, secret in Netlify env `TURNSTILE_SECRET_KEY`)
- [x] **Accessibility (code-level)**: skip-to-content link, focus-visible outlines, sr-only class, prefers-reduced-motion, main landmark with id on all pages
- [x] **SEO meta tags (dev site)**: canonical URLs, og:url, og:site_name, Twitter card tags, absolute og:image URLs on all 9 indexable pages
- [x] **404 noindex**: added `<meta name="robots" content="noindex">` to 404.html
- [x] **Apple Touch Icon link tag**: added to all 10 pages (PNG file still needed)
- [x] **Hero fetchpriority**: added `fetchpriority="high"` to index.html hero image
- [x] **Removed "example" placeholder**: removed `<span class="logo-example">` from header on all 10 pages
- [x] **Apple Touch Icon**: `favicon.png` (180x180) created from logo-dark-bg.png, linked on all pages
- [ ] **Self-host Google Fonts**: download woff2 files, add @font-face, remove Google Fonts links (performance)
- [ ] **Accessibility audit**: run Lighthouse + WAVE, fix any remaining issues
- [ ] **Color contrast review**: check WCAG AA contrast ratios as colors are updated (especially gold text on white/green backgrounds)
- [ ] **Cross-browser test**: Chrome, Firefox, Safari, Edge, mobile
- [ ] **Final code cleanup**: remove any console.logs, unused CSS, etc.

## Phase 3b: Live Site Rebuild (2026-03-17) ✅ COMPLETE
> Client requested keeping the current live site and making changes directly. Rebuilt `live/` as the main development folder with updated branding.

### Branding Updates
- [x] **New color scheme**: Navy #303b6a + Gold #c3a355 (client-chosen)
- [x] **Supporting colors**: Linen background #F5F4EF, cream cards #FAF8F3, blue-gray text #4A4A55, warm gray borders #E2E0D8
- [x] **New font**: Lora (Regular 400) — replaced Cinzel/Lato/Cormorant Garamond
- [x] **New logos**: Celtic cross emblem in 5 variants stored in `assets/logos/` (logo-light.png, logo-dark.png, logo-gold.png, logo-white-bg.png, logo-dark-bg.png)
- [x] **New favicon**: Created from logo-dark-bg.png (favicon.ico + favicon.png)

### Live Pages (Updated 2026-03-17)
- [x] **index.html** (Give page) — Scripture banner, two-column give section (pastor quote + Tithe.ly donation box), CTA banner, loader with logo
- [x] **contact.html** — Page header, contact cards (location, email, P.O. Box), contact form with Turnstile, donate CTA
- [x] **privacy.html** — Legal page with shared header/footer
- [x] **terms.html** — Legal page with shared header/footer
- [x] **404.html** — Branded error page

### Shared Component Architecture
- [x] **`includes/header.html`** — Single header for all pages (logo, Contact nav link, Give button)
- [x] **`includes/footer.html`** — Single footer for all pages (branding, quick links, newsletter signup, copyright, legal links, Powered by Forged Digital)
- [x] **`includes/prayer-fab.html`** — Prayer Request floating button + popup form
- [x] **`css/shared.css`** — All shared styles (header, footer, newsletter, prayer FAB, skip link, focus styles, reduced motion)
- [x] **`js/components.js`** — Loads header/footer/prayer HTML, handles newsletter + prayer form submissions

### Accessibility (completed 2026-03-17)
- [x] Skip-to-content link in shared header
- [x] `<nav>` landmark with `aria-label` on header navigation
- [x] `id="main-content"` on all pages for skip link target
- [x] Focus-visible outlines (gold, 2px, 3px offset)
- [x] `prefers-reduced-motion` media query — disables all animations
- [x] Heading hierarchy fixed (H1 → H2 → H3, no skipping)
- [x] `aria-label` on prayer FAB and close buttons
- [x] Honeypot spam protection on all forms
- [x] Cloudflare Turnstile on contact form

### SEO & Meta (completed 2026-03-17)
- [x] `og:site_name` on all pages
- [x] OG + Twitter card tags on all pages
- [x] Canonical URLs on all pages
- [x] `sitemap.xml` updated with `/` and `/contact`
- [x] `robots.txt` cleaned (removed dead /coming-soon disallow)
- [x] Privacy/Terms changed from `noindex` to `index, follow`

### Netlify Config (completed 2026-03-17)
- [x] API routes: `/api/contact`, `/api/prayer`, `/api/stay-updated` → Netlify Functions
- [x] Netlify Functions copied to `live/netlify/functions/`
- [x] CSP with Tithe.ly, GA4, Turnstile, Forged Digital iframe allowed
- [x] `Permissions-Policy: payment=(self "https://give.tithe.ly")`
- [x] `frame-ancestors` for Forged Digital portfolio embedding
- [x] Cache headers for CSS, JS, images (1 year immutable)
- [x] Custom 404 redirect rule
- [x] Legacy redirects: `/donation` → `/`, `/coming-soon` → `/`

### Cleanup (completed 2026-03-17)
- [x] Removed orphan files: `donation.html`, `coming-soon.html`, `netlify-previous.toml`
- [x] Error messages added to prayer and newsletter form failures
- [x] CTA "Get in Touch" links to contact.html (not mailto)
- [x] Font sizes audited and increased for Lora readability
- [x] Web app manifest (manifest.json) with 192x192 + 512x512 app icons
- [x] `<meta name="theme-color">` on all pages (navy #303b6a)
- [x] Font cache header added to netlify.toml
- [x] Email fallback aligned across all Netlify Functions
- [x] 404.html CSS path fixed to absolute
- [x] Hamburger menu for mobile/tablet
- [x] Prayer FAB: circle on mobile/tablet, pill on desktop, stops above footer on scroll
- [x] Breakpoint testing complete (320, 350, 380, 400, 420, 480, 768, 1024, 1440)
- [x] Color contrast audit done (gold-text #8E7A3A for light backgrounds)
- [x] New final logos swapped in (CCB Logo-Circle + CCB Logo-Circle-Reversed)
- [x] New favicon regenerated from final logo

## Phase 4: Deployment 🚀 IN PROGRESS
> Production site is LIVE at christchurchbluffton.org.
> `live/` is the main development folder — pushed to GitHub, auto-deploys to Netlify.

### Folder Structure
- **`live/`** — **Main development folder.** This is the active codebase. Pushed to GitHub. Auto-deploys to Netlify. All new work happens here.
- **`src/primary/`** — Reference/design source. Contains the original full site build with layouts, components, and designs that we pull from when building new pages in `live/`.
- **`assets/logos/`** — All logo variants (source PNGs, not deployed)

### Development Workflow
> **`live/` is the single source of truth for what's on christchurchbluffton.org.**
> - All development happens in `live/`
> - Use `src/primary/` as a design reference — pull layouts, components, and ideas from there into `live/`
> - `live/` is pushed to GitHub and auto-deploys to Netlify
> - Shared components: `includes/header.html`, `includes/footer.html`, `includes/prayer-fab.html`, `css/shared.css`, `js/components.js`
> - Page-specific CSS stays inline on each page; shared styles are in `css/shared.css`

### Netlify
- **URL**: `christchurchbluffton.org`
- **Auto-deploys**: From `ForgedDigital/christ-church-bluffton` main branch, publishes `live/` folder
- **Netlify config**: `live/netlify.toml`

### Live Site Status (Updated 2026-03-17)
- [x] Domain `christchurchbluffton.org` → Netlify (GoDaddy DNS, SSL active)
- [x] Give page live as landing page (`/`) — Tithe.ly modal, scripture banner, CTA
- [x] Contact page (`/contact`) — form with Turnstile, contact cards, donate CTA
- [x] Privacy policy (`/privacy`) — shared header/footer
- [x] Terms of use (`/terms`) — shared header/footer
- [x] Custom 404 page
- [x] Tithe.ly modal working (CSP + Permissions-Policy configured)
- [x] Security headers (HSTS, CSP with frame-ancestors, nosniff, referrer-policy)
- [x] Clean URLs enabled (no .html)
- [x] Netlify Functions for contact, prayer, newsletter forms
- [x] Prayer Request FAB on all pages
- [x] Newsletter signup in footer on all pages
- [x] Shared components (header, footer, prayer FAB via JS includes)
- [x] robots.txt + sitemap.xml (includes `/` and `/contact`)
- [x] JSON-LD structured data (Church + NonprofitOrganization)
- [x] Full accessibility pass (skip link, focus styles, reduced motion, heading hierarchy, ARIA)
- [x] Netlify environment variables set on production site (Breeze, Resend, Turnstile)
- [x] Self-hosted Lora font (woff2, no Google Fonts CDN)
- [x] Color contrast audit done (gold-text #8E7A3A)
- [x] Breakpoint testing complete (320-1440px)
- [x] Web app manifest + app icons
- [ ] Verify all 3 forms work on production URL
- [ ] Cross-browser test (Safari, Firefox, Edge)
- [ ] Lighthouse audit

## Phase 4b: Client Approval & Pre-Launch ⏳ NEXT
> Push current build to git, send to client for approval, then do a full pre-launch walkthrough before going live.

### Next Steps
1. [x] Push `live/` to GitHub
2. [ ] Deploy to production domain (drag-and-drop `live/` to christchurchbluffton.org Netlify)
3. [ ] Client review — collect feedback/changes
4. [ ] Apply any requested changes
5. [ ] Full pre-launch walkthrough (refer to `_Operations/PRELAUNCH-WEBSITE.md`)
   - [ ] Test all 3 forms on production URL (contact, prayer, newsletter)
   - [ ] Verify Tithe.ly donation modal works
   - [ ] Cross-browser test (Chrome, Firefox, Safari, Edge, mobile)
   - [ ] Responsive check (320px, 480px, 768px, 1024px, 1440px)
   - [ ] Color contrast audit (WCAG AA)
   - [ ] Self-host Lora font
   - [ ] Lighthouse audit (performance, accessibility, SEO)
   - [ ] Verify GA4 is receiving data
   - [ ] Submit updated sitemap to Google Search Console
6. [ ] Go live

## Phase 5: SEO & Analytics 📊 DONE (for donation page)

### Google Analytics (GA4) ✅ DONE
- [x] Create GA4 property (Measurement ID: `G-PTWWV0M0DX`)
- [x] Add tracking code to all pages (live + primary site)
- [x] CSP updated to allow Google Tag Manager + Analytics
- [ ] Verify data is flowing in GA4 dashboard

### Google Search Console ✅ DONE
- [x] Add domain property `christchurchbluffton.org`
- [x] Verified via Google Workspace (auto-verified)
- [x] Kevin added as Full user
- [x] sitemap.xml deployed with live site
- [ ] Submit sitemap URL in Search Console
- [ ] Confirm pages are being indexed (check back in 1-2 weeks)

### SEO Audit ✅ DONE (updated 2026-03-17)
- [x] sitemap.xml — includes `/` and `/contact`
- [x] robots.txt — references sitemap, clean (no dead rules)
- [x] Canonical tags on all live pages
- [x] Meta robots: `index, follow` on give, contact, privacy, terms; `noindex` on 404
- [x] og:image + twitter:image on all pages
- [x] og:site_name on all pages
- [x] Meta descriptions unique per page
- [x] JSON-LD structured data (Church + NonprofitOrganization)
- [x] H1 tags on all pages (proper hierarchy)
- [x] Twitter card tags on all pages
- [ ] Check for 404s in Search Console after 2-4 weeks
- [ ] Re-audit SEO when new pages are added (update sitemap, canonical tags)

---

## Quick Reference
| Item | Value |
|---|---|
| Project folder | `Christ Church Bluffton` |
| Active codebase | `live/` subfolder (pushed to git, auto-deploys to Netlify) |
| Design reference | `src/primary/` subfolder (pull layouts/ideas from here) |
| Dev server | `http-server live/ -p 3013` |
| GitHub | `ForgedDigital/christ-church-bluffton` |
| Production URL | `christchurchbluffton.org` |
| GA4 ID | `G-PTWWV0M0DX` |
| Netlify config | `live/netlify.toml` |
| Shared CSS | `live/css/shared.css` |
| Shared JS | `live/js/components.js` |
| Shared HTML | `live/includes/` (header, footer, prayer-fab) |
| Logo assets | `assets/logos/` (5 variants) |
| Client | Rev. Jonathan Riddle |
| Billing | Donation (free) |
