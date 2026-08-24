import Link from "next/link";

// ── Data ─────────────────────────────────────────────────────────

const topics = [
  {
    subject: "Number Structures",
    emoji: "🔢",
    items: [
      { label: "Phase 1 · Year 0a–3", href: "/poster/phase-1" },
      { label: "Phase 2 · Year 4–6", href: "/poster/phase-2" },
      { label: "Phase 3 · Year 7–8", href: "/poster/phase-3" },
    ],
  },
  {
    subject: "Times Tables",
    emoji: "✖️",
    items: [
      { label: "What is Multiplication? · Year 0–8", href: "/poster/multiplication-intro" },
      { label: "Times Tables Chart · Year 0–8", href: "/poster/times-table" },
      { label: "Times Table Patterns · Year 0–8", href: "/poster/times-table-patterns" },
      { label: "Times Table Strategies · Year 0–8", href: "/poster/times-table-strategies" },
      { label: "The Tricky 12 · Year 0–8", href: "/poster/times-table-tricky" },
      { label: "Near Squares · Year 0–8", href: "/poster/times-table-near-squares" },
      { label: "Times Table Pyramid · Year 0–8", href: "/poster/times-table-pyramid" },
    ],
  },
  {
    subject: "Math Strategies",
    emoji: "➕",
    items: [
      { label: "2-Digit Addition · No Renaming", href: "/math-strategies/addition-2digit" },
      { label: "2-Digit Addition · With Renaming", href: "/math-strategies/addition-2digit-renaming" },
      { label: "Subtraction · Subtract from the Ones", href: "/math-strategies/subtraction-ones" },
      { label: "Subtraction · Subtract from Ten", href: "/math-strategies/subtraction-bridge-ten" },
      { label: "2-Digit Subtraction · No Renaming", href: "/math-strategies/subtraction-2digit" },
      { label: "2-Digit Subtraction · With Renaming", href: "/math-strategies/subtraction-2digit-renaming" },
    ],
  },
];

const algebraTopics = [
  {
    name: "Phase 1 · Year 0–3",
    emoji: "🔢",
    items: [
      { label: "All Y0–3", sub: "Combined Pack", href: "/algebra/phase-1" },
      { label: "Year 0", sub: "Patterns & Position", href: "/algebra/year-0" },
      { label: "Year 1", sub: "Patterns & Equations", href: "/algebra/year-1" },
      { label: "Year 2", sub: "Compare & Operations", href: "/algebra/year-2" },
      { label: "Year 3", sub: "Bigger Numbers & Growing", href: "/algebra/year-3" },
    ],
  },
  {
    name: "Phase 2 · Year 4–6",
    emoji: "🔣",
    items: [
      { label: "All Y4–6", sub: "Combined Pack", href: "/algebra/phase-2" },
      { label: "Year 4", sub: "Large Numbers & Patterns", href: "/algebra/year-4" },
      { label: "Year 5", sub: "Compare Expressions", href: "/algebra/year-5" },
      { label: "Year 6", sub: "BEDMAS & Coordinates", href: "/algebra/year-6" },
    ],
  },
  {
    name: "Phase 3 · Year 7–8",
    emoji: "𝑥",
    items: [
      { label: "All Y7–8", sub: "Combined Pack", href: "/algebra/phase-3" },
      { label: "Year 7", sub: "Variables & Equations", href: "/algebra/year-7" },
      { label: "Year 8", sub: "Expand · Factorise · Inequality", href: "/algebra/year-8" },
    ],
  },
];

const measurementPosters = [
  { label: "Shapes · Length, Width & Height", href: "/measurement/shapes" },
];

const rationalTopics = [
  {
    name: "Phase 1 · Year 1–3",
    emoji: "½",
    items: [
      { label: "All Y1–3", sub: "Combined Pack", href: "/rational/phase-1" },
      { label: "Year 1", sub: "Halves & Quarters", href: "/rational/year-1" },
      { label: "Year 2", sub: "Halves · Thirds · Quarters", href: "/rational/year-2" },
      { label: "Year 3", sub: "Unit Fractions · Add & Subtract", href: "/rational/year-3" },
    ],
  },
  {
    name: "Phase 2 · Year 4–6",
    emoji: "¾",
    items: [
      { label: "All Y4–6", sub: "Combined Pack", href: "/rational/phase-2" },
      { label: "Year 4", sub: "Simplify · Tenths · Scaling", href: "/rational/year-4" },
      { label: "Year 5", sub: "Hundredths · Percentages · Ratio", href: "/rational/year-5" },
      { label: "Year 6", sub: "F ⇄ D ⇄ % · Ratio · Mixed", href: "/rational/year-6" },
    ],
  },
  {
    name: "Phase 3 · Year 7–8",
    emoji: "⅜",
    items: [
      { label: "All Y7–8", sub: "Combined Pack", href: "/rational/phase-3" },
      { label: "Year 7", sub: "Unlike F · Ratio · Operations", href: "/rational/year-7" },
      { label: "Year 8", sub: "F × F · Decimal Ops · Equivalence", href: "/rational/year-8" },
    ],
  },
  {
    name: "Decimal PV · Stage 1–4",
    emoji: "0.1",
    items: [
      { label: "Stage 1", sub: "Tenths · Year 4", href: "/decimal-pv/stage-1" },
      { label: "Stage 2", sub: "Hundredths · Year 5", href: "/decimal-pv/stage-2" },
      { label: "Stage 3", sub: "Thousandths · Year 6", href: "/decimal-pv/stage-3" },
      { label: "Stage 4", sub: "Mixed · Year 6+", href: "/decimal-pv/stage-4" },
    ],
  },
];

