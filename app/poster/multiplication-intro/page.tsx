import type { Metadata } from "next";
import { WhatIsMultiplicationContent, RepeatedAdditionContent } from "@/components/MultiplicationIntroContent";
import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader,
} from "@/components/PosterFrame";

export const metadata: Metadata = {
  title: "What is Multiplication? | Solve It Maths",
};

const POSTER_W = 1063;
const POSTER_H = 741;

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="multintro-page mx-auto my-4"
      style={{
        width: POSTER_W, height: POSTER_H, background: "#fffaf3",
        borderRadius: 28, overflow: "hidden",
        boxShadow: "0 8px 32px rgba(236, 64, 122, 0.10)",
        display: "flex", flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

export default function MultiplicationIntroPage() {
  return (
    <>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 7mm; }
          body { background-color: #fff3e6 !important; }
          .multintro-page {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            height: 196mm !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .multintro-page + .multintro-page {
            break-before: page;
            page-break-before: always;
            margin-top: 0 !important;
          }
        }
      `}</style>

      <main style={{ background: "#fff3e6", minHeight: "100vh", paddingBottom: 48 }}>
        <BackToTopics />

        {/* ── Page 1: What is Multiplication? ── */}
        <Page>
          <PosterHeader
            section="Solveitmaths · Multiplication"
            title={<>What is <CaveatAccent>Multiplication</CaveatAccent>?</>}
            tagline={<>Three ways to see the same idea — <Highlight>4 × 3 = 4 groups of 3 = 12</Highlight></>}
          />
          <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <WhatIsMultiplicationContent />
          </div>
          <PosterFooter rightLabel="Multiplication · Introduction · Year 0–8" />
        </Page>

        {/* ── Page 2: Repeated Addition ── */}
        <Page>
          <PosterHeader
            section="Solveitmaths · Multiplication"
            title={<>Repeated <CaveatAccent>Addition</CaveatAccent></>}
            tagline={<>Multiplication is just <Highlight>adding equal groups</Highlight> over and over again</>}
          />
          <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
            <RepeatedAdditionContent />
          </div>
          <PosterFooter rightLabel="Multiplication · Repeated Addition · Year 0–8" />
        </Page>

        <PrintButton />
      </main>
    </>
  );
}
