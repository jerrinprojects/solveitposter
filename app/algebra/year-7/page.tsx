import type { Metadata } from "next";
import AlgebraPosterPage from "@/components/AlgebraPosterPage";
import { posterMeta, posterSkills, pageSizes, footerData } from "@/data/algebraYear7";

export const metadata: Metadata = { title: "Algebra – Year 7 | Solve It Maths" };

export default function AlgebraYear7PosterPage() {
  return <AlgebraPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} pageSizes={pageSizes} />;
}
