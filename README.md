# Surf Dracula ($SURFDRAC): website

One-page static site (plain HTML/CSS/JS, no build step). Fonts and images are self-hosted, so there are no external requests.

## Preview locally

```bash
cd site   # from the folder that contains site/
python3 -m http.server 8000
# then open http://localhost:8000
```

## Before you deploy, replace the placeholders

Search the project for `REPLACE_WITH_` (`grep -rn REPLACE_WITH_ .`):

| Placeholder | Where | Replace with |
|---|---|---|
| `REPLACE_WITH_CA` | `index.html` (hero pill, CA box, pump.fun link, `data-copy` attributes) | The token's contract address, after launch |
| `REPLACE_WITH_X` | `index.html` | Your X profile URL, e.g. `https://x.com/SurfDraculaCoin` |
| `REPLACE_WITH_TG` | `index.html` | Your Telegram URL, e.g. `https://t.me/...` |
| `REPLACE_WITH_DOMAIN` | `index.html` (`og:image` / `twitter:image`) | Your Vercel domain, e.g. `surfdrac.vercel.app`, so link previews work |

## Deploy on Vercel (free Hobby plan)

1. Push this `site/` folder to a GitHub repo (or drag the folder into the Vercel dashboard), then go to **vercel.com → Add New… → Project** and import it.
2. Leave every setting at its default. Framework Preset: **Other**, no build command, output directory = the folder root. No config file is needed.
3. Click **Deploy**. The site goes live at `https://<project>.vercel.app` on the free Hobby plan. (Optional: add a custom domain under Settings → Domains.)

## Files

```
index.html      page markup
styles.css      all styles (fonts declared at the top)
main.js         starfield, nav, scroll reveals, parallax, copy-CA
fonts/          Fraunces, Space Grotesk, JetBrains Mono, UnifrakturMaguntia (woff2, latin subset, OFL)
img/            logo-512/1024.webp, logo.png, banner.webp, og.png (1200x630), favicons
```

Meme coin, no utility, not financial advice.
