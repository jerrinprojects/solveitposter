import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Multiplication Stage 2.1 Worksheets | Solve It Maths",
};

const inlineVersions = [
  { label: "V1", href: "/worksheets/multiplication/stage-2-1/v1" },
  { label: "V2", href: "/worksheets/multiplication/stage-2-1/v2" },
  { label: "V3", href: "/worksheets/multiplication/stage-2-1/v3" },
];

const columnVersions = [
  { label: "V1", href: "/worksheets/multiplication/stage-2-1/column-v1" },
  { label: "V2", href: "/worksheets/multiplication/stage-2-1/column-v2" },
  { label: "V3", href: "/worksheets/multiplication/stage-2-1/column-v3" },
];

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

export default function Stage21VersionsPage() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths · Multiplication
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-pink-600 leading-tight">
          Stage 2.1 Worksheets
        </h1>
        <p className="font-nunito text-sm text-gray-500 mt-2">
          Two-digit × one-digit · no carrying
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-8">
        <VersionGroup
          title="Inline"
          sub="Written form — 12 × 3 = ___ · 25 per page"
          versions={inlineVersions}
        />
        <VersionGroup
          title="Column"
          sub="Vertical form — long multiplication · 20 per page"
          versions={columnVersions}
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
