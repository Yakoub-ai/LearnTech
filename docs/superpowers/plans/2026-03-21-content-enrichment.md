# Content Enrichment & Architecture Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split monolithic content files per role/language, fetch real YouTube transcripts to enrich all learning paths with contextual intros + key takeaways + video-tied quiz questions, rewrite Prerequisites with complete step-by-step guides, remove all enterprise/Pluralsight/LF links, and verify progress saving works end-to-end.

**Architecture:** The current `markdownContent.js` (937 KB, 10 516 lines) and `languageMarkdownContent.js` (461 KB) are monolithic files that make parallel agent work impossible and blow up the context window. Each role and language gets its own dedicated content file under `src/data/roles/` and `src/data/languages/`. Quizzes are similarly split into per-role/language staging files then merged. Loaders get one-line updates. A transcript-fetch script pre-seeds `src/data/transcripts/` so every enrichment agent has the raw video text it needs.

**Tech Stack:** React 19 · Vite · `youtube_transcript_api` (Python) · existing loader pattern (`await import(...)`) · existing quiz shape `{ question, options: string[4], correctIndex: number, explanation: string }`

---

## Execution Order

```
Task 1 ──┐
         ├──→ Task 3 ──┐
Task 2 ──┘             │
                       ├──→ Task 4 ──→ Tasks 5–21 (all parallel) ──┐
                       │                                             ├──→ Task 24
                       └──→ Tasks 22, 23 (parallel with 5–21) ──────┘
```

- **Tasks 1 and 2** can run in parallel (independent files).
- **Task 3** must wait for Task 1 (it removes the `markdownContent` import from `PrerequisitesPage.jsx`).
- **Task 4** must run after Tasks 1–3 (transcript script is independent but Phase 3 needs Phase 1 done first).
- **Tasks 5–21** are all fully independent of each other and can dispatch simultaneously — BUT they must NOT write to `quizzes.js`/`languageQuizzes.js` directly (see Race Condition Fix below).
- **Tasks 22 and 23** only depend on Phase 1; they can run in parallel with Tasks 5–21.
- **Task 24** runs last.

---

## ⚠️ Race Condition Fix — Quiz Staging Files

**Problem:** If 17 agents run simultaneously and all write to `src/data/quizzes.js` (shared file), each agent reads, appends, and writes back — every agent except the last overwrites the others' additions.

**Solution:** Each enrichment agent writes new questions to a **separate staging file**. Task 24 merges all staging files into the main quiz files.

- Role agents (Tasks 5–15, 21) write to: `src/data/quizzes/[roleId]-additions.js`
  - Export shape: `export const additions = { beginner: [...], mid: [...], senior: [...] }`
- Language agents (Tasks 16–20) write to: `src/data/languageQuizzes/[languageId]-additions.js`
  - Same export shape.
- Task 24 reads all staging files and merges into `src/data/quizzes.js` and `src/data/languageQuizzes.js`.

---

## ⚠️ Callout Syntax Reference

`MarkdownRenderer.jsx` processes these exact markdown patterns into styled callout boxes:

| Write in markdown | Renders as |
|---|---|
| `**Why it matters:** ...` | Green takeaway callout |
| `**Common pitfalls:** ...` | Red pitfall callout |
| `**Key things to understand:** ...` | Blue key concept callout |

These patterns must be followed by the content, then terminated by a blank line + `**` or `---` or `##`. Do **NOT** use `:::key-takeaway` — that remark-directive syntax is not installed.

---

## ⚠️ Vite Dynamic Import Constraint

Vite requires dynamic `import()` calls to contain a **static string prefix**. The loader pattern MUST be:

```js
// ✅ CORRECT — static prefix, only filename is dynamic
const mod = await import(`../roles/${roleId}-content.js`)

// ❌ WRONG — fully dynamic, Vite cannot bundle this
const path = `../roles/${roleId}-content.js`
const mod = await import(path)
```

Do not refactor the import into a variable. The `'../roles/'` or `'../languages/'` prefix must remain a literal string in the template literal.

---

## File Map

### New files created
```
src/data/roles/
  ai-engineer-content.js
  backend-developer-content.js
  data-engineer-content.js
  data-scientist-content.js
  devops-platform-engineer-content.js
  frontend-developer-content.js
  marketing-technology-developer-content.js
  ml-engineer-content.js
  qa-test-engineer-content.js
  security-engineer-content.js
  tech-lead-architect-content.js

src/data/languages/
  python-content.js
  javascript-content.js
  html-css-content.js          ← NEW (currently missing entirely)
  sql-content.js
  typescript-content.js

src/data/quizzes/              ← staging files, merged in Task 24
  ai-engineer-additions.js
  backend-developer-additions.js
  ... (one per role + one per language)

src/data/languageQuizzes/      ← staging files
  python-additions.js
  javascript-additions.js
  html-css-additions.js
  sql-additions.js
  typescript-additions.js

src/data/prerequisites.js      ← replaces missing _prerequisites key
src/data/transcripts/          ← one .json per video ID
scripts/fetch-transcripts.py
```

### Modified files
```
src/data/loaders/roleDataLoader.js
src/data/loaders/languageDataLoader.js
src/pages/PrerequisitesPage.jsx
src/data/quizzes.js                    ← merged in Task 24
src/data/languageQuizzes.js            ← merged in Task 24
src/data/devSetupGuides.js
src/data/languageDevSetupGuides.js
```

### Deleted files
```
src/data/markdownContent.js
src/data/languageMarkdownContent.js
```

---

## Phase 1 — Infrastructure: Split Content Files

---

### Task 1: Split `markdownContent.js` → 11 per-role files + update role loader

