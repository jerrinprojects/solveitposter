import type { Metadata } from "next";
import RationalCombinedPage from "@/components/RationalCombinedPage";
import * as Y4 from "@/data/rationalYear4";
import * as Y5 from "@/data/rationalYear5";
import * as Y6 from "@/data/rationalYear6";

export const metadata: Metadata = {
  title: "Rational Numbers – Phase 2 (Y4–6) | Solve It Maths",
};

export default function RationalPhase2Page() {
  return (
    <RationalCombinedPage
      years={[
        { meta: Y4.posterMeta, skills: Y4.posterSkills, footer: Y4.footerData },
        { meta: Y5.posterMeta, skills: Y5.posterSkills, footer: Y5.footerData },
        { meta: Y6.posterMeta, skills: Y6.posterSkills, footer: Y6.footerData },
      ]}
    />
  );
}
