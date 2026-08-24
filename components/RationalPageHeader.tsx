import type { PosterMeta } from "@/types";

interface PageHeaderProps {
  meta: PosterMeta;
}

/* Pink-themed page header for Rational Numbers posters — matches the
 * existing Number Structures PageHeader so the look is uniform across
 * topics. Only the mascot image swaps to the rational illustration. */
export default function RationalPageHeader({ meta }: PageHeaderProps) {
  return (
    <header className="mb-3 print-card">
      <div className="bg-pink-200 rounded-2xl px-5 sm:px-8 py-4 sm:py-5 text-center relative overflow-visible">
        <div>
          <h1
            className="font-fredoka text-3xl sm:text-5xl text-pink-600 leading-tight tracking-wide"
            style={{ fontWeight: 900, WebkitTextStroke: "1.2px #db2777" }}
          >
            {meta.subject}
          </h1>
          <h2
            className="font-fredoka text-2xl sm:text-3xl text-gray-700 mt-1"
            style={{ fontWeight: 900 }}
          >
            {meta.phase} &ndash; {meta.year}
          </h2>
          <p
            className="font-fredoka text-base sm:text-xl text-gray-500 mt-0.5"
            style={{ fontWeight: 800 }}
          >
            {meta.theme}
          </p>
        </div>

        {/* Mascot — rational-numbers illustration from live solveit assets */}
        <div className="absolute right-2 sm:right-3 bottom-0 pointer-events-none select-none">
          <img
            src="/topics/rational-numbers.webp"
            alt="Rational Numbers mascot"
            width={88}
            className="object-contain sm:w-28"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>
    </header>
  );
}
