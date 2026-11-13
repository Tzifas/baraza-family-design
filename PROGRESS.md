# Baraza Family Site — Progress Log

Running record of the work on this design prototype: what was built, what
broke, what was fixed, and how everything was verified. Newest entries last.
Commit hashes are `git log` short hashes on `main`.

- **Live site:** <https://fambaraza.vercel.app>
- **Primary repo:** <https://github.com/apexwebs/FamBaraza> (push to `main` auto-redeploys via Vercel)
- **Backup mirror:** <https://github.com/Tzifas/baraza-family-design>
- **Local folder:** `C:\Users\user\OneDrive\Desktop\FamHeritage\design`

---

## Status snapshot (2026-11-13, end of day)

| Item | State |
| --- | --- |
| Gate | 2 — design proposal awaiting client sign-off |
| Screens | 11 (cover, sign-in, tree, profile, people, admin, requests, privacy, invite, project pack, questionnaire) |
| Looks | 3 — A Albamu (ivory/forest/ochre), B Usiku (dark evergreen/brass), C Pwani (limestone/palm/terracotta) |
| Deploy | Vercel, live and verified; auto-redeploy on every push |
| Client review | Pending — Mr. Baraza to choose a look, approve screens, answer the 12 questions |
| Known blockers | None open |

---

## Timeline

### Before the first commit (same morning)

- Read the three source documents in `Docs/` (client PRD, development PRD,
  project pack with packages F01–F13 and the five sign-off gates).
- Design direction pinned: deep green + ivory + ochre, serif for names, clean
  sans for details; no gradients, no glassmorphism, no marketing fluff.
- Downloaded and embedded 5 font families as base64 (`assets/css/fonts.css`),
  so the site works offline with zero network requests.
- Chose the ego-hourglass tree (focus person centred, parents above,
  children below) over a whole-family chart — readable on a phone and maps
  onto the dev PRD's `get_tree(focus_id, up, down)`.
- Rebranded the sample data to the Baraza family: Silas + Rebecca at the root,
  branches Bungoma / Nairobi / Mombasa, Daniel Baraza (teacher, Bungoma) as
  the Owner account.
- Monogram avatars instead of stock photos — a stranger's face on a real
  family member would be a lie; branch-tinted initials leave honest slots.

### 2026-11-13

| Time | Commit | What happened |
| --- | --- | --- |
| 11:02 | `3bdd10f` | Initial Gate 2 proposal: 10 screens, 3 looks, tree engine with pan/zoom and animated re-centre, review drawer, WhatsApp review handoff, README, `.gitignore` |
| 11:04 | `343a166` | `DEPLOY.md` deployment guide; README refreshed for the Baraza rebrand |
| 11:17 | `87a242f` | Questionnaire screen added: 12 questions (text, choice, package picker), answers saved as the client types |
| 13:29 | `81c33a4` | Questionnaire wiring finished: routes (`#/questions`), answer persistence (`localStorage`), progress counter, WhatsApp compose for answers, drawer count corrected to 11 screens, tree layout tweaks, meta tags fixed |
| 13:40 | `deacf60` | `DEPLOY.md` pointed at the real repository (`apexwebs/FamBaraza`) |
| 13:49 | `1cc6b84` | Live link recorded in README + DEPLOY after Vercel deploy |
| 14:44 | `aef8d05` | Tree made touch-friendly: one-finger drag pan, two-finger pinch zoom (clamped 40–150%), `pointercancel` handling, `touch-action: none` + cursor/user-select CSS |
| 14:53 | `05f8f1b` | Mobile tree bottom chrome: zoom bar docked flush to the bottom edge, DEMO review pill centred above it (tree screen only; other screens unchanged) |
| 15:06 | `1e2413f` | Desktop card-click regression fixed: mouse never grabs cards (only the bare canvas), so clicks reach the cards again |

### Deployment history (same day)

- Private repo `Tzifas/baraza-family-design` created first, then the earlier
  `apexwebs/FamBaraza` remote was discovered and used as primary; the private
  repo was made public as a backup mirror and kept in sync.
