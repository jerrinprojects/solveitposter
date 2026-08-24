import type { Metadata } from "next";
import YearOpsCombinedPage from "@/components/YearOpsCombinedPage";
import * as Y7 from "@/data/yearOpsYear7";
import * as Y8 from "@/data/yearOpsYear8";

export const metadata: Metadata = {
  title: "Year Operations – Phase 3 (Y7–8) | Solve It Maths",
};

export default function YearOpsPhase3Page() {
  return (
    <YearOpsCombinedPage
      years={[
        { meta: Y7.posterMeta, skills: Y7.posterSkills, pageSizes: Y7.pageSizes, footer: Y7.footerData },
        { meta: Y8.posterMeta, skills: Y8.posterSkills, pageSizes: Y8.pageSizes, footer: Y8.footerData },
      ]}
    />
  );
}
