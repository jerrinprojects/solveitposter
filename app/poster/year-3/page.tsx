import type { Metadata } from "next";
import PosterPageLayout from "@/components/PosterPageLayout";
import { posterMeta, posterSkills, footerData } from "@/data/posterYear3";

export const metadata: Metadata = {
  title: "Number Structure – Year 3 | Solve It Maths",
};

export default function Year3PosterPage() {
  return <PosterPageLayout meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
