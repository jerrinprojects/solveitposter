import PrintButton from "@/components/PrintButton";
import PageFooter from "@/components/PageFooter";

const footerData = { brand: "Solveitmaths.com" };

export default function SubtractionOnesPage() {
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
      <div className="poster-page max-w-4xl mx-auto px-3 sm:px-5 py-3">

        {/* ── Header ── */}
        <header className="mb-3 print-card">
          <div className="bg-pink-200 rounded-2xl px-4 sm:px-6 py-3 text-center relative overflow-visible">
            <div className="pr-16 sm:pr-20">
              <h1 className="font-fredoka text-2xl sm:text-4xl text-pink-600 leading-tight tracking-wide" style={{ fontWeight: 900, WebkitTextStroke: "1px #db2777" }}>
                SUBTRACTION
              </h1>
              <h2 className="font-fredoka text-base sm:text-xl text-gray-700 mt-0.5" style={{ fontWeight: 900 }}>
                Subtract from the Ones
              </h2>
            </div>
            <div className="absolute right-2 sm:right-3 bottom-0 pointer-events-none select-none">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/againsolveit.firebasestorage.app/o/Solvie_Number-removebg.png?alt=media&token=dec56a1b-bf95-4490-bb06-c642b8b9f753"
                alt="Solvie mascot"
                width={60}
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
            Keep the <span className="text-amber-500">tens</span>. Subtract only from the <span className="text-blue-500">ones</span>. Then put them back together.
          </span>
        </div>

        {/* ── Steps ── */}
        <div className="space-y-2">

          {/* Step 1 — Write the equation */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>1</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Write the equation</p>
            </div>
            <svg viewBox="0 0 480 68" className="w-full max-w-sm mx-auto block" aria-label="18 - 3 = ?">
              <rect x="60" y="6" width="88" height="52" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="104" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">18</text>
              <text x="178" y="40" textAnchor="middle" fontSize="32" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>
              <rect x="208" y="6" width="88" height="52" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="252" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">3</text>
              <text x="326" y="40" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="352" y="6" width="68" height="52" rx="12" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,3"/>
              <text x="386" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#7c3aed" fontFamily="Fredoka One, sans-serif">?</text>
            </svg>
          </div>

          {/* Step 2 — Break into tens and ones */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>2</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Break the first number into tens and ones</p>
            </div>
            <svg viewBox="0 0 480 118" className="w-full max-w-sm mx-auto block" aria-label="18 splits into 10 and 8">
              {/* Branch lines */}
              <line x1="220" y1="50" x2="188" y2="68" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="260" y1="50" x2="292" y2="68" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
              {/* 18 box */}
              <rect x="200" y="6" width="80" height="44" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="240" y="36" textAnchor="middle" fontSize="26" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">18</text>
              {/* 10 box */}
              <rect x="154" y="72" width="68" height="34" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
              <text x="188" y="95" textAnchor="middle" fontSize="22" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">10</text>
              <text x="188" y="114" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706" fontFamily="Nunito, sans-serif">TENS</text>
              {/* 8 box */}
              <rect x="264" y="72" width="56" height="34" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
              <text x="292" y="95" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">8</text>
              <text x="292" y="114" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3b82f6" fontFamily="Nunito, sans-serif">ONES</text>
            </svg>
          </div>

          {/* Step 3 — Subtract from the ones */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>3</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Subtract from the ones</p>
            </div>
            <svg viewBox="0 0 480 68" className="w-full max-w-sm mx-auto block" aria-label="8 - 3 = 5">
              <rect x="60" y="6" width="88" height="52" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5"/>
              <text x="104" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#1e40af" fontFamily="Fredoka One, sans-serif">8</text>
              <text x="178" y="40" textAnchor="middle" fontSize="32" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">−</text>
              <rect x="208" y="6" width="88" height="52" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5"/>
              <text x="252" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#166534" fontFamily="Fredoka One, sans-serif">3</text>
              <text x="326" y="40" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="352" y="6" width="68" height="52" rx="12" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="386" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">5</text>
            </svg>
          </div>

          {/* Step 4 — Put tens back */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 print-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>4</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Add the tens back</p>
            </div>
            <svg viewBox="0 0 480 72" className="w-full max-w-md mx-auto block" aria-label="10 + 5 = 15">
              <rect x="45" y="8" width="80" height="46" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="85" y="38" textAnchor="middle" fontSize="26" fontWeight="900" fill="#92400e" fontFamily="Fredoka One, sans-serif">10</text>
              <text x="143" y="38" textAnchor="middle" fontSize="26" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">+</text>
              <rect x="161" y="8" width="56" height="46" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5"/>
              <text x="189" y="38" textAnchor="middle" fontSize="26" fontWeight="900" fill="#9d174d" fontFamily="Fredoka One, sans-serif">5</text>
              <text x="235" y="38" textAnchor="middle" fontSize="26" fontWeight="700" fill="#9ca3af" fontFamily="Fredoka One, sans-serif">=</text>
              <rect x="255" y="2" width="86" height="58" rx="14" fill="#db2777" stroke="#9d174d" strokeWidth="3"/>
              <text x="298" y="40" textAnchor="middle" fontSize="34" fontWeight="900" fill="white" fontFamily="Fredoka One, sans-serif">15</text>
              <text x="355" y="24" fontSize="15" fontWeight="900" fill="#db2777" fontFamily="Fredoka One, sans-serif">Answer!</text>
              <text x="355" y="44" fontSize="13" fontWeight="700" fill="#9d174d" fontFamily="Nunito, sans-serif">18 − 3 = 15</text>
            </svg>
          </div>

        </div>

        {/* ── Try It ── */}
        <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-2 mt-2 print-card">
          <p className="font-fredoka text-base text-pink-500 mb-1.5" style={{ fontWeight: 900 }}>Try It Yourself!</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { q: "17 − 5", a: "12" },
              { q: "19 − 4", a: "15" },
              { q: "16 − 3", a: "13" },
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
            Use this when the ones digit is <span className="text-amber-600">bigger</span> than the number you subtract — e.g. 18 − 3 (8 &gt; 3) ✓
          </span>
        </div>

        <PageFooter data={footerData} />
      </div>

      <PrintButton />
    </main>
  );
}
