import PrintButton from "@/components/PrintButton";
import PageFooter from "@/components/PageFooter";

const footerData = { brand: "Solveitmaths.com" };

export default function Subtraction2DigitPage() {
  return (
    <main className="bg-pink-100 min-h-screen">

      {/* Back link — screen only */}
      <div className="no-print max-w-4xl mx-auto px-6 pt-3">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-700 transition-colors">
          <span>←</span> Back to Topics
        </a>
      </div>

      <div className="poster-page max-w-4xl mx-auto px-3 sm:px-5 py-3">

        {/* ── Header ── */}
        <header className="mb-3 print-card">
          <div className="bg-pink-200 rounded-2xl px-4 sm:px-6 py-3 text-center relative overflow-visible">
            <div className="pr-16 sm:pr-20">
              <h1 className="font-fredoka text-2xl sm:text-4xl text-pink-600 leading-tight tracking-wide" style={{ fontWeight: 900, WebkitTextStroke: "1px #db2777" }}>
                SUBTRACTION
              </h1>
              <h2 className="font-fredoka text-base sm:text-xl text-gray-700 mt-0.5" style={{ fontWeight: 900 }}>
                2-Digit — No Renaming
              </h2>
            </div>
            <div className="absolute right-2 sm:right-3 bottom-0 pointer-events-none select-none">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/againsolveit.firebasestorage.app/o/Solvie_Number-removebg.png?alt=media&token=dec56a1b-bf95-4490-bb06-c642b8b9f753"
                alt="Solvie mascot" width={60}
                className="object-contain sm:w-[72px]"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>
        </header>

        {/* ── Key Idea ── */}
        <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 mb-2 print-card">
          <p className="font-fredoka text-base text-pink-500 inline font-extrabold mr-2">Key Idea:</p>
          <span className="font-nunito text-sm text-gray-700 font-bold">
            Split both numbers into <span className="text-amber-500">tens</span> and <span className="text-blue-500">ones</span>.
            Subtract each part separately, then add the results together.
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
            <svg viewBox="0 0 480 68" className="w-full max-w-sm mx-auto block">
              <rect x="44" y="6" width="100" height="52" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="94" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">57</text>
              <text x="172" y="40" textAnchor="middle" fontSize="32" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>
              <rect x="196" y="6" width="100" height="52" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="246" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">23</text>
              <text x="322" y="40" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="346" y="6" width="88" height="52" rx="12" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,3"/>
              <text x="390" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#7c3aed" fontFamily="Fredoka One, sans-serif">?</text>
            </svg>
          </div>

          {/* Step 2 */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>2</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Split both numbers into tens and ones</p>
            </div>
            {/* Flat layout: [57]=[50]+[7]  −  [23]=[20]+[3] */}
            <svg viewBox="0 0 480 78" className="w-full max-w-md mx-auto block" overflow="visible">
              {/* 57 = 50 + 7 */}
              <rect x="4" y="6" width="54" height="44" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="31" y="34" textAnchor="middle" fontSize="24" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">57</text>
              <text x="64" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af">=</text>
              <rect x="72" y="6" width="58" height="44" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="101" y="34" textAnchor="middle" fontSize="24" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">50</text>
              <text x="101" y="64" textAnchor="middle" fontSize="9" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">TENS</text>
              <text x="136" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af">+</text>
              <rect x="144" y="6" width="46" height="44" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <text x="167" y="34" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">7</text>
              <text x="167" y="64" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3b82f6" fontFamily="Nunito, sans-serif">ONES</text>

              {/* − */}
              <text x="210" y="34" textAnchor="middle" fontSize="26" fontWeight="700" fill="#9ca3af">−</text>

              {/* 23 = 20 + 3 */}
              <rect x="228" y="6" width="54" height="44" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="255" y="34" textAnchor="middle" fontSize="24" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">23</text>
              <text x="288" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af">=</text>
              <rect x="296" y="6" width="58" height="44" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="325" y="34" textAnchor="middle" fontSize="24" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">20</text>
              <text x="325" y="64" textAnchor="middle" fontSize="9" fontWeight="700" fill="#22c55e" fontFamily="Nunito, sans-serif">TENS</text>
              <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af">+</text>
              <rect x="368" y="6" width="46" height="44" rx="10" fill="#d1fae5" stroke="#22c55e" strokeWidth="2"/>
              <text x="391" y="34" textAnchor="middle" fontSize="24" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">3</text>
              <text x="391" y="64" textAnchor="middle" fontSize="9" fontWeight="700" fill="#22c55e" fontFamily="Nunito, sans-serif">ONES</text>
            </svg>
          </div>

          {/* Step 3 */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>3</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Subtract tens and ones separately</p>
            </div>
            <svg viewBox="0 0 480 80" className="w-full max-w-md mx-auto block">
              {/* Tens: 50 - 20 = 30 */}
              <rect x="12" y="8" width="68" height="44" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="46" y="36" textAnchor="middle" fontSize="24" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">50</text>
              <text x="96" y="36" textAnchor="middle" fontSize="24" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>
              <rect x="112" y="8" width="68" height="44" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="146" y="36" textAnchor="middle" fontSize="24" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">20</text>
              <text x="194" y="36" textAnchor="middle" fontSize="24" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="210" y="8" width="68" height="44" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
              <text x="244" y="36" textAnchor="middle" fontSize="24" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">30</text>
              <text x="244" y="68" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9ca3af" fontFamily="Nunito, sans-serif">TENS</text>

              {/* Ones: 7 - 3 = 4 */}
              <rect x="296" y="8" width="52" height="44" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <text x="322" y="36" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">7</text>
              <text x="360" y="36" textAnchor="middle" fontSize="24" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>
              <rect x="372" y="8" width="44" height="44" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="394" y="36" textAnchor="middle" fontSize="24" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">3</text>
              <text x="426" y="36" textAnchor="middle" fontSize="24" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="440" y="8" width="36" height="44" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
              <text x="458" y="36" textAnchor="middle" fontSize="24" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">4</text>
              <text x="458" y="68" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9ca3af" fontFamily="Nunito, sans-serif">ONES</text>
            </svg>
          </div>

          {/* Step 4 */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>4</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Add the results together</p>
            </div>
            <svg viewBox="0 0 480 72" className="w-full max-w-md mx-auto block">
              <rect x="45" y="8" width="80" height="46" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="85" y="38" textAnchor="middle" fontSize="26" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">30</text>
              <text x="143" y="38" textAnchor="middle" fontSize="26" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="159" y="8" width="56" height="46" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="187" y="38" textAnchor="middle" fontSize="26" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">4</text>
              <text x="233" y="38" textAnchor="middle" fontSize="26" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="253" y="2" width="86" height="58" rx="14" fill="#db2777" stroke="#9d174d" strokeWidth="3"/>
              <text x="296" y="40" textAnchor="middle" fontSize="34" fontWeight="900" fill="white" fontFamily="Fredoka One, sans-serif">34</text>
              <text x="353" y="24" fontSize="15" fontWeight="900" fill="#db2777" fontFamily="Fredoka One, sans-serif">Answer!</text>
              <text x="353" y="44" fontSize="13" fontWeight="700" fill="#9d174d" fontFamily="Nunito, sans-serif">57 − 23 = 34</text>
            </svg>
          </div>

        </div>

        {/* ── Try It ── */}
        <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 mt-2 print-card">
          <p className="font-fredoka text-base text-pink-500 mb-1.5" style={{ fontWeight: 900 }}>Try It Yourself!</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { q: "68 − 35", a: "33" },
              { q: "79 − 46", a: "33" },
              { q: "85 − 52", a: "33" },
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
            This works when <span className="text-amber-600">each ones digit is big enough to subtract</span> — e.g. 57 − 23: ones 7 &gt; 3 ✓, tens 5 &gt; 2 ✓
          </span>
        </div>

        <PageFooter data={footerData} />
      </div>

      <PrintButton />
    </main>
  );
}
