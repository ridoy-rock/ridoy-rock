import { GlassPill, PrimaryPill } from "./Buttons";
import { VoiceWaves } from "./VoiceWaves";

export function FinalCta() {
  return (
    <section className="px-2 sm:px-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-brand-950 px-5 py-20 text-center text-white sm:rounded-[40px] sm:px-8 sm:py-28">
        <div aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_0%,#7b66ff_0%,#673de6_30%,transparent_72%),radial-gradient(45%_60%_at_0%_100%,rgba(71,30,167,0.7),transparent_70%),linear-gradient(180deg,#1f1346_0%,#110c29_100%)]" />
        <VoiceWaves id="cta-waves" className="absolute inset-x-0 bottom-0 -z-10 h-[22%] w-full opacity-80" />

        <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold tracking-[-0.035em] text-balance sm:text-6xl">
          Let your AI answer the next call
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
          Set up in minutes, test it from your browser, and go live when you are ready.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryPill href="/login">Start free</PrimaryPill>
          <GlassPill href="/pricing#contact">Talk to us</GlassPill>
        </div>
      </div>
    </section>
  );
}
