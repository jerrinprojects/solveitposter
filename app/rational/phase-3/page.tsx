import type { Metadata } from "next";
import RationalCombinedPage from "@/components/RationalCombinedPage";
import * as Y7 from "@/data/rationalYear7";
import * as Y8 from "@/data/rationalYear8";

export const metadata: Metadata = {
  title: "Rational Numbers – Phase 3 (Y7–8) | Solve It Maths",
};

export default function RationalPhase3Page() {
  return (
    <RationalCombinedPage
      years={[
        { meta: Y7.posterMeta, skills: Y7.posterSkills, footer: Y7.footerData },
        { meta: Y8.posterMeta, skills: Y8.posterSkills, pageSizes: Y8.pageSizes, footer: Y8.footerData },
      ]}
    />
  );
}
