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

        {/* ── Example equation ── */}
        <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 mb-2 print-card">
          <p className="font-fredoka text-base text-pink-500 inline font-extrabold mr-2">Example:</p>
          <span className="font-fredoka text-xl font-extrabold text-gray-700 mr-2">53 − 27 = ?</span>
          <span className="font-nunito text-xs text-gray-500 font-bold">When the ones are too small to subtract, rename a ten.</span>
        </div>

        {/* ── Steps ── */}
        <div className="space-y-2">

          {/* Step 1 — Partition both numbers */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>1</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Split both numbers into tens and ones</p>
            </div>
            <svg viewBox="0 0 480 130" className="w-full max-w-md mx-auto block" overflow="visible">
              {/* ── 53 tree ── */}
              <rect x="168" y="4" width="72" height="40" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="204" y="30" textAnchor="middle" fontSize="24" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">53</text>
              <line x1="192" y1="44" x2="152" y2="62" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
              <line x1="216" y1="44" x2="256" y2="62" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
              <rect x="112" y="64" width="80" height="34" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="152" y="87" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">50</text>
              <text x="152" y="106" textAnchor="middle" fontSize="9" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">TENS</text>
              <rect x="224" y="64" width="64" height="34" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <text x="256" y="87" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">3</text>
              <text x="256" y="106" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3b82f6" fontFamily="Nunito, sans-serif">ONES</text>

              {/* minus between trees */}
              <text x="98" y="88" textAnchor="middle" fontSize="26" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>

              {/* ── 27 tree ── */}
              <rect x="304" y="4" width="72" height="40" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="340" y="30" textAnchor="middle" fontSize="24" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">27</text>
              <line x1="328" y1="44" x2="300" y2="62" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
              <line x1="352" y1="44" x2="380" y2="62" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
              <rect x="260" y="64" width="80" height="34" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="300" y="87" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">20</text>
              <text x="300" y="106" textAnchor="middle" fontSize="9" fontWeight="700" fill="#22c55e" fontFamily="Nunito, sans-serif">TENS</text>
              <rect x="360" y="64" width="64" height="34" rx="8" fill="#d1fae5" stroke="#22c55e" strokeWidth="2"/>
              <text x="392" y="87" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">7</text>
              <text x="392" y="106" textAnchor="middle" fontSize="9" fontWeight="700" fill="#22c55e" fontFamily="Nunito, sans-serif">ONES</text>
            </svg>
          </div>

          {/* Step 2 — Check ones */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>2</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Compare the ones — is 3 big enough to subtract 7?</p>
            </div>
            <svg viewBox="0 0 480 64" className="w-full max-w-sm mx-auto block" overflow="visible">
              {/* ones boxes */}
              <rect x="100" y="6" width="72" height="44" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5"/>
              <text x="136" y="35" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">3</text>
              <text x="190" y="32" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>
              <rect x="206" y="6" width="72" height="44" rx="12" fill="#d1fae5" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="242" y="35" textAnchor="middle" fontSize="28" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">7</text>
              {/* alert */}
              <rect x="294" y="6" width="150" height="44" rx="12" fill="#fef2f2" stroke="#ef4444" strokeWidth="2"/>
              <text x="369" y="24" textAnchor="middle" fontSize="13" fontWeight="900" fill="#dc2626" fontFamily="Nunito, sans-serif">3 &lt; 7</text>
              <text x="369" y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626" fontFamily="Nunito, sans-serif">Can&apos;t subtract! ✗</text>
            </svg>
          </div>

          {/* Step 3 — Rename + subtract ones */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>3</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Rename a ten → subtract the ones</p>
            </div>
            <svg viewBox="0 0 480 100" className="w-full max-w-md mx-auto block" overflow="visible">
              {/* Before rename: 50 + 3 */}
              <text x="78" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9ca3af" fontFamily="Nunito, sans-serif">BEFORE</text>
              <rect x="8" y="18" width="60" height="38" rx="9" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="38" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">50</text>
              <text x="76" y="40" textAnchor="middle" fontSize="16" fontWeight="700" fill="#9ca3af">+</text>
              <rect x="88" y="18" width="46" height="38" rx="9" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <text x="111" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">3</text>

              {/* Arrow */}
              <text x="155" y="42" textAnchor="middle" fontSize="18" fontWeight="900" fill="#f59e0b">→</text>
              <text x="155" y="56" textAnchor="middle" fontSize="8" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">rename</text>

              {/* After rename: 40 + 13 */}
              <text x="218" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9ca3af" fontFamily="Nunito, sans-serif">AFTER</text>
              <rect x="170" y="18" width="60" height="38" rx="9" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="200" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">40</text>
              <text x="238" y="40" textAnchor="middle" fontSize="16" fontWeight="700" fill="#9ca3af">+</text>
              <rect x="248" y="12" width="56" height="50" rx="9" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5"/>
              <text x="276" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">13</text>
              <text x="276" y="60" textAnchor="middle" fontSize="8" fontWeight="700" fill="#3b82f6" fontFamily="Nunito, sans-serif">3 + 10 ones</text>

              {/* Divider */}
              <line x1="318" y1="10" x2="318" y2="78" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4,3"/>

              {/* Subtract ones: 13 - 7 = 6 */}
              <text x="396" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9ca3af" fontFamily="Nunito, sans-serif">SUBTRACT ONES</text>
              <rect x="328" y="18" width="52" height="38" rx="9" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <text x="354" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">13</text>
              <text x="390" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af">−</text>
              <rect x="400" y="18" width="36" height="38" rx="9" fill="#d1fae5" stroke="#22c55e" strokeWidth="2"/>
              <text x="418" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">7</text>
              <text x="446" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af">=</text>
              <rect x="456" y="14" width="20" height="46" rx="9" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
              <text x="466" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">6</text>
            </svg>
          </div>

          {/* Step 4 — Subtract tens → answer */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>4</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Subtract the tens → combine for the answer</p>
            </div>
            <svg viewBox="0 0 480 72" className="w-full max-w-md mx-auto block" overflow="visible">
              {/* 40 - 20 = 20 */}
              <rect x="4" y="8" width="60" height="44" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="34" y="36" textAnchor="middle" fontSize="22" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">40</text>
              <text x="76" y="34" textAnchor="middle" fontSize="22" fontWeight="700" fill="#9ca3af">−</text>
              <rect x="88" y="8" width="60" height="44" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="118" y="36" textAnchor="middle" fontSize="22" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">20</text>
              <text x="160" y="34" textAnchor="middle" fontSize="22" fontWeight="700" fill="#9ca3af">=</text>
              <rect x="172" y="8" width="60" height="44" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
              <text x="202" y="36" textAnchor="middle" fontSize="22" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">20</text>

              {/* + ones result */}
              <text x="244" y="34" textAnchor="middle" fontSize="22" fontWeight="700" fill="#9ca3af">+</text>
              <rect x="256" y="8" width="52" height="44" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
              <text x="282" y="36" textAnchor="middle" fontSize="22" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">6</text>
              <text x="320" y="34" textAnchor="middle" fontSize="22" fontWeight="700" fill="#9ca3af">=</text>

              {/* Answer */}
              <rect x="334" y="2" width="80" height="56" rx="14" fill="#db2777" stroke="#9d174d" strokeWidth="3"/>
              <text x="374" y="38" textAnchor="middle" fontSize="32" fontWeight="900" fill="white" fontFamily="Fredoka One, sans-serif">26</text>
              <text x="426" y="22" fontSize="14" fontWeight="900" fill="#db2777" fontFamily="Fredoka One, sans-serif">Answer!</text>
              <text x="426" y="42" fontSize="12" fontWeight="700" fill="#9d174d" fontFamily="Nunito, sans-serif">53 − 27 = 26</text>
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
            If ones are too small → rename: <span className="text-amber-600">50 + 3 → 40 + 13</span>.
            Then subtract ones first (13 − 7 = 6), then tens (40 − 20 = 20). Combine → <span className="text-amber-600">26</span> ✓
          </span>
        </div>

        <PageFooter data={footerData} />
      </div>

      <PrintButton />
    </main>
  );
}
