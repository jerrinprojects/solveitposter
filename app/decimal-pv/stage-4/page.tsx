import type { Metadata } from "next";
import DecimalPvPosterPage from "@/components/DecimalPvPosterPage";
import { posterMeta, posterSkills, footerData, pageSizes } from "@/data/decimalPvStage4";

export const metadata: Metadata = {
  title: "Decimal Place Value – Stage 4 | Solve It Maths",
};

export default function DecimalPvStage4PosterPage() {
  return (
    <DecimalPvPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
