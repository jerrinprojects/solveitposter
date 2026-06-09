import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader,
} from "@/components/PosterFrame";
import {
  GridShapeProblemPage, buildGridShapeProblems, WorksheetVersion,
} from "@/components/GridShapeWorksheet";
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

export default function GridShapeFrame({
  level, version,
}: {
  level: LengthLevelSpec; version: WorksheetVersion;
}) {
  const pool = level.pool();
  const all = buildGridShapeProblems(pool, version, PER_PAGE * 2);
  const page1 = all.slice(0, PER_PAGE);
  const page2 = all.slice(PER_PAGE, PER_PAGE * 2);
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

        <Page>
          <PosterHeader
            section={`Solveitmaths · Length · Counting Squares · ${versionLabel}`}
            title={<>{level.fullId} <CaveatAccent>Counting Squares</CaveatAccent></>}
            tagline={<><Highlight>{level.shortTitle}</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <GridShapeProblemPage
              pageNumber={1} problems={page1} accent="pink" showAnswer={false}
              levelFullId={level.fullId} cols={COLS} rows={ROWS}
            />
          </div>
          <PosterFooter rightLabel={`Length · ${level.fullId} · ${versionLabel} · Page 1`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · Length · Counting Squares · ${versionLabel}`}
            title={<>{level.fullId} <CaveatAccent>Counting Squares</CaveatAccent></>}
            tagline={<>Keep going — <Highlight>more shapes</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <GridShapeProblemPage
              pageNumber={2} problems={page2} accent="mint" showAnswer={false}
              levelFullId={level.fullId} cols={COLS} rows={ROWS}
            />
          </div>
          <PosterFooter rightLabel={`Length · ${level.fullId} · ${versionLabel} · Page 2`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · Length · Counting Squares · ${versionLabel}`}
            title={<>{level.fullId} <CaveatAccent>Answers</CaveatAccent></>}
            tagline={<>Answer key for <Highlight>Page 1</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <GridShapeProblemPage
              pageNumber={1} problems={page1} accent="pink" showAnswer={true}
              levelFullId={level.fullId} cols={COLS} rows={ROWS}
            />
          </div>
          <PosterFooter rightLabel={`Length · ${level.fullId} · ${versionLabel} · Page 1 Answers`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · Length · Counting Squares · ${versionLabel}`}
            title={<>{level.fullId} <CaveatAccent>Answers</CaveatAccent></>}
            tagline={<>Answer key for <Highlight>Page 2</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <GridShapeProblemPage
              pageNumber={2} problems={page2} accent="mint" showAnswer={true}
              levelFullId={level.fullId} cols={COLS} rows={ROWS}
            />
          </div>
          <PosterFooter rightLabel={`Length · ${level.fullId} · ${versionLabel} · Page 2 Answers`} />
        </Page>

        <PrintButton />
      </main>
    </>
  );
}
