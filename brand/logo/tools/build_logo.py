"""H2M AI CRM logo concepts, round 2 (Hostinger purple palette).

Usage: python build_logo.py <font_dir> <out_dir>
font_dir must hold PlusJakartaSans-{500,600,700,800}.ttf (static instances, SIL OFL).
All text is converted to outlines.
"""
import math
import sys
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

# Hostinger design tokens (read from hostinger.com CSS custom properties)
P300 = "#bcbdff"   # --h-color-primary-300
P400 = "#9d99ff"   # --h-color-primary-400
P500 = "#7b66ff"   # --h-bg-brand-secondary
P600 = "#673de6"   # --h-bg-brand-default
P700 = "#471ea7"   # --h-bg-brand-hover
P800 = "#331c74"   # --h-bg-brand-strong
INK = "#18181a"    # --h-color-neutral-900
GREY = "#58585e"   # --h-color-neutral-600
WHITE = "#ffffff"

FONT_DIR = None
_fonts = {}


def font(weight):
    path = FONT_DIR / f"PlusJakartaSans-{weight}.ttf"
    if path not in _fonts:
        _fonts[path] = (TTFont(str(path)), hb.Font(hb.Face(hb.Blob.from_file_path(str(path)))))
    return _fonts[path]


def fmt(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def text_path(text, weight, size, x, baseline, tracking=0.0):
    """(svg path data, advance width) for text shaped with HarfBuzz."""
    tt, hbfont = font(weight)
    upem = tt["head"].unitsPerEm
    s = size / upem
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True})
    order, glyphset = tt.getGlyphOrder(), tt.getGlyphSet()
    pen = SVGPathPen(glyphset, ntos=fmt)
    cursor = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        tpen = TransformPen(pen, (s, 0, 0, -s, x + (cursor + pos.x_offset) * s, baseline - pos.y_offset * s))
        glyphset[order[info.codepoint]].draw(tpen)
        cursor += pos.x_advance + tracking * upem
    return pen.getCommands(), (cursor - tracking * upem) * s


def cap(weight, size):
    tt, _ = font(weight)
    return tt["OS/2"].sCapHeight * size / tt["head"].unitsPerEm


def xh(weight, size):
    tt, _ = font(weight)
    return tt["OS/2"].sxHeight * size / tt["head"].unitsPerEm


# ---------------------------------------------------------------- shapes

def bubble(x, y, w, h, r, tail="left", tip=(0, 12), base=14, rise=10, round_tip=2.2):
    """Rounded-rect speech bubble with a tail at a bottom corner (single closed path)."""
    def tail_pts():
        b = (x + base, y + h)                       # where the tail leaves the bottom edge
        t = (x + tip[0], y + h + tip[1])            # tail tip
        s = (x, y + h - rise)                       # where it rejoins the side
        return b, t, s

    b, t, s = tail_pts()

    def towards(p, q, d):
        dx, dy = q[0] - p[0], q[1] - p[1]
        n = math.hypot(dx, dy)
        return (p[0] + dx / n * d, p[1] + dy / n * d)

    t_in, t_out = towards(t, b, round_tip), towards(t, s, round_tip)
    pts = [
        f"M{fmt(x + r)} {fmt(y)}", f"H{fmt(x + w - r)}",
        f"A{r} {r} 0 0 1 {fmt(x + w)} {fmt(y + r)}", f"V{fmt(y + h - r)}",
        f"A{r} {r} 0 0 1 {fmt(x + w - r)} {fmt(y + h)}", f"H{fmt(b[0])}",
        f"L{fmt(t_in[0])} {fmt(t_in[1])}", f"Q{fmt(t[0])} {fmt(t[1])} {fmt(t_out[0])} {fmt(t_out[1])}",
        f"L{fmt(s[0])} {fmt(s[1])}", f"V{fmt(y + r)}", f"A{r} {r} 0 0 1 {fmt(x + r)} {fmt(y)}", "Z",
    ]
    d = " ".join(pts)
    if tail == "right":   # mirror horizontally around the bubble's centre
        return f'<g transform="translate({fmt(2 * x + w)} 0) scale(-1 1)"><path d="{d}"/></g>', d
    return f'<path d="{d}"/>', d


