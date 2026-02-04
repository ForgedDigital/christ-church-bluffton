# Christ Church Bluffton

A static website for Christ Church Bluffton, a new Anglican church plant launching in Bluffton, South Carolina in 2026.

## Pages

- **index.html** - Home page with hero, mission preview, stats, and vision cards
- **about.html** - Mission, vision, beliefs, and pastor biography
- **worship.html** - Worship details, liturgy, Book of Common Prayer, and sacred music
- **groups.html** - Table 246 Bible studies, prayer groups, and youth ministry
- **events.html** - Upcoming events (Launch Sunday, Meet & Greet, Vision Dinner, Easter)
- **contact.html** - Contact info and form
- **give.html** - Giving page with donation widget placeholder
- **privacy.html** - Privacy policy
- **terms.html** - Terms of use
- **404.html** - Page not found

## Project Structure

```
/
├── src/                     # Source code
│   ├── css/
│   │   └── styles.css       # Main stylesheet
│   ├── js/
│   │   └── script.js        # Mobile menu, scroll animations, loader
│   ├── images/
│   │   ├── book-of-common-prayer.webp
│   │   └── church-interior.webp
│   ├── index.html
│   ├── about.html
│   ├── worship.html
│   ├── groups.html
│   ├── events.html
│   ├── contact.html
│   ├── give.html
│   ├── privacy.html
│   ├── terms.html
│   └── 404.html
├── Deploy-Christ_Church-Bluffton.bat
└── README.md
```

## Design System

- **Primary Colors:** Navy (#00244C), Gold (#DCA83D)
- **Fonts:** Cinzel (headings), Lato (body), Cormorant Garamond (accent/quotes)
- **Responsive breakpoints:** 1023px (tablet), 600px (mobile)

## Review Markers

This site contains visible review markers for client review:

- **Yellow "Verify"** badges - Content that needs fact-checking before launch
- **Red "Placeholder"** badges - Contact info that needs real values

Search the HTML files for `review-marker` to find all flagged items. Remove the `<span class="review-marker">` tags and the `.review-marker` CSS block before launch.

## Deployment

**Netlify:** The site is configured via `netlify.toml` to publish from the `src/` directory. Clean URLs are enabled (no `.html` extensions in the address bar). Custom 404 page, security headers, and static asset caching are all configured.

**Manual push:** Run `Deploy-Christ_Church-Bluffton.bat` to commit and push to GitHub. Netlify auto-deploys from the connected repo.
