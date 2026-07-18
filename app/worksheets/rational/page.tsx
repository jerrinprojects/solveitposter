import Link from "next/link";
import { SPOT_LEVELS } from "@/data/rationalWsLevels";

export default function RationalLandingPage() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths · Worksheets
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-pink-600 leading-tight flex items-center justify-center gap-3">
          <span>🍕</span> Fractions
        </h1>
        <p className="font-nunito text-sm text-gray-500 mt-2">
          Rational numbers — one worksheet per Solve it! skill.
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-8">
        <section>
          <h2 className="font-fredoka font-bold text-2xl text-gray-700 mb-3 px-1">
            Year 2 — Halves, Thirds &amp; Quarters
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {SPOT_LEVELS.map((l) => (
              <Link
                key={l.id}
                href={`/worksheets/rational/${l.id}`}
                className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-pink-200 px-3 py-4 hover:border-pink-400 hover:shadow-md transition-all group text-center"
              >
                <p className="font-fredoka font-bold text-base sm:text-lg text-pink-600 leading-none">
                  {l.fullId}
                </p>
                <p className="font-nunito text-xs font-semibold text-gray-400 mt-1 leading-tight">
                  {l.shortTitle}
                </p>
                <span className="text-pink-300 group-hover:text-pink-600 text-sm mt-2 transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

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
