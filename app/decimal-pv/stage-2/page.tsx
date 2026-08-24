import type { Metadata } from "next";
import DecimalPvPosterPage from "@/components/DecimalPvPosterPage";
import { posterMeta, posterSkills, footerData, pageSizes } from "@/data/decimalPvStage2";

export const metadata: Metadata = {
  title: "Decimal Place Value – Stage 2 | Solve It Maths",
};

export default function DecimalPvStage2PosterPage() {
  return (
    <DecimalPvPosterPage
      meta={posterMeta}
      skills={posterSkills}
      footer={footerData}
      pageSizes={pageSizes}
    />
  );
}
