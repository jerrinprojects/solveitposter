import Link from "next/link";
import { LENGTH_LEVELS, POLYGON_LEVELS, COMPARE_LEVELS } from "@/data/lengthLevels";

function LevelCard({ id, fullId, shortTitle }: {
  id: string; fullId: string; shortTitle: string;
}) {
  return (
    <Link
      href={`/worksheets/length/${id}`}
      className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-rose-200 px-3 py-4 hover:border-rose-400 hover:shadow-md transition-all group text-center"
    >
      <p className="font-fredoka font-bold text-base sm:text-lg text-rose-600 leading-none">
        {fullId}
      </p>
      <p className="font-nunito text-xs font-semibold text-gray-400 mt-1 leading-tight">
        {shortTitle}
      </p>
      <span className="text-rose-300 group-hover:text-rose-600 text-sm mt-2 transition-colors">
        →
      </span>
    </Link>
  );
}

type LevelMeta = { id: string; fullId: string; shortTitle: string };

const YEAR_DESCRIPTIONS: Record<number, string> = {
  3: "Counting Squares, Polygons & Comparing",
  4: "Rectangles & Squares",
  6: "Right-angled Triangles",
};

export default function LengthLandingPage() {
  const allLevels: LevelMeta[] = [
    ...POLYGON_LEVELS.map((l) => ({ id: l.id, fullId: l.fullId, shortTitle: l.shortTitle })),
    ...LENGTH_LEVELS.map((l) => ({ id: l.id, fullId: l.fullId, shortTitle: l.shortTitle })),
    ...COMPARE_LEVELS.map((l) => ({ id: l.id, fullId: l.fullId, shortTitle: l.shortTitle })),
  ];

  // Group by year (extracted from fullId like "Y4.1").
  const yearOf = (fullId: string) => parseInt(fullId.replace(/[^0-9]/g, "").slice(0, 1), 10);
  const grouped = new Map<number, LevelMeta[]>();
  for (const l of allLevels) {
    const y = yearOf(l.fullId);
    if (!grouped.has(y)) grouped.set(y, []);
    grouped.get(y)!.push(l);
  }
  // Sort levels within each year.
  for (const list of grouped.values()) {
    list.sort((a, b) => a.fullId.localeCompare(b.fullId));
  }

  const years = Array.from(grouped.keys()).sort((a, b) => a - b);

  return (
    <main className="min-h-screen bg-rose-50 flex flex-col items-center px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <p className="font-nunito text-xs font-bold text-rose-500 tracking-[0.35em] uppercase mb-3">
          Solveitmaths · Worksheets
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-rose-600 leading-tight flex items-center justify-center gap-3">
          <span>📐</span> Length
        </h1>
        <p className="font-nunito text-sm text-gray-500 mt-2">
          Area &amp; perimeter — diagrams, counting squares, polygons and word problems.
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-8">
        {years.map((y) => (
          <section key={y}>
            <h2 className="font-fredoka font-bold text-2xl text-gray-700 mb-3 px-1">
              Year {y}{YEAR_DESCRIPTIONS[y] ? ` — ${YEAR_DESCRIPTIONS[y]}` : ""}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {grouped.get(y)!.map((l) => (
                <LevelCard key={l.id} id={l.id} fullId={l.fullId} shortTitle={l.shortTitle} />
              ))}
            </div>
          </section>
        ))}

        <div className="pt-4">
          <Link
            href="/worksheets"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <span>←</span> All Worksheets
          </Link>
        </div>
      </div>
    </main>
  );
}
