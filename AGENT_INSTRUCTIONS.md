# Agent Instructions — Selesko Studio Site

This file governs how any AI assistant (Claude, Gemini, etc.) should work on this project. Follow it at the start of every session to avoid conflicts and keep the repo clean.

---

## Ground Rules

1. **GitHub is the single source of truth.** Never make changes to site files without syncing with the repo first and after.
2. **Notion is the content source of truth.** Never hand-edit content into HTML that should come from Notion — always re-fetch.
3. **One AI works at a time.** Always pull the latest changes before touching anything.

---

## Session Start Checklist

Before making any changes, every AI assistant must:

- [ ] **Pull latest from GitHub** to ensure you have the current state
- [ ] **Read this file** (`AGENT_INSTRUCTIONS.md`), `README.md`, and the **[Creative Engine Playbook](file:///Users/jeffgoldblatt/Dev/Selesko-Studio/CREATIVE_ENGINE_PLAYBOOK.md)**
- [ ] **Note what changed last** (check the git log for the most recent commit message)
- [ ] **Ask Jeff:** "What would you like to update?" — don't assume.

```bash
# Run this before starting work (or use Windows PowerShell if VM has no GitHub access)
git pull origin main
git log --oneline -5
```

---

## Session End Checklist

After making any significant changes, every AI assistant must:

- [ ] **Review what was changed** (diff or file list)
- [ ] **Commit with a clear, attributed message** (see format below)
- [ ] **Push to GitHub** so Vercel auto-deploys and other AIs stay in sync
- [ ] **Confirm deployment** by checking the Vercel URL is live

---

## Commit Message Format

Use this format for every commit so it's clear who made what and why:

```
[scope]: brief description of change

- What was changed and why
- Any content sourced from Notion (list page names)
- Any images added or updated

AI: [Agent Name] (e.g. Gemini, Claude)
Requested by: Jeff
```

---

## Notion MCP Access

The active AI must have access to Jeff's Notion workspace via the Notion MCP. Always use it to get fresh content — never rely on memory from a previous session (Notion S3 image URLs expire).

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

## Git Push Process (From VM Environments)

The VM's egress proxy blocks direct `git push`. Push via Windows PowerShell using the GitHub API:

```powershell
# Windows PowerShell — push a single updated file
$token = "YOUR_GITHUB_TOKEN"
$repo = "selesko/selesko-studio-site"
$filePath = "projects/concept-NEW/index.html"
$siteDir = "$env:USERPROFILE\Claude\Selesko Studio\selesko-site"
$headers = @{ Authorization = "token $token"; "Content-Type" = "application/json" }

# Get current SHA of file (required for updates)
$existing = Invoke-WebRequest -Uri "https://api.github.com/repos/$repo/contents/$filePath" -Headers $headers -UseBasicParsing -ErrorAction SilentlyContinue
$sha = if ($existing.StatusCode -eq 200) { ($existing.Content | ConvertFrom-Json).sha } else { $null }

$content = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$siteDir\$($filePath.Replace('/', '\'))"))
$body = @{ message = "Add $filePath"; content = $content }
if ($sha) { $body.sha = $sha }
Invoke-WebRequest -Uri "https://api.github.com/repos/$repo/contents/$filePath" -Method PUT -Headers $headers -Body ($body | ConvertTo-Json) -UseBasicParsing
```

For **bulk updates** (multiple files), ask the active AI to "push the updated files to GitHub" using a batch script approach.

---

## Vercel & Deployment

- **Team:** Jeff's projects (`team_IrKOdkXJk39vYVaoXqJDq478`)
- **Project:** `selesko-studio-site`
- **Vercel auto-deploys** on every push to `main` — no manual trigger needed.
- Jeff is usually logged into Vercel in Chrome — use the browser tool to access vercel.com if needed.

**Versioning & Rollback:**
Vercel keeps every deployment. To roll back:
1. Go to vercel.com → selesko-studio-site → Deployments
2. Click any previous deployment → "..." → Promote to Production

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

---

## Do Not

- ❌ Do not hard-code content that should come from Notion
- ❌ Do not commit Notion S3 signed URLs and leave them undeployed for more than 30 min (they expire in 1 hour)
- ❌ Do not push directly to `main` with broken HTML (validate by opening the file locally first)
- ❌ Do not store API tokens or secrets in any file in this repo
- ❌ Do not rename page directories without updating all internal nav links
