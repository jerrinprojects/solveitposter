/* Mirror of PosterYearSection for Rational posters — same pagination
 * + same pink accent classes; just routes to the Rational-flavoured
 * Header / SectionBlock / Footer so we can swap the mascot per topic. */
import RationalPageHeader from "@/components/RationalPageHeader";
import RationalSectionBlock from "@/components/RationalSectionBlock";
import RationalPageFooter from "@/components/RationalPageFooter";
import type { PosterSkill, PosterMeta, FooterData } from "@/types";

const TITLE_PAGE_COUNT = 4;
const INNER_PAGE_COUNT = 5;
const INNER_MAX = 6;

/**
 * Smarter pagination: title page takes 4, inner pages take 5 by default,
 * but absorb the last 6 (when remaining is exactly 6) onto a single
 * inner page instead of splitting 5+1 (which would leave a lonely
 * stretched skill on the final page, e.g. Y8 = 10 skills).
 */
export function paginateSkills(
  skills: PosterSkill[],
  customSizes?: number[],
): PosterSkill[][] {
  // Caller can override with an explicit page-size array
  // (e.g. Y8 uses [4, 3, 3] for an uncrowded 3-page split).
  if (customSizes && customSizes.length > 0) {
    const pages: PosterSkill[][] = [];
    let i = 0;
    for (const size of customSizes) {
      pages.push(skills.slice(i, i + size));
      i += size;
    }
    return pages;
  }
  const pages: PosterSkill[][] = [skills.slice(0, TITLE_PAGE_COUNT)];
  let i = TITLE_PAGE_COUNT;
  while (i < skills.length) {
    const remaining = skills.length - i;
    const take = remaining > INNER_PAGE_COUNT && remaining <= INNER_MAX
      ? remaining
      : INNER_PAGE_COUNT;
    pages.push(skills.slice(i, i + take));
    i += take;
  }
  return pages;
}

interface Props {
  meta: PosterMeta;
  skills: PosterSkill[];
  footer: FooterData;
  pageSizes?: number[];
}

export default function RationalYearSection({ meta, skills, footer, pageSizes }: Props) {
  const pages = paginateSkills(skills, pageSizes);

  return (
    <>
      {pages.map((pageSkills, pageIdx) => (
        <div
          key={`${meta.year}-${pageIdx}`}
          className="poster-page max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6"
        >
          {pageIdx === 0 && <RationalPageHeader meta={meta} />}

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
              <RationalSectionBlock key={skill.code} skill={skill} />
            ))}
          </div>

          <RationalPageFooter data={footer} />
        </div>
      ))}
    </>
  );
}
