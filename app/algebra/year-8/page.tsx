import type { Metadata } from "next";
import AlgebraPosterPage from "@/components/AlgebraPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/algebraYear8";

export const metadata: Metadata = { title: "Algebra – Year 8 | Solve It Maths" };

export default function AlgebraYear8PosterPage() {
  return <AlgebraPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} pageSizes={pageSizes} />;
}
