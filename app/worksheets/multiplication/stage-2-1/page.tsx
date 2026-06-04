import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Multiplication Stage 2.1 Worksheets | Solve It Maths",
};

const versions = [
  { label: "Version 1", sub: "50 problems · seeded shuffle", href: "/worksheets/multiplication/stage-2-1/v1" },
  { label: "Version 2", sub: "Same level, different mix", href: "/worksheets/multiplication/stage-2-1/v2" },
  { label: "Version 3", sub: "Same level, another mix", href: "/worksheets/multiplication/stage-2-1/v3" },
];

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
          Two-digit × one-digit · no carrying · 3 versions to choose from
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {versions.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-pink-200 px-4 py-5 hover:border-pink-400 hover:shadow-md transition-all group text-center"
            >
              <p className="font-fredoka font-bold text-lg text-pink-500 leading-none">
                {v.label}
              </p>
              <p className="font-nunito text-xs font-semibold text-gray-400 mt-2">
                {v.sub}
              </p>
              <span className="text-pink-300 group-hover:text-pink-500 text-sm mt-3 transition-colors">
                Open →
              </span>
            </Link>
          ))}
        </div>

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
