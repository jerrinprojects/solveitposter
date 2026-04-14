import PrintButton from "@/components/PrintButton";
import PageFooter from "@/components/PageFooter";

const footerData = { brand: "Solveitmaths.com" };

export default function Subtraction2DigitRenamingPage() {
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
                2-Digit — With Renaming
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
            When the <span className="text-blue-500">ones</span> are too small to subtract, <span className="text-amber-500">rename a ten as 10 ones</span>.
            Then subtract each part separately.
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
              <text x="94" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">53</text>
              <text x="172" y="40" textAnchor="middle" fontSize="32" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>
              <rect x="196" y="6" width="100" height="52" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="246" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">27</text>
              <text x="322" y="40" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="346" y="6" width="88" height="52" rx="12" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,3"/>
              <text x="390" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#7c3aed" fontFamily="Fredoka One, sans-serif">?</text>
            </svg>
          </div>

          {/* Step 2 — Check ones */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>2</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Check the ones — can you subtract?</p>
            </div>
            <svg viewBox="0 0 480 72" className="w-full max-w-sm mx-auto block">
              {/* 53 split */}
              <rect x="30" y="6" width="68" height="44" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="64" y="33" textAnchor="middle" fontSize="22" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">50</text>
              <text x="64" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">TENS</text>
              <text x="108" y="31" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="122" y="6" width="56" height="44" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <text x="150" y="33" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">3</text>
              <text x="150" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3b82f6" fontFamily="Nunito, sans-serif">ONES</text>

              {/* minus */}
              <text x="198" y="31" textAnchor="middle" fontSize="22" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>

              {/* 27 split */}
              <rect x="216" y="6" width="68" height="44" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="250" y="33" textAnchor="middle" fontSize="22" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">20</text>
              <text x="250" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill="#22c55e" fontFamily="Nunito, sans-serif">TENS</text>
              <text x="294" y="31" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="308" y="6" width="56" height="44" rx="10" fill="#d1fae5" stroke="#22c55e" strokeWidth="2"/>
              <text x="336" y="33" textAnchor="middle" fontSize="22" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">7</text>
              <text x="336" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill="#22c55e" fontFamily="Nunito, sans-serif">ONES</text>

              {/* Alert — 3 < 7 */}
              <rect x="376" y="4" width="92" height="44" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="2"/>
              <text x="422" y="22" textAnchor="middle" fontSize="11" fontWeight="900" fill="#dc2626" fontFamily="Nunito, sans-serif">3 &lt; 7</text>
              <text x="422" y="38" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626" fontFamily="Nunito, sans-serif">Can&apos;t subtract!</text>
            </svg>
          </div>

          {/* Step 3 — Rename */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>3</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Rename — trade a ten for 10 ones</p>
            </div>
            <svg viewBox="0 0 480 82" className="w-full max-w-md mx-auto block">
              {/* Before: 50 + 3 */}
              <text x="100" y="14" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9ca3af" fontFamily="Nunito, sans-serif">BEFORE</text>
              <rect x="30" y="18" width="68" height="40" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="64" y="43" textAnchor="middle" fontSize="22" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">50</text>
              <text x="108" y="42" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="122" y="18" width="56" height="40" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <text x="150" y="43" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">3</text>

              {/* Arrow */}
              <text x="208" y="44" textAnchor="middle" fontSize="22" fontWeight="900" fill="#f59e0b" fontFamily="Fredoka One, sans-serif">→</text>
              <text x="208" y="62" textAnchor="middle" fontSize="9" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">rename</text>

              {/* After: 40 + 13 */}
              <text x="360" y="14" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9ca3af" fontFamily="Nunito, sans-serif">AFTER</text>
              <rect x="250" y="18" width="68" height="40" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="284" y="43" textAnchor="middle" fontSize="22" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">40</text>
              <text x="328" y="42" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="342" y="12" width="72" height="52" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5"/>
              <text x="378" y="43" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">13</text>
              <text x="378" y="62" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3b82f6" fontFamily="Nunito, sans-serif">+10 ones</text>

              {/* annotation */}
              <text x="430" y="34" fontSize="9" fontWeight="700" fill="#f59e0b" fontFamily="Nunito, sans-serif">1 ten</text>
              <text x="430" y="46" fontSize="9" fontWeight="700" fill="#f59e0b" fontFamily="Nunito, sans-serif">→ 10</text>
              <text x="430" y="58" fontSize="9" fontWeight="700" fill="#f59e0b" fontFamily="Nunito, sans-serif">ones</text>
            </svg>
          </div>

          {/* Step 4 — Subtract */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>4</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Subtract tens and ones, then add together</p>
            </div>
            <svg viewBox="0 0 480 84" className="w-full max-w-md mx-auto block">
              {/* Tens: 40 - 20 = 20 */}
              <rect x="4" y="8" width="60" height="40" rx="9" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="34" y="33" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">40</text>
              <text x="76" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>
              <rect x="88" y="8" width="60" height="40" rx="9" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="118" y="33" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">20</text>
              <text x="160" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="172" y="8" width="60" height="40" rx="9" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
              <text x="202" y="33" textAnchor="middle" fontSize="20" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">20</text>
              <text x="202" y="62" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9ca3af" fontFamily="Nunito, sans-serif">TENS</text>

              {/* Ones: 13 - 7 = 6 */}
              <rect x="256" y="4" width="52" height="48" rx="9" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <text x="282" y="33" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">13</text>
              <text x="318" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>
              <rect x="330" y="8" width="44" height="40" rx="9" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="352" y="33" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">7</text>
              <text x="382" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="394" y="8" width="44" height="40" rx="9" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
              <text x="416" y="33" textAnchor="middle" fontSize="20" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">6</text>
              <text x="416" y="62" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9ca3af" fontFamily="Nunito, sans-serif">ONES</text>

              {/* Final answer label */}
              <text x="34" y="78" textAnchor="middle" fontSize="10" fontWeight="700" fill="#db2777" fontFamily="Nunito, sans-serif">20 + 6 = 26</text>
              <text x="34" y="88" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9d174d" fontFamily="Nunito, sans-serif">53 − 27 = 26 ✓</text>
            </svg>
          </div>

        </div>

        {/* ── Try It ── */}
        <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 mt-2 print-card">
          <p className="font-fredoka text-base text-pink-500 mb-1.5" style={{ fontWeight: 900 }}>Try It Yourself!</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { q: "62 − 38", a: "24" },
              { q: "74 − 46", a: "28" },
              { q: "81 − 55", a: "26" },
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
            When the ones digit is <span className="text-amber-600">too small</span> to subtract, rename a ten: 50 + 3 → 40 + 13.
            Now you can subtract! 13 − 7 = 6, 40 − 20 = 20 → <span className="text-amber-600">26</span>
          </span>
        </div>

        <PageFooter data={footerData} />
      </div>

      <PrintButton />
    </main>
  );
}
