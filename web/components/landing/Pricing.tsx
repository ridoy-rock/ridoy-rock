import { ArrowRightIcon, ChatIcon, ClockIcon, UsersIcon } from "./icons";
import { appLink } from "@/lib/paths";

type Plan = { name: string; price: string; period: string; text: string; items: [string, string, string]; popular?: boolean };

const PLANS: Plan[] = [
  { name: "Free", price: "0", period: " for 30 days", text: "Try the AI receptionist and the CRM for 30 days.", items: ["10 AI call minutes", "200 chats", "1 user"] },
  { name: "CRM only", price: "49", period: "/month", text: "Just the CRM: clients, quotes, invoices, tasks and finance, without the AI.", items: ["No AI calls", "No AI chat", "Up to 3 users"] },
  { name: "Starter", price: "150", period: "/month", text: "A single location getting started with an AI receptionist.", items: ["150 AI call minutes", "1,200 chats", "Up to 3 users"] },
  { name: "Pro", price: "290", period: "/month", text: "Growing teams that want more minutes and hands-on onboarding.", items: ["300 AI call minutes", "2,500 chats", "Up to 5 users"], popular: true },
  { name: "Growth", price: "490", period: "/month", text: "Busy service businesses that also call leads back.", items: ["600 AI call minutes", "5,000 chats", "Up to 10 users"] },
];

// Minutes, chats, users: the same three rows on every plan.
const ROW_ICONS = [ClockIcon, ChatIcon, UsersIcon];

export function Pricing() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">Simple monthly plans</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Start free for 30 days. Upgrade when the AI is bringing you work. Prices in USD; local prices on the pricing page.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {PLANS.map((plan) => (
            <div key={plan.name}
              className={`relative isolate flex flex-col rounded-[24px] p-6 ${plan.popular
                ? "bg-brand-950 text-white shadow-[0_30px_70px_-28px_rgba(71,30,167,0.9)] ring-1 ring-brand-500/50"
                : "border border-brand-100 bg-white text-ink"}`}>
              {plan.popular && (
                <>
                  <div aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-[24px] bg-[radial-gradient(90%_60%_at_50%_0%,rgba(123,102,255,0.55),transparent_70%)]" />
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-[0_8px_20px_-6px_rgba(103,61,230,0.8)]">
                    Most popular
                  </span>
                </>
              )}
              <h3 className="font-display text-lg font-medium">{plan.name}</h3>
              <div className="mt-4">
                <span className="font-display text-4xl font-semibold tracking-[-0.03em]">{"$" + plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-white/60" : "text-muted"}`}>{plan.period}</span>
              </div>
              <p className={`mt-3 flex-1 text-sm leading-relaxed ${plan.popular ? "text-white/70" : "text-muted"}`}>{plan.text}</p>
              <ul className={`mt-6 space-y-2.5 border-t pt-5 text-sm ${plan.popular ? "border-white/10" : "border-brand-100"}`}>
                {plan.items.map((item, i) => {
                  const Icon = ROW_ICONS[i];
                  return (
                    <li key={item} className="flex items-center gap-2.5">
                      <Icon className={`size-4 shrink-0 ${plan.popular ? "text-brand-300" : "text-brand-600"}`} />
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={appLink("/pricing")} className="group inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700">
            Compare all plans and Enterprise
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
