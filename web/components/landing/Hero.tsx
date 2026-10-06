import { AppWindow } from "./AppWindow";
import { GlassPill, PrimaryPill } from "./Buttons";
import { CalendarIcon, ChatIcon, CheckCircleIcon, PhoneIcon, SparkleIcon } from "./icons";
import { VoiceWaves } from "./VoiceWaves";
import { appLink } from "@/lib/paths";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-40">
      {/* Dark purple panel; it stops partway down the screenshot so the app "rises" out of it. */}
      <div id="hero-backdrop" aria-hidden="true"
        className="absolute inset-x-2 top-2 -z-10 h-[calc(100%-7rem)] overflow-hidden rounded-[28px] bg-[#160d36] sm:inset-x-3 sm:top-3 sm:h-[calc(100%-15rem)] sm:rounded-[40px] lg:h-[calc(100%-21rem)]">
        {/* Hostinger-style light: deep violet ground, glows in the corners, and a soft diagonal beam. */}
        <div className="absolute inset-0 bg-[radial-gradient(42%_36%_at_100%_0%,rgba(86,50,192,0.95),transparent_70%),radial-gradient(45%_40%_at_10%_30%,rgba(60,30,140,0.9),transparent_70%),radial-gradient(65%_28%_at_70%_100%,rgba(63,34,139,0.85),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(195deg,transparent_26%,rgba(64,33,149,0.35)_36%,rgba(84,52,182,0.65)_46%,rgba(118,92,230,0.88)_55%,rgba(130,110,238,0.92)_60%,rgba(112,86,224,0.85)_66%,rgba(80,48,176,0.6)_75%,rgba(64,33,149,0.3)_84%,transparent_93%)] [mask-image:linear-gradient(90deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.75)_45%,#000_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(48%_32%_at_76%_68%,rgba(140,122,244,0.55),transparent_70%)]" />
        <VoiceWaves id="hero-waves" className="absolute inset-x-0 bottom-0 h-[30%] w-full opacity-90 sm:h-[50%]" />
      </div>

      <div className="mx-auto max-w-6xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] py-1.5 pl-1.5 pr-4 text-xs font-medium text-brand-100 backdrop-blur-md motion-safe:animate-fade-up sm:text-sm">
          <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white">
            <SparkleIcon className="size-3.5" />
          </span>
          AI phone receptionist + 24/7 live web chat + CRM
        </span>

        <h1 className="mx-auto mt-7 max-w-5xl font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.032em] text-white motion-safe:animate-fade-up sm:text-6xl lg:text-[72px] lg:leading-[1.02]" style={delay(80)}>
          Never miss a lead again.{" "}
          <span className="bg-gradient-to-r from-brand-200 via-brand-300 to-brand-400 bg-clip-text text-transparent">
            Your AI answers every call and chat, books the job and follows up.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 motion-safe:animate-fade-up sm:text-xl" style={delay(160)}>
          H2M AI CRM gives service businesses in the USA and Canada an AI receptionist that works 24/7, plus a complete CRM with quotes, invoices and finance.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 motion-safe:animate-fade-up sm:flex-row" style={delay(240)}>
          <PrimaryPill href={appLink("/login")}>Start free for 30 days</PrimaryPill>
          <GlassPill href={appLink("/pricing")}>See pricing</GlassPill>
        </div>

        <p className="mt-5 text-sm text-white/60 motion-safe:animate-fade-up" style={delay(300)}>
          <CheckCircleIcon className="mr-1.5 inline-block size-4 align-[-3px] text-brand-300" />
          No card needed for the free plan. Sign in with Google or email.
        </p>

        {/* App preview */}
        <div className="relative mx-auto mt-14 max-w-5xl motion-safe:animate-fade-up sm:mt-20" style={delay(380)}>
          <div aria-hidden="true" className="absolute -inset-x-16 -top-16 bottom-1/3 -z-10 rounded-full bg-brand-500/40 blur-3xl" />

          <FloatingChip className="-left-20 top-[16%] motion-safe:animate-float"><PhoneIcon className="size-5" /></FloatingChip>
          <FloatingChip className="-right-20 top-[34%] motion-safe:animate-float [animation-delay:1.2s]"><ChatIcon className="size-5" /></FloatingChip>
          <FloatingChip className="-left-16 top-[46%] motion-safe:animate-float [animation-delay:2.4s]"><CalendarIcon className="size-5" /></FloatingChip>

          <div className="rounded-[20px] bg-white/10 p-1.5 shadow-[0_30px_80px_-30px_rgba(17,12,41,0.45)] ring-1 ring-white/20 backdrop-blur-md sm:rounded-[28px] sm:p-2.5">
            <AppWindow src="/landing/calls.jpg" alt="Inbound calls answered by the AI with summaries" priority
              className="rounded-[15px] sm:rounded-[20px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div aria-hidden="true"
      className={`absolute z-10 hidden size-14 place-items-center rounded-2xl border border-white/30 bg-white/80 text-brand-600 shadow-[0_18px_40px_-12px_rgba(71,30,167,0.55)] backdrop-blur-md xl:grid ${className}`}>
      {children}
    </div>
  );
}
