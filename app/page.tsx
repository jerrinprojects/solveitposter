import Link from "next/link";

// ── Data ─────────────────────────────────────────────────────────

const topics = [
  {
    subject: "Number Structure",
    emoji: "🔢",
    items: [
      { label: "Phase 1 · Year 0a–3", href: "/poster/phase-1" },
      { label: "Phase 2 · Year 4–6", href: "/poster/phase-2" },
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

const measurementPosters = [
  { label: "Shapes · Length, Width & Height", href: "/measurement/shapes" },
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
];

// ── Page ─────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">

      {/* Header */}
      <div className="text-center mb-12">
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
