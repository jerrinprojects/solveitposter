import type { Metadata } from "next";
import AlgebraCombinedPage from "@/components/AlgebraCombinedPage";
import * as Y4 from "@/data/algebraYear4";
import * as Y5 from "@/data/algebraYear5";
import * as Y6 from "@/data/algebraYear6";

export const metadata: Metadata = {
  title: "Algebra – Phase 2 (Y4–6) | Solve It Maths",
};

export default function AlgebraPhase2Page() {
  return (
    <AlgebraCombinedPage
      years={[
        { meta: Y4.posterMeta, skills: Y4.posterSkills, pageSizes: Y4.pageSizes, footer: Y4.footerData },
        { meta: Y5.posterMeta, skills: Y5.posterSkills, pageSizes: Y5.pageSizes, footer: Y5.footerData },
        { meta: Y6.posterMeta, skills: Y6.posterSkills, pageSizes: Y6.pageSizes, footer: Y6.footerData },
      ]}
    />
  );
}
