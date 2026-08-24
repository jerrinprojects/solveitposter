import type { Metadata } from "next";
import RationalPosterPage from "@/components/RationalPosterPage";
import { posterMeta, posterSkills, footerData } from "@/data/rationalYear7";

export const metadata: Metadata = {
  title: "Rational Numbers – Year 7 | Solve It Maths",
};

export default function RationalYear7PosterPage() {
  return <RationalPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
