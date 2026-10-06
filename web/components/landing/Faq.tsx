import { PlusIcon } from "./icons";

const FAQ = [
  {
    q: "Do I need a new phone number?",
    a: "No. Keep your number and forward calls to the AI number we set up for you, or use the new number directly.",
  },
  {
    q: "What if the AI cannot answer a question?",
    a: "It answers only from the business information you give it. When it does not know, it takes a message, creates a task and can transfer the caller to your team.",
  },
  {
    q: "Which calendars work?",
    a: "Google Calendar and Microsoft Outlook. The AI only offers times you are free and adds a Meet or Teams link when you want one.",
  },
  {
    q: "Can I use just the CRM?",
    a: "Yes. The CRM only plan is $49/month with leads, clients, quotes, invoices, tasks and finance, without the AI receptionist.",
  },
  {
    q: "What happens if I go over my minutes?",
    a: "Nothing stops. Extra minutes, chats and messages are billed at the low rates shown on the pricing page.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, at any time. You keep access for 14 days, and you can export all your data whenever you like.",
  },
];

export function Faq() {
  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl">Questions</h2>
        <div className="mt-12 space-y-3">
          {FAQ.map(({ q, a }) => (
            // Sharing a name makes the browser keep only one answer open at a time.
            <details key={q} name="faq"
              className="group rounded-[20px] border border-brand-100 bg-white px-5 py-4 transition-colors open:border-brand-200 open:bg-brand-50/60 sm:px-6 sm:py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold text-ink sm:text-lg [&::-webkit-details-marker]:hidden">
                {q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition duration-300 group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
                  <PlusIcon className="size-4" />
                </span>
              </summary>
              <p className="mt-3 pr-10 text-[15px] leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
