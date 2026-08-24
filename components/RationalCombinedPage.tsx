import RationalYearSection from "@/components/RationalYearSection";
import PrintButton from "@/components/PrintButton";
import type { PosterMeta, PosterSkill, FooterData } from "@/types";

interface YearBundle {
  meta: PosterMeta;
  skills: PosterSkill[];
  pageSizes?: number[];
  footer: FooterData;
}

interface Props {
  years: YearBundle[];
}

/* Combined Rational Numbers poster (phase-1/2/3) — renders each year's
 * own section back-to-back so the printed pack stays clearly labelled. */
export default function RationalCombinedPage({ years }: Props) {
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
        <RationalYearSection
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
