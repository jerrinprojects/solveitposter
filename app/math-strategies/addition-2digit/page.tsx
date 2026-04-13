import PrintButton from "@/components/PrintButton";
import PageFooter from "@/components/PageFooter";

const footerData = { brand: "Solveitmaths.com" };

export default function Addition2DigitPage() {
  return (
    <main className="bg-pink-100 min-h-screen">

      {/* Back link — screen only */}
      <div className="no-print max-w-4xl mx-auto px-6 pt-4">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-700 transition-colors"
        >
          <span>←</span> Back to Topics
        </a>
      </div>

      {/* Poster page */}
      <div className="poster-page max-w-4xl mx-auto px-6 py-6">

        {/* ── Header ── */}
        <header className="mb-5 print-card">
          <div className="bg-pink-200 rounded-2xl px-8 py-5 text-center relative overflow-visible">
            <div>
              <p className="font-fredoka text-base text-gray-500 tracking-[0.15em] uppercase mb-1" style={{ fontWeight: 800 }}>
                Math Strategy
              </p>
              <h1 className="font-fredoka text-5xl text-pink-600 leading-tight tracking-wide" style={{ fontWeight: 900, WebkitTextStroke: "1.2px #db2777" }}>
                TWO-DIGIT ADDITION
              </h1>
              <h2 className="font-fredoka text-2xl text-gray-700 mt-1" style={{ fontWeight: 900 }}>
                Place Value Partitioning
              </h2>
              <p className="font-fredoka text-base text-gray-500 mt-0.5 tracking-[0.08em] uppercase" style={{ fontWeight: 800 }}>
                No Renaming · No Carrying
              </p>
            </div>
            <div className="absolute right-3 bottom-0 pointer-events-none select-none">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/againsolveit.firebasestorage.app/o/Solvie_Number-removebg.png?alt=media&token=dec56a1b-bf95-4490-bb06-c642b8b9f753"
                alt="Solvie mascot"
                width={96}
                className="object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>
        </header>

        {/* ── Key Idea ── */}
        <div className="bg-white border-2 border-pink-200 rounded-2xl px-6 py-4 mb-4 print-card">
          <p className="font-fredoka text-xl text-pink-500 mb-1" style={{ fontWeight: 900 }}>Key Idea</p>
          <p className="font-nunito text-base text-gray-700 font-bold leading-relaxed">
            Split each number into <span className="text-amber-500">tens</span> and <span className="text-green-500">ones</span>.
            Add each part separately. Then put them back together.
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="space-y-3">

          {/* Step 1 */}
          <div className="bg-white border-2 border-pink-200 rounded-2xl px-6 py-5 print-card">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-pink-500 text-white font-fredoka text-xl rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>1</span>
              <p className="font-fredoka text-xl text-gray-700" style={{ fontWeight: 900 }}>Write the equation</p>
            </div>
            <svg viewBox="0 0 480 80" className="w-full max-w-md mx-auto block" aria-label="34 + 25 = ?">
              {/* 34 */}
              <rect x="40" y="10" width="90" height="56" rx="14" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="85" y="50" textAnchor="middle" fontSize="34" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">34</text>
              {/* + */}
              <text x="160" y="50" textAnchor="middle" fontSize="34" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              {/* 25 */}
              <rect x="190" y="10" width="90" height="56" rx="14" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="235" y="50" textAnchor="middle" fontSize="34" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">25</text>
              {/* = */}
              <text x="310" y="50" textAnchor="middle" fontSize="34" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              {/* ? */}
              <rect x="335" y="10" width="70" height="56" rx="14" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,3"/>
              <text x="370" y="50" textAnchor="middle" fontSize="34" fontWeight="900" fill="#7c3aed" fontFamily="Fredoka One, sans-serif">?</text>
            </svg>
          </div>

          {/* Step 2 */}
          <div className="bg-white border-2 border-pink-200 rounded-2xl px-6 py-5 print-card">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-pink-500 text-white font-fredoka text-xl rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>2</span>
              <p className="font-fredoka text-xl text-gray-700" style={{ fontWeight: 900 }}>Partition each number into tens and ones</p>
            </div>
            <svg viewBox="0 0 480 130" className="w-full max-w-lg mx-auto block" aria-label="34 splits into 30 and 4, 25 splits into 20 and 5">
              {/* 34 box */}
              <rect x="30" y="5" width="80" height="50" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="70" y="38" textAnchor="middle" fontSize="28" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">34</text>
              {/* branches from 34 */}
              <line x1="55" y1="55" x2="40" y2="85" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="85" y1="55" x2="100" y2="85" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
              {/* 30 */}
              <rect x="10" y="85" width="60" height="36" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="40" y="109" textAnchor="middle" fontSize="22" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">30</text>
              {/* 4 */}
              <rect x="76" y="85" width="48" height="36" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="100" y="109" textAnchor="middle" fontSize="22" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">4</text>
              {/* TENS / ONES labels */}
              <text x="40" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">TENS</text>
              <text x="100" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">ONES</text>

              {/* + in middle */}
              <text x="240" y="45" textAnchor="middle" fontSize="30" fontWeight="700" fill="#d1d5db" fontFamily="Fredoka One, sans-serif">+</text>

              {/* 25 box */}
              <rect x="288" y="5" width="80" height="50" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="328" y="38" textAnchor="middle" fontSize="28" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">25</text>
              {/* branches from 25 */}
              <line x1="313" y1="55" x2="298" y2="85" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="343" y1="55" x2="358" y2="85" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
              {/* 20 */}
              <rect x="268" y="85" width="60" height="36" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="298" y="109" textAnchor="middle" fontSize="22" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">20</text>
              {/* 5 */}
              <rect x="334" y="85" width="48" height="36" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="358" y="109" textAnchor="middle" fontSize="22" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">5</text>
              <text x="298" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#16a34a" fontFamily="Nunito, sans-serif">TENS</text>
              <text x="358" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#16a34a" fontFamily="Nunito, sans-serif">ONES</text>
            </svg>
          </div>

          {/* Step 3 */}
          <div className="bg-white border-2 border-pink-200 rounded-2xl px-6 py-5 print-card">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-pink-500 text-white font-fredoka text-xl rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>3</span>
              <p className="font-fredoka text-xl text-gray-700" style={{ fontWeight: 900 }}>Add the tens, then add the ones</p>
            </div>
            <svg viewBox="0 0 480 105" className="w-full max-w-lg mx-auto block" aria-label="30+20=50, 4+5=9">
              {/* Tens row */}
              <rect x="10" y="8" width="60" height="38" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="40" y="33" textAnchor="middle" fontSize="22" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">30</text>
              <text x="88" y="33" textAnchor="middle" fontSize="22" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="106" y="8" width="60" height="38" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="136" y="33" textAnchor="middle" fontSize="22" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">20</text>
              <text x="184" y="33" textAnchor="middle" fontSize="22" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="202" y="4" width="70" height="46" rx="12" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="237" y="34" textAnchor="middle" fontSize="26" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">50</text>
              <text x="285" y="32" textAnchor="start" fontSize="13" fontWeight="800" fill="#be185d" fontFamily="Nunito, sans-serif">← tens total</text>

              {/* Divider */}
              <line x1="10" y1="63" x2="470" y2="63" stroke="#fce7f3" strokeWidth="1.5" strokeDasharray="5,4"/>

              {/* Ones row */}
              <rect x="10" y="70" width="48" height="28" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="34" y="89" textAnchor="middle" fontSize="18" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">4</text>
              <text x="74" y="89" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="90" y="70" width="48" height="28" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="114" y="89" textAnchor="middle" fontSize="18" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">5</text>
              <text x="154" y="89" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="170" y="66" width="48" height="36" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="194" y="90" textAnchor="middle" fontSize="22" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">9</text>
              <text x="230" y="89" textAnchor="start" fontSize="13" fontWeight="800" fill="#be185d" fontFamily="Nunito, sans-serif">← ones total</text>
            </svg>
          </div>

          {/* Step 4 */}
          <div className="bg-white border-2 border-pink-200 rounded-2xl px-6 py-5 print-card">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-pink-500 text-white font-fredoka text-xl rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>4</span>
              <p className="font-fredoka text-xl text-gray-700" style={{ fontWeight: 900 }}>Combine to get the answer</p>
            </div>
            <svg viewBox="0 0 480 86" className="w-full max-w-lg mx-auto block" aria-label="50 + 9 = 59">
              <rect x="30" y="10" width="70" height="52" rx="12" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="65" y="44" textAnchor="middle" fontSize="30" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">50</text>
              <text x="120" y="44" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="140" y="10" width="60" height="52" rx="12" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="170" y="44" textAnchor="middle" fontSize="30" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">9</text>
              <text x="220" y="44" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              {/* Answer box */}
              <rect x="248" y="4" width="90" height="64" rx="16" fill="#db2777" stroke="#9d174d" strokeWidth="3"/>
              <text x="293" y="46" textAnchor="middle" fontSize="38" fontWeight="900" fill="white" fontFamily="Fredoka One, sans-serif">59</text>
              <text x="360" y="28" fontSize="16" fontWeight="900" fill="#db2777" fontFamily="Fredoka One, sans-serif">Answer!</text>
              <text x="360" y="50" fontSize="14" fontWeight="700" fill="#9d174d" fontFamily="Nunito, sans-serif">34 + 25 = 59</text>
            </svg>
          </div>

        </div>

        {/* ── Try It ── */}
        <div className="bg-white border-2 border-pink-200 rounded-2xl px-6 py-5 mt-4 print-card">
          <p className="font-fredoka text-xl text-pink-500 mb-3" style={{ fontWeight: 900 }}>Try It Yourself!</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { q: "23 + 45", a: "68" },
              { q: "51 + 38", a: "89" },
              { q: "62 + 17", a: "79" },
            ].map(({ q, a }) => (
              <div key={q} className="border-2 border-pink-100 rounded-xl p-4 text-center">
                <p className="font-fredoka text-2xl text-gray-700 mb-1" style={{ fontWeight: 900 }}>{q} = ?</p>
                <details className="no-print">
                  <summary className="font-nunito text-xs font-bold text-pink-400 cursor-pointer list-none">
                    Show answer
                  </summary>
                  <p className="font-fredoka text-2xl text-pink-500 mt-1" style={{ fontWeight: 900 }}>{a}</p>
                </details>
                <p className="print-only font-fredoka text-2xl text-pink-500 mt-1 hidden print:block" style={{ fontWeight: 900 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Remember ── */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-4 mt-4 print-card">
          <p className="font-fredoka text-lg text-amber-600 mb-1" style={{ fontWeight: 900 }}>Remember!</p>
          <p className="font-nunito text-sm text-amber-800 font-bold leading-relaxed">
            This strategy works when the <span className="text-amber-600">ones digits add up to 9 or less</span> — no renaming needed!
            <br />
            e.g. 4 + 5 = 9 ✓ &nbsp;&nbsp; but 7 + 6 = 13 ✗ (would need renaming)
          </p>
        </div>

        <PageFooter data={footerData} />
      </div>

      <PrintButton />
    </main>
  );
}
