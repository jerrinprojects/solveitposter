import Link from "next/link";

const multiplicationWorksheets = [
  { label: "Stage 2.1", sub: "12 × 3 · No carrying", href: "/worksheets/multiplication/stage-2-1" },
];

export default function WorksheetsLandingPage() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths.com
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-pink-600 leading-tight">
          Worksheets
        </h1>
        <p className="font-nunito text-sm text-gray-400 mt-2">
          Printable practice sheets — questions + answer keys
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-10">
        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="text-xl">✖️</span>
            <h2 className="font-fredoka font-bold text-2xl text-gray-700">Multiplication</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {multiplicationWorksheets.map((item) => (
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
