import type { Metadata } from "next";
import AlgebraPosterPage from "@/components/AlgebraPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/algebraYear4";

export const metadata: Metadata = { title: "Algebra – Year 4 | Solve It Maths" };

export default function AlgebraYear4PosterPage() {
  return <AlgebraPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} pageSizes={pageSizes} />;
}
