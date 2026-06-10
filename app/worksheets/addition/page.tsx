import Link from "next/link";
import { ADDITION_STAGES } from "@/data/additionStages";

function StageCard({ id, fullId, shortTitle }: {
  id: string; fullId: string; shortTitle: string;
}) {
  return (
    <Link
      href={`/worksheets/addition/${id}`}
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

const STAGE_DESCRIPTIONS: Record<number, string> = {
  1: "Single Digit",
  2: "Two-Digit",
  3: "Three-Digit",
  4: "Bigger Numbers",
  5: "Decimals",
};

export default function AdditionLandingPage() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths · Worksheets
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-pink-600 leading-tight flex items-center justify-center gap-3">
          <span>➕</span> Addition
        </h1>
        <p className="font-nunito text-sm text-gray-500 mt-2">
          Inline, column and word problems.
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-8">
        {[1, 2, 3, 4, 5].map((n) => {
          const stages = ADDITION_STAGES.filter((s) => s.fullId.startsWith(`${n}.`));
          if (stages.length === 0) return null;
          return (
            <section key={n}>
              <h2 className="font-fredoka font-bold text-2xl text-gray-700 mb-3 px-1">
                Stage {n} — {STAGE_DESCRIPTIONS[n]}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {stages.map((s) => (
                  <StageCard key={s.id} id={s.id} fullId={s.fullId} shortTitle={s.shortTitle} />
                ))}
              </div>
            </section>
          );
        })}

        <div className="pt-4">
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
