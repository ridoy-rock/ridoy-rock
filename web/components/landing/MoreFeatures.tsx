import {
  BarChartIcon, BellIcon, ClipboardIcon, DownloadIcon, GlobeIcon, MicIcon, PhoneOutgoingIcon, ShieldCheckIcon, UsersIcon,
} from "./icons";

const ITEMS = [
  { title: "Outbound AI calls", text: "The AI calls leads back from a list and books them (Pro, Growth and Enterprise).", Icon: PhoneOutgoingIcon },
  { title: "Talk to your AI", text: "Test calls from your browser before going live, free on every plan.", Icon: MicIcon },
  { title: "Instant team alerts", text: "Email alerts for new leads and urgent callers who want a person.", Icon: BellIcon },
  { title: "Team and permissions", text: "Invite your team, choose who sees money, leads or projects.", Icon: UsersIcon },
  { title: "Projects and tasks", text: "Turn won jobs into projects with tasks, progress and budgets.", Icon: ClipboardIcon },
  { title: "Local currencies", text: "USD, CAD, AUD, GBP and EUR pricing and billing.", Icon: GlobeIcon },
  { title: "Your data, always", text: "Export leads, clients, quotes, invoices and finance at any time.", Icon: DownloadIcon },
  { title: "Private and secure", text: "Each company's data is isolated. We never use it for advertising.", Icon: ShieldCheckIcon },
  { title: "Analytics", text: "From calls to won jobs: see what your AI brings in every month.", Icon: BarChartIcon },
];

export function MoreFeatures() {
  return (
    <section className="px-2 sm:px-3">
      <div className="rounded-[28px] bg-brand-50 px-5 py-20 sm:rounded-[40px] sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl">And much more</h2>
          <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {ITEMS.map(({ title, text, Icon }) => (
              <div key={title}
                className="group rounded-[24px] border border-brand-100 bg-white p-7 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_20px_50px_-24px_rgba(71,30,167,0.35)]">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold tracking-[-0.01em] text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