const yearOpsTopics = [
  {
    name: "Phase 1 · Year 0–3",
    emoji: "🌱",
    items: [
      { label: "All Y0–3", sub: "Combined Pack", href: "/year-ops/phase-1" },
      { label: "Year 0", sub: "Within 5", href: "/year-ops/year-0" },
      { label: "Year 1", sub: "Facts to 10 & to 20", href: "/year-ops/year-1" },
      { label: "Year 2", sub: "Two-Digit & First Tables", href: "/year-ops/year-2" },
      { label: "Year 3", sub: "Three-Digit & More Tables", href: "/year-ops/year-3" },
    ],
  },
  {
    name: "Phase 2 · Year 4–6",
    emoji: "🌿",
    items: [
      { label: "All Y4–6", sub: "Combined Pack", href: "/year-ops/phase-2" },
      { label: "Year 4", sub: "Four-Digit & Tenths", href: "/year-ops/year-4" },
      { label: "Year 5", sub: "Big Numbers & Hundredths", href: "/year-ops/year-5" },
      { label: "Year 6", sub: "Thousandths & BEDMAS", href: "/year-ops/year-6" },
    ],
  },
  {
    name: "Phase 3 · Year 7–8",
    emoji: "🌳",
    items: [
      { label: "All Y7–8", sub: "Combined Pack", href: "/year-ops/phase-3" },
      { label: "Year 7", sub: "Integers & Exponents", href: "/year-ops/year-7" },
      { label: "Year 8", sub: "Decimal Ops · % · Ratios", href: "/year-ops/year-8" },
    ],
  },
];

const measurementTopics = [
  {
    name: "Length",
    emoji: "📏",
    items: [
      { label: "Phase 1", sub: "Year 0–3", href: "/measurement/length/phase-1" },
      { label: "Phase 2", sub: "Year 4–6", href: "/measurement/length/phase-2" },
      { label: "Phase 3", sub: "Year 7–8", href: "/measurement/length/phase-3" },
    ],
  },
  {
    name: "Mass",
    emoji: "⚖️",
    items: [
      { label: "Phase 1", sub: "Year 0–3", href: "/measurement/mass/phase-1" },
      { label: "Phase 2", sub: "Year 4–6", href: "/measurement/mass/phase-2" },
      { label: "Phase 3", sub: "Year 7–8", href: "/measurement/mass/phase-3" },
    ],
  },
  {
    name: "Capacity & Volume",
    emoji: "🥤",
    items: [
      { label: "Phase 1", sub: "Year 0–3", href: "/measurement/capacity/phase-1" },
      { label: "Phase 2", sub: "Year 4–6", href: "/measurement/capacity/phase-2" },
      { label: "Phase 3", sub: "Year 7–8", href: "/measurement/capacity/phase-3" },
    ],
  },
  {
    name: "Time",
    emoji: "⏰",
    items: [
      { label: "Phase 1", sub: "Year 0–3", href: "/measurement/time/phase-1" },
      { label: "Phase 2", sub: "Year 4–6", href: "/measurement/time/phase-2" },
      { label: "Phase 3", sub: "Year 7–8", href: "/measurement/time/phase-3" },
    ],
  },
  {
    name: "Temperature",
    emoji: "🌡️",
    items: [
      { label: "Phase 1", sub: "Year 0–3", href: "/measurement/temperature/phase-1" },
      { label: "Phase 2", sub: "Year 4–6", href: "/measurement/temperature/phase-2" },
      { label: "Phase 3", sub: "Year 7–8", href: "/measurement/temperature/phase-3" },
    ],
  },
  {
    name: "Angle",
    emoji: "📐",
    items: [
      { label: "Phase 1", sub: "Year 0–3", href: "/measurement/angle/phase-1" },
      { label: "Phase 2", sub: "Year 4–6", href: "/measurement/angle/phase-2" },
      { label: "Phase 3", sub: "Year 7–8", href: "/measurement/angle/phase-3" },
    ],
  },
];