**Context for agent:**
- `src/data/markdownContent.js` exports `roleMarkdownContent` — an object with 11 PascalCase-kebab keys: `'AI-Engineer'`, `'Backend-Developer'`, `'Data-Engineer'`, `'Data-Scientist'`, `'DevOps-Platform-Engineer'`, `'Frontend-Developer'`, `'Marketing-Technology-Developer'`, `'ML-Engineer'`, `'QA-Test-Engineer'`, `'Security-Engineer'`, `'Tech-Lead-Architect'`. Each key maps to `{ overview, beginner, mid, senior }`.
- `src/data/loaders/roleDataLoader.js` — calls `const { roleMarkdownContent } = await import('../markdownContent.js')` then returns `roleMarkdownContent[roleFileName] || {}`. `roleFileName` is the PascalCase-kebab value from `role.fileName` in `roles.js`.
- Target file naming: `src/data/roles/[roleId]-content.js` where `roleId` = `roleFileName.toLowerCase()` (e.g. `'AI-Engineer'.toLowerCase()` = `'ai-engineer'`). This works for all 11 roles.
- **Vite import constraint:** Keep `'../roles/'` as a static string prefix in the template literal (see constraint note at top of this document).
- `PrerequisitesPage.jsx` also imports from `markdownContent.js` — do NOT delete `markdownContent.js` until Task 3 is complete.

**Files:**
- Read: `src/data/markdownContent.js`
- Create: `src/data/roles/ai-engineer-content.js` … (×11)
- Modify: `src/data/loaders/roleDataLoader.js`

**Steps:**

- [ ] Read `src/data/markdownContent.js` in sections, extract each role's content block
- [ ] For each of the 11 roles, create `src/data/roles/[roleId]-content.js`:
  ```js
  // src/data/roles/ai-engineer-content.js
  export const content = {
    overview: `...`,
    beginner: `...`,
    mid: `...`,
    senior: `...`,
  }
  ```
- [ ] Update `src/data/loaders/roleDataLoader.js` — replace the `markdownContent` dynamic import:
  ```js
  export async function loadRoleMarkdownContent(roleFileName) {
    try {
      const roleId = roleFileName.toLowerCase()
      const mod = await import(`../roles/${roleId}-content.js`)
      return mod.content || {}
    } catch {
      return {}
    }
  }
  ```
- [ ] Run `npm run build` — verify zero errors (the old `markdownContent.js` still exists so `PrerequisitesPage.jsx` still compiles)
- [ ] Commit: `refactor: split markdownContent into per-role files`

---

### Task 2: Split `languageMarkdownContent.js` → 5 per-language files + update language loader

**Context for agent:**
- `src/data/languageMarkdownContent.js` exports `languageMarkdownContent` with keys `'Python'`, `'JavaScript'`, `'SQL'`, `'TypeScript'` (4 keys — HTML-CSS is **completely absent**).
- **IMPORTANT:** The current `languageDataLoader.js` looks up `languageMarkdownContent[languageId]` where `languageId` is lowercase (`python`, `javascript`, etc.) but the keys are PascalCase (`Python`, `JavaScript`, etc.). **This means language content has never rendered correctly** — all language pages show empty content. The new per-file approach fixes this. Do not use "current language page rendering" as a correctness baseline — it was already broken.
- Target: `src/data/languages/[languageId]-content.js` (e.g. `python-content.js`).
- For `html-css-content.js`: create skeleton content now; Task 18 writes the full content.

**Files:**
- Read: `src/data/languageMarkdownContent.js`
- Create: `src/data/languages/python-content.js`, `javascript-content.js`, `html-css-content.js`, `sql-content.js`, `typescript-content.js`
- Modify: `src/data/loaders/languageDataLoader.js`

**Steps:**

- [ ] Read `src/data/languageMarkdownContent.js`, extract Python / JavaScript / SQL / TypeScript content blocks
- [ ] Create each language file:
  ```js
  // src/data/languages/python-content.js
  export const content = {
    beginner: `...`,
    mid: `...`,
    senior: `...`,
  }
  ```
