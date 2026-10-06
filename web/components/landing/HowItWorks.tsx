import { FileTextIcon, InboxIcon, MicIcon } from "./icons";
import { VoiceWaves } from "./VoiceWaves";

const STEPS = [
  {
    title: "Tell the AI about your business",
    text: "Paste your services, prices, hours and FAQs. Pick your booking hours and connect Google Calendar or Outlook.",
    Icon: FileTextIcon,
  },
  {
    title: "Test it, then go live",
    text: "Talk to your AI from the browser before customers do. Then forward your business number and add the chat widget to your website.",
    Icon: MicIcon,
  },
  {
    title: "Leads land in your CRM",
    text: "Every call and chat becomes a lead with a summary, transcript and next step. Appointments appear in your calendar automatically.",
    Icon: InboxIcon,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 px-2 sm:px-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-brand-950 px-5 py-20 text-white sm:rounded-[40px] sm:px-8 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(55%_55%_at_50%_0%,rgba(103,61,230,0.55),transparent_70%),radial-gradient(40%_50%_at_100%_100%,rgba(123,102,255,0.3),transparent_70%),linear-gradient(180deg,#160f36_0%,#110c29_100%)]" />
        <VoiceWaves id="how-waves" className="absolute inset-x-0 bottom-0 -z-10 h-56 w-full opacity-40" />

        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Live in an afternoon</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-white/65">
            No technical skills needed. We help you set up on Pro, Growth and Enterprise.
          </p>

          <ol className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-3">
            {STEPS.map(({ title, text, Icon }, i) => (
              <li key={title}
                className="relative rounded-[24px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07]">
                <div className="flex items-center justify-between">
                  <span className="relative grid size-11 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-base font-bold shadow-[0_0_0_6px_rgba(123,102,255,0.15),0_10px_30px_-6px_rgba(123,102,255,0.8)]">
                    {i + 1}
                  </span>
                  <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-brand-300">
                    <Icon className="size-5" />
                  </span>
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