def grad(gid, a=P500, b=P600, c=P700):
    return (
        f'<linearGradient id="{gid}" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0" stop-color="{a}"/><stop offset=".55" stop-color="{b}"/>'
        f'<stop offset="1" stop-color="{c}"/></linearGradient>'
    )


def bars(cx, cy, heights, w=3.6, gap=2.6, fill=WHITE):
    n = len(heights)
    x0 = cx - (n * w + (n - 1) * gap) / 2
    return "".join(
        f'<rect x="{fmt(x0 + i * (w + gap))}" y="{fmt(cy - h / 2)}" width="{w}" height="{h}" rx="{w / 2}" fill="{fill}"/>'
        for i, h in enumerate(heights)
    )


# ---------------------------------------------------------------- marks (64x64)
# style: "color" (on light), "dark" (on dark), "mono" (single colour white), "tile" (app icon)

def mark_duo(style):
    """Duo: customer + AI, two overlapping speech bubbles; the AI one speaks."""
    _, back_d = bubble(3, 5, 40, 30, 12, "left", tip=(1, 12), base=13, rise=11)
    _, front_d = bubble(21, 21, 40, 30, 12, "left", tip=(1, 12), base=13, rise=11)
    mirror = 'transform="translate(82 0) scale(-1 1)"'   # front bubble's tail points right
    heights = (6, 13, 18, 11, 6)
    defs = (
        '<mask id="cut"><rect x="-10" y="-10" width="84" height="84" fill="#fff"/>'
        f'<g {mirror}><path d="{front_d}" fill="#000" stroke="#000" stroke-width="7" stroke-linejoin="round"/></g></mask>'
    )
    if style == "mono":
        defs += f'<mask id="wave"><rect x="-10" y="-10" width="84" height="84" fill="#fff"/>{bars(41, 36, heights, 3.2, 2.4, "#000")}</mask>'
        return (
            f"<defs>{defs}</defs>"
            f'<path d="{back_d}" fill="#ffffffa6" mask="url(#cut)"/>'
            f'<g mask="url(#wave)"><g {mirror}><path d="{front_d}" fill="{WHITE}"/></g></g>'
        )
    if style == "tile":
        back, front, wave = "#ffffffa6", WHITE, P600
    else:
        back = P400 if style == "color" else P300
        front, wave = "url(#g)", WHITE
        defs += grad("g") if style == "color" else grad("g", P500, P600, P700)
    return (
        f"<defs>{defs}</defs>"
        f'<path d="{back_d}" fill="{back}" mask="url(#cut)"/>'
        f'<g {mirror}><path d="{front_d}" fill="{front}"/></g>'
        f"{bars(41, 36, heights, 3.2, 2.4, wave)}"
    )


def ring_bubble_path(cx, cy, R, r, a1, a2, tip, round_tip=2.4):
    """Circle speech bubble (tail between angles a1..a2, degrees, y-down) with a round hole."""
    p = lambda a: (cx + R * math.cos(math.radians(a)), cy + R * math.sin(math.radians(a)))
    p1, p2 = p(a1), p(a2)
    def towards(a, b, d):
        dx, dy = b[0] - a[0], b[1] - a[1]
        n = math.hypot(dx, dy)
        return (a[0] + dx / n * d, a[1] + dy / n * d)
    t_in, t_out = towards(tip, p1, round_tip), towards(tip, p2, round_tip)
    outer = (
        f"M{fmt(p2[0])} {fmt(p2[1])} A{R} {R} 0 1 1 {fmt(p1[0])} {fmt(p1[1])} "
        f"L{fmt(t_in[0])} {fmt(t_in[1])} Q{fmt(tip[0])} {fmt(tip[1])} {fmt(t_out[0])} {fmt(t_out[1])} Z"
    )
    hole = f"M{fmt(cx + r)} {fmt(cy)} A{r} {r} 0 1 0 {fmt(cx - r)} {fmt(cy)} A{r} {r} 0 1 0 {fmt(cx + r)} {fmt(cy)} Z"
    return outer + " " + hole


