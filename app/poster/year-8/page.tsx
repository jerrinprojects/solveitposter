import PosterPageLayout from "@/components/PosterPageLayout";
import { posterMeta, posterSkills, footerData } from "@/data/posterYear8";

export default function Year8PosterPage() {
  return <PosterPageLayout meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
