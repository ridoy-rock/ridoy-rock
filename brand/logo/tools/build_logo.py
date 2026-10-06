"""Generate H2M AI CRM logo concepts as SVG (text converted to outlines).

Usage: python build_logo.py <out_dir>
Needs: fonttools, uharfbuzz, Inter Display (OFL) installed under /usr/share/fonts/opentype/inter.
"""
import sys
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

FONT_DIR = Path("/usr/share/fonts/opentype/inter")
BOLD = FONT_DIR / "InterDisplay-Bold.otf"
SEMIBOLD = FONT_DIR / "InterDisplay-SemiBold.otf"

# Current site palette (Tailwind tokens read from app.h2m.marketing CSS)
INDIGO_600 = "#4f39f6"
INDIGO_300 = "#a4b3ff"
INDIGO_100 = "#e0e7ff"
SLATE_900 = "#0f172b"
WHITE = "#ffffff"

_fonts = {}


def _font(path):
    if path not in _fonts:
        blob = hb.Blob.from_file_path(str(path))
        _fonts[path] = (TTFont(str(path)), hb.Font(hb.Face(blob)))
    return _fonts[path]


def text_path(text, font_path, size, x, baseline, tracking=0.0):
    """Return (svg path data, advance width) for text shaped with HarfBuzz (kerning applied)."""
    tt, hbfont = _font(font_path)
    upem = tt["head"].unitsPerEm
    scale = size / upem
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": False})
    glyph_order = tt.getGlyphOrder()
    glyphset = tt.getGlyphSet()
    pen = SVGPathPen(glyphset, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    cursor = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = glyph_order[info.codepoint]
        gx = x + (cursor + pos.x_offset) * scale
        tpen = TransformPen(pen, (scale, 0, 0, -scale, gx, baseline - pos.y_offset * scale))
        glyphset[name].draw(tpen)
        cursor += pos.x_advance + tracking * upem
    width = (cursor - tracking * upem) * scale
    return pen.getCommands(), width


def cap_height(font_path, size):
    tt, _ = _font(font_path)
    return tt["OS/2"].sCapHeight * size / tt["head"].unitsPerEm


# ---------------------------------------------------------------- icon marks (64x64 grid)

def icon_a(bg=INDIGO_600, fg=WHITE):
    """Wave H: the H's crossbar is a voice waveform."""
    bars = "".join(
        f'<rect x="{cx - 2:.1f}" y="{32 - h / 2:.1f}" width="4" height="{h}" rx="2" fill="{fg}"/>'
        for cx, h in ((26.5, 8), (32, 14), (37.5, 8))
    )
    return (
        f'<rect width="64" height="64" rx="15" fill="{bg}"/>'
        f'<rect x="13" y="14" width="8.5" height="36" rx="4.25" fill="{fg}"/>'
        f'<rect x="42.5" y="14" width="8.5" height="36" rx="4.25" fill="{fg}"/>'
        f"{bars}"
    )


def icon_b(bg=INDIGO_600, fg=WHITE):
    """Talk bubble: a chat bubble that speaks (waveform inside)."""
    bars = "".join(
        f'<rect x="{cx - 1.6:.1f}" y="{29 - h / 2:.1f}" width="3.2" height="{h}" rx="1.6" fill="{bg}"/>'
        for cx, h in ((22.4, 7), (27.2, 15), (32, 21), (36.8, 12), (41.6, 6))
    )
    return (
        f'<rect width="64" height="64" rx="15" fill="{bg}"/>'
        f'<rect x="12" y="14" width="40" height="30" rx="10" fill="{fg}"/>'
        f'<path d="M17 38 L17.4 50.6 Q17.5 52.4 19 51.3 L30 42 Z" fill="{fg}"/>'
        f"{bars}"
    )


def icon_c(bg=INDIGO_600, fg=WHITE):
    """Lettermark bubble: H2M set inside a chat bubble."""
    size = 16.5
    _, w = text_path("H2M", BOLD, size, 0, 0, tracking=-0.01)
    x = 32 - w / 2
    base = 28.5 + cap_height(BOLD, size) / 2
    d, _ = text_path("H2M", BOLD, size, x, base, tracking=-0.01)
    return (
        f'<rect width="64" height="64" rx="15" fill="{bg}"/>'
        f'<rect x="9" y="13" width="46" height="31" rx="10" fill="{fg}"/>'
        f'<path d="M15 38 L15.4 50.6 Q15.5 52.4 17 51.3 L28 42 Z" fill="{fg}"/>'
        f'<path d="{d}" fill="{bg}"/>'
    )


ICONS = {"a": icon_a, "b": icon_b, "c": icon_c}


# ---------------------------------------------------------------- lockups

def svg(content, w, h, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" '
        f'width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">'
        f"<title>{title}</title>{content}</svg>\n"
    )


def lockup(icon_fn, dark=False):
    """Horizontal logo: icon + 'H2M' + 'AI CRM', 48px tall."""
    h = 48
    icon = f'<g transform="scale(0.75)">{icon_fn()}</g>'
    size = 30
    base = h / 2 + cap_height(BOLD, size) / 2
    x0 = 48 + 13
    d1, w1 = text_path("H2M", BOLD, size, x0, base, tracking=-0.015)
    gap = size * 0.27
    d2, w2 = text_path("AI CRM", SEMIBOLD, size, x0 + w1 + gap, base, tracking=-0.01)
    word = WHITE if dark else SLATE_900
    accent = INDIGO_300 if dark else INDIGO_600
    total = x0 + w1 + gap + w2 + 1
    content = f'{icon}<path d="{d1}" fill="{word}"/><path d="{d2}" fill="{accent}"/>'
    return svg(content, total, h, "H2M AI CRM")


def main(out):
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    for key, fn in ICONS.items():
        (out / f"{key}-icon.svg").write_text(svg(fn(), 64, 64, "H2M AI CRM"))
        (out / f"{key}-logo.svg").write_text(lockup(fn))
        (out / f"{key}-logo-dark.svg").write_text(lockup(fn, dark=True))
    print("wrote", sorted(p.name for p in out.glob("*.svg")))


if __name__ == "__main__":
    main(sys.argv[1])
