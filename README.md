# Selesko Studio — Static Site

**Live URL:** https://selesko-studio-site.vercel.app
**GitHub:** https://github.com/selesko/selesko-studio-site
**Source of Truth:** Notion workspace (Jeff's Selesko Studio)

---

## What This Is

A hand-built static HTML site that replaces the Super App / selesko.co subscription. No framework, no build step — pure HTML/CSS served by Vercel. Every page is a single `.html` file.

Content lives in Notion. When Jeff wants to update the site, he tells an AI assistant, which re-fetches from Notion and redeploys.

---

## Site Structure

```
/                          → Home (gallery: Architecture, Design, Journal)
/architecture/             → Architecture gallery
/design/                   → Design gallery
/field-notes/              → Field Notes listing
/about/                    → About Jeff / Selesko Studio
/services/                 → Services & tiers
/process/                  → Design process (Building + Object)
/contact/                  → Contact form (Formspree)

/projects/concept-sf04-scoria-house/
/projects/concept-sf003-the-basalt-wedge/
/projects/concept-sf001/
/projects/concept-c004/
/projects/concept-c002/
/projects/concept-l001/  →  /projects/concept-l011/

/field-notes/living-futures-accreditation-lfa/
/field-notes/the-climate-paradox/
/field-notes/sourcing-local/
```

---

## Content Update Workflow

```
Jeff adds content in Notion
        ↓
Tell Claude or Gemini: "I added a new project / field note"
        ↓
AI re-fetches from Notion MCP
        ↓
AI rebuilds affected HTML page(s)
        ↓
AI pushes to GitHub → Vercel auto-deploys (~30 seconds)
```

---

## Image Strategy

- **Gallery & hero images:** Served from Super App CDN (`assets.super.so`) — permanent URLs.
- **Inline/detail images:** Re-fetched from Notion S3 at each rebuild. Notion S3 URLs expire in ~1 hour, so the site must be pushed shortly after a rebuild.
- **Field note covers:** Served from `images.spr.so` CDN — permanent URLs.

> **Rule:** Always push to GitHub within 30 minutes of rebuilding pages that contain Notion S3 image URLs.

---

## Tech Notes

- **Font:** Inter via Google Fonts
- **CSS:** Inline in each page (no external stylesheet — keeps it self-contained)
- **Forms:** Formspree (contact page)
- **Deployment:** Vercel Hobby (free), connected to GitHub `main` branch
- **No JavaScript** on any page (except any future Formspree widget)

---

## AI Collaboration Protocol

See [`PROTOCOL.md`](./PROTOCOL.md) for the full multi-AI workflow and git rules.