- [ ] Create `src/data/languages/html-css-content.js` skeleton:
  ```js
  export const content = {
    beginner: `# HTML & CSS — Beginner\n\nContent coming soon.`,
    mid: `# HTML & CSS — Mid\n\nContent coming soon.`,
    senior: `# HTML & CSS — Senior\n\nContent coming soon.`,
  }
  ```
- [ ] Update `src/data/loaders/languageDataLoader.js`:
  ```js
  export async function loadLanguageMarkdownContent(languageId) {
    try {
      const mod = await import(`../languages/${languageId}-content.js`)
      return mod.content || {}
    } catch {
      return {}
    }
  }
  ```
- [ ] Run `npm run build` — verify zero errors
- [ ] Start dev server; navigate to `/language/python` — verify content **actually renders** (it should now, for the first time ever)
- [ ] Commit: `refactor: split languageMarkdownContent into per-language files`

---

### Task 3: Fix Prerequisites page — create `src/data/prerequisites.js`

**Context for agent:**
- `src/pages/PrerequisitesPage.jsx` imports `roleMarkdownContent` from `../data/markdownContent` and looks for `roleMarkdownContent._prerequisites` — **this key does not exist** so every section shows the fallback message. The Prerequisites page has been blank since launch.
- After this task, `markdownContent.js` has no more consumers and Task 1 can safely delete it.
- The page has 9 sections with these IDs (used in the `activeSection` state) and content keys (stored in the `sections` array as `.key`):

| Section ID | Content key |
|---|---|
| `overview` | `prerequisites` |
| `vscode` | `vs-code-setup` |
| `git` | `git` |
| `git-workflow` | `git-collaboration-workflow` |
| `branching` | `branching-strategy` |
| `code-review` | `code-review` |
| `secure-ai` | `secure-ai-framework` |
| `eu-compliance` | `eu-compliance-guide` |
| `secure-dev` | `secure-dev-environment` |

- **Bug to fix:** The current lookup is `prereqContent[activeSection] || prereqContent[sections.find(s => s.id === activeSection)?.key] || ''`. The first lookup uses `activeSection` (e.g. `'vscode'`) as a key, but our object uses content keys (e.g. `'vs-code-setup'`), so it always falls through to the second lookup. Simplify to only use the key directly.

**Files:**
- Create: `src/data/prerequisites.js`
- Modify: `src/pages/PrerequisitesPage.jsx`
- Delete: `src/data/markdownContent.js` (now safe — last consumer is fixed)

**Steps:**

- [ ] Create `src/data/prerequisites.js` with skeleton content for all 9 keys (Task 22 writes the full content):
  ```js
  export const prerequisites = {
    'prerequisites': `# Prerequisites Overview\n\nBefore starting any learning path...`,
    'vs-code-setup': `# VS Code Setup\n\nInstall VS Code from https://code.visualstudio.com/`,
    'git': `# Git Setup\n\nInstall Git from https://git-scm.com/`,
    'git-collaboration-workflow': `# Git Collaboration Workflow\n\n...`,
    'branching-strategy': `# Branching Strategy\n\n...`,
    'code-review': `# Code Review Best Practices\n\n...`,
    'secure-ai-framework': `# Secure AI Development Framework\n\n...`,
    'eu-compliance-guide': `# EU Compliance Guide\n\n...`,
    'secure-dev-environment': `# Secure Development Environment\n\n...`,
  }
  ```
- [ ] Update `src/pages/PrerequisitesPage.jsx`:
  - Remove: `import { roleMarkdownContent } from '../data/markdownContent'`
  - Add: `import { prerequisites } from '../data/prerequisites'`
  - Replace the entire lookup expression:
    ```js
    // OLD (broken — two-step fallback, primary lookup always fails)
    const prereqContent = roleMarkdownContent._prerequisites || {}
    const currentContent = prereqContent[activeSection] || prereqContent[sections.find(s => s.id === activeSection)?.key] || ''

    // NEW (direct key lookup via section definition)
    const currentContent = prerequisites[sections.find(s => s.id === activeSection)?.key] || ''
    ```
- [ ] Run `npm run build` — verify zero errors
- [ ] Delete `src/data/markdownContent.js`
- [ ] Run `npm run build` again — verify still zero errors
- [ ] Navigate to `/prerequisites` — verify all 9 tabs show content instead of the fallback message
- [ ] Commit: `fix: wire up prerequisites page with dedicated data file`

---

## Phase 2 — Transcript Fetching

---

### Task 4: Fetch YouTube transcripts for all 62 videos

**Context for agent:**
- Install `youtube_transcript_api`. Run the fetch script. Save each transcript as `src/data/transcripts/[videoId].json`.
- Transcript JSON shape: `{ videoId, available: true, transcript: "full plain text" }` or `{ videoId, available: false, reason: "..." }`.
- **Video ID note:** The ID `66hDgWottdA` appears in the content files. Before fetching, verify this is the correct ID for the "Dynamic Programming Full Course" video by checking the existing content file `src/data/roles/backend-developer-content.js` for the exact URL. Fix the script to use whichever ID is in the content file.
- The script must produce a complete `_index.json` even on re-runs (it scans existing files at startup).

**Files:**
- Create: `scripts/fetch-transcripts.py`
- Create: `src/data/transcripts/[videoId].json` (×62)
- Create: `src/data/transcripts/_index.json`

**Steps:**

- [ ] Install: `pip install youtube_transcript_api`
- [ ] Create `scripts/fetch-transcripts.py`:
  ```python
  #!/usr/bin/env python3
  """Fetch YouTube transcripts for all LearnTech video IDs."""
  import json, os
  from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound

  VIDEO_IDS = [
    # Role videos
    "4vLxWqE94l4","66hDgWottdA","7iHl71nt49o","996OiexHze0","Au1OxVSyGas",
    "BUTjcAjfMgY","DGtalg5efCw","DHjqpvDnNGE","E0Hmnixke2g","EY1hsh-HCjo",
    "Fa_V9fP2tpU","HkdAHXoRtos","NmM9HA2MQGI","PcbuKRNtCUc","SWYqp7iY_Tc",
    "VtzvF17ysbc","_uQrJ0TkZlc","gAkwW2tuIqE","i53Gi_K3o7I","iYM2zFP3Zn0",
    "lWEKiak0WVU","lWPiSZf7-uQ","m8Icp_Cid5o","mU6anWqZJcc","ok-plXXHlWw",
    "pqNCD_5r0IU","qYNweeDHiyU","qiQR5rTSshw","r9HdJ8P6GQI","rg7Fvvl3taU",
    "s9Qh9fWeOAk","u044iM9xsWU","u6QfIXgjwGQ","uvb00oaa3k8","xJFzPSAw4Fo",
    # Language videos
    "30LWjhZzg50","3a0I8ICR1Vg","8aGhZQkoFbQ","EiNiSFIPIQE","HXV3zeQKqGY",
    "HubezKbFL7E","LKVHFHJsiO0","NmM9HA2MQGI","OXGznpKZ_sA","RmGHnYUqQ4k",
    "V_Kr9OSfDeU","cCOL7MC4Pl0","dLPgQRbVquo","e-5obm1G_FY","hdI2bqOjy3c",
    "jS4aFq5-91M","jjMbPt_H3RQ","nViEqpgwxHE","pTB0EiLXUC8","pd-0G0MigUA",
    "rfscVS0vtbw","t5Bo1Je9EmE","vGVvJuazs84","x7X9w_GIm1s","zQnBQ4tB3ZA",
    "zsjvFFKOm3c","ztHopE5Wnpc"
  ]
  # Deduplicate preserving order
  VIDEO_IDS = list(dict.fromkeys(VIDEO_IDS))

  out_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'transcripts')
  os.makedirs(out_dir, exist_ok=True)

  # Build index from existing files first (so re-runs produce a complete index)
  index = {"available": [], "unavailable": []}
  for fname in os.listdir(out_dir):
    if fname.endswith('.json') and fname != '_index.json':
      with open(os.path.join(out_dir, fname)) as f:
        data = json.load(f)
      if data.get("available"):
        index["available"].append(data["videoId"])
      else:
        index["unavailable"].append(data["videoId"])

  already_fetched = set(index["available"] + index["unavailable"])

  for vid in VIDEO_IDS:
    if vid in already_fetched:
      print(f"[skip] {vid}")
      continue
    out_path = os.path.join(out_dir, f"{vid}.json")
    try:
      raw = YouTubeTranscriptApi.get_transcript(vid)
      text = " ".join(entry["text"] for entry in raw)
      data = {"videoId": vid, "available": True, "transcript": text}
      index["available"].append(vid)
      print(f"[ok]   {vid} ({len(text)} chars)")
    except (TranscriptsDisabled, NoTranscriptFound) as e:
      data = {"videoId": vid, "available": False, "reason": str(e)}
      index["unavailable"].append(vid)
      print(f"[n/a]  {vid} — {e}")
    except Exception as e:
      data = {"videoId": vid, "available": False, "reason": str(e)}
      index["unavailable"].append(vid)
      print(f"[err]  {vid} — {e}")
    with open(out_path, "w", encoding="utf-8") as f:
      json.dump(data, f, ensure_ascii=False, indent=2)

  with open(os.path.join(out_dir, "_index.json"), "w") as f:
    json.dump(index, f, indent=2)

  print(f"\nDone: {len(index['available'])} available, {len(index['unavailable'])} unavailable")
  print("Unavailable:", index["unavailable"] or "none")
  ```
- [ ] Run: `python scripts/fetch-transcripts.py`
- [ ] Read `src/data/transcripts/_index.json` — note all unavailable IDs; these videos will get `> ⚠️ No auto-transcript available for this video.` in content instead of takeaways
- [ ] Commit: `feat: add transcript fetch script + transcripts for all 62 videos`

---

## Phase 3 — Content Enrichment (Tasks 5–21 all run in parallel)

**Instructions for every enrichment agent — read carefully before starting:**

### Content rules
1. Read the current content file for your role/language.
2. Read the transcript JSON for each video ID in the content (`src/data/transcripts/[videoId].json`).
3. For every YouTube video in the content, add:
   - **Before the video:** `> **What you'll learn watching this:** [1–2 sentences from transcript]`
   - **Keep the standalone URL** (triggers `YouTubeEmbed` automatically)
   - **After the video:** Use `**Why it matters:**` followed by 3–5 bullet points drawn from the actual transcript content. This renders as a green callout box.
   - If `available: false` in transcript JSON: add `> ⚠️ No auto-transcript available for this video. Watch it for supplementary context on this topic.` after the URL instead.
