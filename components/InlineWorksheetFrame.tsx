import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader,
} from "@/components/PosterFrame";
import {
  InlineProblemPage, buildPages, WorksheetVersion,
} from "@/components/MultiplicationInlineWorksheet";
import type { MultiplicationStageSpec } from "@/data/multiplicationStages";

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

export default function InlineWorksheetFrame({
  stage, version,
}: {
  stage: MultiplicationStageSpec; version: WorksheetVersion;
}) {
  const cols = stage.inlineCols ?? 5;
  const rows = stage.inlineRows ?? 5;
  const perPage = cols * rows;
  const { page1, page2 } = buildPages(stage.pool(), version, perPage);
  const versionLabel = `V${version}`;
  const hint = stage.inlineTagline;
  const operation = stage.operation ?? "Multiplication";

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
            section={`Solveitmaths · ${operation} · ${versionLabel}`}
            title={<>Stage {stage.fullId} <CaveatAccent>Worksheet</CaveatAccent></>}
            tagline={<><Highlight>{stage.shortTitle}</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <InlineProblemPage
              pageNumber={1} problems={page1} accent="pink" showAnswer={false}
              stageFullId={stage.fullId} instructionHint={hint}
              cols={cols} rows={rows}
            />
          </div>
          <PosterFooter rightLabel={`${operation} · Stage ${stage.fullId} · ${versionLabel} · Page 1`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · ${operation} · ${versionLabel}`}
            title={<>Stage {stage.fullId} <CaveatAccent>Worksheet</CaveatAccent></>}
            tagline={<>Keep going — <Highlight>same idea, more practice</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <InlineProblemPage
              pageNumber={2} problems={page2} accent="mint" showAnswer={false}
              stageFullId={stage.fullId} instructionHint={hint}
              cols={cols} rows={rows}
            />
          </div>
          <PosterFooter rightLabel={`${operation} · Stage ${stage.fullId} · ${versionLabel} · Page 2`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · ${operation} · ${versionLabel}`}
            title={<>Stage {stage.fullId} <CaveatAccent>Answers</CaveatAccent></>}
            tagline={<>Answer key for <Highlight>Page 1</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <InlineProblemPage
              pageNumber={1} problems={page1} accent="pink" showAnswer={true}
              stageFullId={stage.fullId} instructionHint={hint}
              cols={cols} rows={rows}
            />
          </div>
          <PosterFooter rightLabel={`${operation} · Stage ${stage.fullId} · ${versionLabel} · Page 1 Answers`} />
        </Page>

        <Page>
          <PosterHeader
            section={`Solveitmaths · ${operation} · ${versionLabel}`}
            title={<>Stage {stage.fullId} <CaveatAccent>Answers</CaveatAccent></>}
            tagline={<>Answer key for <Highlight>Page 2</Highlight>.</>}
          />
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            <InlineProblemPage
              pageNumber={2} problems={page2} accent="mint" showAnswer={true}
              stageFullId={stage.fullId} instructionHint={hint}
              cols={cols} rows={rows}
            />
          </div>
          <PosterFooter rightLabel={`${operation} · Stage ${stage.fullId} · ${versionLabel} · Page 2 Answers`} />
        </Page>

        <PrintButton />
      </main>
    </>
  );
}
