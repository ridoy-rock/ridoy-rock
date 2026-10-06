# H2M AI CRM — landing page redesign

Next.js (App Router) + Tailwind CSS v4, the same stack as app.h2m.marketing, so the components can be
moved into the app directly.

**Copy is unchanged.** Every visible text is identical to the live page; only layout and styling changed.

## Status

| Part of the page | State |
| --- | --- |
| Header, hero, channels, stats, "Live in an afternoon" | Redesigned |
| Features, "And much more", pricing, FAQ, CTA, footer | Not started yet |

Screenshots: `preview/desktop.jpg`, `preview/mobile.jpg`.

## Run

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

## Structure

- `app/globals.css` — brand tokens (`brand-50` … `brand-950` from Hostinger's purple, `ink`, `muted`) and animations
- `app/layout.tsx` — Inter (with optical sizing) via `next/font/google`, page title and description
- `components/landing/SiteHeader.tsx` — sticky header: transparent on the hero, glass on scroll, mobile menu
- `components/landing/Hero.tsx` — dark purple hero, voice-wave background, app preview
- `components/landing/Channels.tsx`, `Stats.tsx`, `HowItWorks.tsx` — the following sections
- `components/landing/VoiceWaves.tsx` — the animated wave graphic (respects reduced motion)
- `public/brand/` — logo (light and dark), `app/icon.svg` — favicon
- `public/landing/calls.jpg` — app screenshot, same file as on the live site

## Porting into the app

Copy `components/landing/`, the `@theme` block from `app/globals.css` and the files in `public/brand/`.
`/landing/calls.jpg` already exists in the app.
