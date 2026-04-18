import type { Metadata } from "next";
import PosterPageLayout from "@/components/PosterPageLayout";
import { posterMeta, posterSkills, footerData } from "@/data/posterYear7";

export const metadata: Metadata = {
  title: "Number Structure – Year 7 | Solve It Maths",
};

export default function Year7PosterPage() {
  return <PosterPageLayout meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
