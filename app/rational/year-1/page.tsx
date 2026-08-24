import type { Metadata } from "next";
import RationalPosterPage from "@/components/RationalPosterPage";
import { posterMeta, posterSkills, footerData } from "@/data/rationalYear1";

export const metadata: Metadata = {
  title: "Rational Numbers – Year 1 | Solve It Maths",
};

export default function RationalYear1PosterPage() {
  return <RationalPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
