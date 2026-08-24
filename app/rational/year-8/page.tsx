import type { Metadata } from "next";
import RationalPosterPage from "@/components/RationalPosterPage";
import { posterMeta, posterSkills, footerData, pageSizes } from "@/data/rationalYear8";

export const metadata: Metadata = {
  title: "Rational Numbers – Year 8 | Solve It Maths",
};

export default function RationalYear8PosterPage() {
  return (
    <RationalPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
