import type { Metadata } from "next";
import TimesTablePyramid from "@/components/TimesTablePyramid";
import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader, PosterPrintStyles, PosterShell,
} from "@/components/PosterFrame";

export const metadata: Metadata = {
  title: "Times Table Pyramid | Solve It Maths",
};

export default function TimesTablePyramidPage() {
  return (
    <>
      <PosterPrintStyles orientation="portrait" />
      <main style={{ background: "#fff3e6", minHeight: "100vh" }}>
        <BackToTopics />
        <PosterShell width={760} className="poster-shell">
          <PosterHeader
            compact
            section="Solveitmaths · Times Tables"
            title={<>Times Table <CaveatAccent size={38}>Pyramid</CaveatAccent></>}
            tagline={<>Each triangle = one fact — <Highlight>top ÷ corner = other corner</Highlight></>}
          />
          <div style={{ padding: "14px 20px 12px 20px" }}>
            <TimesTablePyramid />
          </div>
          <PosterFooter rightLabel="Times Tables · Year 0–8" />
        </PosterShell>
        <PrintButton />
      </main>
    </>
  );
}
