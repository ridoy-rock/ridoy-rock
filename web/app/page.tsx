import { Channels } from "@/components/landing/Channels";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Stats } from "@/components/landing/Stats";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-24">
        <Hero />
        <Channels />
        <Stats />
        <HowItWorks />
      </main>
    </>
  );
}
