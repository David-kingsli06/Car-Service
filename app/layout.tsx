import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APEX ATELIER — Bespoke Automotive Detailing & Ceramic Protection",
  description: "Experience the pinnacle of automotive surface perfection. Contactless snow foam decontamination, sub-micron paint correction, and 10H ceramic shield.",
  keywords: ["car detailing", "ceramic coating", "paint protection film", "PPF", "luxury auto care", "mercedes detailing"]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth antialiased bg-[#050608] text-neutral-100"
    >
      <body className="min-h-screen bg-[#050608] text-neutral-100 font-sans selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
