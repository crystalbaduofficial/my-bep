# Agent Coordination Guide for my-bep

**Last Updated:** July 1, 2026 22:40 UTC  
**Status:** Multiple agents working in parallel — coordination established

---

## Current State

### ✅ Production (main branch)
- **Latest Commit:** 72fa5ae (Shop/Billing phase completed)
- **What's Live:** Full ecosystem with public site + auth + accounts + shop
- **Status:** ⚠️ Build may have issues — verify before deployment
- **Live URL:** https://my-bep.vercel.app

### 🚧 Active Phases

**Completed:**
- ✅ Weeks 1-2: Public site cinematic design
- ✅ Weeks 2-3: SSO/Auth system
- ✅ Weeks 4-5: Accounts management
- ✅ Weeks 5-6: Shop/Billing/Stripe

**In Progress:**
- 🔄 LMS Integration (Courses, Lessons, Assignments)
- 🔄 Workspaces (Team management)
- 🔄 Enterprise features

---

## Known Build Issues to Fix

### 1. Duplicate Routes
**Location:** `app/api/accounts/devices/`
- Problem: Both `[deviceId]/route.ts` and `[id]/route.ts` exist
- Solution: Delete `[id]` route (keep `[deviceId]`)
```bash
rm -rf app/api/accounts/devices/\[id\]
```

### 2. Better-Auth Configuration
**Location:** `lib/auth/config.ts` line 2
- Problem: `better-auth/adapters/postgres` doesn't exist in v1.6.23
- Solution: Replace with custom session or use Postgres.js directly
- Priority: HIGH — blocks entire build

### 3. Missing Modules
Check for any imports of non-existent modules:
```bash
grep -r "from '@/lib/" app/api | grep -E "billing|audit|email" 
```

---

## Build & Deploy Checklist

Before each merge to main:

- [ ] `git pull origin main` (get latest)
- [ ] Create feature branch: `git checkout -b feat/your-feature`
- [ ] Make changes
- [ ] Run `npm run build` — must succeed
- [ ] Run `npm run lint` — must pass
- [ ] Run `npm run typecheck` — must pass
- [ ] Commit with semantic message
- [ ] Push: `git push origin feat/your-feature`
- [ ] Create PR on GitHub
- [ ] Wait for other agents' status before merging

---

## Communication Protocol

**Before starting work:**
1. Pull latest main: `git pull origin main`
2. Check this file for active work
3. Choose next priority from queue

**After completing a feature:**
1. Update "Completed" section above
2. Document any blockers
3. Note dependencies for next phase

**If blocked:**
1. Document blocker with commit hash
2. Suggest solution or alternative approach
3. Flag priority (CRITICAL/HIGH/MEDIUM/LOW)

---

## Next Priority Queue

1. **FIX BUILDS** — Resolve duplicate routes + better-auth import
2. **LMS Module** — Courses, lessons, assignments APIs
3. **Workspaces** — Team CRUD, member management
4. **Enterprise** — Advanced features

---

## Parallel Agent Guidelines

**Golden Rules:**
- One agent per feature branch
- Never force-push to main
- Test locally before pushing (`npm run build`)
- Update this coordination doc when starting/completing work
- Use descriptive branch names: `feat/`, `fix/`, `docs/`

**Conflict Prevention:**
- If two agents want same feature, coordinate in this doc
- Latest commit timestamp wins for feature priority
- Discussion before major refactors (ask in this file)

---

## Quick Reference

```bash
# Start new feature
git checkout main && git pull origin main
git checkout -b feat/your-feature-name

# Check build status
npm run build

# When ready to merge
git add . && git commit -m "feat: description"
git push origin feat/your-feature-name
# Create PR on GitHub

# Update this doc when done
# git add AGENT_COORDINATION.md
# git commit -m "docs: Update coordination status"
# git push origin main
```

---

**Maintained by:** Agent Coordinator  
**Last Action:** Document created, coordination established  
**Next Sync:** When next agent starts work
