# Christ Church Bluffton — Master Workflow

## Phase 1: Site Build ✅ COMPLETE
- [x] Initial site build (10 pages: index, about, worship, groups, events, contact, give, privacy, terms, 404)
- [x] Color scheme: forest green #1B4332 + muted gold #A0875A
- [x] Fonts: Cinzel (headings), Lato (body), Cormorant Garamond (accent)
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
> Status: Rough draft complete. Waiting on Rev. Jonathan Riddle for review + real content.

### Content Needed from Client
- [ ] **Real photos**: about page, worship, groups, pastor headshot, leadership team
- [ ] **Phone number**: replace `(843) 555-5555` placeholder (appears on ALL 10 pages)
- [ ] **Street address**: privacy.html + terms.html only show "Bluffton, SC" — need full address
- [ ] **Email verification**: confirm `pastor@`, `info@`, `give@` christchurchbluffton.org are real
- [ ] **ACNA membership**: verify claim in about.html (line ~101)
- [ ] **Pastor quote**: about.html (line ~250) — needs Rev. Riddle's actual quote
- [ ] **Pastor bio**: needs proper writing (currently AI-generated placeholder)
- [ ] **Full content review**: much of the site text is AI-generated / researched — client needs to approve or rewrite
- [ ] **Domain**: confirm what domain they want (christchurchbluffton.org? .com?)

### After Client Provides Content
- [ ] Replace all `(843) 555-5555` across all 10 pages
- [ ] Replace placeholder emails if different from current
- [ ] Add full street address to privacy.html, terms.html, contact.html
- [ ] Swap in real photos (convert to webp)
- [ ] Update pastor bio + quote
- [ ] Remove all `[VERIFY]` and `[PLACEHOLDER]` HTML comments
- [ ] Remove `review-marker` spans and CSS (see README.md for details)

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
- [ ] **Create apple-touch-icon.png**: 180x180px PNG of church logo (needed for iOS bookmarks)
- [ ] **Self-host Google Fonts**: download woff2 files, add @font-face, remove Google Fonts links (performance)
- [ ] **Accessibility audit**: run Lighthouse + WAVE, fix any remaining issues
- [ ] **Cross-browser test**: Chrome, Firefox, Safari, Edge, mobile
- [ ] **Final code cleanup**: remove any console.logs, unused CSS, etc.

## Phase 4: Deployment 🚀 IN PROGRESS
> Production site is LIVE at christchurchbluffton.org (donation page only).
> Future pages are added to `live/` folder and manually deployed to Netlify.

### Two Netlify Sites
1. **Review/Testing** — `christchuchbluffton.netlify.app` (Kevin's Netlify, auto-deploys from GitHub, serves `src/`)
2. **Production** — `christchurchbluffton.org` (separate Netlify account, manual drag-and-drop of `live/` folder)

### Production Deployment Workflow
> **All future page additions build off the `live/` folder.**
> When a new page is ready to go public:
> 1. Build/finalize the page in `src/primary/`
> 2. Copy production-ready version to `live/`
> 3. Adjust paths (images → `images/`, remove dev-only links)
> 4. Ensure GA4 tracking, OG tags, and CSP are included
> 5. Drag-and-drop `live/` folder to production Netlify
>
> The `live/` folder is the single source of truth for what's on christchurchbluffton.org.

### Live Site Status
- [x] Domain `christchurchbluffton.org` → Netlify (GoDaddy DNS, SSL active)
- [x] Donation page live as landing page (`/`)
- [x] Privacy policy (`/privacy`)
- [x] Terms of use (`/terms`)
- [x] Custom 404 page
- [x] Tithe.ly modal working (CSP configured)
- [x] Security headers (HSTS, X-Frame, CSP, etc.)
- [x] Clean URLs enabled (no .html)
- [x] robots.txt (blocks /coming-soon, references sitemap)
- [x] sitemap.xml (indexable pages only)
- [x] JSON-LD structured data (Church + NonprofitOrganization)
- [x] Canonical tags on all pages
- [x] OG + Twitter card tags on all pages
- [x] H1 tag on all pages (sr-only on donation/index)
- [x] Meta descriptions on all pages
- [x] 301 redirects: `/donation` → `/`, `/coming-soon` → `/`
- [x] Treasurer email for alternate giving (treasurer@christchurchbluffton.org)
- [ ] Re-add Netlify environment variables on production site: `RESEND_API_KEY`, `EMAIL_FROM`, `NOTIFY_EMAIL`
- [ ] Update `NOTIFY_EMAIL` to final recipient(s) once Google Workspace emails are configured
- [ ] Verify all 3 forms work on production URL

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

### SEO Audit ✅ DONE (donation page)
- [x] sitemap.xml — only indexable pages listed
- [x] robots.txt — references sitemap, blocks /coming-soon
- [x] Canonical tags on all live pages
- [x] Meta robots: `index, follow` on donation, `noindex` on legal/404/coming-soon
- [x] og:image + twitter:image on all pages
- [x] Meta descriptions unique per page
- [x] JSON-LD structured data (Church + NonprofitOrganization)
- [x] H1 tags on all pages
- [x] Twitter card tags on all pages
- [ ] Check for 404s in Search Console after 2-4 weeks
- [ ] Re-audit SEO when full site launches (add new pages to sitemap, update canonical tags)

---

## Quick Reference
| Item | Value |
|---|---|
| Project folder | `Christ Church Bluffton` |
| Source code (dev) | `src/` subfolder |
| Production site | `live/` subfolder (drag-and-drop to Netlify) |
| Dev server | `http-server src/ -p 3011` |
| GitHub | `ForgedDigital/christ-church-bluffton` |
| Production URL | `christchurchbluffton.org` |
| GA4 ID | `G-PTWWV0M0DX` |
| Netlify config (dev) | `netlify.toml` (root) |
| Netlify config (prod) | `live/netlify.toml` |
| Client | Rev. Jonathan Riddle |
| Billing | Donation (free) |
