# Contributing to the TGCC homepage

`main` is production. Whatever is merged to `main` goes live at https://tgcc-homepage.vercel.app. Every other branch gets its own Vercel preview URL, so make changes on a branch and check the preview before merging.

## Workflow

1. Get the latest `main`:
   ```
   git checkout main
   git pull
   ```
2. Create a branch (short, descriptive name):
   ```
   git checkout -b mobile/fix-header-spacing
   ```
3. Make your edits (see "Files" below), then run the site locally:
   ```
   python3 -m http.server 8000
   ```
   Open http://localhost:8000. The pages must be served over HTTP, they do not work from `file://`. Resize below 820px to see the mobile version.
4. Commit and push the branch:
   ```
   git add -A
   git commit -m "Mobile: short description of the change"
   git push -u origin mobile/fix-header-spacing
   ```
5. Vercel builds a preview for the branch. Find the URL in the GitHub pull request (or in the Vercel dashboard) and check it at 390px and 1440px.
6. Open a pull request into `main` (`gh pr create` or the GitHub button). Ask Sarosh to review.
7. After approval, merge. The merge deploys to production. Confirm https://tgcc-homepage.vercel.app shows the change.

Do not push directly to `main`. GitHub cannot enforce this on a private repo on the free plan, so it relies on everyone following it.

## Files

- `index.html` picks `desktop.html` above 820px and `mobile.html` at 820px and below.
- `desktop.html` is the approved desktop design. Do not change its layout unless asked.
- `mobile.html` is the mobile page.
- `support.js` is the runtime both pages need. Leave it next to the HTML files.
- `_ds/` is the design system (fonts, tokens, components). `assets/` holds images.
- `vercel.json` is the deployment config. Do not edit without checking first.

## Before you open a PR

- Check mobile at 390px and desktop at 1440px, and check the browser console for new errors.
- Keep asset paths relative (for example `assets/hero-exterior.jpg`).
- Copy marked `[TBC]` and the placeholder award logos are intentional. Leave them.
- Mirador font files are demo cuts. Keep the repo private until licensed fonts are swapped in.

## If a Vercel deployment is blocked

If a push from a collaborator shows a blocked or failed deployment in Vercel, it is usually a team-membership issue on the Hobby plan, not a code problem. Ask Sarosh to approve it in the Vercel dashboard or merge the branch from their account.
