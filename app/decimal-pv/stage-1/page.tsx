import type { Metadata } from "next";
import DecimalPvPosterPage from "@/components/DecimalPvPosterPage";
import { posterMeta, posterSkills, footerData, pageSizes } from "@/data/decimalPvStage1";

export const metadata: Metadata = {
  title: "Decimal Place Value – Stage 1 (Tenths) | Solve It Maths",
};

export default function DecimalPvStage1PosterPage() {
  return (
    <DecimalPvPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