4. Ensure each level has **at minimum:**
   - Opening paragraph: what this level teaches and why it matters to a non-tech person
   - Learning objectives (bullet list)
   - All core concepts explained in plain language with real-world analogies before jargon
   - At least one worked example per concept (not just theory)
   - A "You're ready for the next level when you can..." transition statement
5. **Replace all Pluralsight / LF SharePoint links** with free alternatives:
   - `app.pluralsight.com` or `www.pluralsight.com` → remove the row from the resource table and replace with the official docs URL or a freeCodeCamp/MDN equivalent
   - `lfgrp.sharepoint.com` → remove entirely (no replacement needed)
6. Minimum word counts: Beginner 800 words, Mid 1 000 words, Senior 1 000 words.

### Quiz staging rules
- Write **3 new questions per level** to a staging file, NOT to `quizzes.js` directly.
- Quiz question format:
  ```js
  {
    question: 'string',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,   // 0-based index
    explanation: 'string explaining why the answer is correct'
  }
  ```
- At least 1 of the 3 new questions per level must directly test knowledge from the video transcript.
- Staging file export shape:
  ```js
  // src/data/quizzes/ai-engineer-additions.js
  export const additions = {
    beginner: [ /* 3 question objects */ ],
    mid:      [ /* 3 question objects */ ],
    senior:   [ /* 3 question objects */ ],
  }
  ```

---

### Task 5: Enrich AI Engineer content

**Files:**
- Read+Write: `src/data/roles/ai-engineer-content.js`
- Read: `src/data/transcripts/qYNweeDHiyU.json`, `4vLxWqE94l4.json`, `Au1OxVSyGas.json`, `BUTjcAjfMgY.json`, `Fa_V9fP2tpU.json`
- Create: `src/data/quizzes/ai-engineer-additions.js`

**Videos:** `qYNweeDHiyU` (AI/ML/GenAI explained) · `4vLxWqE94l4` (API styles) · `Au1OxVSyGas` (ML Simply, 12 min) · `BUTjcAjfMgY` (ML Foundations, 34 min) · `Fa_V9fP2tpU` (All ML Concepts, 22 min)

