import type { Metadata } from "next";
import { Nunito, Comfortaa, Poppins, Montserrat, Caveat } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

// Brand-aligned typography (matches Solveit Maths app — playful & friendly)
const poppins = Poppins({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
});
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
});
const caveat = Caveat({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-hand",
});

export const metadata: Metadata = {
  title: "Solve It Maths",
  description: "Solve It Maths – printable skill posters",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${comfortaa.variable} ${poppins.variable} ${montserrat.variable} ${caveat.variable} font-nunito`}
      >
        {children}
      </body>
    </html>
  );
}
