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
  title: "Solve It Maths",
  description: "Solve It Maths – printable skill posters",
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