- [ ] Read content file + all 5 transcripts
- [ ] Rewrite beginner level (min 800 words, video context, no Pluralsight links)
- [ ] Rewrite mid level (min 1 000 words)
- [ ] Rewrite senior level (min 1 000 words)
- [ ] Create `src/data/quizzes/ai-engineer-additions.js` with 3 questions per level
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich ai-engineer learning path`

---

### Task 6: Enrich Backend Developer content

**Files:**
- Read+Write: `src/data/roles/backend-developer-content.js`
- Read: `src/data/transcripts/xJFzPSAw4Fo.json`, `7iHl71nt49o.json`, `996OiexHze0.json`, `i53Gi_K3o7I.json`, `gAkwW2tuIqE.json`, `s9Qh9fWeOAk.json`, `DGtalg5efCw.json` + the Dynamic Programming video (verify ID from content file)
- Create: `src/data/quizzes/backend-developer-additions.js`

**Videos:** `xJFzPSAw4Fo` (API styles) · `7iHl71nt49o` (Design APIs) · `996OiexHze0` (OAuth/OIDC) · `i53Gi_K3o7I` (System Design 10 min) · `gAkwW2tuIqE` (Docker 7 steps) · `s9Qh9fWeOAk` (System Design 30 concepts) · `DGtalg5efCw` (Uber design) · Dynamic Programming video (check ID in content file)

- [ ] Read content file + all transcripts
- [ ] Rewrite all 3 levels (800/1000/1000 word minimums)
- [ ] Create `src/data/quizzes/backend-developer-additions.js`
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich backend-developer learning path`

---

### Task 7: Enrich Data Engineer content

**Files:**
- Read+Write: `src/data/roles/data-engineer-content.js`
- Read: `src/data/transcripts/VtzvF17ysbc.json`, `lWPiSZf7-uQ.json`, `uvb00oaa3k8.json`, `HkdAHXoRtos.json`, `gAkwW2tuIqE.json`
- Create: `src/data/quizzes/data-engineer-additions.js`

**Videos:** `VtzvF17ysbc` (Data Pipelines) · `lWPiSZf7-uQ` (Data Warehouse Toolkit) · `uvb00oaa3k8` (Kafka 100s) · `HkdAHXoRtos` (Git/GitHub) · `gAkwW2tuIqE` (Docker)

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich data-engineer learning path`

---

### Task 8: Enrich Data Scientist content

**Files:**
- Read+Write: `src/data/roles/data-scientist-content.js`
- Read: `src/data/transcripts/qYNweeDHiyU.json`, `Au1OxVSyGas.json`, `Fa_V9fP2tpU.json`, `pqNCD_5r0IU.json`, `E0Hmnixke2g.json`, `PcbuKRNtCUc.json`
- Create: `src/data/quizzes/data-scientist-additions.js`

**Videos:** `qYNweeDHiyU` · `Au1OxVSyGas` · `Fa_V9fP2tpU` · `pqNCD_5r0IU` (Scikit-Learn) · `E0Hmnixke2g` (All ML Algos) · `PcbuKRNtCUc` (ML Concepts Animated)

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich data-scientist learning path`

---

### Task 9: Enrich DevOps / Platform Engineer content

**Files:**
- Read+Write: `src/data/roles/devops-platform-engineer-content.js`
- Read: `src/data/transcripts/EY1hsh-HCjo.json`, `gAkwW2tuIqE.json`, `i53Gi_K3o7I.json`, `m8Icp_Cid5o.json`, `qYNweeDHiyU.json`
- Create: `src/data/quizzes/devops-platform-engineer-additions.js`

**Videos:** `EY1hsh-HCjo` (Every DevOps Tool) · `gAkwW2tuIqE` · `i53Gi_K3o7I` · `m8Icp_Cid5o` (System Design Beginners) · `qYNweeDHiyU`

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich devops-platform-engineer learning path`

---

### Task 10: Enrich Frontend Developer content

**Files:**
- Read+Write: `src/data/roles/frontend-developer-content.js`
- Read: `src/data/transcripts/ok-plXXHlWw.json`, `DHjqpvDnNGE.json`, `mU6anWqZJcc.json`, `u044iM9xsWU.json`, `rg7Fvvl3taU.json`, `xJFzPSAw4Fo.json`, `i53Gi_K3o7I.json`, `7iHl71nt49o.json`
- Create: `src/data/quizzes/frontend-developer-additions.js`

**Videos:** `ok-plXXHlWw` (HTML 100s) · `DHjqpvDnNGE` (JS 100s) · `mU6anWqZJcc` (HTML/CSS fCC) · `u044iM9xsWU` (Flexbox) · `rg7Fvvl3taU` (Grid) · `xJFzPSAw4Fo` · `i53Gi_K3o7I` · `7iHl71nt49o`

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich frontend-developer learning path`

---

### Task 11: Enrich Marketing Technology Developer content

**Files:**
- Read+Write: `src/data/roles/marketing-technology-developer-content.js`
- Read: `src/data/transcripts/xJFzPSAw4Fo.json`, `iYM2zFP3Zn0.json`, `qiQR5rTSshw.json`
- Create: `src/data/quizzes/marketing-technology-developer-additions.js`

**Videos:** `xJFzPSAw4Fo` · `iYM2zFP3Zn0` (HTTP Crash Course) · `qiQR5rTSshw` (Computer Networking)

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich marketing-technology-developer learning path`

---

### Task 12: Enrich ML Engineer content

**Files:**
- Read+Write: `src/data/roles/ml-engineer-content.js`
- Read: `src/data/transcripts/qYNweeDHiyU.json`, `Au1OxVSyGas.json`, `BUTjcAjfMgY.json`, `Fa_V9fP2tpU.json`, `E0Hmnixke2g.json`
- Create: `src/data/quizzes/ml-engineer-additions.js`

**Videos:** `qYNweeDHiyU` · `Au1OxVSyGas` · `BUTjcAjfMgY` · `Fa_V9fP2tpU` · `E0Hmnixke2g`

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich ml-engineer learning path`

