import PrintButton from "@/components/PrintButton";
import PageFooter from "@/components/PageFooter";

const footerData = { brand: "Solveitmaths.com" };

export default function ShapeDimensionsPage() {
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
                MEASUREMENT
              </h1>
              <h2 className="font-fredoka text-base sm:text-xl text-gray-700 mt-0.5" style={{ fontWeight: 900 }}>
                Length, Width &amp; Height of Shapes
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
            Every shape has dimensions we can measure. Knowing the correct name helps us describe and calculate accurately.
          </span>
        </div>

        {/* ── Shape Cards ── */}
        <div className="space-y-2">

          {/* Rectangle */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-3 print-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>1</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Rectangle</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* SVG */}
              <svg viewBox="0 0 300 180" className="w-full max-w-xs mx-auto block flex-shrink-0" overflow="visible">
                {/* Rectangle shape */}
                <rect x="50" y="40" width="200" height="100" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="3"/>

                {/* Length arrow — bottom */}
                <line x1="50" y1="158" x2="250" y2="158" stroke="#8b5cf6" strokeWidth="2"/>
                <line x1="50" y1="152" x2="50" y2="164" stroke="#8b5cf6" strokeWidth="2"/>
                <line x1="250" y1="152" x2="250" y2="164" stroke="#8b5cf6" strokeWidth="2"/>
                <rect x="110" y="148" width="80" height="20" rx="4" fill="#ede9fe"/>
                <text x="150" y="163" textAnchor="middle" fontSize="13" fontWeight="900" fill="#6d28d9" fontFamily="Fredoka One, sans-serif">length</text>

                {/* Width arrow — right side */}
                <line x1="264" y1="40" x2="264" y2="140" stroke="#ec4899" strokeWidth="2"/>
                <line x1="258" y1="40" x2="270" y2="40" stroke="#ec4899" strokeWidth="2"/>
                <line x1="258" y1="140" x2="270" y2="140" stroke="#ec4899" strokeWidth="2"/>
                <rect x="268" y="82" width="26" height="36" rx="4" fill="#fce7f3"/>
                <text x="281" y="97" textAnchor="middle" fontSize="11" fontWeight="900" fill="#be185d" fontFamily="Fredoka One, sans-serif">w</text>
                <text x="281" y="113" textAnchor="middle" fontSize="11" fontWeight="900" fill="#be185d" fontFamily="Fredoka One, sans-serif">i</text>

                {/* Example values */}
                <text x="150" y="97" textAnchor="middle" fontSize="16" fontWeight="700" fill="#7c3aed" fontFamily="Nunito, sans-serif">8 cm</text>

                {/* Right side label full */}
                <text x="292" y="93" textAnchor="start" fontSize="10" fontWeight="900" fill="#be185d" fontFamily="Fredoka One, sans-serif">width</text>
                {/* remove the split w/i, replace with rotated text */}
              </svg>

              {/* Labels */}
              <div className="space-y-2 text-left">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-purple-400 mt-1 flex-shrink-0"></span>
                  <div>
                    <p className="font-fredoka text-base text-purple-700" style={{ fontWeight: 900 }}>Length</p>
                    <p className="font-nunito text-xs text-gray-600 font-semibold">The longer side — measured along the bottom.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-pink-400 mt-1 flex-shrink-0"></span>
                  <div>
                    <p className="font-fredoka text-base text-pink-600" style={{ fontWeight: 900 }}>Width</p>
                    <p className="font-nunito text-xs text-gray-600 font-semibold">The shorter side — measured across.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Square */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-3 print-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>2</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Square</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* SVG */}
              <svg viewBox="0 0 300 180" className="w-full max-w-xs mx-auto block flex-shrink-0" overflow="visible">
                {/* Square shape — centered */}
                <rect x="75" y="30" width="120" height="120" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="3"/>

                {/* Side tick marks — all 4 sides equal */}
                {/* bottom */}
                <line x1="128" y1="155" x2="142" y2="155" stroke="#16a34a" strokeWidth="2"/>
                <line x1="135" y1="150" x2="135" y2="160" stroke="#16a34a" strokeWidth="2"/>
                {/* top */}
                <line x1="128" y1="25" x2="142" y2="25" stroke="#16a34a" strokeWidth="2"/>
                <line x1="135" y1="20" x2="135" y2="30" stroke="#16a34a" strokeWidth="2"/>
                {/* left */}
                <line x1="69" y1="83" x2="69" y2="97" stroke="#16a34a" strokeWidth="2"/>
                <line x1="64" y1="90" x2="74" y2="90" stroke="#16a34a" strokeWidth="2"/>
                {/* right */}
                <line x1="201" y1="83" x2="201" y2="97" stroke="#16a34a" strokeWidth="2"/>
                <line x1="196" y1="90" x2="206" y2="90" stroke="#16a34a" strokeWidth="2"/>

                {/* Length arrow bottom */}
                <line x1="75" y1="165" x2="195" y2="165" stroke="#8b5cf6" strokeWidth="2"/>
                <line x1="75" y1="159" x2="75" y2="171" stroke="#8b5cf6" strokeWidth="2"/>
                <line x1="195" y1="159" x2="195" y2="171" stroke="#8b5cf6" strokeWidth="2"/>
                <rect x="105" y="155" width="60" height="18" rx="4" fill="#ede9fe"/>
                <text x="135" y="169" textAnchor="middle" fontSize="12" fontWeight="900" fill="#6d28d9" fontFamily="Fredoka One, sans-serif">length</text>

                {/* Width arrow right */}
                <line x1="210" y1="30" x2="210" y2="150" stroke="#ec4899" strokeWidth="2"/>
                <line x1="204" y1="30" x2="216" y2="30" stroke="#ec4899" strokeWidth="2"/>
                <line x1="204" y1="150" x2="216" y2="150" stroke="#ec4899" strokeWidth="2"/>
                <rect x="215" y="80" width="44" height="20" rx="4" fill="#fce7f3"/>
                <text x="237" y="95" textAnchor="middle" fontSize="12" fontWeight="900" fill="#be185d" fontFamily="Fredoka One, sans-serif">width</text>

                {/* Equal label */}
                <text x="135" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="#16a34a" fontFamily="Nunito, sans-serif">5 cm</text>
              </svg>

              {/* Labels */}
              <div className="space-y-2 text-left">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-400 mt-1 flex-shrink-0"></span>
                  <div>
                    <p className="font-fredoka text-base text-green-700" style={{ fontWeight: 900 }}>All sides equal</p>
                    <p className="font-nunito text-xs text-gray-600 font-semibold">The tick marks show all 4 sides are the same length.</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                  <p className="font-nunito text-xs font-bold text-green-700">In a square: <span className="text-purple-600">length</span> = <span className="text-pink-500">width</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Triangle */}
          <div className="bg-white border-2 border-pink-200 rounded-xl px-5 py-3 print-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-pink-500 text-white font-fredoka text-base rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 900 }}>3</span>
              <p className="font-fredoka text-base text-gray-700" style={{ fontWeight: 900 }}>Triangle</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* SVG */}
              <svg viewBox="0 0 300 190" className="w-full max-w-xs mx-auto block flex-shrink-0" overflow="visible">
                {/* Triangle shape — apex at (150,25), base at (55,145) to (245,145) */}
                <polygon points="150,25 55,145 245,145" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3"/>

                {/* Height — dashed vertical from apex to base */}
                <line x1="150" y1="28" x2="150" y2="142" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,4"/>
                {/* Right-angle box at base */}
                <rect x="150" y="127" width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="1.5"/>

                {/* Height arrow */}
                <line x1="168" y1="28" x2="168" y2="142" stroke="#ef4444" strokeWidth="1.5"/>
                <line x1="162" y1="28" x2="174" y2="28" stroke="#ef4444" strokeWidth="1.5"/>
                <line x1="162" y1="142" x2="174" y2="142" stroke="#ef4444" strokeWidth="1.5"/>
                <rect x="173" y="75" width="50" height="20" rx="4" fill="#fee2e2"/>
                <text x="198" y="90" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b91c1c" fontFamily="Fredoka One, sans-serif">height</text>

                {/* Base arrow — below triangle */}
                <line x1="55" y1="162" x2="245" y2="162" stroke="#f59e0b" strokeWidth="2"/>
                <line x1="55" y1="156" x2="55" y2="168" stroke="#f59e0b" strokeWidth="2"/>
                <line x1="245" y1="156" x2="245" y2="168" stroke="#f59e0b" strokeWidth="2"/>
                <rect x="115" y="152" width="70" height="20" rx="4" fill="#fef3c7"/>
                <text x="150" y="167" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b45309" fontFamily="Fredoka One, sans-serif">base</text>

                {/* Right angle note */}
                <text x="130" y="126" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ef4444" fontFamily="Nunito, sans-serif">90°</text>
              </svg>

              {/* Labels */}
              <div className="space-y-2 text-left">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-amber-400 mt-1 flex-shrink-0"></span>
                  <div>
                    <p className="font-fredoka text-base text-amber-700" style={{ fontWeight: 900 }}>Base</p>
                    <p className="font-nunito text-xs text-gray-600 font-semibold">The bottom side the triangle sits on.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-400 mt-1 flex-shrink-0"></span>
                  <div>
                    <p className="font-fredoka text-base text-red-600" style={{ fontWeight: 900 }}>Height</p>
                    <p className="font-nunito text-xs text-gray-600 font-semibold">The perpendicular distance from the base straight up to the top point. Always a right angle (90°).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Remember ── */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl px-5 py-2 mt-2 print-card">
          <span className="font-fredoka text-sm text-amber-600 font-extrabold mr-1">Remember!</span>
          <span className="font-nunito text-xs text-amber-800 font-bold">
            <span className="text-purple-600">Length</span> and <span className="text-pink-500">width</span> are the two sides of a rectangle or square. In a triangle, <span className="text-amber-600">base</span> is the bottom side and <span className="text-red-500">height</span> goes straight up at 90°.
          </span>
        </div>

        <PageFooter data={footerData} />
      </div>

      <PrintButton />
    </main>
  );
}
