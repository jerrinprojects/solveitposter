import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";
import {
  Worksheet2x1, Worksheet2x2, Worksheet3x1, Worksheet3x2,
  WordProblems1, WordProblems2,
} from "@/components/MultiplicationWorksheets";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader,
} from "@/components/PosterFrame";

export const metadata: Metadata = {
  title: "Multiplication Worksheets | Solve It Maths",
};

const POSTER_W = 1063;
const POSTER_H = 741;

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="worksheet-page"
      style={{
        width: POSTER_W, height: POSTER_H, background: "#fffaf3",
        borderRadius: 28, overflow: "hidden",
        boxShadow: "0 8px 32px rgba(236, 64, 122, 0.10)",
        display: "flex", flexDirection: "column",
        margin: "16px auto",
      }}
    >
      {children}
    </div>
  );
}

export default function MultiplicationWorksheetsPage() {
  return (
    <>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 7mm; }
          body { background-color: #fff3e6 !important; }
          .worksheet-page {
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
          .worksheet-page + .worksheet-page {
            break-before: page;
            page-break-before: always;
            margin-top: 0 !important;
          }
        }
      `}</style>

      <main style={{ background: "#fff3e6", minHeight: "100vh", paddingBottom: 48 }}>
        <BackToTopics />

        {/* ── Page 1: 2-digit × 1-digit ── */}
        <Page>
          <PosterHeader
            section="Solveitmaths · Multiplication"
            title={<>Multiplication <CaveatAccent>Worksheets</CaveatAccent></>}
            tagline={<>Vertical column form — work each digit, <Highlight>carry over when needed</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <Worksheet2x1 />
          </div>
          <PosterFooter rightLabel="Multiplication · 2-digit × 1-digit · Year 4–6" />
        </Page>

        {/* ── Page 2: 2-digit × 2-digit ── */}
        <Page>
          <PosterHeader
            section="Solveitmaths · Multiplication"
            title={<>Multiplication <CaveatAccent>Worksheets</CaveatAccent></>}
            tagline={<>Two partial products — <Highlight>multiply by ones, then tens</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <Worksheet2x2 />
          </div>
          <PosterFooter rightLabel="Multiplication · 2-digit × 2-digit · Year 5–7" />
        </Page>

        {/* ── Page 3: 3-digit × 1-digit ── */}
        <Page>
          <PosterHeader
            section="Solveitmaths · Multiplication"
            title={<>Multiplication <CaveatAccent>Worksheets</CaveatAccent></>}
            tagline={<>Three-digit number, one-digit multiplier — <Highlight>right to left</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <Worksheet3x1 />
          </div>
          <PosterFooter rightLabel="Multiplication · 3-digit × 1-digit · Year 5–7" />
        </Page>

        {/* ── Page 4: 3-digit × 2-digit ── */}
        <Page>
          <PosterHeader
            section="Solveitmaths · Multiplication"
            title={<>Multiplication <CaveatAccent>Worksheets</CaveatAccent></>}
            tagline={<>Long multiplication — <Highlight>two partial products, then add</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <Worksheet3x2 />
          </div>
          <PosterFooter rightLabel="Multiplication · 3-digit × 2-digit · Year 6–8" />
        </Page>

        {/* ── Page 5: Word Problems 1 ── */}
        <Page>
          <PosterHeader
            section="Solveitmaths · Multiplication"
            title={<>Multiplication <CaveatAccent>Word Problems</CaveatAccent></>}
            tagline={<>Read the problem carefully, <Highlight>show your working</Highlight>, write your answer.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <WordProblems1 />
          </div>
          <PosterFooter rightLabel="Multiplication · Word Problems · Page 1" />
        </Page>

        {/* ── Page 6: Word Problems 2 ── */}
        <Page>
          <PosterHeader
            section="Solveitmaths · Multiplication"
            title={<>Multiplication <CaveatAccent>Word Problems</CaveatAccent></>}
            tagline={<>A bit more thinking — <Highlight>set it up and solve step by step</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <WordProblems2 />
          </div>
          <PosterFooter rightLabel="Multiplication · Word Problems · Page 2" />
        </Page>

        <PrintButton />
      </main>
    </>
  );
}
