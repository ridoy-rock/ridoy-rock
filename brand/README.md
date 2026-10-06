# H2M AI CRM — Brand

## Colors

Purple palette taken from hostinger.com (their CSS design tokens).

| Role             | Hostinger token             | Hex       |
| ---------------- | --------------------------- | --------- |
| Primary          | `--h-bg-brand-default`      | `#673de6` |
| Primary hover    | `--h-bg-brand-hover`        | `#471ea7` |
| Secondary        | `--h-bg-brand-secondary`    | `#7b66ff` |
| Light (on dark)  | `--h-color-primary-300`     | `#bcbdff` |
| Strong           | `--h-bg-brand-strong`       | `#331c74` |
| Deep background  | `--h-color-primary-900`     | `#251951` |
| Tint             | `--h-bg-brand-subtle`       | `#e6e8ff` |
| Ink              | `--h-color-neutral-900`     | `#18181a` |
| Grey text        | `--h-color-neutral-600`     | `#58585e` |

Hostinger's own logo is an "H" monogram, so the H2M marks deliberately avoid H shapes to not look
like a copy.

## Logo concepts (round 2)

`logo/concepts/preview.png` shows all four on white, dark and purple, at icon sizes and in the nav.

| Concept | Idea |
| ------- | ---- |
| **1 — Duo** | Two overlapping speech bubbles: the customer and the AI. The AI bubble speaks (waveform). |
| **2 — Live** | A ring that is also a speech bubble, with an "on air" dot: always on, 24/7. Stacked name. |
| **3 — Booked** | A speech bubble answered with a check mark: every call answered and booked. |
| **4 — Wordmark** | Type only, `h2m` with a purple 2, then `AI CRM`. |

Files per concept: `*-logo.svg` (light backgrounds), `*-logo-dark.svg` (dark), `*-logo-white.svg`
(single colour, for purple or photo backgrounds), `*-mark.svg` (symbol only) and `*-icon.svg`
(app icon / favicon source). All text is converted to outlines, so no fonts are needed to show them.

Font: Plus Jakarta Sans (SIL Open Font License, see `fonts/OFL.txt`).

## Regenerate

```sh
pip install fonttools uharfbuzz
python brand/logo/tools/build_logo.py brand/fonts brand/logo/concepts
node brand/logo/tools/preview.js brand/logo/concepts brand/logo/concepts/preview.png   # needs playwright
```
