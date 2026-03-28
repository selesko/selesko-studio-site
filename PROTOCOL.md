# AI Collaboration Protocol

This file governs how Claude, Gemini, or any AI assistant should work on this project. Follow it every session to avoid conflicts and keep the repo clean.

---

## Ground Rules

1. **GitHub is the single source of truth.** Never make changes to site files without syncing with the repo first and after.
2. **Notion is the content source of truth.** Never hand-edit content into HTML that should come from Notion — always re-fetch.
3. **One AI works at a time.** If Claude made the last set of changes, Gemini must pull before touching anything, and vice versa.

---

## Session Start Checklist

Before making any changes, every AI assistant must:

- [ ] **Pull latest from GitHub** to ensure you have the current state
- [ ] **Read this file** (PROTOCOL.md) and README.md to understand the project
- [ ] **Note what changed last** (check the git log for the most recent commit message)

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
- [ ] **Push to GitHub** so Vercel auto-deploys and the other AI stays in sync
- [ ] **Confirm deployment** by checking the Vercel URL is live

---

## Commit Message Format

Use this format for every commit so it's clear who made what and why:

```
[scope]: brief description of change

- What was changed and why
- Any content sourced from Notion (list page names)
- Any images added or updated

AI: Claude / Gemini / [other]
Requested by: Jeff
```

**Examples:**

```
[content]: Add new architecture project C.005

- Built /projects/concept-c005/index.html from Notion page "Concept C.005"
- Hero image sourced from Super App CDN
- Content re-fetched 2026-04-12

AI: Claude
Requested by: Jeff
```

```
[fix]: Correct nav link on field notes pages

- Updated /field-notes/*/index.html to fix broken "Field Notes" nav active state

AI: Gemini
Requested by: Jeff
```

```
[style]: Update gallery card hover effect

- Modified CSS in index.html, architecture/index.html, design/index.html

AI: Claude
Requested by: Jeff
```

---

## Who Does What

| Task | Preferred AI | Reason |
|---|---|---|
| Fetch from Notion & rebuild pages | Claude | Has Notion MCP access |
| Push to GitHub | Claude (via GitHub API) or Jeff directly | Vercel auto-deploys on push |
| CSS/layout tweaks | Either | Pure HTML, no build step |
| Adding new projects from Notion | Claude | Uses Notion MCP + knows image URL patterns |
| Copyediting existing pages | Either | Simple file edits |
| Domain / Vercel config | Claude | Has Vercel MCP access |

---

## Git Push Process (From This Environment)

The VM's egress proxy blocks direct `git push`. Use the GitHub API via Windows PowerShell:

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

For **bulk updates** (multiple files), Claude has a script pattern for this. Ask Claude to "push the updated files to GitHub."

---

## Versioning & Rollback

Vercel keeps every deployment. To roll back:
1. Go to vercel.com → selesko-studio-site → Deployments
2. Click any previous deployment → "..." → Promote to Production

To see git history:
```bash
git log --oneline
```

---

## Do Not

- ❌ Do not hard-code content that should come from Notion
- ❌ Do not commit Notion S3 signed URLs and leave them undeployed for more than 30 min (they expire in 1 hour)
- ❌ Do not push directly to `main` with broken HTML (validate by opening the file locally first)
- ❌ Do not store API tokens or secrets in any file in this repo
- ❌ Do not rename page directories without updating all internal nav links
