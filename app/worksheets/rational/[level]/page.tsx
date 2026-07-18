import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SPOT_LEVELS, getSpotLevel } from "@/data/rationalWsLevels";

export function generateStaticParams() {
  return SPOT_LEVELS.map((l) => ({ level: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level: levelId } = await params;
  const level = getSpotLevel(levelId);
  if (!level) return { title: "Worksheet | Solve It Maths" };
  return { title: `Fractions ${level.fullId} Worksheets | Solve It Maths` };
}

const VERSIONS: { label: string; slug: string; sub: string }[] = [
  { label: "Name It", slug: "spot-v1", sub: "Mark H / T / Q for each shape" },
  { label: "Tick Thirds", slug: "spot-v2", sub: "Tick only the thirds" },
  { label: "Colour It", slug: "spot-v3", sub: "Colour the fraction shown" },
];

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getSpotLevel(levelId);
  if (!level) notFound();

  const base = `/worksheets/rational/${level.id}`;

  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths · Fractions
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-pink-600 leading-tight">
          {level.fullId} Worksheets
        </h1>
        <p className="font-nunito text-sm text-gray-500 mt-2">{level.ican}</p>
      </div>

      <div className="w-full max-w-2xl space-y-8">
        <section>
          <div className="mb-3 px-1">
            <h2 className="font-fredoka font-bold text-xl text-gray-700">Spot the Fraction</h2>
            <p className="font-nunito text-xs text-gray-400 mt-0.5">
              Same skill, three formats · 12 per page · 2 pages + answers
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {VERSIONS.map((v) => (
              <Link
                key={v.slug}
                href={`${base}/${v.slug}`}
                className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-pink-200 px-4 py-5 hover:border-pink-400 hover:shadow-md transition-all group text-center"
              >
                <p className="font-fredoka font-bold text-lg text-pink-500 leading-none">{v.label}</p>
                <p className="font-nunito text-[11px] text-gray-400 mt-1.5 leading-tight">{v.sub}</p>
                <span className="text-pink-300 group-hover:text-pink-500 text-sm mt-3 transition-colors">Open →</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="pt-2">
          <Link
            href="/worksheets/rational"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-700 transition-colors"
          >
            <span>←</span> All Fractions
          </Link>
        </div>
      </div>
    </main>
  );
}
