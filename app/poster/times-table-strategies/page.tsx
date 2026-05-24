import type { Metadata } from "next";
import { DoublingTriplingContent, CompleteChartContent } from "@/components/TimesTableStrategiesContent";
import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader,
} from "@/components/PosterFrame";

export const metadata: Metadata = {
  title: "Times Table Strategies | Solve It Maths",
};

const POSTER_W = 1063;
const POSTER_H = 741;

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="strategy-poster-page mx-auto my-4"
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

export default function TimesTableStrategiesPage() {
  return (
    <>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 7mm; }
          body { background-color: #fff3e6 !important; }
          .strategy-poster-page {
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
          .strategy-poster-page + .strategy-poster-page {
            break-before: page;
            page-break-before: always;
            margin-top: 0 !important;
          }
        }
      `}</style>

      <main style={{ background: "#fff3e6", minHeight: "100vh", paddingBottom: 48 }}>
        <BackToTopics />

        {/* ── Page 1: Doubling & Tripling ── */}
        <Page>
          <PosterHeader
            section="Solveitmaths · Times Tables"
            title={<>Times Table <CaveatAccent>Strategies</CaveatAccent></>}
            tagline={<>Double ×2 to get ×4 — <Highlight>double again for ×8</Highlight>. Double ×3 to get ×6.</>}
          />
          <div style={{ flex: 1 }}>
            <DoublingTriplingContent />
          </div>
          <PosterFooter rightLabel="Times Tables · Strategies · Year 0–8" />
        </Page>

        {/* ── Page 2: Complete Chart ×1–×9 ── */}
        <Page>
          <PosterHeader
            section="Solveitmaths · Times Tables"
            title={<>Times Tables <CaveatAccent>1–9</CaveatAccent></>}
            tagline={<>All facts from ×1 to ×9 — <Highlight>1×n through 10×n</Highlight> for each table.</>}
          />
          <div style={{ flex: 1 }}>
            <CompleteChartContent />
          </div>
          <PosterFooter rightLabel="Times Tables · Complete Chart · Year 0–8" />
        </Page>

        <PrintButton />
      </main>
    </>
  );
}