def mark_live(style):
    """Live: an always-on ring that is also a speech bubble, with the AI 'on air' dot inside."""
    d = ring_bubble_path(33, 30, 27, 15, 108, 162, (5.5, 59))
    if style == "tile":
        ring, dot, defs = WHITE, WHITE, ""
    elif style == "mono":
        ring, dot, defs = WHITE, WHITE, ""
    else:
        ring, defs = "url(#g)", f"<defs>{grad('g') if style == 'color' else grad('g', P400, P500, P600)}</defs>"
        dot = P600 if style == "color" else P400
    return f'{defs}<path d="{d}" fill="{ring}" fill-rule="evenodd"/><circle cx="33" cy="30" r="7" fill="{dot}"/>'


def mark_booked(style):
    """Booked: a speech bubble whose answer is a check mark (every call answered and booked)."""
    _, d = bubble(4, 5, 56, 44, 17, "left", tip=(2, 13), base=17, rise=14, round_tip=2.6)
    check = "M20.5 27.5 L28.5 35 L43.5 19.5"
    if style in ("tile", "mono"):
        fill, defs, ck = WHITE, "", P600 if style == "tile" else None
    else:
        fill = "url(#g)"
        defs = f"<defs>{grad('g') if style == 'color' else grad('g', P400, P500, P600)}</defs>"
        ck = WHITE
    if ck is None:  # mono: knock the check out of the bubble
        return (
            f'<defs><mask id="m"><rect width="64" height="64" fill="#fff"/>'
            f'<path d="{check}" fill="none" stroke="#000" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/></mask></defs>'
            f'<path d="{d}" fill="{fill}" mask="url(#m)"/>'
        )
    return (
        f'{defs}<path d="{d}" fill="{fill}"/>'
        f'<path d="{check}" fill="none" stroke="{ck}" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>'
    )


def tile(inner, scale=0.62):
    """App-icon tile: gradient squircle with the white mark centred."""
    off = 32 - 32 * scale
    return (
        f'<defs>{grad("t")}</defs><rect width="64" height="64" rx="16" fill="url(#t)"/>'
        f'<g transform="translate({fmt(off)} {fmt(off + 1)}) scale({scale})">{inner}</g>'
    )


def mark_wordmark_tile():
    size = 22
    _, w = text_path("h2m", 800, size, 0, 0, tracking=-0.03)
    d, _ = text_path("h2m", 800, size, 32 - w / 2, 32 + xh(800, size) / 2 + 1, tracking=-0.03)
    return f'<defs>{grad("t")}</defs><rect width="64" height="64" rx="16" fill="url(#t)"/><path d="{d}" fill="{WHITE}"/>'


MARKS = {"duo": mark_duo, "live": mark_live, "booked": mark_booked}


# ---------------------------------------------------------------- lockups

def svg(content, w, h, title="H2M AI CRM"):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(w)} {fmt(h)}" width="{fmt(w)}" '
        f'height="{fmt(h)}" role="img" aria-label="{title}"><title>{title}</title>{content}</svg>\n'
    )


def colours(style):
    if style == "color":
        return INK, P600, GREY
    if style == "dark":
        return WHITE, P300, "#c6c6cc"
    return WHITE, WHITE, WHITE   # mono


