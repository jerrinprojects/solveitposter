import type { Metadata } from "next";
import YearOpsCombinedPage from "@/components/YearOpsCombinedPage";
import * as Y0 from "@/data/yearOpsYear0";
import * as Y1 from "@/data/yearOpsYear1";
import * as Y2 from "@/data/yearOpsYear2";
import * as Y3 from "@/data/yearOpsYear3";

export const metadata: Metadata = {
  title: "Year Operations – Phase 1 (Y0–3) | Solve It Maths",
};

export default function YearOpsPhase1Page() {
  return (
    <YearOpsCombinedPage
      years={[
        { meta: Y0.posterMeta, skills: Y0.posterSkills, pageSizes: Y0.pageSizes, footer: Y0.footerData },
        { meta: Y1.posterMeta, skills: Y1.posterSkills, pageSizes: Y1.pageSizes, footer: Y1.footerData },
        { meta: Y2.posterMeta, skills: Y2.posterSkills, pageSizes: Y2.pageSizes, footer: Y2.footerData },
        { meta: Y3.posterMeta, skills: Y3.posterSkills, pageSizes: Y3.pageSizes, footer: Y3.footerData },
      ]}
    />
  );
}
