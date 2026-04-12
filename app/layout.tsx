import type { Metadata } from "next";
import { Nunito, Comfortaa } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Number Structure – Phase 1 | Solve It Maths",
  description: "Solve It Maths – Number Structure Phase 1 poster",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${comfortaa.variable} font-nunito`}>
        {children}
      </body>
    </html>
  );
}
