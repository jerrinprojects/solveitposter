import type { Metadata } from "next";
import PosterPageLayout from "@/components/PosterPageLayout";
import { posterMeta, posterSkills, footerData } from "@/data/posterYear2";

export const metadata: Metadata = {
  title: "Number Structure – Year 2 | Solve It Maths",
};

export default function Year2PosterPage() {
  return <PosterPageLayout meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
