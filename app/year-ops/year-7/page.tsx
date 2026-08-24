import type { Metadata } from "next";
import YearOpsPosterPage from "@/components/YearOpsPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/yearOpsYear7";

export const metadata: Metadata = {
  title: "Year Operations – Year 7 | Solve It Maths",
};

export default function YearOpsYear7PosterPage() {
  return (
    <YearOpsPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
