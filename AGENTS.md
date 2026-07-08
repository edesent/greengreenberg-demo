# Green & Greenberg — site conventions (read before editing)

This is a **plain static HTML/CSS/JS site** — NOT Next.js, no build step, no components.

## Structure
- The site is served from **`public/`** (Vercel `outputDirectory: "public"`).
- Pages are flat `.html` files in `public/`: `index.html`, `profile.html` (attorneys index),
  one file per attorney (`moe-greenberg.html`, etc.), `free-consultation.html`.
- Shared styling in `public/styles.css`; shared JS in `public/script.js`.

## Images (IMPORTANT)
- **All images go in `public/images/`.** Upload with path `public/images/<descriptive-name>.<ext>`.
- Reference them in HTML as `images/<name>` (relative) — they are served at `/images/<name>`.
- Do NOT place images at the `public/` root or create a top-level `images/` folder outside `public/`.

## Editing
- Edit the `.html`, `styles.css`, and `script.js` files directly.
- Internal links use `.html` (e.g. `href="profile.html"`); `cleanUrls` serves them at extensionless paths.
