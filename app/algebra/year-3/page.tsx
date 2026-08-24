import type { Metadata } from "next";
import AlgebraPosterPage from "@/components/AlgebraPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/algebraYear3";

export const metadata: Metadata = {
  title: "Algebra – Year 3 | Solve It Maths",
};

export default function AlgebraYear3PosterPage() {
  return (
    <AlgebraPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
