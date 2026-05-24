import type { Metadata } from "next";
import TimesTableChart from "@/components/TimesTableChart";
import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader, PosterPrintStyles, PosterShell,
} from "@/components/PosterFrame";

export const metadata: Metadata = {
  title: "Times Tables Chart | Solve It Maths",
};

export default function TimesTablePage() {
  return (
    <>
      <PosterPrintStyles orientation="landscape" />
      <main style={{ background: "#fff3e6", minHeight: "100vh" }}>
        <BackToTopics />
        <PosterShell className="poster-shell">
          <PosterHeader
            section="Solveitmaths · Times Tables"
            title={<>Times Tables <CaveatAccent>Chart</CaveatAccent></>}
            tagline={<>Learn left → right in order. Each new table has <Highlight>fewer new facts</Highlight> to memorise!</>}
          />
          <div style={{ padding: "16px 20px 12px 20px" }}>
            <TimesTableChart />
          </div>
          <PosterFooter rightLabel="Times Tables · Year 0–8" />
        </PosterShell>
        <PrintButton />
      </main>
    </>
  );
}
