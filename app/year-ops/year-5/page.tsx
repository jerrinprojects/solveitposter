import type { Metadata } from "next";
import YearOpsPosterPage from "@/components/YearOpsPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/yearOpsYear5";

export const metadata: Metadata = {
  title: "Year Operations – Year 5 | Solve It Maths",
};

export default function YearOpsYear5PosterPage() {
  return (
    <YearOpsPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
