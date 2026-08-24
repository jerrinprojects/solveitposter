import type { Metadata } from "next";
import DecimalPvPosterPage from "@/components/DecimalPvPosterPage";
import { posterMeta, posterSkills, footerData, pageSizes } from "@/data/decimalPvStage3";

export const metadata: Metadata = {
  title: "Decimal Place Value – Stage 3 | Solve It Maths",
};

export default function DecimalPvStage3PosterPage() {
  return (
    <DecimalPvPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
