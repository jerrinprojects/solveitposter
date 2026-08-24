import type { Metadata } from "next";
import AlgebraPosterPage from "@/components/AlgebraPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/algebraYear1";

export const metadata: Metadata = {
  title: "Algebra – Year 1 | Solve It Maths",
};

export default function AlgebraYear1PosterPage() {
  return (
    <AlgebraPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