def lockup_inline(mark_fn, style, descriptor="accent"):
    """[mark] H2M AI CRM on one line."""
    h, size = 48, 29
    name_c, accent_c, grey_c = colours(style)
    base = h / 2 + cap(800, size) / 2
    x0 = 48 + 12
    d1, w1 = text_path("H2M", 800, size, x0, base, tracking=-0.02)
    gap = size * 0.26
    d2, w2 = text_path("AI CRM", 600, size, x0 + w1 + gap, base, tracking=-0.01)
    desc_c = accent_c if descriptor == "accent" else grey_c
    content = (
        f'<g transform="scale(.75)">{mark_fn(style)}</g>'
        f'<path d="{d1}" fill="{name_c}"/><path d="{d2}" fill="{desc_c}"/>'
    )
    return svg(content, x0 + w1 + gap + w2 + 1, h)


def lockup_stacked(mark_fn, style):
    """[mark] H2M over a small tracked AI CRM."""
    h = 52
    name_c, accent_c, _ = colours(style)
    x0 = 52 + 12
    d1, w1 = text_path("H2M", 800, 31, x0, 27, tracking=-0.02)
    d2, w2 = text_path("AI CRM", 700, 12.5, x0 + 1, 46, tracking=0.16)
    content = (
        f'<g transform="scale(.8125)">{mark_fn(style)}</g>'
        f'<path d="{d1}" fill="{name_c}"/><path d="{d2}" fill="{accent_c}"/>'
    )
    return svg(content, x0 + max(w1, w2) + 2, h)


def lockup_wordmark(style):
    """Wordmark only: h2m with a purple 2, then AI CRM after a hairline."""
    h, size = 48, 40
    name_c, accent_c, grey_c = colours(style)
    base = h / 2 + xh(800, size) / 2 + 1
    parts, x = [], 0.0
    for ch, c in (("h", name_c), ("2", "url(#g)" if style == "color" else accent_c), ("m", name_c)):
        d, w = text_path(ch, 800, size, x, base)
        parts.append(f'<path d="{d}" fill="{c}"/>')
        x += w - size * 0.03
    x += size * 0.32
    line = f'<rect x="{fmt(x)}" y="{fmt(base - xh(800, size) - 4)}" width="1.6" height="{fmt(xh(800, size) + 8)}" fill="{grey_c}" opacity=".35"/>'
    x += size * 0.32
    d, w = text_path("AI CRM", 700, 13, x, base - xh(800, size) / 2 + cap(700, 13) / 2, tracking=0.14)
    parts.append(f'<path d="{d}" fill="{grey_c if style == "color" else accent_c}"/>')
    defs = f'<defs>{grad("g")}</defs>' if style == "color" else ""
    return svg(defs + "".join(parts) + line, x + w + 2, h)


def main(font_dir, out):
    global FONT_DIR
    FONT_DIR = Path(font_dir)
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    plan = {
        "1-duo": ("inline", mark_duo),
        "2-live": ("stacked", mark_live),
        "3-booked": ("inline-grey", mark_booked),
    }
    for name, (layout, fn) in plan.items():
        for style, suffix in (("color", ""), ("dark", "-dark"), ("mono", "-white")):
            if layout == "stacked":
                s = lockup_stacked(fn, style)
            else:
                s = lockup_inline(fn, style, "grey" if layout == "inline-grey" else "accent")
            (out / f"{name}-logo{suffix}.svg").write_text(s)
        (out / f"{name}-mark.svg").write_text(svg(fn("color"), 64, 64))
        (out / f"{name}-icon.svg").write_text(svg(tile(fn("tile")), 64, 64))
    for style, suffix in (("color", ""), ("dark", "-dark"), ("mono", "-white")):
        (out / f"4-wordmark-logo{suffix}.svg").write_text(lockup_wordmark(style))
    (out / "4-wordmark-icon.svg").write_text(svg(mark_wordmark_tile(), 64, 64))
    (out / "4-wordmark-mark.svg").write_text(svg(mark_wordmark_tile(), 64, 64))
    print("wrote", len(list(out.glob("*.svg"))), "svgs")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
