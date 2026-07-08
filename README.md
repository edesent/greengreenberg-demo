# Green & Greenberg

Website for [Green & Greenberg](https://greengreenberg.com/), Attorneys at Law —
Social Security Disability (SSDI & SSI) attorneys serving Rhode Island and Massachusetts.
Clean, editable static site.

## Structure

The site is served from **`public/`** (Vercel `outputDirectory: "public"`).

| Path | What it is |
|------|------------|
| `public/index.html` | Homepage — clearly-labeled `SECTION` blocks (search `SECTION:`) |
| `public/profile.html` | Attorneys index — cards linking to each lawyer |
| `public/<lawyer>.html` | One page per attorney (e.g. `moe-greenberg.html`) |
| `public/free-consultation.html` | Free consultation intake form |
| `public/styles.css` | All styling, brand palette documented at the top |
| `public/script.js` | Hero slider, mobile nav, scroll reveal, live chat, accordion |
| `public/images/` | Logo, favicon, hero, slider, and attorney photos |
| `AGENTS.md` | Conventions for editing (read before making changes) |

## Images

All images live in **`public/images/`** and are referenced as `images/<name>` (served at `/images/<name>`).

## Brand palette

- Teal (primary) `#165153`
- Deep teal `#0f3c3e`
- Gold (accent) `#dd9933`
- Off-white background `#f4f3ef`

## Run locally

Plain HTML/CSS/JS — no build step:

```bash
cd public && npx serve .
```

## Deploy

Auto-deploys to Vercel on every push to `main`.
