import PosterYearSection from "@/components/PosterYearSection";
import PrintButton from "@/components/PrintButton";
import type { PosterSkill, PosterMeta, FooterData } from "@/types";

interface Props {
  meta: PosterMeta;
  skills: PosterSkill[];
  footer: FooterData;
}

export default function PosterPageLayout({ meta, skills, footer }: Props) {
  return (
    <main className="bg-pink-100">
      <div className="no-print max-w-4xl mx-auto px-6 pt-4">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-700 transition-colors"
        >
          <span>←</span> Back to Topics
        </a>
      </div>
      <PosterYearSection meta={meta} skills={skills} footer={footer} />
      <PrintButton />
    </main>
  );
}
