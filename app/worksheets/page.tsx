import Link from "next/link";
import { MULTIPLICATION_STAGES } from "@/data/multiplicationStages";
import { ADDITION_STAGES } from "@/data/additionStages";
import { SUBTRACTION_STAGES } from "@/data/subtractionStages";

function StageCard({ basePath, id, fullId, shortTitle }: {
  basePath: string; id: string; fullId: string; shortTitle: string;
}) {
  return (
    <Link
      href={`${basePath}/${id}`}
      className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-pink-200 px-3 py-4 hover:border-pink-400 hover:shadow-md transition-all group text-center"
    >
      <p className="font-fredoka font-bold text-base sm:text-lg text-pink-500 leading-none">
        Stage {fullId}
      </p>
      <p className="font-nunito text-xs font-semibold text-gray-400 mt-1 leading-tight">
        {shortTitle}
      </p>
      <span className="text-pink-300 group-hover:text-pink-500 text-sm mt-2 transition-colors">
        →
      </span>
    </Link>
  );
}

function StageGroup({
  title, basePath, stages,
}: {
  title: string;
  basePath: string;
  stages: { id: string; fullId: string; shortTitle: string }[];
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 px-1">
        <h2 className="font-fredoka font-bold text-2xl text-gray-700">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {stages.map((s) => <StageCard key={s.id} basePath={basePath} {...s} />)}
      </div>
    </section>
  );
}

export default function WorksheetsLandingPage() {
  const addBase = "/worksheets/addition";
  const mulBase = "/worksheets/multiplication";
  const byStage = (stages: typeof MULTIPLICATION_STAGES, prefix: string) =>
    stages.filter((s) => s.fullId.startsWith(prefix));

  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths.com
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-pink-600 leading-tight">
          Worksheets
        </h1>
        <p className="font-nunito text-sm text-gray-400 mt-2">
          Printable practice sheets — Inline, Column, and Word Problems
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-12">
        {/* ── Addition ─────────────────────────────────────────── */}
        <div className="space-y-8">
          <h2 className="font-fredoka font-bold text-3xl text-pink-600 flex items-center gap-2">
            <span>➕</span> Addition
          </h2>
          {[1, 2, 3, 4, 5].map((n) => (
            <StageGroup
              key={`add-${n}`}
              title={`Stage ${n}${n === 1 ? " — Single Digit" : n === 5 ? " — Decimals" : ""}`}
              basePath={addBase}
              stages={byStage(ADDITION_STAGES, `${n}.`)}
            />
          ))}
        </div>

        {/* ── Subtraction ───────────────────────────────────────── */}
        <div className="space-y-8">
          <h2 className="font-fredoka font-bold text-3xl text-pink-600 flex items-center gap-2">
            <span>➖</span> Subtraction
          </h2>
          {[1, 2, 3, 4, 5].map((n) => (
            <StageGroup
              key={`sub-${n}`}
              title={`Stage ${n}${n === 1 ? " — Under 20" : n === 5 ? " — Decimals" : ""}`}
              basePath="/worksheets/subtraction"
              stages={byStage(SUBTRACTION_STAGES, `${n}.`)}
            />
          ))}
        </div>

        {/* ── Multiplication ────────────────────────────────────── */}
        <div className="space-y-8">
          <h2 className="font-fredoka font-bold text-3xl text-pink-600 flex items-center gap-2">
            <span>✖️</span> Multiplication
          </h2>
          {[1, 2, 3, 4, 5].map((n) => (
            <StageGroup
              key={`mul-${n}`}
              title={`Stage ${n}${n === 1 ? " — Times Tables" : n === 5 ? " — Decimals" : ""}`}
              basePath={mulBase}
              stages={byStage(MULTIPLICATION_STAGES, `${n}.`)}
            />
          ))}
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-700 transition-colors"
          >
            <span>←</span> Back to Posters
          </Link>
        </div>
      </div>
    </main>
  );
}
