import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter's optical-size axis switches to its tighter "Display" design at large sizes.
const inter = Inter({ subsets: ["latin"], axes: ["opsz"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "H2M AI CRM: AI receptionist, 24/7 live chat and CRM for service businesses",
  description:
    "Your AI answers every call and website chat 24/7, qualifies leads, books appointments into your calendar and follows up. Built-in CRM with quotes, invoices and finance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
