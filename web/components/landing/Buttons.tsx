import { ArrowRightIcon } from "./icons";

type ButtonProps = { href: string; children: React.ReactNode };

/** White pill with an arrow chip; the main call to action on dark purple. */
export function PrimaryPill({ href, children }: ButtonProps) {
  return (
    <a href={href}
      className="group inline-flex w-full max-w-xs items-center justify-between gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-base font-bold text-ink shadow-[0_12px_40px_-8px_rgba(123,102,255,0.75)] transition hover:shadow-[0_16px_50px_-8px_rgba(123,102,255,0.95)] sm:w-auto sm:max-w-none sm:justify-start">
      {children}
      <span className="grid size-10 place-items-center rounded-full bg-brand-600 text-white transition-transform group-hover:translate-x-0.5">
        <ArrowRightIcon className="size-4" />
      </span>
    </a>
  );
}

/** Frosted outline pill; the secondary action on dark purple. */
export function GlassPill({ href, children }: ButtonProps) {
  return (
    <a href={href}
      className="inline-flex h-14 w-full max-w-xs items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-7 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.12] sm:w-auto sm:max-w-none">
      {children}
    </a>
  );
}