---

### Task 13: Enrich QA / Test Engineer content

**Files:**
- Read+Write: `src/data/roles/qa-test-engineer-content.js`
- Read: `src/data/transcripts/u6QfIXgjwGQ.json`, `r9HdJ8P6GQI.json`, `gAkwW2tuIqE.json`
- Create: `src/data/quizzes/qa-test-engineer-additions.js`

**Videos:** `u6QfIXgjwGQ` (Testing 100s) · `r9HdJ8P6GQI` (JS Testing) · `gAkwW2tuIqE` (Docker)

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich qa-test-engineer learning path`

---

### Task 14: Enrich Security Engineer content

**Files:**
- Read+Write: `src/data/roles/security-engineer-content.js`
- Read: `src/data/transcripts/NmM9HA2MQGI.json`, `qiQR5rTSshw.json`
- Create: `src/data/quizzes/security-engineer-additions.js`

**Videos:** `NmM9HA2MQGI` (Diffie-Hellman key exchange) · `qiQR5rTSshw` (Computer Networking)

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich security-engineer learning path`

---

### Task 15: Enrich Tech Lead / Architect content

**Files:**
- Read+Write: `src/data/roles/tech-lead-architect-content.js`
- Read: `src/data/transcripts/i53Gi_K3o7I.json`, `m8Icp_Cid5o.json`, `s9Qh9fWeOAk.json`, `DGtalg5efCw.json`
- Create: `src/data/quizzes/tech-lead-architect-additions.js`

**Videos:** `i53Gi_K3o7I` · `m8Icp_Cid5o` · `s9Qh9fWeOAk` · `DGtalg5efCw`

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich tech-lead-architect learning path`

---

### Task 16: Enrich Python language content

**Files:**
- Read+Write: `src/data/languages/python-content.js`
- Read: `src/data/transcripts/rfscVS0vtbw.json`, `x7X9w_GIm1s.json`, `_uQrJ0TkZlc.json`, `pTB0EiLXUC8.json`, `t5Bo1Je9EmE.json`, `pd-0G0MigUA.json`, `pqNCD_5r0IU.json`, `NmM9HA2MQGI.json`
- Create: `src/data/languageQuizzes/python-additions.js`

**Videos:** `rfscVS0vtbw` (Python fCC full) · `x7X9w_GIm1s` (Python 100s) · `_uQrJ0TkZlc` (Python Mosh) · `pTB0EiLXUC8` (OOP Simplified) · `t5Bo1Je9EmE` (Async/Await) · `pd-0G0MigUA` (SQLite) · `pqNCD_5r0IU` (Scikit-Learn) · `NmM9HA2MQGI` (Cryptography)

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich python language deep-dive`

---

### Task 17: Enrich JavaScript language content

**Files:**
- Read+Write: `src/data/languages/javascript-content.js`
- Read: `src/data/transcripts/DHjqpvDnNGE.json`, `hdI2bqOjy3c.json`, `jS4aFq5-91M.json`, `3a0I8ICR1Vg.json`, `V_Kr9OSfDeU.json`, `8aGhZQkoFbQ.json`, `cCOL7MC4Pl0.json`, `e-5obm1G_FY.json`
- Create: `src/data/languageQuizzes/javascript-additions.js`

**Videos:** `DHjqpvDnNGE` · `hdI2bqOjy3c` (JS Crash Course) · `jS4aFq5-91M` (JS fCC) · `3a0I8ICR1Vg` (Closures 7 min) · `V_Kr9OSfDeU` (Async Await) · `8aGhZQkoFbQ` (Event Loop JSConf) · `cCOL7MC4Pl0` (Jake Archibald event loop) · `e-5obm1G_FY` (Functional Programming)

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich javascript language deep-dive`

---

### Task 18: Create HTML & CSS language content (currently missing entirely)

**Context:** `html-css` language has only a skeleton file. Write full beginner-to-senior content from scratch using transcript data.

**Files:**
- Write: `src/data/languages/html-css-content.js` (full 3-level content)
- Read: `src/data/transcripts/ok-plXXHlWw.json`, `mU6anWqZJcc.json`, `OXGznpKZ_sA.json`, `EiNiSFIPIQE.json`, `u044iM9xsWU.json`, `rg7Fvvl3taU.json`
- Create: `src/data/languageQuizzes/html-css-additions.js`
- Write (add entry): `src/data/languageDevSetupGuides.js` → `html-css` key

**Videos:** `ok-plXXHlWw` (HTML 100s) · `mU6anWqZJcc` (HTML/CSS fCC) · `OXGznpKZ_sA` (CSS full course) · `EiNiSFIPIQE` (CSS Grid 13 min) · `u044iM9xsWU` (Flexbox) · `rg7Fvvl3taU` (CSS Grid Kevin Powell)

**Beginner topics:** HTML structure, tags, attributes, forms, semantic HTML, inline vs block, basic CSS selectors, box model, colors, fonts, units.
**Mid topics:** Flexbox, Grid, responsive design, media queries, CSS variables, pseudo-classes/elements, transitions, accessibility basics (ARIA).
**Senior topics:** CSS architecture (BEM, utility-first), performance, container queries, :has(), design systems, cross-browser, CSS-in-JS trade-offs.

**HTML-CSS setup guide** to add to `languageDevSetupGuides.js`:
- No Node.js needed at beginner level
- Install VS Code + Live Server extension
- Use Chrome DevTools (no install)
- Verification: open HTML file with Live Server, see in browser
- Mid/Senior: `npm install -g sass` for Sass preprocessing

- [ ] Write all 3 levels (800/1000/1000 word minimums)
- [ ] Create staging quiz file with 3 questions per level
- [ ] Add `html-css` setup guide to `src/data/languageDevSetupGuides.js`
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: create html-css language deep-dive from scratch`

