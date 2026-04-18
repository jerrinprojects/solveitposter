import type { Metadata } from "next";
import PosterPageLayout from "@/components/PosterPageLayout";
import { posterMeta, posterSkills, footerData } from "@/data/posterYear5a";

export const metadata: Metadata = {
  title: "Number Structure – Year 5a | Solve It Maths",
};

export default function Year5aPosterPage() {
  return <PosterPageLayout meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
