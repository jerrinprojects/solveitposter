import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ADDITION_STAGES, getAdditionStage } from "@/data/additionStages";

export function generateStaticParams() {
  return ADDITION_STAGES.map((s) => ({ stage: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const { stage: stageId } = await params;
  const stage = getAdditionStage(stageId);
  if (!stage) return { title: "Worksheet | Solve It Maths" };
  return { title: `Addition Stage ${stage.fullId} Worksheets | Solve It Maths` };
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

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageId } = await params;
  const stage = getAdditionStage(stageId);
  if (!stage) notFound();

  const base = `/worksheets/addition/${stage.id}`;
  const inlineVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/v${n}` }));
  const columnVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/column-v${n}` }));
  const wordVersions = [1, 2, 3].map((n) => ({ label: `V${n}`, href: `${base}/word-v${n}` }));

  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths · Addition
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-pink-600 leading-tight">
          Stage {stage.fullId} Worksheets
        </h1>
        <p className="font-nunito text-sm text-gray-500 mt-2">
          {stage.shortTitle}
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-8">
        <VersionGroup title="Inline" sub="Written form — A + B = ___ · per page varies" versions={inlineVersions} />
        <VersionGroup title="Column" sub="Vertical form — column addition · 20 per page" versions={columnVersions} />
        <VersionGroup title="Word Problems" sub="Story problems · 6 per page · 4 pages + answers" versions={wordVersions} />

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
