import { ClockIcon, GiftIcon, LayersIcon } from "./icons";

const STATS = [
  { value: "24/7", label: "Calls and chats answered, nights and weekends included", Icon: ClockIcon },
  { value: "30 days", label: "Free to try the AI receptionist and the CRM, no card needed", Icon: GiftIcon },
  { value: "1 place", label: "Calls, chats, bookings, quotes, invoices and finance", Icon: LayersIcon },
];

export function Stats() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto grid max-w-6xl divide-y divide-brand-100 overflow-hidden rounded-[28px] border border-brand-100 bg-gradient-to-b from-brand-50 to-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map(({ value, label, Icon }) => (
          <div key={value} className="p-7 sm:p-10">
            <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_24px_-8px_rgba(103,61,230,0.6)]">
              <Icon className="size-5" />
            </span>
            <div className="mt-7 bg-gradient-to-br from-brand-600 to-brand-800 bg-clip-text text-5xl font-extrabold tracking-[-0.035em] text-transparent sm:text-[56px] sm:leading-none">
              {value}
            </div>
            <p className="mt-3 max-w-[19rem] text-[15px] leading-relaxed text-muted">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
