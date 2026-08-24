import type { Metadata } from "next";
import AlgebraPosterPage from "@/components/AlgebraPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/algebraYear0";

export const metadata: Metadata = {
  title: "Algebra – Year 0 | Solve It Maths",
};

export default function AlgebraYear0PosterPage() {
  return (
    <AlgebraPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
