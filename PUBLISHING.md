# Selesko Studio publishing

Notion holds editorial content and decisions. Drive holds originals and working assets. This repository holds the website implementation and optimized publication images. GitHub/Vercel applies only to website publishing, not the whole studio.

## A normal session

1. Capture the idea or design-session takeaway in the relevant Notion project or Field Notes page.
2. Develop the argument and select actual project images. Keep studies clearly labeled as studies.
3. Jeff reviews the narrative and image selection. A task marked Done is not automatically permission to publish private material.
4. Fetch the approved Notion page. Record its URL in the private Notion handoff; keep only a human-readable source label in the public repository. Download selected images while their signed URLs are valid; keep permanent optimized copies under images/site. Preserve originals in Drive.
5. For a Field Note, add content/field-notes/SLUG.json with title, description, slug, source (a label beginning Notion: ), status, cover, coverAlt and blocks. Blocks support paragraph and heading with plain text. Unsupported formatting must be deliberately adapted, never silently dropped.
6. Use status draft until publication is approved; only published records enter the build. The builder generates the page and adds missing cards to the home and Field Notes lists. It never publishes the whole Notion workspace.
7. Run node scripts/build.mjs. Inspect the generated desktop and mobile pages. Check image selection and content against Notion. Preview from public/.
8. Push the reviewed website changes, verify Vercel deployment and the live URLs, then record the publication URL, date and source version in Notion.

## Recovery notes — 2026-09-30

- Vercel's existing deployment returned HTTP 200; the custom domain checks returned 403 for selesko.co/www and 502 for selesko.studio from this environment. Verify DNS and domain ownership in the hosting/registrar dashboard before changing domains.
- Legacy Super image requests returned 403. Recovered publication assets from Notion and Drive are served locally.
- Existing article Sourcing Local is the first structured publishing example. Its source is the existing Notion publication page; this is not a new article approval.
- Most Notion Field Notes with Not started status are topic prompts, not completed essays.
- Contact form configuration is preserved. End-to-end delivery has not been tested.
- The internal studio-thinking document was removed from this branch. A domain-transfer credential remains in prior Git history and the Drive copy. Request replacement from the registrar; removing current text does not revoke it.
- Build output deliberately excludes markdown, content records, scripts, internal studio-dashboard and repository metadata.
