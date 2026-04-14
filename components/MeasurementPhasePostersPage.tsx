import type { PosterMeta, PosterSkill, FooterData } from "@/types";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import PrintButton from "./PrintButton";
import MeasurementSectionBlock from "./MeasurementSectionBlock";
import Link from "next/link";

interface YearSection {
  meta: PosterMeta;
  skills: PosterSkill[];
}

interface MeasurementPhasePostersPageProps {
  years: YearSection[];
  footerData: FooterData;
  SectionBlock?: React.ComponentType<{ skill: PosterSkill }>;
}

export default function MeasurementPhasePostersPage({ years, footerData, SectionBlock = MeasurementSectionBlock }: MeasurementPhasePostersPageProps) {
  return (
    <main className="bg-pink-100">
      {/* Screen-only back link */}
      <div className="no-print max-w-4xl mx-auto px-6 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-700 transition-colors"
        >
          <span>←</span> Back to Topics
        </Link>
      </div>

      {years.map((year, idx) => (
        <div key={idx} className="poster-page max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
          <PageHeader meta={year.meta} />
          <div className="space-y-3 print:space-y-2 mt-3">
            {year.skills.map((skill) => (
              <SectionBlock key={skill.code} skill={skill} />
            ))}
          </div>
          <PageFooter data={footerData} />
        </div>
      ))}

      <PrintButton />
    </main>
  );
}
