import { AppWindow } from "./AppWindow";
import { BarChartIcon, CalendarIcon, ChatIcon, CheckIcon, FileTextIcon, PhoneIcon, SparkleIcon, UsersIcon } from "./icons";

type Feature = {
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  Icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactNode;
  image?: string;
};

const FEATURES: Feature[] = [
  {
    eyebrow: "AI receptionist",
    title: "Every call answered, summarised and qualified",
    text: "Your AI answers in your business name day and night, asks the right questions and hands you a clean summary. No more voicemail, no more missed jobs.",
    points: ["Recording, transcript and AI summary for every call", "Qualifies leads and flags urgent callers", "Transfers to a person when the caller asks"],
    Icon: PhoneIcon,
  },
  {
    eyebrow: "24/7 live web chat",
    title: "Live chat on your website that books the job",
    text: "The same AI answers website visitors instantly, captures their details and offers real open times from your calendar. SMS, email and chat conversations live in one inbox.",
    points: ["Visitors pick a time that is actually free", "Unified inbox for chat, SMS and email", "Your team can jump in at any time"],
    Icon: ChatIcon,
    image: "/landing/messages.jpg",
  },
  {
    eyebrow: "Booking",
    title: "Appointments go straight into your calendar",
    text: "Bookings sync with Google Calendar or Outlook, customers get a confirmation with a video meeting link, and reschedules and cancellations update everywhere.",
    points: ["Google Meet or Microsoft Teams link added automatically", "Confirmation and reminder emails to customers", "Calendar and list views for the whole team"],
    Icon: CalendarIcon,
    image: "/landing/appointments.jpg",
  },
  {
    eyebrow: "Dedicated CRM",
    title: "Leads, clients and follow-ups in one place",
    text: "Each company gets its own CRM. Track every lead from first call to won job, assign it to a team member and never forget a follow-up.",
    points: ["Lead status, source, budget and timeline", "Tasks and automatic follow-up emails", "Team roles and per-module permissions"],
    Icon: UsersIcon,
    image: "/landing/leads.jpg",
  },
  {
    eyebrow: "Quotes & invoices",
    title: "Send quotes customers can accept online",
    text: "Build quotes and invoices with your logo, taxes and discounts. Customers accept online, then you turn the quote into a project and an invoice.",
    points: ["Branded quotes and invoices, printable or saved as PDF", "Online acceptance and payment tracking", "Automatic follow-up emails for open quotes, overdue invoices flagged"],
    Icon: FileTextIcon,
    image: "/landing/quotes.jpg",
  },
  {
    eyebrow: "Finance",
    title: "Know what you earned, spent and are owed",
    text: "Payments, expenses and profit by month and by project, with a clear view of money owed to you and what is overdue. Export everything to CSV.",
    points: ["Profit and loss by month", "Expenses by category and project", "One-click CSV export of your data"],
    Icon: BarChartIcon,
    image: "/landing/finance.jpg",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-balance text-ink sm:text-5xl">
            Everything a service business needs, in one app
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            From the first ring to the paid invoice. Real screens from the app, shown with demo data.
          </p>
        </div>

        <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={i % 2 ? "lg:order-2" : ""}>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 py-1 pl-1 pr-3 text-xs font-semibold uppercase tracking-[0.08em] text-brand-700 ring-1 ring-brand-100">
                  <span className="grid size-6 place-items-center rounded-full bg-brand-600 text-white">
                    <f.Icon className="size-3.5" />
                  </span>
                  {f.eyebrow}
                </span>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-balance text-ink sm:text-4xl">{f.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{f.text}</p>
                <ul className="mt-7 space-y-3">
                  {f.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                        <CheckIcon className="size-3" strokeWidth={3} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={i % 2 ? "lg:order-1" : ""}>
                <Stage>
                  {f.image ? (
                    <AppWindow src={f.image} alt={f.title}
                      className="rounded-[14px] shadow-[0_24px_60px_-24px_rgba(51,28,116,0.45)]" />
                  ) : (
                    <CallCard />
                  )}
                </Stage>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Soft purple panel the product visuals sit on. */
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-50 via-brand-100/70 to-brand-200/60 p-4 ring-1 ring-brand-100 sm:p-8">
      <div aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(103,61,230,0.18)_1px,transparent_1px)] bg-[size:18px_18px] [mask-image:radial-gradient(80%_70%_at_50%_40%,#000,transparent)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_100%_0%,rgba(157,153,255,0.45),transparent_70%)]" />
      {children}
    </div>
  );
}

// Heights for the decorative call-recording waveform (fixed so the server and client render the same).
const RECORDING = [6, 10, 16, 9, 20, 14, 24, 12, 18, 8, 22, 15, 10, 26, 18, 12, 20, 9, 14, 22, 11, 17, 8, 19, 13, 24, 10, 16, 7, 12, 18, 9, 14, 6];

function CallCard() {
  return (
    <div className="mx-auto max-w-lg rounded-[20px] bg-white p-5 shadow-[0_24px_60px_-24px_rgba(51,28,116,0.45)] ring-1 ring-black/5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <PhoneIcon className="size-5" />
          </span>
          <div>
            <div className="font-semibold text-ink">Sarah Miller</div>
            <div className="text-xs text-muted">Inbound call · 2:41 · answered by AI</div>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700">Appointment Booked</span>
      </div>

      <div aria-hidden="true" className="mt-5 flex h-7 items-center gap-[3px]">
        {RECORDING.map((h, i) => (
          <span key={i} className={`w-[3px] flex-none rounded-full ${i < 22 ? "bg-brand-500" : "bg-brand-200"}`} style={{ height: h }} />
        ))}
      </div>

      <div className="mt-5 space-y-2.5">
        <div className="flex">
          <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-brand-50 px-4 py-2.5 text-sm text-ink">
            Thanks for calling Brightline Home Services, this is Ava. How can I help today?
          </p>
        </div>
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-tr-md bg-brand-600 px-4 py-2.5 text-sm text-white">
            Hi, my roof started leaking after the storm last night.
          </p>
        </div>
        <div className="flex">
          <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-brand-50 px-4 py-2.5 text-sm text-ink">
            {"I'm sorry to hear that. I can book an inspection. Would Tuesday at 10 AM or Wednesday at 2 PM work?"}
          </p>
        </div>
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-tr-md bg-brand-600 px-4 py-2.5 text-sm text-white">Tuesday at 10 is perfect.</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
          <SparkleIcon className="size-3.5" />
          AI summary
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/80">
          {"Roof leak after last night's storm. Qualified lead. Inspection booked for Tuesday 10:00 AM and added to the calendar. Confirmation email sent."}
        </p>
      </div>
    </div>
  );
}
