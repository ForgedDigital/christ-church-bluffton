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
- [x] Newsletter form in footer (Netlify Forms + honeypot)
- [x] Contact form (Netlify Forms + honeypot)
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
- [ ] **Spam protection**: Add CAPTCHA + honeypot fields to all forms before going live
- [ ] **Fix Deploy bat**: path says `7.1 Christ Church Bluffton` — should be `7 Christ Church Bluffton`
- [ ] **Accessibility check**: run Lighthouse audit, fix any issues
- [ ] **Cross-browser test**: Chrome, Firefox, Safari, Edge, mobile
- [ ] **Final code cleanup**: remove any console.logs, unused CSS, etc.

## Phase 4: Deployment 🚀 TODO
> Requires: Phase 2 content + Phase 3 dev work complete.

### Netlify Setup
- [x] Create site on Netlify (connect GitHub repo: ForgedDigital/christ-church-bluffton)
- [x] Verify auto-deploy from main branch works
- [ ] Re-add Netlify environment variables on production site: `RESEND_API_KEY`, `EMAIL_FROM`, `NOTIFY_EMAIL`
- [ ] Update `NOTIFY_EMAIL` to final recipient(s) once Google Workspace emails are configured
- [ ] Verify all 3 forms work on production URL

### Domain Setup
- [ ] Purchase/confirm domain
- [ ] Point domain DNS to Netlify
- [ ] Enable HTTPS (auto via Let's Encrypt)
- [ ] Verify clean URLs work on live site
- [ ] Test all forms on live site

## Phase 5: Post-Launch SEO & Analytics 📊 TODO
> Do AFTER domain is pointed to Netlify and site is live.

### Google Analytics (GA4)
- [ ] Create GA4 property
- [ ] Add tracking code to all 10 pages
- [ ] Verify data is flowing

### Google Search Console
- [ ] Go to https://search.google.com/search-console
- [ ] Add property → URL prefix → https://[domain]
- [ ] Verify ownership (DNS TXT record or HTML file)
- [ ] Submit sitemap.xml
- [ ] Confirm pages are being indexed (check back in 1-2 weeks)
- [ ] Request indexing for key pages if needed

### SEO Audit
- [ ] Verify sitemap.xml has all pages and is accessible
- [ ] Verify robots.txt references sitemap
- [ ] Add canonical tags to every page
- [ ] Verify meta robots: `index, follow` on real pages, `noindex` on 404
- [ ] Verify og:image / twitter:image on all pages
- [ ] Verify meta descriptions are unique per page
- [ ] Check for 404s in Search Console after 2-4 weeks
- [ ] Add redirects for any stale URLs found

---

## Quick Reference
| Item | Value |
|---|---|
| Project folder | `7 Christ Church Bluffton` |
| Source code | `src/` subfolder |
| Dev server | `http-server src/ -p 3005` |
| GitHub | `ForgedDigital/christ-church-bluffton` |
| Deploy | `Deploy-Christ_Church-Bluffton.bat` (⚠️ fix path first) |
| Netlify config | `netlify.toml` (publish = src/) |
| Domain | TBD |
| Client | Rev. Jonathan Riddle |
| Billing | Donation (free) |
