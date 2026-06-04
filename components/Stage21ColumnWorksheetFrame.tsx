import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader,
} from "@/components/PosterFrame";
import {
  buildStage21Pages, WorksheetVersion,
} from "@/components/MultiplicationInlineWorksheet";
import { Stage21ColumnPage } from "@/components/Stage21ColumnWorksheet";

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

export default function Stage21ColumnWorksheetFrame({ version }: { version: WorksheetVersion }) {
  // Column form uses 5×4 = 20 problems per page (taller cells need fewer per page).
  const { page1, page2 } = buildStage21Pages(version, 20);
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
        }
      `}</style>

      <main style={{ background: "#fff3e6", minHeight: "100vh", paddingBottom: 48 }}>
        <BackToTopics />

        <Page>
          <PosterHeader
            section={`Solveitmaths · Multiplication · ${versionLabel}`}
            title={<>Stage 2.1 <CaveatAccent>Column</CaveatAccent></>}
            tagline={<>Vertical column form — <Highlight>work each digit, no carrying</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <Stage21ColumnPage pageNumber={1} problems={page1} accent="pink" showAnswer={false} />
          </div>
          <PosterFooter rightLabel={`Multiplication · Stage 2.1 Column · ${versionLabel} · Page 1`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · Multiplication · ${versionLabel}`}
            title={<>Stage 2.1 <CaveatAccent>Column</CaveatAccent></>}
            tagline={<>Keep going — <Highlight>line up the place values</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <Stage21ColumnPage pageNumber={2} problems={page2} accent="mint" showAnswer={false} />
          </div>
          <PosterFooter rightLabel={`Multiplication · Stage 2.1 Column · ${versionLabel} · Page 2`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · Multiplication · ${versionLabel}`}
            title={<>Stage 2.1 <CaveatAccent>Answers</CaveatAccent></>}
            tagline={<>Column-form answer key for <Highlight>Page 1</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <Stage21ColumnPage pageNumber={1} problems={page1} accent="pink" showAnswer={true} />
          </div>
          <PosterFooter rightLabel={`Multiplication · Stage 2.1 Column · ${versionLabel} · Page 1 Answers`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · Multiplication · ${versionLabel}`}
            title={<>Stage 2.1 <CaveatAccent>Answers</CaveatAccent></>}
            tagline={<>Column-form answer key for <Highlight>Page 2</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <Stage21ColumnPage pageNumber={2} problems={page2} accent="mint" showAnswer={true} />
          </div>
          <PosterFooter rightLabel={`Multiplication · Stage 2.1 Column · ${versionLabel} · Page 2 Answers`} />
        </Page>

        <PrintButton />
      </main>
    </>
  );
}
