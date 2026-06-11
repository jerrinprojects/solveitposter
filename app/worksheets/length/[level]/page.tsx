import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LENGTH_LEVELS, getLengthLevel,
  POLYGON_LEVELS, getPolygonLevel,
  COMPARE_LEVELS, getCompareLevel,
  SAME_AP_LEVELS, getSameAPLevel,
  MISSING_DIM_LEVELS, getMissingDimLevel,
  COMPOSITE_LEVELS, getCompositeLevel,
} from "@/data/lengthLevels";

export function generateStaticParams() {
  return [
    ...LENGTH_LEVELS.map((l) => ({ level: l.id })),
    ...POLYGON_LEVELS.map((l) => ({ level: l.id })),
    ...COMPARE_LEVELS.map((l) => ({ level: l.id })),
    ...SAME_AP_LEVELS.map((l) => ({ level: l.id })),
    ...MISSING_DIM_LEVELS.map((l) => ({ level: l.id })),
    ...COMPOSITE_LEVELS.map((l) => ({ level: l.id })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level: levelId } = await params;
  const level =
    getLengthLevel(levelId) ?? getPolygonLevel(levelId) ?? getCompareLevel(levelId)
    ?? getSameAPLevel(levelId) ?? getMissingDimLevel(levelId) ?? getCompositeLevel(levelId);
  if (!level) return { title: "Worksheet | Solve It Maths" };
  return { title: `Length ${level.fullId} Worksheets | Solve It Maths` };
}

function VersionGroup({
  title, sub, versions,
}: {
  title: string; sub: string; versions: { label: string; href: string }[];
}) {
  return (
    <section>
      <div className="mb-3 px-1">
        <h2 className="font-fredoka font-bold text-xl text-gray-700">{title}</h2>
        <p className="font-nunito text-xs text-gray-400 mt-0.5">{sub}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {versions.map((v) => (
          <Link
            key={v.href}
            href={v.href}
            className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-pink-200 px-4 py-5 hover:border-pink-400 hover:shadow-md transition-all group text-center"
          >
            <p className="font-fredoka font-bold text-lg text-pink-500 leading-none">
              {v.label}
            </p>
            <span className="text-pink-300 group-hover:text-pink-500 text-sm mt-3 transition-colors">
              Open →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level =
    getLengthLevel(levelId) ?? getPolygonLevel(levelId) ?? getCompareLevel(levelId)
    ?? getSameAPLevel(levelId) ?? getMissingDimLevel(levelId) ?? getCompositeLevel(levelId);
  if (!level) notFound();

  const base = `/worksheets/length/${level.id}`;
  const isGridLevel = level.id === "year-4-4" || level.id === "year-3-3" || level.id === "year-2-4";
  const isPolygonLevel = level.id === "year-3-2";
  const isCompareLevel = level.id === "year-3-4";
  const isSameAPLevel = level.id === "year-5-4";
  const isMissingDimLevel = level.id === "year-7-2" || level.id === "year-7-4";
  const isCompositeLevel = level.id === "year-7-5";
  const diagramVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/diagram-v${n}` }));
  const wordVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/word-v${n}` }));
  const gridVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/grid-v${n}` }));
  const polygonVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/polygon-v${n}` }));
  const compareVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/compare-v${n}` }));
  const sameapVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/sameap-v${n}` }));
  const missingVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/missing-v${n}` }));
  const compositeVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/composite-v${n}` }));

  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths · Length
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-pink-600 leading-tight">
          {level.fullId} Worksheets
        </h1>
        <p className="font-nunito text-sm text-gray-500 mt-2">
          {level.shortTitle}
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-8">
        {isGridLevel ? (
          <VersionGroup
            title="Counting Squares"
            sub={level.id === "year-4-4"
              ? "Right triangles on a unit grid · count whole + half squares · 15 per page"
              : "Rectangles on a unit grid · count whole squares · 15 per page"}
            versions={gridVersions}
          />
        ) : isPolygonLevel ? (
          <VersionGroup
            title="Polygons"
            sub="Triangles, pentagons and hexagons with every side labelled · 15 per page"
            versions={polygonVersions}
          />
        ) : isCompareLevel ? (
          <VersionGroup
            title="Compare Areas"
            sub="Two rectangles side-by-side · count and compare · 12 per page"
            versions={compareVersions}
          />
        ) : isSameAPLevel ? (
          <VersionGroup
            title="Same A or Same P"
            sub="Two rectangles · find A and P of each, then decide what is the same · 12 per page"
            versions={sameapVersions}
          />
        ) : isMissingDimLevel ? (
          <VersionGroup
            title="Missing Side"
            sub="Rectangle with one side and either P or A given · find the missing side · 15 per page"
            versions={missingVersions}
          />
        ) : isCompositeLevel ? (
          <VersionGroup
            title="Composite Area"
            sub="L-shapes with all sides labelled · split into rectangles and add · 12 per page"
            versions={compositeVersions}
          />
        ) : (
          <>
            <VersionGroup
              title="Diagram"
              sub="Labelled shapes · 15 per page · 2 pages + answers · V1: 1-digit, V2: mixed, V3: 2-digit"
              versions={diagramVersions}
            />
            <VersionGroup
              title="Word Problems"
              sub="Real-life story problems · 6 per page · 4 pages + answers"
              versions={wordVersions}
            />
          </>
        )}

        <div className="pt-2">
          <Link
            href="/worksheets"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-700 transition-colors"
          >
            <span>←</span> All Worksheets
          </Link>
        </div>
      </div>
    </main>
  );
}
