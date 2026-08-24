import type { Metadata } from "next";
import AlgebraPosterPage from "@/components/AlgebraPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/algebraYear2";

export const metadata: Metadata = {
  title: "Algebra – Year 2 | Solve It Maths",
};

export default function AlgebraYear2PosterPage() {
  return (
    <AlgebraPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
