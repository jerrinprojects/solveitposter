import PrintButton from "@/components/PrintButton";
import PageFooter from "@/components/PageFooter";

const footerData = { brand: "Solveitmaths.com" };

export default function Addition2DigitRenamingPage() {
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
            <div className="pr-20">
              <h1 className="font-fredoka text-4xl text-pink-600 leading-tight tracking-wide" style={{ fontWeight: 900, WebkitTextStroke: "1px #db2777" }}>
                TWO-DIGIT ADDITION
              </h1>
              <h2 className="font-fredoka text-xl text-gray-700 mt-0.5" style={{ fontWeight: 900 }}>
                Place Value Partitioning &nbsp;·&nbsp; <span className="text-gray-500 text-base">With Renaming</span>
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
            Partition into <span className="text-amber-500">tens</span> and <span className="text-green-500">ones</span>.
            When ones add up to <span className="text-rose-500">10 or more</span>, rename them — trade 10 ones for 1 extra ten.
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
            <svg viewBox="0 0 480 68" className="w-full max-w-sm mx-auto block" aria-label="47 + 38 = ?">
              <rect x="40" y="6" width="88" height="52" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="84" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">47</text>
              <text x="158" y="40" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="188" y="6" width="88" height="52" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="232" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">38</text>
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
            <svg viewBox="0 0 480 122" className="w-full max-w-md mx-auto block" aria-label="47 splits into 40 and 7, 38 splits into 30 and 8">
              {/* Lines first */}
              <line x1="53" y1="52" x2="38" y2="68" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="83" y1="52" x2="98" y2="68" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="309" y1="52" x2="294" y2="68" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="339" y1="52" x2="354" y2="68" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
              {/* Boxes */}
              <rect x="30" y="4" width="76" height="46" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <rect x="10" y="72" width="56" height="34" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <rect x="72" y="72" width="44" height="34" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <rect x="286" y="4" width="76" height="46" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <rect x="266" y="72" width="56" height="34" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <rect x="328" y="72" width="44" height="34" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              {/* Text */}
              <text x="68" y="34" textAnchor="middle" fontSize="26" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">47</text>
              <text x="38" y="96" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">40</text>
              <text x="94" y="96" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">7</text>
              <text x="38" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">TENS</text>
              <text x="94" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">ONES</text>
              <text x="196" y="34" textAnchor="middle" fontSize="26" fontWeight="700" fill="#d1d5db" fontFamily="Fredoka One, sans-serif">+</text>
              <text x="324" y="34" textAnchor="middle" fontSize="26" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">38</text>
              <text x="294" y="96" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">30</text>
              <text x="350" y="96" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">8</text>
              <text x="294" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a" fontFamily="Nunito, sans-serif">TENS</text>
              <text x="350" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a" fontFamily="Nunito, sans-serif">ONES</text>
            </svg>
          </div>

          {/* Step 3 — add ones, rename */}
          <div className="bg-white border-2 border-rose-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-rose-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>3</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Add the ones — rename if 10 or more!</p>
            </div>
            <svg viewBox="0 0 480 88" className="w-full max-w-lg mx-auto block" aria-label="7 + 8 = 15, rename as 1 ten and 5 ones">
              {/* 7 + 8 = 15 */}
              <rect x="10" y="8" width="44" height="34" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="32" y="31" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">7</text>
              <text x="70" y="31" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="88" y="8" width="44" height="34" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="110" y="31" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">8</text>
              <text x="148" y="31" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="164" y="4" width="52" height="42" rx="10" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="2.5"/>
              <text x="190" y="32" textAnchor="middle" fontSize="24" fontWeight="900" fill="#9f1239" fontFamily="Fredoka One, sans-serif">15</text>

              {/* Arrow → rename */}
              <text x="228" y="30" textAnchor="middle" fontSize="18" fill="#f43f5e" fontWeight="900">→</text>

              {/* Rename box */}
              <rect x="244" y="4" width="220" height="42" rx="10" fill="#fff1f2" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,3"/>
              <text x="256" y="19" fontSize="11" fontWeight="800" fill="#f43f5e" fontFamily="Nunito, sans-serif">RENAME!</text>
              {/* 1 ten box */}
              <rect x="254" y="22" width="50" height="20" rx="5" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5"/>
              <text x="279" y="36" textAnchor="middle" fontSize="13" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">1 ten</text>
              <text x="312" y="34" textAnchor="middle" fontSize="14" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              {/* 5 ones box */}
              <rect x="324" y="22" width="58" height="20" rx="5" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5"/>
              <text x="353" y="36" textAnchor="middle" fontSize="13" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">5 ones</text>

              {/* Note */}
              <text x="10" y="76" fontSize="11" fontWeight="700" fill="#f43f5e" fontFamily="Nunito, sans-serif">⚠ 15 ≥ 10 → trade 10 ones for 1 extra ten. Keep the 5 ones.</text>
            </svg>
          </div>

          {/* Step 4 — add tens including the renamed ten */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>4</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Add the tens + the renamed ten</p>
            </div>
            <svg viewBox="0 0 480 54" className="w-full max-w-lg mx-auto block" aria-label="40 + 30 + 10 = 80">
              <rect x="10" y="6" width="52" height="34" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="36" y="29" textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">40</text>
              <text x="76" y="29" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="92" y="6" width="52" height="34" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="118" y="29" textAnchor="middle" fontSize="20" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">30</text>
              <text x="158" y="29" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              {/* renamed ten */}
              <rect x="172" y="6" width="52" height="34" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
              <text x="198" y="29" textAnchor="middle" fontSize="20" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">10</text>
              <text x="235" y="18" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ec4899" fontFamily="Nunito, sans-serif">renamed</text>
              <text x="235" y="30" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ec4899" fontFamily="Nunito, sans-serif">ten</text>
              <text x="256" y="29" textAnchor="middle" fontSize="20" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="272" y="2" width="64" height="42" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="304" y="30" textAnchor="middle" fontSize="24" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">80</text>
              <text x="348" y="24" textAnchor="start" fontSize="11" fontWeight="800" fill="#be185d" fontFamily="Nunito, sans-serif">← tens total</text>
            </svg>
          </div>

          {/* Step 5 — combine */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>5</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Combine tens total + leftover ones</p>
            </div>
            <svg viewBox="0 0 480 72" className="w-full max-w-md mx-auto block" aria-label="80 + 5 = 85">
              <rect x="30" y="8" width="66" height="46" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="63" y="38" textAnchor="middle" fontSize="26" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">80</text>
              <text x="114" y="38" textAnchor="middle" fontSize="26" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="134" y="8" width="56" height="46" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="162" y="38" textAnchor="middle" fontSize="26" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">5</text>
              <text x="208" y="38" textAnchor="middle" fontSize="26" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="234" y="2" width="86" height="58" rx="14" fill="#db2777" stroke="#9d174d" strokeWidth="3"/>
              <text x="277" y="40" textAnchor="middle" fontSize="34" fontWeight="900" fill="white" fontFamily="Fredoka One, sans-serif">85</text>
              <text x="334" y="24" fontSize="15" fontWeight="900" fill="#db2777" fontFamily="Fredoka One, sans-serif">Answer!</text>
              <text x="334" y="44" fontSize="13" fontWeight="700" fill="#9d174d" fontFamily="Nunito, sans-serif">47 + 38 = 85</text>
            </svg>
          </div>

        </div>

        {/* ── Try It ── */}
        <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 mt-2 print-card">
          <p className="font-fredoka text-base text-pink-500 mb-1.5" style={{ fontWeight: 900 }}>Try It Yourself!</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { q: "36 + 47", a: "83" },
              { q: "58 + 25", a: "83" },
              { q: "49 + 34", a: "83" },
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
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl px-5 py-2 mt-2 print-card">
          <span className="font-fredoka text-sm text-rose-500 font-extrabold mr-1">Remember!</span>
          <span className="font-nunito text-xs text-rose-800 font-bold">
            When ones total is <span className="text-rose-500">10 or more</span>, rename — e.g. 15 = 1 ten + 5 ones ✓ &nbsp; trade that ten into the tens column!
          </span>
        </div>

        <PageFooter data={footerData} />
      </div>

      <PrintButton />
    </main>
  );
}
