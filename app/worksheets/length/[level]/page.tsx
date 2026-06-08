import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LENGTH_LEVELS, getLengthLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return LENGTH_LEVELS.map((l) => ({ level: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level: levelId } = await params;
  const level = getLengthLevel(levelId);
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
  const level = getLengthLevel(levelId);
  if (!level) notFound();

  const base = `/worksheets/length/${level.id}`;
  const diagramVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/diagram-v${n}` }));

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
        <VersionGroup
          title="Diagram"
          sub="Labelled shapes · 20 per page · 2 pages + answers · V1: 1-digit, V2: mixed, V3: 2-digit"
          versions={diagramVersions}
        />

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
