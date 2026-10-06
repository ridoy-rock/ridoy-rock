import { CalendarIcon, ChatIcon, MailIcon, PhoneIcon, PhoneOutgoingIcon, VideoIcon } from "./icons";

const CHANNELS = [
  { label: "Phone calls", Icon: PhoneIcon },
  { label: "24/7 website chat", Icon: ChatIcon },
  { label: "Google & Outlook calendar", Icon: CalendarIcon },
  { label: "Email", Icon: MailIcon },
  { label: "Meet & Teams links", Icon: VideoIcon },
  { label: "Outbound AI calls", Icon: PhoneOutgoingIcon },
];

export function Channels() {
  return (
    <section className="px-5 pb-14 sm:px-8 sm:pb-20">
      <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2.5">
        {CHANNELS.map(({ label, Icon }) => (
          <li key={label}
            className="inline-flex items-center gap-2.5 rounded-full border border-brand-100 bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-ink shadow-[0_1px_2px_rgba(24,24,26,0.04),0_8px_24px_-12px_rgba(103,61,230,0.25)]">
            <span className="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600">
              <Icon className="size-4" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
