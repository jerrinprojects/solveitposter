import type { Metadata } from "next";
import RationalPosterPage from "@/components/RationalPosterPage";
import { posterMeta, posterSkills, footerData } from "@/data/rationalYear2";

export const metadata: Metadata = {
  title: "Rational Numbers – Year 2 | Solve It Maths",
};

export default function RationalYear2PosterPage() {
  return <RationalPosterPage meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
