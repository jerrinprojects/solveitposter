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

const MAX_SKILLS_PER_PAGE = 4;

function chunkSkills(skills: PosterSkill[]): PosterSkill[][] {
  if (skills.length <= MAX_SKILLS_PER_PAGE) return [skills];
  const pageCount = Math.ceil(skills.length / MAX_SKILLS_PER_PAGE);
  const perPage = Math.ceil(skills.length / pageCount);
  const chunks: PosterSkill[][] = [];
  for (let i = 0; i < skills.length; i += perPage) {
    chunks.push(skills.slice(i, i + perPage));
  }
  return chunks;
}

export default function MeasurementPhasePostersPage({ years, footerData, SectionBlock = MeasurementSectionBlock }: MeasurementPhasePostersPageProps) {
  const pages = years.flatMap((year) =>
    chunkSkills(year.skills).map((skills) => ({ meta: year.meta, skills }))
  );

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

      {pages.map((page, idx) => (
        <div key={idx} className="poster-page max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
          <PageHeader meta={page.meta} />
          <div className="skills-list space-y-3 print:space-y-2 mt-3">
            {page.skills.map((skill) => (
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
