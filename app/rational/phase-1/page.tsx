import type { Metadata } from "next";
import RationalCombinedPage from "@/components/RationalCombinedPage";
import * as Y1 from "@/data/rationalYear1";
import * as Y2 from "@/data/rationalYear2";
import * as Y3 from "@/data/rationalYear3";

export const metadata: Metadata = {
  title: "Rational Numbers – Phase 1 (Y1–3) | Solve It Maths",
};

export default function RationalPhase1Page() {
  return (
    <RationalCombinedPage
      years={[
        { meta: Y1.posterMeta, skills: Y1.posterSkills, footer: Y1.footerData },
        { meta: Y2.posterMeta, skills: Y2.posterSkills, footer: Y2.footerData },
        { meta: Y3.posterMeta, skills: Y3.posterSkills, footer: Y3.footerData },
      ]}
    />
  );
}
