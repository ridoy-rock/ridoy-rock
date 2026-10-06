"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRightIcon, BarChartIcon, BellIcon, ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, DownloadIcon, GlobeIcon, MicIcon,
  PhoneOutgoingIcon, ShieldCheckIcon, UsersIcon,
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

// Left inset that lines the first card up with the page's 72rem content column.
const INSET = "pl-[max(1.25rem,calc((100%-72rem)/2))] pr-5 [scroll-padding-left:max(1.25rem,calc((100%-72rem)/2))] sm:pl-[max(2rem,calc((100%-72rem)/2))] sm:pr-8 sm:[scroll-padding-left:max(2rem,calc((100%-72rem)/2))]";

/** Card slider on a purple panel that darkens towards the top (after Hostinger's "More power when you need it"). */
export function MoreFeatures() {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (el && card) el.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };

  return (
    <section className="px-2 sm:px-3" data-carousel>
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#4c24bc] py-20 text-white sm:rounded-[40px] sm:py-28">
        <div aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_62%_at_50%_0%,#0b0620_0%,rgba(11,6,32,0.92)_35%,rgba(11,6,32,0.45)_65%,transparent_92%),radial-gradient(55%_35%_at_50%_100%,rgba(112,76,220,0.85),transparent_75%)]" />

        <div className="px-5 sm:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
            <h2 className="font-display text-[32px] font-normal leading-[1.2] tracking-[-0.01em] text-[#f8f9fa] sm:text-4xl sm:leading-[44px]">
              And much more
            </h2>
            <div className="hidden shrink-0 gap-2 sm:flex">
              <button type="button" aria-label="Previous" data-carousel-prev disabled={atStart} onClick={() => step(-1)}
                className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-default disabled:text-white/35 disabled:hover:bg-white/10">
                <ChevronLeftIcon className="size-5" />
              </button>
              <button type="button" aria-label="Next" data-carousel-next disabled={atEnd} onClick={() => step(1)}
                className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-default disabled:text-white/35 disabled:hover:bg-white/10">
                <ChevronRightIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <ul ref={track} data-carousel-track
          className={`mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${INSET}`}>
          {ITEMS.map(({ title, text, Icon }) => (
            <li key={title} className="w-[264px] shrink-0 snap-start sm:w-[296px]">
              <div className="flex h-[300px] flex-col rounded-2xl bg-black/50 p-6 sm:h-[324px]">
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center text-brand-500"><Icon className="size-6" /></span>
                  <span className="grid size-10 place-items-center text-white"><ArrowUpRightIcon className="size-5" /></span>
                </div>
                <h3 className="mt-4 font-display text-lg leading-[26px] font-normal tracking-[-0.005em] text-[#f8f9fa]">{title}</h3>
                <p className="mt-2 text-sm leading-5 text-white/75">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
