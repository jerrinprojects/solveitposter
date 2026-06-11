import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader,
} from "@/components/PosterFrame";
import { LengthWordProblemPage } from "@/components/LengthWordWorksheet";
import { buildCompositeWordProblems } from "@/data/lengthLevels";
import type { CompositeShapeLevelSpec } from "@/data/lengthLevels";
import type { WorksheetVersion } from "@/components/ShapeWorksheet";

const POSTER_W = 1063;
const POSTER_H = 741;
const PER_PAGE = 6;
const TOTAL = PER_PAGE * 4;

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

const PAGE_ACCENTS = ["pink", "mint", "sunny", "grape"] as const;

function poolFilterByVersion<T extends { outerW: number; outerH: number }>(
  pool: T[], v: WorksheetVersion,
): T[] {
  if (v === 1) return pool.filter((p) => Math.max(p.outerW, p.outerH) <= 10);
  if (v === 2) return pool.filter((p) => {
    const mx = Math.max(p.outerW, p.outerH);
    return mx >= 8 && mx <= 14;
  });
  return pool.filter((p) => Math.max(p.outerW, p.outerH) >= 11);
}

export default function CompositeWordFrame({
  level, version,
}: {
  level: CompositeShapeLevelSpec; version: WorksheetVersion;
}) {
  const fullPool = level.pool();
  const filtered = poolFilterByVersion(fullPool, version);
  const pool = filtered.length > 0 ? filtered : fullPool;
  const all = buildCompositeWordProblems(pool, version, TOTAL);
  const pages = [
    all.slice(0, PER_PAGE),
    all.slice(PER_PAGE, PER_PAGE * 2),
    all.slice(PER_PAGE * 2, PER_PAGE * 3),
    all.slice(PER_PAGE * 3, PER_PAGE * 4),
  ];

  const versionLabel = `V${version}`;

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
          main {
            min-height: 0 !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>

      <main style={{ background: "#fff3e6", minHeight: "100vh", paddingBottom: 48 }}>
        <BackToTopics />

        {pages.map((problems, idx) => {
          const pageNumber = (idx + 1) as 1 | 2 | 3 | 4;
          const accent = PAGE_ACCENTS[idx];
          return (
            <Page key={`q${pageNumber}`}>
              <PosterHeader
                section={`Solveitmaths · Length · Composite Area · ${versionLabel}`}
                title={<>{level.fullId} <CaveatAccent>Word Problems</CaveatAccent></>}
                tagline={<>Read carefully — <Highlight>split the L-shape and find the total area</Highlight>.</>}
              />
              <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                <LengthWordProblemPage
                  pageNumber={pageNumber} problems={problems}
                  accent={accent} showAnswer={false}
                  levelFullId={level.fullId}
                />
              </div>
              <PosterFooter rightLabel={`Length · ${level.fullId} Word · ${versionLabel} · Page ${pageNumber}`} />
            </Page>
          );
        })}

        {pages.map((problems, idx) => {
          const pageNumber = (idx + 1) as 1 | 2 | 3 | 4;
          const accent = PAGE_ACCENTS[idx];
          return (
            <Page key={`a${pageNumber}`}>
              <PosterHeader
                section={`Solveitmaths · Length · Composite Area · ${versionLabel}`}
                title={<>{level.fullId} <CaveatAccent>Answers</CaveatAccent></>}
                tagline={<>Word-problem answer key for <Highlight>Page {pageNumber}</Highlight>.</>}
              />
              <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                <LengthWordProblemPage
                  pageNumber={pageNumber} problems={problems}
                  accent={accent} showAnswer={true}
                  levelFullId={level.fullId}
                />
              </div>
              <PosterFooter rightLabel={`Length · ${level.fullId} Word · ${versionLabel} · Page ${pageNumber} Answers`} />
            </Page>
          );
        })}

        <PrintButton />
      </main>
    </>
  );
}
