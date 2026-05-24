import type { Metadata } from "next";
import TimesTablePatterns from "@/components/TimesTablePatterns";
import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader, PosterPrintStyles, PosterShell,
} from "@/components/PosterFrame";

export const metadata: Metadata = {
  title: "Times Table Patterns | Solve It Maths",
};

export default function TimesTablePatternsPage() {
  return (
    <>
      <PosterPrintStyles orientation="landscape" />
      <main style={{ background: "#fff3e6", minHeight: "100vh" }}>
        <BackToTopics />
        <PosterShell className="poster-shell">
          <PosterHeader
            section="Solveitmaths · Times Tables"
            title={<>Times Table <CaveatAccent>Patterns</CaveatAccent></>}
            tagline={<>Spot the patterns → <Highlight>fewer facts to memorise</Highlight>. Use strategies to work out facts you forget.</>}
          />
          <TimesTablePatterns />
          <PosterFooter rightLabel="Times Tables · Year 0–8" />
        </PosterShell>
        <PrintButton />
      </main>
    </>
  );
}
