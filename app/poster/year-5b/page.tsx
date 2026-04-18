import type { Metadata } from "next";
import PosterPageLayout from "@/components/PosterPageLayout";
import { posterMeta, posterSkills, footerData } from "@/data/posterYear5b";

export const metadata: Metadata = {
  title: "Number Structures – Year 5b | Solve It Maths",
};

export default function Year5bPosterPage() {
  return <PosterPageLayout meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
