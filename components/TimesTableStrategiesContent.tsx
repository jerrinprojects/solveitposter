// Times Table Strategies — 2-page poster content

const N = 10;

// ── Shared ────────────────────────────────────────────────────────

function PanelShell({ borderColor, headerBg, title, subtitle, children }: {
  borderColor: string; headerBg: string;
  title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <div style={{ flex: 1, border: `2px solid ${borderColor}`, borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ backgroundColor: headerBg, padding: '10px 18px' }}>
        <div style={{
          fontFamily: 'var(--font-display), sans-serif',
          fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1,
        }}>
          {title}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.92)', fontWeight: 700, marginTop: 3 }}>
          {subtitle}
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Doubling: ×2 → ×4 → ×8 ──────────────────────────────────────

const DUP = [
  { mult: 2, bg: '#eff6ff', border: '#bfdbfe', text: '#1e3a8a', headBg: '#93c5fd', headText: '#1e3a8a' },
  { mult: 4, bg: '#dbeafe', border: '#93c5fd', text: '#1e40af', headBg: '#60a5fa', headText: '#fff'    },
  { mult: 8, bg: '#bfdbfe', border: '#3b82f6', text: '#1e3a8a', headBg: '#3b82f6', headText: '#fff'    },
];

const TRIP = [
  { mult: 3, bg: '#fdf2f8', border: '#fbcfe8', text: '#831843', headBg: '#f9a8d4', headText: '#831843' },
  { mult: 6, bg: '#fbcfe8', border: '#f472b6', text: '#9d174d', headBg: '#f472b6', headText: '#fff'    },
];

// cell dimensions
const CELL_H  = 44;
const LABEL_W = 34;   // width of "×2" between cells

// panel inner width = 505 - 32 padding = 473
// doubling:  3 cells + 2 labels → CW = (473-2×34)/3 = 135
// tripling:  2 cells + 1 label  → CW = (473-34)/2 = 219
const CW_DUP  = 135;
const CW_TRIP = 219;

function ColHeaderLabel({ label, bg, color, cw }: {
  label: string; bg: string; color: string; cw: number;
}) {
  return (
    <div style={{
      width: cw, height: 30,
      backgroundColor: bg, borderRadius: '8px 8px 0 0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: 'var(--font-display), sans-serif',
        fontSize: 18, fontWeight: 700, color, lineHeight: 1,
      }}>
        {label}
      </span>
    </div>
  );
}

function FactBox({ n, mult, bg, border, text, cw }: {
  n: number; mult: number; bg: string; border: string; text: string; cw: number;
}) {
  return (
    <div style={{
      width: cw, height: CELL_H,
      backgroundColor: bg,
      border: `2px solid ${border}`,
      borderRadius: 10,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 10, color: text === '#fff' ? 'rgba(255,255,255,0.75)' : '#9ca3af', fontWeight: 600, lineHeight: 1 }}>
        {n}×{mult}=
      </span>
      <span style={{ fontSize: 21, fontWeight: 900, color: text, lineHeight: 1.1 }}>
        {n * mult}
      </span>
    </div>
  );
}

function MultLabel({ label }: { label: string }) {
  return (
    <div style={{
      width: LABEL_W, flexShrink: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 1,
    }}>
      <span style={{ fontSize: 10, fontWeight: 800, color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1 }}>→</span>
    </div>
  );
}

function FamilyGrid({ cols, cw }: {
  cols: typeof DUP; cw: number;
}) {
  return (
    <div style={{ padding: '0 16px 12px' }}>
      {/* Column headers */}
      <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 4 }}>
        {cols.map((col, ci) => (
          <div key={col.mult} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <ColHeaderLabel label={`×${col.mult}`} bg={col.headBg} color={col.headText} cw={cw} />
            {ci < cols.length - 1 && <div style={{ width: LABEL_W }} />}
          </div>
        ))}
      </div>
      {/* Data rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {Array.from({ length: N }, (_, i) => i + 1).map(n => (
          <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
            {cols.map((col, ci) => (
              <div key={col.mult} style={{ display: 'flex', alignItems: 'center' }}>
                <FactBox n={n} mult={col.mult} bg={col.bg} border={col.border} text={col.text} cw={cw} />
                {ci < cols.length - 1 && <MultLabel label="×2" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DoublingTriplingContent() {
  return (
    <div style={{ padding: '10px 20px 10px', display: 'flex', gap: 12 }}>

      <PanelShell
        borderColor="#60a5fa"
        headerBg="#3b82f6"
        title="Doubling Family"
        subtitle="×2 → ×4 → ×8"
      >
        <div style={{ padding: '8px 0 0', backgroundColor: '#f0f9ff' }}>
          <p style={{ fontSize: 11, color: '#1e40af', fontWeight: 700, padding: '0 18px 6px', lineHeight: 1.4 }}>
            Know ×2? <strong>Double it</strong> to get ×4. Double again for ×8!
          </p>
          <FamilyGrid cols={DUP} cw={CW_DUP} />
        </div>
      </PanelShell>

      <PanelShell
        borderColor="#f9a8d4"
        headerBg="#db2777"
        title="Tripling Family"
        subtitle="×3 → ×6"
      >
        <div style={{ padding: '8px 0 0', backgroundColor: '#fdf2f8' }}>
          <p style={{ fontSize: 11, color: '#831843', fontWeight: 700, padding: '0 18px 6px', lineHeight: 1.4 }}>
            Know ×3? <strong>Double it</strong> to get ×6!
          </p>
          <FamilyGrid cols={TRIP} cw={CW_TRIP} />
        </div>
      </PanelShell>

    </div>
  );
}

// ── Page 2: Complete Chart ×1–×9 ─────────────────────────────────

const CHART_ACCENTS  = ['#94a3b8','#f472b6','#60a5fa','#34d399','#a78bfa','#fb923c','#fbbf24','#e879f9','#6366f1'];
const CHART_HEAD_TXT = ['#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#78350f','#fff',   '#fff'  ];
const CHART_RESULT   = ['#475569','#9d174d','#1e40af','#065f46','#4c1d95','#9a3412','#78350f','#86198f','#3730a3'];

const CHART_CW  = 107;
const CHART_CH  = 50;
const CHART_HH  = 44;
const CHART_GAP = 7;

export function CompleteChartContent() {
  const columns = Array.from({ length: 9 }, (_, i) => {
    const n = i + 1;
    return {
      n,
      accent: CHART_ACCENTS[i],
      headTxt: CHART_HEAD_TXT[i],
      resultColor: CHART_RESULT[i],
      facts: Array.from({ length: 10 }, (_, fi) => ({ a: fi + 1, result: (fi + 1) * n })),
    };
  });

  return (
    <div style={{ padding: '14px 20px 10px' }}>
      <div style={{ display: 'flex', gap: CHART_GAP }}>
        {columns.map(({ n, accent, headTxt, resultColor, facts }) => (
          <div key={n} style={{ width: CHART_CW, flexShrink: 0 }}>
            <div style={{
              height: CHART_HH, backgroundColor: accent,
              borderRadius: '10px 10px 0 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: 22, fontWeight: 700, color: headTxt, lineHeight: 1,
              }}>
                ×{n}
              </span>
            </div>
            {facts.map(({ a, result }, fi) => (
              <div key={a} style={{
                height: CHART_CH,
                backgroundColor: fi % 2 === 0 ? '#ffffff' : '#fafbff',
                borderLeft: `4px solid ${accent}`,
                borderBottom: `1px solid #e5e7eb`,
                borderRight: `1px solid #e5e7eb`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                borderRadius: fi === 9 ? '0 0 8px 8px' : 0,
              }}>
                <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, lineHeight: 1 }}>
                  {n}×{a}
                </span>
                <span style={{ fontSize: 19, color: resultColor, fontWeight: 900, lineHeight: 1.2 }}>
                  {result}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
