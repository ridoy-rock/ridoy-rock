"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { appLink, asset } from "@/lib/paths";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: appLink("/pricing"), label: "Pricing" },
];

/** Element whose bottom edge marks where the dark hero ends. */
const DARK_BACKDROP_ID = "hero-backdrop";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const backdrop = document.getElementById(DARK_BACKDROP_ID);
      setScrolled(window.scrollY > 8);
      setOnDark(backdrop ? backdrop.getBoundingClientRect().bottom > 40 : false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const dark = onDark && !open;
  const surface = open
    ? "bg-white shadow-[0_12px_40px_-12px_rgba(17,12,41,0.25)]"
    : !scrolled
      ? "bg-transparent"
      : dark
        ? "bg-brand-950/60 backdrop-blur-xl border-b border-white/10"
        : "bg-white/80 backdrop-blur-xl border-b border-black/5";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${surface}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8 ${
        scrolled || open ? "h-16 sm:h-[72px]" : "h-20 sm:h-24"}`}>
        <a href={asset("/")} className="relative shrink-0" aria-label="H2M AI CRM">
          <img src={asset("/brand/h2m-logo-dark.svg")} alt="H2M AI CRM" width={258} height={48}
            className={`h-8 w-auto transition-opacity duration-300 sm:h-9 ${dark ? "opacity-100" : "opacity-0"}`} />
          <img src={asset("/brand/h2m-logo.svg")} alt="" aria-hidden="true" width={258} height={48}
            className={`absolute inset-0 h-8 w-auto transition-opacity duration-300 sm:h-9 ${dark ? "opacity-0" : "opacity-100"}`} />
        </a>

        <nav className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${dark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-muted hover:bg-brand-50 hover:text-ink"}`}>
                {l.label}
              </a>
            ))}
          </div>
          <a href={appLink("/login")}
            className={`ml-2 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${dark ? "bg-white text-ink hover:bg-brand-100" : "bg-brand-600 text-white hover:bg-brand-700"}`}>
            Sign in
          </a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu"
            className={`grid size-10 place-items-center rounded-full md:hidden ${dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-brand-50"}`}>
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="border-t border-black/5 px-5 pb-6 pt-2 md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3.5 text-lg font-semibold text-ink hover:bg-brand-50">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
