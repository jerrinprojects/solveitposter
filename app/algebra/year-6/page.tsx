import type { Metadata } from "next";
import AlgebraPosterPage from "@/components/AlgebraPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/algebraYear6";

export const metadata: Metadata = { title: "Algebra – Year 6 | Solve It Maths" };

export default function AlgebraYear6PosterPage() {
  return <AlgebraPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} pageSizes={pageSizes} />;
}
