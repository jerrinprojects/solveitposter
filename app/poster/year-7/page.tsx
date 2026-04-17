import PosterPageLayout from "@/components/PosterPageLayout";
import { posterMeta, posterSkills, footerData } from "@/data/posterYear7";

export default function Year7PosterPage() {
  return <PosterPageLayout meta={posterMeta} skills={posterSkills} footer={footerData} />;
}