- GitHub Pages was briefly enabled on the mirror as a stopgap link, then
  disabled once Vercel went live — one canonical URL only.
- Vercel import by the client: framework Other, root `./`, all build settings
  empty; project renamed `fambaraza` → `fambaraza.vercel.app`.

---

## Bugs found and fixed

| # | Symptom | Root cause | Fix | Commit |
| --- | --- | --- | --- | --- |
| 1 | Tree would not pan on phones; cards tapped fine | Pan used pointer events but CSS never declared `touch-action: none`, so the browser hijacked drags for page scroll and fired an unhandled `pointercancel` | `touch-action: none` on `.tree-shell`, pointer map with proper release/cancel, tween cancellation on touch | `aef8d05` |
| 2 | No pinch zoom | Only mouse wheel was wired | Two-pointer pinch, zooming toward the finger midpoint, clamped to 40–150% | `aef8d05` |
| 3 | After the touch fix, desktop card clicks stopped re-centring the tree | `setPointerCapture` on the shell swallowed the click, and an unconditional `preventDefault` suppressed card activation | Mouse drags now start on the bare canvas only; cards are never captured | `1e2413f` |
| 4 | Mobile zoom bar crowded the DEMO pill | Both floated near the bottom edge | Zoom bar docked at the bottom edge; pill centred above it, tree screen only | `05f8f1b` |
| 5 | Review drawer said "0 of 10" after the 11th screen | Hard-coded count | Dynamic `SCREENS.length` | `81c33a4` |
| 6 | Page metadata still said "Ten screens" | Copy not updated when the questionnaire shipped | "Eleven screens" in both meta descriptions | `81c33a4` |

---

## How things were verified

Method throughout: headless Chrome driven over the DevTools protocol
(`--remote-debugging-port=9333`), scripted probes, screenshots, and console +
layout assertions. No test framework needed for a static site.

- **Route matrix:** every route × look A/B/C × desktop/phone widths — zero
  console errors, no horizontal overflow (`scrollWidth === clientWidth`).
- **Touch emulation** (390×844, `maxTouchPoints: 2`): pan moved the camera
  exactly with the drag and never changed focus; pinch scaled 1.05 → 1.5
  (clamp working); tap-to-centre confirmed (p03 → p07).
- **Desktop regression** (1440×900): real mouse click on card p01 moved focus
  p03 → p01 and re-centred the camera (x 131 → 638); canvas drag tracked 1:1
  (+60, −40); arrow keys moved focus; zoom buttons worked.
- **Questionnaire:** answers survive a full page reload; progress bar counts
  correctly ("3 of 12 answered"); WhatsApp message composes with all answers.
- **Live checks:** `https://fambaraza.vercel.app` root + all 6 assets HTTP 200;
  the same touch and desktop suites were re-run against the live URL after
  deploy, not just local files.

---

## Constraints and standing decisions

- Prices and payment terms live only in section 5 of the Project Pack — never
  in the prototype. The Pack is embedded as a screen, without prices.
- `Docs/` is not part of this repo (it contains pricing); the repo root is the
  site itself so Vercel needs zero configuration.
- Client chooses the look; the demo never implies Apex picked one. Once Mr.
  Baraza chooses, that look becomes the default `data-look`.
- WhatsApp handoff is honest for a static page: a `wa.me` deep link with the
  review/questionnaire pre-filled — the visitor presses send.
- localStorage keys used by the demo: `fh.look`, `fh.approvals`, `fh.notes`,
  `fh.checklist`, `fh.answers`.

---

## Open items

1. **Client review** — Mr. Baraza: pick look A/B/C, tick approved screens in
   the review drawer, answer the 12 questions. All three arrive on WhatsApp at
   0711 410 442.
2. After sign-off: set the chosen look as the default; optionally run a design
   critique pass on it; then Gate 3 (build).
3. If pan speed or pinch sensitivity feels off on real devices, those are
   one-line tweaks (`zoomBy` step 1.09/1.18, clamp 0.4–1.5).
4. Keep this log updated: add one timeline row per commit, newest last.
