# Christ Church Bluffton — Email Deliverability Fix

## DNS Provider: GoDaddy
## Domain: christchurchbluffton.org
## Hosting: Netlify
## CRM: Tithely (uses SendGrid for email sending)
## Email: Google Workspace (info@christchurchbluffton.org)

---

## Issue 1: Display Name (Quick Fix)
Emails show personal name instead of "Christ Church Bluffton."

### Steps:
1. Log into Tithely as `info@christchurchbluffton.org`
2. Click person icon (bottom right) → **Global Settings**
3. Go to **My Account**
4. Change First Name to "Christ Church", Last Name to "Bluffton"
5. Save

---

## Issue 2: Email Deliverability / Spam (DNS Setup)
Emails sent from Tithely on behalf of info@ are landing in spam or bouncing.

### Current DNS Status (as of 2026-03-18):
- **SPF**: DONE — `v=spf1 include:_spf.google.com include:amazonses.com include:sendgrid.net ~all`
- **DKIM (Google)**: DONE — `google._domainkey` TXT record exists
- **DKIM (Resend)**: DONE — `resend._domainkey` TXT record exists
- **DKIM (SendGrid)**: MISSING — No `sendgrid._domainkey` or similar record
- **DMARC**: DONE — `v=DMARC1; p=quarantine; adkim=r; aspf=r`

### What's Missing:
1. **SendGrid DKIM record** — This is the likely cause of spam issues. SPF alone isn't enough. Need DKIM signing from SendGrid to pass authentication.

### Action Steps:
1. Reply to Tori (Tithely support) and ask for SendGrid DKIM DNS records
   - Say: "We've added the SPF record. Can you provide the DKIM CNAME or TXT records for SendGrid so we can add those to our GoDaddy DNS?"
2. Once received, add the SendGrid DKIM records in GoDaddy DNS
3. Wait 24-48 hours for propagation
4. Send test email from Tithely to a Gmail account
5. In Gmail: three-dot menu → "Show original" → verify SPF, DKIM, DMARC all say "PASS"

### Fallback Option (not recommended):
Tithely "Alternate Sending" — sends from Tithely's domain with reply-to as info@. Replies still come to church, but "from" line won't show church name.

---

## Notes:
- There is a separate `send` subdomain with its own SPF for Amazon SES
- MX records point to Google (aspmx.l.google.com) — Google Workspace handles incoming mail
- DMARC is set to `p=quarantine` which is good but means unauthenticated emails get quarantined
- The quarantine policy + missing SendGrid DKIM = Tithely emails likely getting quarantined
