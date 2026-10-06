"""Turn the Next.js static export into one self-contained preview page for an Artifact.

Usage: python make_preview.py <out_dir> <dest.html>
- inlines the compiled Tailwind CSS and its fonts (Inter Variable, Inter Display) as data: URIs
- inlines the logo and screenshot as data: URIs
- drops the Next.js runtime and re-creates the header behaviour in plain JS
- points site links (/login, /pricing, /privacy, /terms) at the live site so they go somewhere
"""
import base64
import re
import sys
from pathlib import Path

out, dest = Path(sys.argv[1]), Path(sys.argv[2])
html = (out / "index.html").read_text()

body = html[html.index("<body"):]
body = body[body.index(">") + 1: body.rindex("</body>")]
body = re.sub(r"<script\b[^>]*>.*?</script>", "", body, flags=re.S)
body = re.sub(r"<script\b[^>]*/>", "", body)
body = body.replace('<div hidden=""><!--$--><!--/$--></div>', "")

css_href = re.search(r'<link rel="stylesheet" href="/(_next/static/chunks/[^"]+\.css)"', html).group(1)
css_path = out / css_href
css = css_path.read_text()
css = re.sub(r"url\(([^)]+?\.woff2)\)",
             lambda m: "url(data:font/woff2;base64,"
             + base64.b64encode((css_path.parent / m.group(1)).resolve().read_bytes()).decode() + ")", css)
# next/font defines its font variables on classes set on <html>. The artifact supplies its own <html>,
# so declare them on :root, where the theme's --font-sans / --font-display reference them.
html_classes = re.search(r'<html[^>]*class="([^"]*)"', html).group(1).split()
root_vars = "".join(re.search(r"\." + re.escape(c) + r"\{([^}]*)\}", css).group(1) + ";" for c in html_classes)


def data_uri(path, mime):
    return f"data:{mime};base64," + base64.b64encode((out / path).read_bytes()).decode()


MIME = {".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png"}
body = re.sub(r'src="/((?:landing|brand)/[^"]+)"',
              lambda m: f'src="{data_uri(m.group(1), MIME[Path(m.group(1)).suffix])}"', body)
assert 'src="/' not in body, "an image was not inlined"

# Site-relative links (/login, /pricing, /privacy, ...) open the live site; the logo link stays on the page.
body = body.replace('href="/"', 'href="#"')
body = re.sub(r'href="/(?!/)', 'href="https://app.h2m.marketing/', body)

script = r"""
(() => {
  const header = document.querySelector("header");
  const backdrop = document.getElementById("hero-backdrop");
  const [logoDark, logoLight] = header.querySelectorAll("a[aria-label] img");
  const links = header.querySelectorAll("nav > div a");
  const signIn = header.querySelector("nav > a");
  const button = header.querySelector("nav button");
  const menuIcon = button.innerHTML;
  const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-5"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line></svg>';
  const LOGO = "h-8 w-auto transition-opacity duration-300 sm:h-9 ";
  const bar = header.firstElementChild;
  let open = false;
  let panel = null;

  function render() {
    const scrolled = window.scrollY > 8;
    const dark = !open && backdrop.getBoundingClientRect().bottom > 40;
    header.className = "fixed inset-x-0 top-0 z-50 transition-colors duration-300 " + (open
      ? "bg-white shadow-[0_12px_40px_-12px_rgba(17,12,41,0.25)]"
      : !scrolled ? "bg-transparent"
      : dark ? "bg-brand-950/60 backdrop-blur-xl border-b border-white/10"
      : "bg-white/80 backdrop-blur-xl border-b border-black/5");
    bar.className = "mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8 " +
      (scrolled || open ? "h-16 sm:h-[72px]" : "h-20 sm:h-24");
    logoDark.className = LOGO + (dark ? "opacity-100" : "opacity-0");
    logoLight.className = "absolute inset-0 " + LOGO + (dark ? "opacity-0" : "opacity-100");
    links.forEach((a) => {
      a.className = "rounded-full px-4 py-2 text-[15px] font-medium transition-colors " +
        (dark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-muted hover:bg-brand-50 hover:text-ink");
    });
    signIn.className = "ml-2 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors " +
      (dark ? "bg-white text-ink hover:bg-brand-100" : "bg-brand-600 text-white hover:bg-brand-700");
    button.className = "grid size-10 place-items-center rounded-full md:hidden " +
      (dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-brand-50");
  }

  function setOpen(value) {
    open = value;
    button.setAttribute("aria-expanded", String(open));
    button.innerHTML = open ? closeIcon : menuIcon;
    if (open) {
      panel = document.createElement("div");
      panel.className = "border-t border-black/5 px-5 pb-6 pt-2 md:hidden";
      links.forEach((a) => {
        const item = document.createElement("a");
        item.href = a.getAttribute("href");
        item.textContent = a.textContent;
        item.className = "block rounded-2xl px-4 py-3.5 text-lg font-semibold text-ink hover:bg-brand-50";
        item.addEventListener("click", () => setOpen(false));
        panel.append(item);
      });
      header.append(panel);
    } else if (panel) {
      panel.remove();
      panel = null;
    }
    render();
  }

  button.addEventListener("click", () => setOpen(!open));

  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector("[data-carousel-track]");
    const prev = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    const update = () => {
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
    };
    const step = (d) => {
      const card = track.querySelector("li");
      track.scrollBy({ left: d * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
    };
    prev.addEventListener("click", () => step(-1));
    next.addEventListener("click", () => step(1));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });
  window.addEventListener("scroll", render, { passive: true });
  window.addEventListener("resize", render);
  render();
})();
"""

page = f"""<title>H2M Landing Redesign</title>
<style>
{css}
</style>
<style>
  /* Preview shell: one light page, as on the live site. */
  :root {{ color-scheme: light; {root_vars} }}
  body {{ background: #ffffff; color: #18181a; font-size: 16px; }}
  header.fixed {{ padding-top: env(safe-area-inset-top, 0px); }}
  /* Show content at rest (no fade-in) so the first frame is complete. */
  .motion-safe\\:animate-fade-up {{ animation: none !important; }}
</style>
<div class="font-sans">
{body}
</div>
<script>{script}</script>
"""
dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_text(page)
print(dest, f"{len(page) / 1024:.0f} KB")
