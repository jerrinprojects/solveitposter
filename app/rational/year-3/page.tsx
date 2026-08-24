import type { Metadata } from "next";
import RationalPosterPage from "@/components/RationalPosterPage";
import { posterMeta, posterSkills, footerData } from "@/data/rationalYear3";

export const metadata: Metadata = {
  title: "Rational Numbers – Year 3 | Solve It Maths",
};

export default function RationalYear3PosterPage() {
  return <RationalPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
