# Green & Greenberg — Homepage Demo

A demo rebuild of the [Green & Greenberg](https://greengreenberg.com/) homepage,
built as a clean, editable static site to show off live website editing.
Not affiliated with the live firm — this is a portfolio / demonstration piece.

## What's here

| File | What it is |
|------|------------|
| `index.html` | Homepage — 13 clearly-labeled `SECTION` blocks (search `SECTION:`) |
| `profile.html` | Attorney page — one labeled `PROFILE:` block per attorney |
| `styles.css` | All styling, brand palette documented at the top |
| `script.js` | Three small pieces: hero slider, mobile nav, scroll reveal |
| `images/` | Real logo, favicon, hero, and attorney photos |

Every section of the site is wrapped in a labeled HTML comment so any piece is
easy to find and edit — e.g. `SECTION 3 · HERO SLIDER`, `PROFILE: Moe Greenberg`.

## Brand palette

- Teal (primary) `#165153`
- Deep teal `#0f3c3e`
- Gold (accent) `#dd9933`
- Off-white background `#f4f3ef`

## Run locally

It's plain HTML/CSS/JS — no build step. Just open `index.html`, or:

```bash
npx serve .
```

## Deploy

Deploys to Vercel as a static site with zero configuration.
