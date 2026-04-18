import type { Metadata } from "next";
import PosterPageLayout from "@/components/PosterPageLayout";
import { posterMeta, posterSkills, footerData } from "@/data/posterYear0b";

export const metadata: Metadata = {
  title: "Number Structure – Year 0b | Solve It Maths",
};

export default function Year0bPosterPage() {
  return <PosterPageLayout meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
