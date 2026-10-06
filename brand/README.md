# H2M AI CRM — Brand

## Colors

Taken from the current site (Tailwind tokens in the app.h2m.marketing CSS).

| Role            | Token        | Hex       |
| --------------- | ------------ | --------- |
| Primary         | `indigo-600` | `#4f39f6` |
| Primary hover   | `indigo-700` | `#432dd7` |
| Accent on dark  | `indigo-300` | `#a4b3ff` |
| Tint            | `indigo-50`  | `#eef2ff` |
| Ink / dark bg   | `slate-900`  | `#0f172b` |
| Light bg        | `slate-50`   | `#f8fafc` |

## Logo concepts

`logo/concepts/preview.png` shows all three side by side (light, dark, icon sizes, in the nav).

| Concept | Idea |
| ------- | ---- |
| **A — Wave H** | An "H" whose crossbar is a voice waveform: H2M + an AI that talks. |
| **B — Talk bubble** | A chat bubble with a voice waveform inside: calls and chat in one mark. |
| **C — Lettermark bubble** | "H2M" set inside a chat bubble. |

Each concept has `*-icon.svg` (64×64 app icon / favicon source), `*-logo.svg` (horizontal, for light
backgrounds) and `*-logo-dark.svg` (for dark backgrounds). All text is converted to outlines, so the
SVGs render the same everywhere without fonts installed.

Wordmark font: Inter Display Bold / SemiBold (SIL Open Font License).

## Regenerate

```sh
pip install fonttools uharfbuzz          # needs Inter Display installed
python brand/logo/tools/build_logo.py brand/logo/concepts
node brand/logo/tools/preview.js brand/logo/concepts brand/logo/concepts/preview.png   # needs playwright
```