---

### Task 19: Enrich SQL language content

**Files:**
- Read+Write: `src/data/languages/sql-content.js`
- Read: `src/data/transcripts/zsjvFFKOm3c.json`, `HXV3zeQKqGY.json`, `ztHopE5Wnpc.json`, `HubezKbFL7E.json`
- Create: `src/data/languageQuizzes/sql-additions.js`

**Videos:** `zsjvFFKOm3c` (SQL 100s) · `HXV3zeQKqGY` (SQL full course fCC) · `ztHopE5Wnpc` (Database Design) · `HubezKbFL7E` (DB Indexing)

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich sql language deep-dive`

---

### Task 20: Enrich TypeScript language content

**Files:**
- Read+Write: `src/data/languages/typescript-content.js`
- Read: `src/data/transcripts/zQnBQ4tB3ZA.json`, `30LWjhZzg50.json`, `LKVHFHJsiO0.json`, `nViEqpgwxHE.json`, `dLPgQRbVquo.json`, `RmGHnYUqQ4k.json`, `jjMbPt_H3RQ.json`, `vGVvJuazs84.json`
- Create: `src/data/languageQuizzes/typescript-additions.js`

**Videos:** `zQnBQ4tB3ZA` (TS 100s) · `30LWjhZzg50` (TS fCC) · `LKVHFHJsiO0` (No BS TS) · `nViEqpgwxHE` (Generics) · `dLPgQRbVquo` (Advanced TS) · `RmGHnYUqQ4k` (Enums/Performance) · `jjMbPt_H3RQ` (Why not Enums) · `vGVvJuazs84` (Type-Level TS)

- [ ] Read content + transcripts; rewrite all 3 levels; create staging quiz file
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: enrich typescript language deep-dive`

---

### Task 21: Add supplementary videos to under-resourced roles (QA, Security, Marketing)

**Context:** QA (3 videos), Security (2 videos), Marketing (3 videos) are below the 5-video minimum. This task researches and adds new verified free YouTube videos, fetches their transcripts, and enriches the content.

**Files:**
- Modify: `src/data/roles/qa-test-engineer-content.js`, `security-engineer-content.js`, `marketing-technology-developer-content.js`
- Modify: `scripts/fetch-transcripts.py` (add new IDs to VIDEO_IDS list)
- Modify: `src/data/quizzes/qa-test-engineer-additions.js`, `security-engineer-additions.js`, `marketing-technology-developer-additions.js`

**Steps:**

- [ ] For each role, search YouTube (via `yt-dlp --get-id "URL"` or manual verification) for the following suggested videos and confirm the exact 11-character video ID before use:
  - QA: Official Playwright "Getting Started" video from Microsoft · Kent C. Dodds "Write Fewer, Longer Tests" talk
  - Security: "Public Key Cryptography" by Art of the Problem · "How HTTPS works" by ByteByteGo
  - Marketing: Official Google Analytics 4 intro · "What is an API?" by MuleSoft
