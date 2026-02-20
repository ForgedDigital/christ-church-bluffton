# Christ Church Bluffton — Dev Notes

---

## 2026-02-19 — Tithe.ly API Dead End

**Issue**: Tithe.ly confirmed they no longer offer API keys in 3.0. The old Breeze 2.0 API keys are gone. There is NO way to push data from an external site into the Tithe.ly People database via API.

**Impact**: Cannot wire custom frontend forms (contact, prayer request, stay updated) to Tithe.ly People database as originally planned.

**Final Answer (2026-02-19)**: Tithe.ly confirmed CSV import (People > Import CSV) is the ONLY option. No API, no webhooks, no Zapier, no automated sync. Future integrations are on their roadmap but no timeline.

**Plan:**
- **Contact form** → Netlify Forms (email notification to pastor)
- **Prayer request form** → Netlify Forms (email notification to pastor)
- **Stay Updated signup** → Netlify Forms (collects name/email, pastor exports list when needed for mass emails)
- **Donations** → Tithe.ly stays as-is (embed/modal on give.html + donation.html)
- **Mass emails** → Future decision: Gmail BCC for small list, or Sender.net free tier (2,500 subs / 15k emails/mo) if list grows
- **Tithe.ly People database** → Pastor manually manages contacts, or imports from Netlify form exports

**Workflow for pastor**: Periodically export form submissions from Netlify dashboard → CSV → import into Tithe.ly People. Simple enough for a church plant.

This plan is actually simpler and has zero ongoing cost. Netlify Forms free tier = 100 submissions/month (plenty for a church plant).

---

## 2026-02-20 — Resend Email Notifications Setup

**Status**: Fully configured and tested on testing URL. Must repeat env vars on production Netlify site.

**What was done:**
- Added 3 Netlify environment variables: `RESEND_API_KEY` (secret), `EMAIL_FROM`, `NOTIFY_EMAIL`
- `EMAIL_FROM` set to `Christ Church Bluffton <notifications@christchurchbluffton.org>`
- `NOTIFY_EMAIL` set to `admin@christchurchbluffton.org`
- Domain `christchurchbluffton.org` verified in Resend
- Added DNS records in GoDaddy: DKIM (TXT), SPF (MX + TXT on `send` subdomain)
- Updated main SPF record to include `amazonses.com`
- Added approved sender list in Google Workspace Admin to bypass spam filters
- All 3 forms tested and working: Contact, Prayer Request, Stay Updated

**TODO for production launch:**
- Re-add all 3 Netlify environment variables (`RESEND_API_KEY`, `EMAIL_FROM`, `NOTIFY_EMAIL`) on the production Netlify site
- DNS and Resend domain verification already done (shared across environments)
- Add spam protection (CAPTCHA + honeypot) to all forms before going live
- Update `NOTIFY_EMAIL` to final recipient(s) once Google Workspace emails are set up
