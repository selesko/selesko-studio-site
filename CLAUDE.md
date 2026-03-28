# Claude Instructions — Selesko Studio Site

This file is read automatically by Claude at the start of every session in this project. Follow everything here before doing any work.

---

## First Thing Every Session

1. Check `PROTOCOL.md` for the current AI collaboration rules
2. Ask Jeff: "What would you like to update?" — don't assume
3. If content changes: re-fetch from Notion MCP (never guess or hand-write content)
4. After any change: push to GitHub and confirm Vercel deployment

---

## Notion MCP Access

Claude has access to Jeff's Notion workspace via the Notion MCP. Always use it to get fresh content — never rely on memory from a previous session (Notion S3 image URLs expire).

**Key Notion IDs:**
- Workspace root: `2b67898a374880da9dc0ffa6bc254199`
- Projects database: `collection://2b67898a-3748-80c0-91a3-000bf3cb58d0`
- Field Notes database: `collection://2cb7898a-3748-8037-98ac-000b86e94d69`
- Process page: `2b67898a374880ecbc3af6b9e6c0e77d`
- About page: `2b67898a374880c2a8d0cfee8db47fdb`

---

## Page Build Rules

### Always use the shared CSS
All pages use the same CSS block. It lives in `index.html` between `<style>` and `</style>`. When building a new page, extract it from `index.html` with Python:
```python
CSS = open(f'{BASE}/index.html').read().split('<style>')[1].split('</style>')[0]
```

### Image URLs
- **Gallery / hero images:** Use the Super App CDN — `https://assets.super.so/e67d8a78-4937-4019-80c3-1aff479d09f8/images/{uuid}/{filename}` — these are permanent.
- **Inline / detail images from Notion:** These are S3 signed URLs that expire in ~1 hour. Always deploy within 30 minutes of fetching.
- **Never download images to the repo.** Reference them by URL only.

### URL slug format (must match exactly)
```
/projects/concept-sf04-scoria-house/
/projects/concept-sf003-the-basalt-wedge/
/projects/concept-sf001/
/projects/concept-c004/
/projects/concept-c002/
/projects/concept-l001/ → /projects/concept-l011/
/field-notes/living-futures-accreditation-lfa/
/field-notes/the-climate-paradox/
/field-notes/sourcing-local/
```

### Nav active state
Pass the section name to the `nav()` function as the `active` argument:
`'Architecture'`, `'Design'`, `'Process'`, `'Field Notes'`, `'About'`, `'Contact'`

---

## GitHub Push Process

The VM's egress proxy blocks `git push`. Push via Windows PowerShell using the GitHub API. Use the pattern in `PROTOCOL.md`. Claude has already done this successfully — refer to that session's approach if needed.

**Repo:** `selesko/selesko-studio-site`
**Branch:** `main`
**Vercel auto-deploys** on every push to `main` — no manual trigger needed.

---

## Vercel

- **Team:** Jeff's projects (`team_IrKOdkXJk39vYVaoXqJDq478`)
- **Project:** `selesko-studio-site`
- Jeff is already logged into Vercel in Chrome — use Claude in Chrome MCP to access vercel.com if needed.

---

## Commit Attribution

Always end commit messages with:
```
AI: Claude
Requested by: Jeff
```

---

## Adding a New Project (Checklist)

- [ ] Fetch page from Notion MCP using the project's page ID
- [ ] Identify hero image URL (Super App CDN preferred)
- [ ] Create `/projects/{slug}/index.html` using the arch or design template
- [ ] Add gallery card to `index.html` (home) in the correct section
- [ ] Add gallery card to `/architecture/index.html` or `/design/index.html`
- [ ] Push all changed files to GitHub
- [ ] Verify live on Vercel

## Adding a New Field Note (Checklist)

- [ ] Fetch page from Notion MCP
- [ ] Identify cover image URL
- [ ] Create `/field-notes/{slug}/index.html`
- [ ] Add card to `/field-notes/index.html` listing page
- [ ] Add card to home page `index.html` Journal section
- [ ] Push all changed files to GitHub
- [ ] Verify live on Vercel
