# Baraza Family — design proposal

A clickable design proposal for a private family heritage site, prepared by
Apex Webs, Mombasa for Mr. Baraza and his family.

This is **Gate 2 of the engagement: the design gate**. Nothing here is production
code. Everything here is meant to be clicked, judged and approved screen by
screen — and the review is sent to Apex on WhatsApp.

## Open it

Locally: double-click `index.html`. There is no build step, no server and no
internet connection needed — the fonts are embedded in the CSS as base64 and the
page makes no external requests.

Online: the same folder is deployed as a static site, so the URL works on any
phone with no download.

## What the client is asked to do

1. **Choose the look** — three options in the drawer at the bottom right.
2. **Approve the screens** — tick each of the ten screens as approved.
3. **Send the review** — one WhatsApp message with the chosen look, the approvals
   and any notes, to **0711 410 442**. The visitor still presses send themselves.

Nothing is transmitted automatically. The approvals and notes live in the
browser's local storage until the WhatsApp message is composed.

## The ten screens

| Screen | What it shows |
| --- | --- |
| Cover | What this is, and how to review it |
| Sign in | Invite-only entry, email link, no password to remember |
| Family tree | The centrepiece: an ego-hourglass tree centred on one person |
| Person profile | Identity, relationships, school and work timeline, visibility |
| People | Searchable directory with branch, status and generation filters |
| Owner dashboard | Approvals, invites, corrections, activity, data export |
| Approval detail | A before/after diff an editor suggested, approve or reject |
| Privacy controls | Field-by-field visibility, minors, consent records |
| Invite a relative | Role and branch, single-use link that expires in seven days |
| The Project Pack | The client's own document, embedded and set to be read on a phone |

## The three looks

All three keep the brief's warm, calm, deep-green-and-ivory direction. They are
not three colourways of one design — they are three different type voices and
moods, so the choice is a real one:

| Look | Ground | Type | Character |
| --- | --- | --- | --- |
| **Albamu** | Warm ivory, forest green, ochre | Fraunces + Inter | Soft, kept, album-like. Rounded corners, gentle shadows. |
| **Usiku** | Evergreen ground, ivory type, brass | Newsreader + Inter | The same record at night. Flat, hairline, quiet, no shadows. |
| **Pwani** | Limestone, palm, terracotta | Instrument Serif + Instrument Sans | Airier, larger type, generous curves, terracotta actions. |

Switching is a `data-look` attribute on `<html>`, driven entirely by CSS custom
properties in `assets/css/tokens.css`. A URL can carry a look too:
`?look=b`.

## Design decisions worth knowing

**The tree is an hourglass, not a wall.** Whole-family charts become unreadable
on a phone past two generations. The tree centres on one person: parents and
grandparents above, children and grandchildren below, partners either side,
siblings beyond. Tapping anyone re-centres the tree and moves the URL, so any
view can be shared or bookmarked. "Whole family" centres on the root couple and
zooms out.

**A person sits between their partners.** With two marriages the focus card sits
in the middle, so both marriage lines are drawn between adjacent cards. This is
why Daniel Baraza appears between Alice and Faith.

**Couples drop one line.** A marriage draws a double hairline between two cards;
their children hang from that line. Half-siblings appear exactly where they are,
and an adopted child gets a dashed link.

**The client's document lives inside the product.** The Pack is a screen of the
demo, not a separate PDF, with an interactive package table and the engagement
phases as a timeline.

**No prices in the prototype.** Prices, dates and payment terms stay in section 5
of the Project Pack so they cannot drift out of date here.

## Files

```
index.html            the whole prototype
assets/css/fonts.css  generated — fonts embedded as base64
assets/css/tokens.css three looks, one architecture (data-look="a|b|c")
assets/css/app.css    components and screens
assets/js/data.js     the sample family (in-memory database)
assets/js/tree.js     the ego-hourglass layout and renderer
assets/js/screens.js  the ten screens
assets/js/app.js      router, header, drawer, dialogs, toasts, WhatsApp
assets/fonts/         original .woff2 files
tools/build-fonts.mjs regenerates fonts.css
```

## Deploying

Live at **https://fambaraza.vercel.app** (imported on Vercel from GitHub with
every setting left at its default; `index.html` sits at the root). The folder is
a self-contained static site: no build command, no output directory, no
framework. The same folder also works unchanged on Cloudflare Pages, Netlify or
GitHub Pages.

## Notes for the build team

- The production architecture in the development PRD (Next.js, Supabase, RLS,
  family-chart) is untouched. The hourglass interaction maps onto
  `get_tree(focus_id, up, down)` exactly.
- Keyboard: arrow keys move focus between relatives, Enter opens the profile.
- `prefers-reduced-motion` disables all transitions and tweens.
- The WhatsApp number is the only external link in the whole prototype.

## Sample data

Every name, date and place in `data.js` is invented — Daniel Baraza and his
family are a stand-in for the client's real family. "Today" is pinned to
13 November 2026 so the demo never goes stale. Replace the file at the
data-entry phase.
