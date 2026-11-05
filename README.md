# The Good Craft Co. — Homepage (desktop + mobile)

Static site for the TGCC distillery in Ponda, Goa. No build step.

## Structure

- `index.html` — entry point. Loads `desktop.html` above 820px viewport width and `mobile.html` at 820px and below. It swaps live when the window is resized or rotated.
- `desktop.html` — approved desktop design. Do not change its layout.
- `mobile.html` — mobile adaptation (hamburger menu, sticky Plan Your Visit / Book Tickets bar, swipe cards, vertical story strips, two-column location and explore cards).
- `support.js` — runtime both pages need. Keep it next to the HTML files.
- `_ds/` — The Good Craft Co. design system (fonts, tokens, Logo / Button / CircularText components).
- `assets/` — photography, arrow marks, footer illustration.
- `vercel.json` — Vercel config (clean URLs).

## Run locally

The pages load fonts and scripts by relative path, so they must be served over HTTP (not opened with file://).

```
npx serve .
# or
python3 -m http.server 8000
```

Open http://localhost:8000. Resize the window below 820px to see the mobile version.

## Deploy

Import the repo in Vercel as a static project: Framework Preset "Other", no build command, no output directory (the repo root is served).

## Notes

- Copy marked [TBC] (times, durations, awards) is placeholder.
- Award logos and press links are placeholders.
- Mirador font files are demo cuts; swap in licensed files before production.
- Mobile preview inside a desktop browser: `mobile.html` can also be opened directly; it is centred at max 430px wide.
