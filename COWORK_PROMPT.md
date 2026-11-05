# Cowork prompt: publish the TGCC homepage

Copy everything below the line into Cowork. The project folder is attached (or unzipped locally as `tgcc-site/`).

---

I have a finished static website for The Good Craft Co. (TGCC), a distillery in Ponda, Goa. It needs a GitHub repo and a live Vercel deployment for testing. Please do the whole job and give me the live link.

## What the project is

- Plain static files, no framework and no build step.
- `index.html` is the entry point. It shows `desktop.html` on wide screens and `mobile.html` at 820px viewport width or below, and swaps live on resize or rotation.
- `desktop.html` is the approved desktop design. It must stay exactly as it is.
- `mobile.html` is the mobile adaptation.
- Supporting files: `support.js`, `_ds/` (design system fonts, tokens, components), `assets/` (images), `vercel.json`, `README.md`.
- Read `README.md` first.

## Tasks

1. **Repo.** Create a new GitHub repository named `tgcc-homepage` (private unless I say otherwise) under my account. Initialise git in the project folder, commit all files as they are (keep the folder structure and file names unchanged, including `_ds/` and `assets/`), and push to `main`. Do not edit, reformat, minify or rename any HTML, JS or CSS files.
2. **Vercel.** Import the repo into Vercel as a new project. Framework preset: Other. Build command: none. Output directory: none (serve the repo root). Root directory: repo root. Enable automatic deployments from `main`.
3. **Deploy and verify.** Once deployed, open the production URL and check:
   - At a desktop width (1440px) the desktop design loads: full-screen hero with awards strip, experiences slideshow, map, story panels, locations, footer.
   - At 390px width the mobile design loads: hamburger menu, sticky Plan Your Visit / Book Tickets bar after scrolling past the hero, swipeable experience cards, four vertical story strips, two-column Locations and Dining/Shop cards, stacked footer.
   - Resizing the browser across 820px switches between the two designs without a manual reload.
   - Fonts render (Uniform, Newsreader) and no images or scripts return 404. Check the browser console and network tab.
4. **Fix only deployment problems.** If something fails because of paths, case-sensitive file names, MIME types or Vercel config, fix it with the smallest change (usually `vercel.json`) and tell me what you changed. Do not change the design or copy.
5. **Report back** with: the GitHub repo URL, the Vercel production URL, the preview URL for any later branch, and a short pass/fail list for the checks above.

## Constraints

- The pages must be served over HTTP(S). They will not work from `file://`.
- Placeholder copy marked [TBC] and placeholder award logos are intentional. Leave them.
- Mirador font files are demo cuts, so keep the repo private until licensed fonts are swapped in.
- Ask me before doing anything not listed here, such as adding a custom domain.