- [ ] Add verified IDs to `VIDEO_IDS` list in `scripts/fetch-transcripts.py`
- [ ] Run: `python scripts/fetch-transcripts.py` (only fetches new IDs due to skip logic)
- [ ] Add video sections to each role's content file with transcript-backed context
- [ ] Add quiz questions for new videos to existing staging files (append, not overwrite)
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: add supplementary videos to under-resourced roles`

---

## Phase 4 — Prerequisites & Setup Guides (parallel with Phase 3)

---

### Task 22: Rewrite all 9 Prerequisites sections with full step-by-step guides

**Context:** `src/data/prerequisites.js` was created with skeletons in Task 3. This task writes the full content. All sections must work for complete beginners. Remove all Pluralsight/LF SharePoint links. Every section must have numbered steps with exact commands and verification.

**Files:**
- Write: `src/data/prerequisites.js` (full content, all 9 keys)

**Required content per section:**

1. **`prerequisites`** (Overview) — Computer requirements, OS choices, browser setup, mindset. Link forward to VS Code and Git sections.

2. **`vs-code-setup`** — Full install guide for Windows/macOS/Linux (`code --version` verification). Extensions: ESLint, Prettier, GitLens, Python, REST Client. Settings sync. Top 10 keyboard shortcuts.

3. **`git`** — Install (Windows: git-scm.com, macOS: `brew install git`, Linux: `apt install git`). `git config --global user.name/email`. Core concepts with analogies. Commands: `init`, `add`, `commit`, `push`, `pull`, `clone`, `status`, `log`. GitHub account + SSH key + adding to GitHub. Verification: clone a public repo.

4. **`git-collaboration-workflow`** — Fork vs clone. Feature branch workflow. Merge conflict resolution step by step. Conventional Commits format. `git stash`, `git rebase -i` basics.

5. **`branching-strategy`** — Git Flow vs trunk-based. Branch naming. Release branches, hotfixes. Protecting main.

6. **`code-review`** — What to look for. PR description template. How to respond to feedback. GitHub PR walkthrough.

7. **`secure-ai-framework`** — What NOT to put in AI prompts. Verify AI-generated code. Free tools (Copilot free tier, Claude, ChatGPT). Prompt engineering for code.

8. **`eu-compliance-guide`** — GDPR basics: what data to protect, cookie consent, retention. Resources: https://gdpr.eu/developers/ (no enterprise tools).

9. **`secure-dev-environment`** — Bitwarden setup. 2FA on GitHub. SSH key best practices. `.env` + `.gitignore`. Secret scanning: `git-secrets` or `gitleaks`.

- [ ] Write all 9 sections (min 400 words each, all commands exact and runnable)
- [ ] Verify zero Pluralsight / LF SharePoint links
- [ ] `npm run build` — zero errors
- [ ] Navigate to `/prerequisites` — verify all 9 tabs show full content
- [ ] Commit: `content: complete prerequisites rewrite with step-by-step guides`

---

### Task 23: Update Dev Setup Guides — modernise versions + add SQL and TypeScript language guides

**Context:**
- `src/data/devSetupGuides.js` — update all tool version numbers to 2025 current: Python 3.12+ (was 3.9+), Node.js 22 LTS (was 16/18), Docker Desktop 4.x, Terraform 1.9+, kubectl 1.30+.
- `src/data/languageDevSetupGuides.js` — currently has `python` and `javascript` only. Add `sql` and `typescript`. (HTML-CSS guide is handled in Task 18 — do NOT touch `html-css` here.)

**SQL setup guide** (`languageDevSetupGuides.js` → `sql`):
- Beginner: use https://sqliteonline.com/ (zero install, runs in browser)
- Intermediate: DB Browser for SQLite from https://sqlitebrowser.org/
- Advanced: PostgreSQL 16 + pgAdmin from https://www.postgresql.org/download/
- Verification: run `SELECT 1+1;` — see result `2`

**TypeScript setup guide** (`languageDevSetupGuides.js` → `typescript`):
- Install Node.js 22 LTS via nvm: `nvm install 22 && nvm use 22`
- Install TypeScript: `npm install -g typescript` · verify: `tsc --version`
- `tsc --init` to create tsconfig.json
- Install ts-node: `npm install -g ts-node` · verify: `ts-node --version`
- VS Code TS support is built-in — no extension needed

**Files:**
- Modify: `src/data/devSetupGuides.js` (version number updates only, no structural changes)
- Modify: `src/data/languageDevSetupGuides.js` (add `sql` and `typescript` entries)

- [ ] Update Python version strings: `3.9+` → `3.12+` throughout `devSetupGuides.js`
- [ ] Update Node.js version strings: `16+`/`18+` → `22 LTS` throughout
- [ ] Update Docker references to Desktop 4.x where version is mentioned
- [ ] Update Terraform `1.x` references to `1.9+`
- [ ] Add `sql` entry to `languageDevSetupGuides.js`
- [ ] Add `typescript` entry to `languageDevSetupGuides.js`
- [ ] `npm run build` — zero errors
- [ ] Commit: `content: modernise dev setup guides + add sql and typescript language guides`

---

## Phase 5 — Final Merge & Verification

---

### Task 24: Merge quiz staging files + end-to-end verification

**Context:** All parallel enrichment agents wrote quiz additions to staging files instead of shared quiz files. This task merges them in, then does a full verification pass.

**Files:**
- Read: all `src/data/quizzes/*.js` staging files (11 role staging files)
- Read: all `src/data/languageQuizzes/*.js` staging files (5 language staging files)
- Modify: `src/data/quizzes.js` — append additions to each role's arrays
- Modify: `src/data/languageQuizzes.js` — append additions to each language's arrays

**Steps:**

- [ ] For each role staging file `src/data/quizzes/[roleId]-additions.js`, read the `additions` export and append its `beginner`, `mid`, `senior` arrays into the matching role in `src/data/quizzes.js`
- [ ] For each language staging file `src/data/languageQuizzes/[languageId]-additions.js`, same merge into `src/data/languageQuizzes.js`
- [ ] `npm run build` — zero errors
- [ ] `npm audit` — verify no new vulnerabilities introduced
- [ ] Run: `grep -r "pluralsight" src/ --include="*.js" --include="*.jsx"` — must return zero results
- [ ] Run: `grep -r "lfgrp.sharepoint" src/ --include="*.js" --include="*.jsx"` — must return zero results
- [ ] Start dev server and verify:
  - [ ] `/` — all 11 role cards load
  - [ ] `/role/frontend-developer` — roadmap renders, video embeds show, quiz works, score persists
  - [ ] `/role/frontend-developer/beginner` — full enriched content renders with video context + takeaways
  - [ ] `/languages` — all 5 language cards show including HTML & CSS
  - [ ] `/language/html-css` — full content renders (was completely missing before)
  - [ ] `/language/python` — content renders (was broken before due to key mismatch)
  - [ ] `/prerequisites` — all 9 tabs show full step-by-step content
  - [ ] Toggle a checkbox on a role level page → navigate away → return → checkbox still checked
  - [ ] Complete a language quiz → go to `/progress` → score shows (was broken before)
  - [ ] Navigate to `/nonexistent-route` → 404 page appears
  - [ ] Ctrl+K → search modal opens
- [ ] `npm run build` — final clean build
- [ ] Commit: `chore: merge quiz additions and verify end-to-end flow`

---

## Parallel Dispatch Summary

| Dispatch | Tasks | Dependencies |
|---|---|---|
| Dispatch 1 | Task 1, Task 2 | None |
| Dispatch 2 | Task 3 | Task 1 done |
| Dispatch 3 | Task 4 | Tasks 1–3 done |
| Dispatch 4 (max 19 parallel) | Tasks 5–23 | Task 4 done |
| Dispatch 5 | Task 24 | All above done |
