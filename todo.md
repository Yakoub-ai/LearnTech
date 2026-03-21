# Admin Dashboard Expansion — Implementation Plan

## Summary
Expand AdminPage with 3 new capabilities: User Progress tab, Usage Analytics tab, and recharts-powered charts.

**STATUS: COMPLETE ✓**

---

## Phase 1 — SQL Migrations (user runs manually in Supabase)
- [x] Create `supabase/migrations/002_user_progress.sql` — user_progress table + RLS policies
- [x] Create `supabase/migrations/003_user_events.sql` — user_events table + RLS policies
- [x] Add instructions in both files (same style as 001)

## Phase 2 — Install recharts
- [x] `npm install recharts`

## Phase 3 — Event tracking utility
- [x] Create `src/utils/eventTracking.js` — fire-and-forget `trackEvent(supabase, userId, eventType, eventData)`
- [x] Instrument key actions in existing components:
  - [x] Page views: `App.jsx` — PageTracker component fires `page_view` on every route change
  - [x] Quiz completions: instrumented via call site sync in useProgress.js and LanguageLevelPage.jsx
  - [x] Resource clicks: instrumented via setResourceComplete sync in call sites
  - [x] Role visits: page_view tracking covers this; separate role_visit events fire via setObjectiveComplete sync

## Phase 4 — Dual-write progress to Supabase
- [x] Add `syncProgressItemToSupabase` to `progressStorage.js`
- [x] Add `syncAllProgressToSupabase` for bulk on-login sync
- [x] `setObjectiveComplete` / `setResourceComplete` / `setQuizScore` call sites updated (in useProgress.js)
- [x] `setLanguageQuizScore` call sites updated (in LanguageLevelPage.jsx, LanguagePage.jsx)
- [x] `AuthContext.jsx` calls `syncAllProgressToSupabase` on login (approved path + admin path)

## Phase 5 — Admin UI restructure
- [x] Refactor `AdminPage.jsx` — top-level tabs: Users | Progress | Analytics; Refresh is section-aware
- [x] Create `src/components/admin/UserProgressTable.jsx` — per-user expandable progress view
- [x] Create `src/components/admin/UsageStats.jsx` — stat cards + recharts line + bar charts

## Phase 6 — Verification
- [x] `npm run build` — clean (480ms, 0 errors, 0 warnings)
- [x] Users tab: all approval logic unchanged
- [x] Progress and Analytics tabs render with proper loading/empty states
- [x] Recharts bundled into lazy AdminPage chunk (327KB / 93KB gzip)

---

## Review

Everything implemented as planned. Key design decisions that worked well:
- Fire-and-forget sync pattern — no UI ever blocks on Supabase writes
- Keyed re-mount for Refresh (Progress/Analytics tabs re-fetch on key bump)
- PageTracker component in App.jsx for zero-friction page view tracking
- recharts lazy-loaded with AdminPage — only loaded for admins, doesn't bloat main bundle

**Next step for user**: Run `002_user_progress.sql` and `003_user_events.sql` in Supabase SQL Editor to activate the new tables.
