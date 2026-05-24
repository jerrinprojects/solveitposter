import type { Metadata } from "next";
import TrickyTwelve from "@/components/TrickyTwelve";
import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader, PosterPrintStyles, PosterShell,
} from "@/components/PosterFrame";

export const metadata: Metadata = {
  title: "The Tricky 12 | Solve It Maths",
};

export default function TrickyTwelvePage() {
  return (
    <>
      <PosterPrintStyles orientation="landscape" />
      <style>{`
        @media print {
          .poster-shell {
            height: 196mm !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
        }
      `}</style>
      <main style={{ background: "#fff3e6", minHeight: "100vh" }}>
        <BackToTopics />
        <PosterShell className="poster-shell">
          <PosterHeader
            section="Solveitmaths · Times Tables"
            title={<>The <CaveatAccent>Tricky</CaveatAccent> Twelve</>}
            tagline={<>The 12 facts students find hardest — <Highlight>each with a memory trick!</Highlight></>}
          />
          <TrickyTwelve />
          <PosterFooter rightLabel="Times Tables · Year 0–8" />
        </PosterShell>
        <PrintButton />
      </main>
    </>
  );
}
