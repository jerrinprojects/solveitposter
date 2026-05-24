import type { Metadata } from "next";
import NearSquares from "@/components/NearSquares";
import PrintButton from "@/components/PrintButton";
import {
  BackToTopics, CaveatAccent, Highlight,
  PosterFooter, PosterHeader, PosterPrintStyles, PosterShell,
} from "@/components/PosterFrame";

export const metadata: Metadata = {
  title: "Near Squares | Solve It Maths",
};

export default function NearSquaresPage() {
  return (
    <>
      <PosterPrintStyles orientation="landscape" />
      <main style={{ background: "#fff3e6", minHeight: "100vh" }}>
        <BackToTopics />
        <PosterShell className="poster-shell">
          <PosterHeader
            section="Solveitmaths · Times Tables"
            title={<>Near <CaveatAccent>Squares</CaveatAccent></>}
            tagline={<>Know a <Highlight>square number</Highlight>? You already know its neighbours — add or subtract one group.</>}
          />
          <NearSquares />
          <PosterFooter rightLabel="Times Tables · Year 0–8" />
        </PosterShell>
        <PrintButton />
      </main>
    </>
  );
}
