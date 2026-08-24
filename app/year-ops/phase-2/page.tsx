import type { Metadata } from "next";
import YearOpsCombinedPage from "@/components/YearOpsCombinedPage";
import * as Y4 from "@/data/yearOpsYear4";
import * as Y5 from "@/data/yearOpsYear5";
import * as Y6 from "@/data/yearOpsYear6";

export const metadata: Metadata = {
  title: "Year Operations – Phase 2 (Y4–6) | Solve It Maths",
};

export default function YearOpsPhase2Page() {
  return (
    <YearOpsCombinedPage
      years={[
        { meta: Y4.posterMeta, skills: Y4.posterSkills, pageSizes: Y4.pageSizes, footer: Y4.footerData },
        { meta: Y5.posterMeta, skills: Y5.posterSkills, pageSizes: Y5.pageSizes, footer: Y5.footerData },
        { meta: Y6.posterMeta, skills: Y6.posterSkills, pageSizes: Y6.pageSizes, footer: Y6.footerData },
      ]}
    />
  );
}
