import AlgebraYearSection from "@/components/AlgebraYearSection";
import PrintButton from "@/components/PrintButton";
import type { PosterMeta, PosterSkill, FooterData } from "@/types";

interface YearBundle {
  meta: PosterMeta;
  skills: PosterSkill[];
  pageSizes?: number[];
  footer: FooterData;
}

interface Props { years: YearBundle[]; }

/* Combined Algebra poster (phase-1/2/3) — renders each year's section
 * back-to-back on a single route. Each year keeps its own header so a
 * printed pack stays clearly labelled. */
export default function AlgebraCombinedPage({ years }: Props) {
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
        <AlgebraYearSection
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
