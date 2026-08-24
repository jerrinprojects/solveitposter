import type { Metadata } from "next";
import RationalPosterPage from "@/components/RationalPosterPage";
import { posterMeta, posterSkills, footerData } from "@/data/rationalYear5";

export const metadata: Metadata = {
  title: "Rational Numbers – Year 5 | Solve It Maths",
};

export default function RationalYear5PosterPage() {
  return <RationalPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
