// Renders one year's poster pages (no main wrapper, no back link, no print button)
// Used by both PosterPageLayout (single year) and combined Phase pages.

import PageHeader from "@/components/PageHeader";
import SectionBlock from "@/components/SectionBlock";
import PageFooter from "@/components/PageFooter";
import type { PosterSkill, PosterMeta, FooterData } from "@/types";

const TITLE_PAGE_COUNT = 4;
const INNER_PAGE_COUNT = 5;

export function paginateSkills(skills: PosterSkill[]): PosterSkill[][] {
  const pages: PosterSkill[][] = [];
  pages.push(skills.slice(0, TITLE_PAGE_COUNT));
  for (let i = TITLE_PAGE_COUNT; i < skills.length; i += INNER_PAGE_COUNT) {
    pages.push(skills.slice(i, i + INNER_PAGE_COUNT));
  }
  return pages;
}

interface Props {
  meta: PosterMeta;
  skills: PosterSkill[];
  footer: FooterData;
}

export default function PosterYearSection({ meta, skills, footer }: Props) {
  const pages = paginateSkills(skills);

  return (
    <>
      {pages.map((pageSkills, pageIdx) => (
        <div key={`${meta.year}-${pageIdx}`} className="poster-page max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">

          {pageIdx === 0 && <PageHeader meta={meta} />}

          {pageIdx > 0 && (
            <div className="pt-3 mb-4 pb-3 border-b-2 border-pink-200 flex flex-wrap items-baseline gap-x-3 gap-y-1 justify-between print-card">
              <span className="font-fredoka font-bold text-lg sm:text-xl text-pink-500">
                {meta.subject}
              </span>
              <span className="font-nunito text-sm font-semibold text-gray-400 tracking-wider capitalize">
                {meta.phase} &middot; {meta.year} &middot; {meta.theme}
              </span>
            </div>
          )}

          {pageIdx > 0 && (
            <div className="no-print mb-2 text-center">
              <span className="text-[10px] text-gray-300 tracking-widest uppercase">
                Page {pageIdx + 1}
              </span>
            </div>
          )}

          <div className="skills-list space-y-3">
            {pageSkills.map((skill) => (
              <SectionBlock key={skill.code} skill={skill} />
            ))}
          </div>

          <PageFooter data={footer} />
        </div>
      ))}
    </>
  );
}
