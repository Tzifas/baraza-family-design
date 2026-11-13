# Deploying the Baraza design proposal

This folder is the whole site. `index.html` sits at the root, there is no build
command and no framework, so both GitHub and Vercel need almost no configuration.

Do these once. After that, the link is stable and shareable on WhatsApp.

---

## 1. Put it on GitHub

The repository is already initialised and committed on this machine
(`C:\Users\user\OneDrive\Desktop\FamHeritage\design`).

**a.** Create an empty repository on GitHub:
<https://github.com/new>
Name it something like `baraza-family-design`. Leave *Add a README*, *.gitignore*
and *licence* switched **off** — the folder already has them.

**b.** Then, in PowerShell, from this folder:

```powershell
cd "C:\Users\user\OneDrive\Desktop\FamHeritage\design"
git remote add origin https://github.com/<your-account>/baraza-family-design.git
git branch -M main
git push -u origin main
```

Git Credential Manager will open a browser window the first time. Sign in once
and the push completes.

---

## 2. Put it on Vercel

**a.** Go to <https://vercel.com/new> and sign in with GitHub.

**b.** Import `baraza-family-design`.

**c.** Leave every setting alone:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Root directory | `./` (already correct) |
| Build command | empty |
| Output directory | empty |
| Install command | empty |

**d.** Deploy. It takes a few seconds.

**e.** Copy the production URL (something like
`baraza-family-design.vercel.app`) and rename the project to whatever reads
best — for example `baraza-family`. The URL follows the project name.

---

## 3. Send it to Mr. Baraza

A short message does the job:

> Good afternoon Mr. Baraza. Here is the design for the family site:
> <link>
> Please open it on a laptop if you can. Pick one of the three looks in the dark
> panel at the bottom right, tick the screens you are happy with, and press
> *Send my review* — it comes straight to us on WhatsApp.

---

## Notes

- **Nothing to keep in sync.** Every push to `main` redeploys automatically.
- **No secrets in the repo.** The only outbound link is the WhatsApp handoff.
- **The same folder** also deploys unchanged to Cloudflare Pages, Netlify or
  GitHub Pages if Vercel is inconvenient.
- **`.shots/` is excluded** by `.gitignore`. It holds local verification
  screenshots and a throwaway Chrome profile, not site content.
- If a custom domain is added later, put it on the Vercel project rather than
  inside this folder.
