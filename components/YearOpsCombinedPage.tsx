import YearOpsYearSection from "@/components/YearOpsYearSection";
import PrintButton from "@/components/PrintButton";
import type { PosterMeta, PosterSkill, FooterData } from "@/types";

interface YearBundle {
  meta: PosterMeta;
  skills: PosterSkill[];
  pageSizes: number[];
  footer: FooterData;
}

interface Props {
  years: YearBundle[];
}

/* Renders multiple year sections back-to-back on a single route — used
 * by /year-ops/phase-1, phase-2, phase-3 combined posters. Each year
 * keeps its own page header (Year 0/1/2/3...), so the printed pack
 * stays clearly labelled even when teachers print all years at once. */
export default function YearOpsCombinedPage({ years }: Props) {
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
      {years.map((y) => (
        <YearOpsYearSection
          key={y.meta.year}
          meta={y.meta}
          skills={y.skills}
          footer={y.footer}
          pageSizes={y.pageSizes}
        />
      ))}
      <PrintButton />
    </main>
  );
}