// ── Page ─────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">

      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths.com
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-pink-600 leading-tight">
          Maths Posters
        </h1>
        <p className="font-nunito text-sm text-gray-400 mt-2">
          Choose a topic to view and print
        </p>
      </div>

      {/* Worksheets nav button */}
      <div className="mb-10">
        <Link
          href="/worksheets"
          className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-fredoka font-bold text-base sm:text-lg px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <span>📝</span>
          <span>Worksheets</span>
          <span className="text-pink-100">→</span>
        </Link>
      </div>

      <div className="w-full max-w-2xl space-y-10">

        {/* Regular topic groups */}
        {topics.map((group) => (
          <section key={group.subject}>
            <SectionHeading emoji={group.emoji} title={group.subject} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.items.map((item) => (
                <PosterCard key={item.href} label={item.label} href={item.href} />
              ))}
            </div>
          </section>
        ))}

        {/* Rational Numbers — mint themed */}
        <section>
          <SectionHeading emoji="½" title="Rational Numbers" />
          <div className="space-y-5">
            {rationalTopics.map((topic) => (
              <div key={topic.name}>
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="text-base">{topic.emoji}</span>
                  <h3 className="font-nunito text-sm font-bold text-gray-500 uppercase tracking-widest">
                    {topic.name}
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {topic.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-pink-200 px-3 py-4 hover:border-pink-400 hover:shadow-md transition-all group text-center"
                    >
                      <p className="font-fredoka font-bold text-base sm:text-lg text-pink-500 leading-none">
                        {item.label}
                      </p>
                      <p className="font-nunito text-xs font-semibold text-gray-400 mt-1">
                        {item.sub}
                      </p>
                      <span className="text-pink-300 group-hover:text-pink-400 text-sm mt-2 transition-colors">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Year Operations — pink themed */}
        <section>
          <SectionHeading emoji="🧮" title="Year Operations" />
          <div className="space-y-5">
            {yearOpsTopics.map((topic) => (
              <div key={topic.name}>
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="text-base">{topic.emoji}</span>
                  <h3 className="font-nunito text-sm font-bold text-gray-500 uppercase tracking-widest">
                    {topic.name}
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {topic.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-pink-200 px-3 py-4 hover:border-pink-400 hover:shadow-md transition-all group text-center"
                    >
                      <p className="font-fredoka font-bold text-base sm:text-lg text-pink-500 leading-none">
                        {item.label}
                      </p>
                      <p className="font-nunito text-xs font-semibold text-gray-400 mt-1">
                        {item.sub}
                      </p>
                      <span className="text-pink-300 group-hover:text-pink-400 text-sm mt-2 transition-colors">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Algebra — pink themed */}
        <section>
          <SectionHeading emoji="🅰️" title="Algebra" />
          <div className="space-y-5">
            {algebraTopics.map((topic) => (
              <div key={topic.name}>
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="text-base">{topic.emoji}</span>
                  <h3 className="font-nunito text-sm font-bold text-gray-500 uppercase tracking-widest">
                    {topic.name}
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {topic.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-pink-200 px-3 py-4 hover:border-pink-400 hover:shadow-md transition-all group text-center"
                    >
                      <p className="font-fredoka font-bold text-base sm:text-lg text-pink-500 leading-none">
                        {item.label}
                      </p>
                      <p className="font-nunito text-xs font-semibold text-gray-400 mt-1">
                        {item.sub}
                      </p>
                      <span className="text-pink-300 group-hover:text-pink-400 text-sm mt-2 transition-colors">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Measurement — groups Length and Mass together */}
        <section>
          <SectionHeading emoji="📐" title="Measurement" />
          {/* Standalone measurement posters */}
          {measurementPosters.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {measurementPosters.map((item) => (
                <PosterCard key={item.href} label={item.label} href={item.href} />
              ))}
            </div>
          )}
          <div className="space-y-5">
            {measurementTopics.map((topic) => (
              <div key={topic.name}>
                {/* Sub-heading */}
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="text-base">{topic.emoji}</span>
                  <h3 className="font-nunito text-sm font-bold text-gray-500 uppercase tracking-widest">
                    {topic.name}
                  </h3>
                </div>
                {/* Phase cards — 3 columns */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {topic.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-pink-200 px-3 py-4 hover:border-pink-400 hover:shadow-md transition-all group text-center"
                    >
                      <p className="font-fredoka font-bold text-base sm:text-lg text-pink-500 leading-none">
                        {item.label}
                      </p>
                      <p className="font-nunito text-xs font-semibold text-gray-400 mt-1">
                        {item.sub}
                      </p>
                      <span className="text-pink-300 group-hover:text-pink-500 text-sm mt-2 transition-colors">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

// ── Shared sub-components ─────────────────────────────────────────

function SectionHeading({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 px-1">
      <span className="text-xl">{emoji}</span>
      <h2 className="font-fredoka font-bold text-2xl text-gray-700">{title}</h2>
    </div>
  );
}

function PosterCard({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between bg-white rounded-2xl border-2 border-pink-200 px-5 py-4 hover:border-pink-400 hover:shadow-md transition-all group"
    >
      <p className="font-nunito text-sm font-bold text-gray-600 leading-snug">
        {label}
      </p>
      <span className="text-pink-300 group-hover:text-pink-500 text-lg ml-3 flex-shrink-0 transition-colors">
        →
      </span>
    </Link>
  );
}
