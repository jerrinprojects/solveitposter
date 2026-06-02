// Renders one year's poster pages with the Times Table brand design.
// Keeps the existing skill content (PosterSkill) and right-side ExercisePreview visuals;
// only swaps the page chrome (header / footer / card styling) to the brand-aligned look.

import BrandSectionBlock from "@/components/BrandSectionBlock";
import { PosterHeader, PosterFooter, CaveatAccent, Highlight } from "@/components/PosterFrame";
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
  footer?: FooterData;
}

export default function BrandYearSection({ meta, skills }: Props) {
  const pages = paginateSkills(skills);
  const subjectTitleCase = meta.subject
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {pages.map((pageSkills, pageIdx) => {
        // global accent index across the year so palette doesn't reset each page
        const startIdx = pageIdx === 0 ? 0 : TITLE_PAGE_COUNT + (pageIdx - 1) * INNER_PAGE_COUNT;
        return (
          <div
            key={`${meta.year}-${pageIdx}`}
            className="poster-page brand-poster-page"
            style={{
              maxWidth: 780,
              margin: "16px auto",
              background: "#fffaf3",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(236, 64, 122, 0.10)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {pageIdx === 0 ? (
              <PosterHeader
                compact
                section={`Solveitmaths · ${subjectTitleCase}`}
                title={
                  <>
                    {meta.phase}{" "}
                    <CaveatAccent size={38}>{meta.year}</CaveatAccent>
                  </>
                }
                tagline={
                  <>
                    {subjectTitleCase} —{" "}
                    <Highlight>{meta.theme}</Highlight>
                  </>
                }
              />
            ) : (
              // Continuation pages: slim sub-header (no mascot) so room is preserved
              <div style={{
                padding: "12px 22px 10px",
                borderBottom: "2px solid #ffd5e8",
                background: "linear-gradient(135deg, #fff5fa 0%, #fff0e8 100%)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}>
                <span style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#1f2937",
                  letterSpacing: "-0.02em",
                }}>
                  {subjectTitleCase}{" "}
                  <span style={{ color: "#ec407a" }}>{meta.phase}</span>
                </span>
                <span style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#ec407a",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}>
                  {meta.year} · {meta.theme}
                </span>
              </div>
            )}

            <div
              className="skills-list"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "14px 18px",
                minHeight: 0,
              }}
            >
              {pageSkills.map((skill, i) => (
                <BrandSectionBlock
                  key={skill.code}
                  skill={skill}
                  accentIndex={startIdx + i}
                />
              ))}
            </div>

            <PosterFooter rightLabel={`${meta.phase} · ${meta.year} · ${meta.theme}`} />
          </div>
        );
      })}
    </>
  );
}
