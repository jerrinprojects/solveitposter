import Link from "next/link";

const topics = [
  {
    subject: "Number Structure",
    items: [
      { label: "Year 0a · Count to 10", href: "/poster" },
    ],
  },
  {
    subject: "Math Strategies",
    items: [
      { label: "2-Digit Addition — No Renaming", href: "/math-strategies/addition-2digit" },
      { label: "2-Digit Addition — With Renaming", href: "/math-strategies/addition-2digit-renaming" },
    ],
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-6 py-14">

      {/* Header */}
      <div className="text-center mb-12">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths.com
        </p>
        <h1 className="font-fredoka font-bold text-3xl sm:text-5xl text-pink-600 leading-tight">
          Maths Posters
        </h1>
        <p className="font-nunito text-base text-gray-400 mt-2">
          Choose a topic to view and print the poster
        </p>
      </div>

      {/* Topic groups */}
      <div className="w-full max-w-2xl space-y-8">
        {topics.map((group) => (
          <div key={group.subject}>
            {/* Group heading */}
            <h2 className="font-fredoka font-bold text-2xl text-gray-700 mb-3 px-1">
              {group.subject}
            </h2>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between bg-white rounded-2xl border-2 border-pink-200 px-6 py-4 hover:border-pink-400 hover:shadow-md transition-all group"
                >
                  <div>
                    <p className="font-fredoka font-bold text-lg text-pink-500 leading-none mb-1">
                      {group.subject}
                    </p>
                    <p className="font-nunito text-sm font-semibold text-gray-500">
                      {item.label}
                    </p>
                  </div>
                  <span className="text-pink-300 group-hover:text-pink-500 text-xl transition-colors">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
