# Selesko Studio — Static Site

**Live URL:** https://selesko-studio-site.vercel.app
**GitHub:** https://github.com/selesko/selesko-studio-site
**Source of Truth:** Notion workspace (Jeff's Selesko Studio)

---

## What This Is

A hand-built static HTML site that replaces the Super App / selesko.co subscription. No framework — static HTML/CSS with an allowlisted publishing build served by Vercel. Every page is a single `.html` file.

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

Approved images are optimized into `images/site/` and served with the website. Originals stay in Notion/Drive. Temporary Notion URLs are download inputs only; they must never appear in published HTML.

## Build and publishing

Run `node scripts/build.mjs`. Only the explicit public pages, images, and styles are copied into `public/`. Internal documents and studio-dashboard are excluded. See `PUBLISHING.md` for the editorial workflow.

## Tech Notes

- **Font:** Inter via Google Fonts
- **CSS:** Inline in each page (no external stylesheet — keeps it self-contained)
- **Forms:** Formspree (contact page)
- **Deployment:** Vercel Hobby (free), connected to GitHub `main` branch
- **No JavaScript** on any page (except any future Formspree widget)

---

## AI Collaboration Protocol

See [`AGENT_INSTRUCTIONS.md`](./AGENT_INSTRUCTIONS.md) for the full multi-AI workflow, Notion integration IDs, and git deployment rules.
