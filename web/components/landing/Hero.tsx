import { ArrowRightIcon, CalendarIcon, ChatIcon, CheckCircleIcon, LockIcon, PhoneIcon, SparkleIcon } from "./icons";
import { VoiceWaves } from "./VoiceWaves";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-40">
      {/* Dark purple panel; it stops partway down the screenshot so the app "rises" out of it. */}
      <div id="hero-backdrop" aria-hidden="true"
        className="absolute inset-x-2 top-2 -z-10 h-[calc(100%-7rem)] overflow-hidden rounded-[28px] bg-brand-950 sm:inset-x-3 sm:top-3 sm:h-[calc(100%-15rem)] sm:rounded-[40px] lg:h-[calc(100%-21rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_-5%,#7b66ff_0%,#673de6_28%,transparent_70%),radial-gradient(45%_45%_at_95%_35%,rgba(123,102,255,0.35),transparent_70%),radial-gradient(45%_50%_at_0%_70%,rgba(71,30,167,0.7),transparent_70%),linear-gradient(180deg,#1f1346_0%,#110c29_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_30%,#000_20%,transparent_80%)]" />
        <VoiceWaves id="hero-waves" className="absolute inset-x-0 bottom-0 h-[30%] w-full opacity-90 sm:h-[50%]" />
      </div>

      <div className="mx-auto max-w-6xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] py-1.5 pl-1.5 pr-4 text-xs font-medium text-brand-100 backdrop-blur-md motion-safe:animate-fade-up sm:text-sm">
          <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white">
            <SparkleIcon className="size-3.5" />
          </span>
          AI phone receptionist + 24/7 live web chat + CRM
        </span>

        <h1 className="mx-auto mt-7 max-w-5xl text-[40px] font-extrabold leading-[1.04] tracking-[-0.032em] text-white motion-safe:animate-fade-up sm:text-6xl lg:text-[72px] lg:leading-[1.02]" style={delay(80)}>
          Never miss a lead again.{" "}
          <span className="bg-gradient-to-r from-brand-200 via-brand-300 to-brand-400 bg-clip-text text-transparent">
            Your AI answers every call and chat, books the job and follows up.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 motion-safe:animate-fade-up sm:text-xl" style={delay(160)}>
          H2M AI CRM gives service businesses in the USA and Canada an AI receptionist that works 24/7, plus a complete CRM with quotes, invoices and finance.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 motion-safe:animate-fade-up sm:flex-row" style={delay(240)}>
          <a href="/login"
            className="group inline-flex w-full max-w-xs items-center justify-between gap-3 rounded-full sm:w-auto sm:max-w-none sm:justify-start bg-white py-2 pl-7 pr-2 text-base font-bold text-ink shadow-[0_12px_40px_-8px_rgba(123,102,255,0.75)] transition hover:shadow-[0_16px_50px_-8px_rgba(123,102,255,0.95)]">
            Start free for 30 days
            <span className="grid size-10 place-items-center rounded-full bg-brand-600 text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRightIcon className="size-4" />
            </span>
          </a>
          <a href="/pricing"
            className="inline-flex h-14 w-full max-w-xs items-center justify-center rounded-full border sm:w-auto sm:max-w-none border-white/20 bg-white/[0.06] px-7 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.12]">
            See pricing
          </a>
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
            <div className="overflow-hidden rounded-[15px] bg-white ring-1 ring-black/5 sm:rounded-[20px]">
              <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#fbfbfe] px-3 py-2.5 sm:px-4 sm:py-3">
                <span className="size-2.5 rounded-full bg-[#ff5f57] sm:size-3" />
                <span className="size-2.5 rounded-full bg-[#febc2e] sm:size-3" />
                <span className="size-2.5 rounded-full bg-[#28c840] sm:size-3" />
                <span className="mx-auto inline-flex items-center gap-1.5 truncate rounded-full bg-brand-50 px-3 py-1 text-[11px] font-medium text-muted sm:px-4 sm:text-xs">
                  <LockIcon className="size-3 text-brand-600" />
                  app.h2m.marketing
                </span>
                <span className="w-[38px] sm:w-[46px]" />
              </div>
              <img src="/landing/calls.jpg" alt="Inbound calls answered by the AI with summaries"
                width={1600} height={1000} fetchPriority="high" className="block h-auto w-[165%] max-w-none sm:w-full sm:max-w-full" />
            </div>
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
