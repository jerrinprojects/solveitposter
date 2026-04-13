import PrintButton from "@/components/PrintButton";
import PageFooter from "@/components/PageFooter";

const footerData = { brand: "Solveitmaths.com" };

export default function Addition2DigitPage() {
  return (
    <main className="bg-pink-100 min-h-screen">

      {/* Back link — screen only */}
      <div className="no-print max-w-4xl mx-auto px-6 pt-3">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-700 transition-colors"
        >
          <span>←</span> Back to Topics
        </a>
      </div>

      {/* Poster page */}
      <div className="poster-page max-w-4xl mx-auto px-5 py-3">

        {/* ── Header ── */}
        <header className="mb-3 print-card">
          <div className="bg-pink-200 rounded-2xl px-6 py-3 text-center relative overflow-visible">
            <div>
              <h1 className="font-fredoka text-4xl text-pink-600 leading-tight tracking-wide" style={{ fontWeight: 900, WebkitTextStroke: "1px #db2777" }}>
                TWO-DIGIT ADDITION
              </h1>
              <h2 className="font-fredoka text-xl text-gray-700 mt-0.5" style={{ fontWeight: 900 }}>
                Place Value Partitioning &nbsp;·&nbsp; <span className="text-gray-500 text-base">No Renaming</span>
              </h2>
            </div>
            <div className="absolute right-3 bottom-0 pointer-events-none select-none">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/againsolveit.firebasestorage.app/o/Solvie_Number-removebg.png?alt=media&token=dec56a1b-bf95-4490-bb06-c642b8b9f753"
                alt="Solvie mascot"
                width={72}
                className="object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>
        </header>

        {/* ── Key Idea ── */}
        <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 mb-2 print-card">
          <p className="font-fredoka text-base text-pink-500 inline font-extrabold mr-2">Key Idea:</p>
          <span className="font-nunito text-sm text-gray-700 font-bold">
            Split each number into <span className="text-amber-500">tens</span> and <span className="text-green-500">ones</span>.
            Add each part separately. Then put them back together.
          </span>
        </div>

        {/* ── Steps ── */}
        <div className="space-y-2">

          {/* Step 1 */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>1</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Write the equation</p>
            </div>
            <svg viewBox="0 0 480 68" className="w-full max-w-sm mx-auto block" aria-label="34 + 25 = ?">
              <rect x="40" y="6" width="88" height="52" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="84" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">34</text>
              <text x="158" y="40" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="188" y="6" width="88" height="52" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="232" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">25</text>
              <text x="306" y="40" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="332" y="6" width="68" height="52" rx="12" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,3"/>
              <text x="366" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#7c3aed" fontFamily="Fredoka One, sans-serif">?</text>
            </svg>
          </div>

          {/* Step 2 */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>2</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Partition into tens and ones</p>
            </div>
            <svg viewBox="0 0 480 122" className="w-full max-w-md mx-auto block" aria-label="34 splits into 30 and 4, 25 splits into 20 and 5">
              {/* ── Lines drawn first (will sit behind boxes) ── */}
              <line x1="53" y1="52" x2="38" y2="74" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="83" y1="52" x2="98" y2="74" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="309" y1="52" x2="294" y2="74" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="339" y1="52" x2="354" y2="74" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>

              {/* ── Boxes drawn second (cover line ends) ── */}
              <rect x="30" y="4" width="76" height="46" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <rect x="10" y="74" width="56" height="32" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <rect x="72" y="74" width="44" height="32" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <rect x="286" y="4" width="76" height="46" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <rect x="266" y="74" width="56" height="32" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <rect x="328" y="74" width="44" height="32" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>

              {/* ── Text drawn last (always on top) ── */}
              <text x="68" y="34" textAnchor="middle" fontSize="26" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">34</text>
              <text x="38" y="96" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">30</text>
              <text x="94" y="96" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">4</text>
              <text x="38" y="114" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">TENS</text>
              <text x="94" y="114" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">ONES</text>

              <text x="240" y="36" textAnchor="middle" fontSize="26" fontWeight="700" fill="#d1d5db" fontFamily="Fredoka One, sans-serif">+</text>

              <text x="324" y="34" textAnchor="middle" fontSize="26" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">25</text>
              <text x="294" y="96" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">20</text>
              <text x="350" y="96" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">5</text>
              <text x="294" y="114" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a" fontFamily="Nunito, sans-serif">TENS</text>
              <text x="350" y="114" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a" fontFamily="Nunito, sans-serif">ONES</text>
            </svg>
          </div>

          {/* Step 3 */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>3</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Add tens, then add ones</p>
            </div>
            <svg viewBox="0 0 480 92" className="w-full max-w-md mx-auto block" aria-label="30+20=50, 4+5=9">
              <rect x="10" y="6" width="58" height="34" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="39" y="29" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">30</text>
              <text x="84" y="29" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="102" y="6" width="58" height="34" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="131" y="29" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">20</text>
              <text x="176" y="29" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="196" y="2" width="64" height="42" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="228" y="30" textAnchor="middle" fontSize="24" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">50</text>
              <text x="272" y="28" textAnchor="start" fontSize="12" fontWeight="800" fill="#be185d" fontFamily="Nunito, sans-serif">← tens total</text>

              <line x1="10" y1="54" x2="470" y2="54" stroke="#fce7f3" strokeWidth="1.5" strokeDasharray="5,4"/>

              <rect x="10" y="60" width="44" height="26" rx="7" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="32" y="78" textAnchor="middle" fontSize="16" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">4</text>
              <text x="68" y="78" textAnchor="middle" fontSize="16" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="84" y="60" width="44" height="26" rx="7" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="106" y="78" textAnchor="middle" fontSize="16" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">5</text>
              <text x="144" y="78" textAnchor="middle" fontSize="16" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="162" y="56" width="44" height="32" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="184" y="78" textAnchor="middle" fontSize="20" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">9</text>
              <text x="218" y="78" textAnchor="start" fontSize="12" fontWeight="800" fill="#be185d" fontFamily="Nunito, sans-serif">← ones total</text>
            </svg>
          </div>

          {/* Step 4 */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>4</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Combine to get the answer</p>
            </div>
            <svg viewBox="0 0 480 72" className="w-full max-w-md mx-auto block" aria-label="50 + 9 = 59">
              <rect x="30" y="8" width="66" height="46" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="63" y="38" textAnchor="middle" fontSize="26" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">50</text>
              <text x="114" y="38" textAnchor="middle" fontSize="26" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="134" y="8" width="56" height="46" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="162" y="38" textAnchor="middle" fontSize="26" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">9</text>
              <text x="208" y="38" textAnchor="middle" fontSize="26" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="234" y="2" width="86" height="58" rx="14" fill="#db2777" stroke="#9d174d" strokeWidth="3"/>
              <text x="277" y="40" textAnchor="middle" fontSize="34" fontWeight="900" fill="white" fontFamily="Fredoka One, sans-serif">59</text>
              <text x="334" y="24" fontSize="15" fontWeight="900" fill="#db2777" fontFamily="Fredoka One, sans-serif">Answer!</text>
              <text x="334" y="44" fontSize="13" fontWeight="700" fill="#9d174d" fontFamily="Nunito, sans-serif">34 + 25 = 59</text>
            </svg>
          </div>

        </div>

        {/* ── Try It ── */}
        <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 mt-2 print-card">
          <p className="font-fredoka text-base text-pink-500 mb-1.5" style={{ fontWeight: 900 }}>Try It Yourself!</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { q: "23 + 45", a: "68" },
              { q: "51 + 38", a: "89" },
              { q: "62 + 17", a: "79" },
            ].map(({ q, a }) => (
              <div key={q} className="border-2 border-pink-100 rounded-xl p-2 text-center">
                <p className="font-fredoka text-xl text-gray-700" style={{ fontWeight: 900 }}>{q} = ?</p>
                <details className="no-print">
                  <summary className="font-nunito text-xs font-bold text-pink-400 cursor-pointer list-none">Show answer</summary>
                  <p className="font-fredoka text-xl text-pink-500" style={{ fontWeight: 900 }}>{a}</p>
                </details>
                <p className="hidden print:block font-fredoka text-xl text-pink-500" style={{ fontWeight: 900 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Remember ── */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl px-5 py-2 mt-2 print-card">
          <span className="font-fredoka text-sm text-amber-600 font-extrabold mr-1">Remember!</span>
          <span className="font-nunito text-xs text-amber-800 font-bold">
            Works when ones add up to <span className="text-amber-600">9 or less</span> — e.g. 4 + 5 = 9 ✓ &nbsp; but 7 + 6 = 13 ✗ (needs renaming)
          </span>
        </div>

        <PageFooter data={footerData} />
      </div>

      <PrintButton />
    </main>
  );
}
