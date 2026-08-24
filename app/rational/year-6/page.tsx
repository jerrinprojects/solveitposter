import type { Metadata } from "next";
import RationalPosterPage from "@/components/RationalPosterPage";
import { posterMeta, posterSkills, footerData } from "@/data/rationalYear6";

export const metadata: Metadata = {
  title: "Rational Numbers – Year 6 | Solve It Maths",
};

export default function RationalYear6PosterPage() {
  return <RationalPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
