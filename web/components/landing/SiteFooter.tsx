import { CalendarIcon } from "./icons";

const LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "mailto:hellotomarketing99@gmail.com", label: "Contact" },
];

/** Calendar-access note and the page footer. */
export function SiteFooter() {
  return (
    <>
      <section className="px-5 pb-12 pt-16 sm:px-8 sm:pt-20">
        <div className="mx-auto flex max-w-6xl gap-4 rounded-[24px] border border-brand-100 bg-brand-50/50 p-6 sm:gap-5 sm:p-7">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-600 ring-1 ring-brand-100">
            <CalendarIcon className="size-5" />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-base font-bold text-ink">Calendar access</h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
              When a business connects Google Calendar or Outlook, H2M AI CRM reads only free/busy times and creates, updates or removes the appointment events it books. It does not read other events or use calendar data for advertising or AI training. See our{" "}
              <a href="/privacy" className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-brand-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <img src="/brand/h2m-mark.svg" alt="" aria-hidden="true" width={28} height={28} className="size-7" />
            <span>© H2M AI CRM</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-brand-700">{l.label}</a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
