import YearOpsYearSection from "@/components/YearOpsYearSection";
import PrintButton from "@/components/PrintButton";
import type { PosterSkill, PosterMeta, FooterData } from "@/types";

interface Props {
  meta: PosterMeta;
  skills: PosterSkill[];
  footer: FooterData;
  pageSizes?: number[];
}

export default function YearOpsPosterPage({ meta, skills, footer, pageSizes }: Props) {
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
      <YearOpsYearSection meta={meta} skills={skills} footer={footer} pageSizes={pageSizes} />
      <PrintButton />
    </main>
  );
}
