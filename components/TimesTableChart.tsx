// Times Table Chart — clean strip layout, greyscale-friendly

const N = 10;

// ×2 comes after ×5
const LEARNING_ORDER = [1, 10, 5, 2, 3, 4, 6, 7, 8, 9];

const RANK: Record<number, number> = {};
LEARNING_ORDER.forEach((n, i) => { RANK[n] = i; });

// Brand 4-color rotation (pink / mint / sunny / grape) cycled across 10 columns
const ACCENT   = ['#ec407a','#a78bda','#14b8a6','#e8a93e','#ec407a','#a78bda','#14b8a6','#e8a93e','#ec407a','#a78bda'];
const HEAD_TXT = ['#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#fff'  ];
const RESULT   = ['#d6336c','#7c3aed','#0d9488','#b8860b','#d6336c','#7c3aed','#0d9488','#b8860b','#d6336c','#7c3aed'];

function getNewFacts(n: number): { a: number; result: number }[] {
  const rn = RANK[n];
  return Array.from({ length: N }, (_, i) => i + 1)
    .filter(a => RANK[a] >= rn)
    .sort((x, y) => x - y)
    .map(a => ({ a, result: a * n }));
}

const CW  = 96;
const CH  = 46;
const HH  = 42;
const GAP = 7;

export default function TimesTableChart() {
  const columns = LEARNING_ORDER.map((n, idx) => ({
    n, idx,
    accent: ACCENT[idx],
    headTxt: HEAD_TXT[idx],
    resultColor: RESULT[idx],
    facts: getNewFacts(n),
    label: `×${n}`,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* ── Columns ── */}
      <div style={{ display: 'flex', gap: GAP, alignItems: 'flex-start' }}>
        {columns.map(({ n, idx, accent, headTxt, resultColor, facts, label }) => (
          <div key={n} style={{ width: CW, flexShrink: 0 }}>

            {/* Header */}
            <div style={{
              height: HH,
              backgroundColor: accent,
              borderRadius: '10px 10px 0 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: 22,
                fontWeight: 700,
                color: headTxt,
                lineHeight: 1,
              }}>
                {label}
              </span>
              <span style={{ fontSize: 9, color: headTxt, opacity: 0.85, fontWeight: 700, marginTop: 1 }}>
                {facts.length} new
              </span>
            </div>

            {/* Fact cells */}
            {facts.map(({ a, result }, fi) => (
              <div key={a} style={{
                height: CH,
                backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafbff',
                borderLeft: `4px solid ${accent}`,
                borderBottom: `1px solid #e5e7eb`,
                borderRight: `1px solid #e5e7eb`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0,
                borderRadius: fi === facts.length - 1 ? '0 0 8px 8px' : 0,
              }}>
                {/* n × a — column number FIRST */}
                <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, lineHeight: 1 }}>
                  {n}×{a}
                </span>
                <span style={{ fontSize: 19, color: resultColor, fontWeight: 900, lineHeight: 1.2 }}>
                  {result}
                </span>
              </div>
            ))}

            {/* Spacer to keep columns top-aligned */}
            {Array.from({ length: N - facts.length }, (_, i) => (
              <div key={`s${i}`} style={{ height: CH }} />
            ))}
          </div>
        ))}
      </div>

      {/* ── Note ── */}
      <p style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>
        Only <strong style={{ color: '#374151' }}>new facts</strong> shown per table — facts already covered by earlier tables are not repeated.
      </p>
    </div>
  );
}
