import type { Metadata } from "next";
import RationalPosterPage from "@/components/RationalPosterPage";
import { posterMeta, posterSkills, footerData } from "@/data/rationalYear4";

export const metadata: Metadata = {
  title: "Rational Numbers – Year 4 | Solve It Maths",
};

export default function RationalYear4PosterPage() {
  return <RationalPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
