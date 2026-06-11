import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader,
} from "@/components/PosterFrame";
import {
  ShapeProblemPage, buildShapeProblems, WorksheetVersion,
} from "@/components/ShapeWorksheet";
import { filterByVersion } from "@/data/lengthLevels";
import type { LengthLevelSpec } from "@/data/lengthLevels";

const POSTER_W = 1063;
const POSTER_H = 741;
const COLS = 5;
const ROWS = 3;
const PER_PAGE = COLS * ROWS;

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

export default function ShapeWorksheetFrame({
  level, version,
}: {
  level: LengthLevelSpec; version: WorksheetVersion;
}) {
  const fullPool = level.pool();
  const filtered = filterByVersion(fullPool, version);
  // Fallback to full pool if version filter yields an empty list (shouldn't
  // happen for Y4 but keeps things robust as more years are added).
  const pool = filtered.length > 0 ? filtered : fullPool;
  const allProblems = buildShapeProblems(pool, version, PER_PAGE * 2);
  const page1 = allProblems.slice(0, PER_PAGE);
  const page2 = allProblems.slice(PER_PAGE, PER_PAGE * 2);

  // Every problem in a Y4 level shares the same operation (perimeter or
  // area), so reading it from the first problem is safe.
  const operation = (pool[0]?.operation ?? "perimeter") as "perimeter" | "area";
  const operationLabel = operation === "perimeter" ? "Perimeter" : "Area";
  const versionLabel = `V${version}`;
  // For Y7.1 / Y7.3 the formula itself is the focus of the lesson — push
  // it into the hero subtitle instead of the generic "Add all sides…" text.
  const heroSubtitle =
    level.id === "year-7-1" ? "Use the formula P = 2 × (length + width)."
    : level.id === "year-7-3" ? "Use the formula A = length × width."
    : undefined;

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

        <Page>
          <PosterHeader
            section={`Solveitmaths · Length · ${operationLabel} · ${versionLabel}`}
            title={<>{level.fullId} <CaveatAccent>Worksheet</CaveatAccent></>}
            tagline={<><Highlight>{level.shortTitle}</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <ShapeProblemPage
              pageNumber={1} problems={page1} accent="pink" showAnswer={false}
              levelFullId={level.fullId} instructionHint={level.diagramTagline}
              operation={operation} cols={COLS} rows={ROWS} heroSubtitle={heroSubtitle}
            />
          </div>
          <PosterFooter rightLabel={`Length · ${level.fullId} · ${versionLabel} · Page 1`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · Length · ${operationLabel} · ${versionLabel}`}
            title={<>{level.fullId} <CaveatAccent>Worksheet</CaveatAccent></>}
            tagline={<>Keep going — <Highlight>more shapes</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <ShapeProblemPage
              pageNumber={2} problems={page2} accent="mint" showAnswer={false}
              levelFullId={level.fullId} instructionHint={level.diagramTagline}
              operation={operation} cols={COLS} rows={ROWS} heroSubtitle={heroSubtitle}
            />
          </div>
          <PosterFooter rightLabel={`Length · ${level.fullId} · ${versionLabel} · Page 2`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · Length · ${operationLabel} · ${versionLabel}`}
            title={<>{level.fullId} <CaveatAccent>Answers</CaveatAccent></>}
            tagline={<>Answer key for <Highlight>Page 1</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <ShapeProblemPage
              pageNumber={1} problems={page1} accent="pink" showAnswer={true}
              levelFullId={level.fullId} instructionHint={level.diagramTagline}
              operation={operation} cols={COLS} rows={ROWS} heroSubtitle={heroSubtitle}
            />
          </div>
          <PosterFooter rightLabel={`Length · ${level.fullId} · ${versionLabel} · Page 1 Answers`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · Length · ${operationLabel} · ${versionLabel}`}
            title={<>{level.fullId} <CaveatAccent>Answers</CaveatAccent></>}
            tagline={<>Answer key for <Highlight>Page 2</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <ShapeProblemPage
              pageNumber={2} problems={page2} accent="mint" showAnswer={true}
              levelFullId={level.fullId} instructionHint={level.diagramTagline}
              operation={operation} cols={COLS} rows={ROWS} heroSubtitle={heroSubtitle}
            />
          </div>
          <PosterFooter rightLabel={`Length · ${level.fullId} · ${versionLabel} · Page 2 Answers`} />
        </Page>

        <PrintButton />
      </main>
    </>
  );
}
