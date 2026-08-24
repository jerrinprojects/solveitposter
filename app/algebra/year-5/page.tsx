import type { Metadata } from "next";
import AlgebraPosterPage from "@/components/AlgebraPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/algebraYear5";

export const metadata: Metadata = { title: "Algebra – Year 5 | Solve It Maths" };

export default function AlgebraYear5PosterPage() {
  return <AlgebraPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} pageSizes={pageSizes} />;
}
