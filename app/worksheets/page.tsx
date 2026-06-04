import Link from "next/link";
import { MULTIPLICATION_STAGES } from "@/data/multiplicationStages";

function StageCard({ id, fullId, shortTitle }: { id: string; fullId: string; shortTitle: string }) {
  return (
    <Link
      href={`/worksheets/multiplication/${id}`}
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

export default function WorksheetsLandingPage() {
  const stage1 = MULTIPLICATION_STAGES.filter((s) => s.fullId.startsWith("1."));
  const stage2 = MULTIPLICATION_STAGES.filter((s) => s.fullId.startsWith("2."));
  const stage3 = MULTIPLICATION_STAGES.filter((s) => s.fullId.startsWith("3."));
  const stage4 = MULTIPLICATION_STAGES.filter((s) => s.fullId.startsWith("4."));
  const stage5 = MULTIPLICATION_STAGES.filter((s) => s.fullId.startsWith("5."));

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

      <div className="w-full max-w-2xl space-y-10">
        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="text-xl">✖️</span>
            <h2 className="font-fredoka font-bold text-2xl text-gray-700">Multiplication · Stage 1 — Times Tables</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {stage1.map((s) => <StageCard key={s.id} {...s} />)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="text-xl">✖️</span>
            <h2 className="font-fredoka font-bold text-2xl text-gray-700">Multiplication · Stage 2</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {stage2.map((s) => <StageCard key={s.id} {...s} />)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="text-xl">✖️</span>
            <h2 className="font-fredoka font-bold text-2xl text-gray-700">Multiplication · Stage 3</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {stage3.map((s) => <StageCard key={s.id} {...s} />)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="text-xl">✖️</span>
            <h2 className="font-fredoka font-bold text-2xl text-gray-700">Multiplication · Stage 4</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {stage4.map((s) => <StageCard key={s.id} {...s} />)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="text-xl">✖️</span>
            <h2 className="font-fredoka font-bold text-2xl text-gray-700">Multiplication · Stage 5 — Decimals</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {stage5.map((s) => <StageCard key={s.id} {...s} />)}
          </div>
        </section>

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
