# Deployment

Deployed. The live link is:

**<https://fambaraza.vercel.app>**

The site comes from the GitHub repository
<https://github.com/apexwebs/FamBaraza>: every push to `main` redeploys
automatically, so this folder stays the single source of truth.

---

## GitHub

Done. The site is on GitHub at <https://github.com/apexwebs/FamBaraza> and
pushes go straight there:

```powershell
cd "C:\Users\user\OneDrive\Desktop\FamHeritage\design"
git push
```

---

## Vercel

Imported at <https://vercel.com/new> from GitHub, with every setting left alone:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Root directory | `./` (already correct) |
| Build command | empty |
| Output directory | empty |
| Install command | empty |

**d.** Deployed. The project was renamed to `fambaraza`, so the URL follows the project name.

---

## Send it to Mr. Baraza

A short message does the job:

> Good afternoon Mr. Baraza. Here is the design for the family site:
> https://fambaraza.vercel.app
> Please open it on a laptop if you can. Pick one of the three looks in the dark
> panel at the bottom right, tick the screens you are happy with, and press
> *Send my review* — it comes straight to us on WhatsApp.

---

## Notes

- **No secrets in the repo.** The only outbound link is the WhatsApp handoff.
- **The same folder** also deploys unchanged to Cloudflare Pages, Netlify or
  GitHub Pages if Vercel is inconvenient.
- **`.shots/` is excluded** by `.gitignore`. It holds local verification
  screenshots and a throwaway Chrome profile, not site content.
- If a custom domain is added later, put it on the Vercel project rather than
  inside this folder.
