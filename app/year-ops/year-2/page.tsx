import type { Metadata } from "next";
import YearOpsPosterPage from "@/components/YearOpsPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/yearOpsYear2";

export const metadata: Metadata = {
  title: "Year Operations – Year 2 | Solve It Maths",
};

export default function YearOpsYear2PosterPage() {
  return (
    <YearOpsPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
