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

/** Dark panel that fades into purple, with glass cards (Hostinger's "More power" layout). */
export function MoreFeatures() {
  return (
    <section className="px-2 sm:px-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0e0a22] px-5 py-20 text-white sm:rounded-[40px] sm:px-8 sm:py-28">
        <div aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_45%_at_60%_100%,rgba(103,61,230,0.85),transparent_75%),radial-gradient(45%_35%_at_100%_80%,rgba(123,102,255,0.45),transparent_70%),linear-gradient(180deg,#0e0a22_0%,#160f36_40%,#2a1670_75%,#3f22a6_100%)]" />

        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">And much more</h2>
          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map(({ title, text, Icon }) => (
              <div key={title}
                className="flex flex-col rounded-[20px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 ring-1 ring-white/[0.07] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:from-white/[0.12] hover:to-white/[0.04] hover:ring-white/15 sm:min-h-[220px]">
                <Icon className="size-6 text-brand-400" />
                <h3 className="mt-8 font-display text-xl font-medium tracking-[-0.01em]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
