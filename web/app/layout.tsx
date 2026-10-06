import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Inter 4.1 from rsms.me/inter (SIL OFL): Inter Variable for text, Inter Display for titles.
const interVariable = localFont({
  src: "./fonts/InterVariable.woff2",
  weight: "100 900",
  variable: "--font-inter-variable",
  display: "swap",
});

const interDisplay = localFont({
  src: [
    { path: "./fonts/InterDisplay-Medium.woff2", weight: "500" },
    { path: "./fonts/InterDisplay-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-inter-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "H2M AI CRM: AI receptionist, 24/7 live chat and CRM for service businesses",
  description:
    "Your AI answers every call and website chat 24/7, qualifies leads, books appointments into your calendar and follows up. Built-in CRM with quotes, invoices and finance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interVariable.variable} ${interDisplay.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
