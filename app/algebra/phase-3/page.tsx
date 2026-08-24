import type { Metadata } from "next";
import AlgebraCombinedPage from "@/components/AlgebraCombinedPage";
import * as Y7 from "@/data/algebraYear7";
import * as Y8 from "@/data/algebraYear8";

export const metadata: Metadata = {
  title: "Algebra – Phase 3 (Y7–8) | Solve It Maths",
};

export default function AlgebraPhase3Page() {
  return (
    <AlgebraCombinedPage
      years={[
        { meta: Y7.posterMeta, skills: Y7.posterSkills, pageSizes: Y7.pageSizes, footer: Y7.footerData },
        { meta: Y8.posterMeta, skills: Y8.posterSkills, pageSizes: Y8.pageSizes, footer: Y8.footerData },
      ]}
    />
  );
}
