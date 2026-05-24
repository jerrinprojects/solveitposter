// Near Squares Poster — derive adjacent facts from known squares

// n=3 through n=9 (7 rows)
const ROWS = [3, 4, 5, 6, 7, 8, 9];

const ROW_COLORS: Record<number, { accent: string; dark: string; bg: string }> = {
  3: { accent: '#6ee7b7', dark: '#065f46', bg: '#ecfdf5' },
  4: { accent: '#a5b4fc', dark: '#3730a3', bg: '#eef2ff' },
  5: { accent: '#fde68a', dark: '#78350f', bg: '#fffbeb' },
  6: { accent: '#fbb6ce', dark: '#9d174d', bg: '#fdf2f8' },
  7: { accent: '#93c5fd', dark: '#1e40af', bg: '#eff6ff' },
  8: { accent: '#6ee7b7', dark: '#065f46', bg: '#f0fdfa' },
  9: { accent: '#c4b5fd', dark: '#4c1d95', bg: '#f5f3ff' },
};

const ROW_H   = 72; // px per row
const ROW_GAP = 9;  // gap between rows

function LeftBox({ n, accent, dark }: { n: number; accent: string; dark: string }) {
  const result = n * (n - 1);
  return (
    <div style={{
      height: ROW_H,
      flex: 1,
      backgroundColor: '#f9fafb',
      border: '1.5px solid #e5e7eb',
      borderRadius: 9,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '4px 8px',
    }}>
      <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, lineHeight: 1 }}>
        {n} × {n - 1} =
      </span>
      <span style={{
        fontFamily: 'var(--font-display), sans-serif',
        fontSize: 38, fontWeight: 700, color: '#9ca3af', lineHeight: 1,
      }}>
        {result}
      </span>
    </div>
  );
}

function SquareBox({ n, accent, dark }: { n: number; accent: string; dark: string }) {
  const result = n * n;
  return (
    <div style={{
      height: ROW_H,
      flex: '0 0 260px',
      backgroundColor: accent,
      border: `2px solid ${dark}44`,
      borderRadius: 11,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2px 8px',
      boxShadow: `0 3px 12px ${accent}88`,
      position: 'relative',
    }}>
      {/* Square badge */}
      <span style={{
        fontSize: 10, fontWeight: 800, color: dark,
        backgroundColor: 'rgba(255,255,255,0.45)',
        borderRadius: 20, padding: '1px 8px',
        letterSpacing: '0.06em', marginBottom: 2,
      }}>
        ■ {n}² = {n}×{n}
      </span>
      <span style={{
        fontFamily: 'var(--font-display), sans-serif',
        fontSize: 44, fontWeight: 700, color: dark, lineHeight: 1,
      }}>
        {result}
      </span>
    </div>
  );
}

function NearBox({ n, accent, dark, bg }: { n: number; accent: string; dark: string; bg: string }) {
  const sq = n * n;
  const result = n * (n + 1);
  return (
    <div style={{
      height: ROW_H,
      flex: 1,
      backgroundColor: bg,
      border: `2px solid ${accent}`,
      borderRadius: 9,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '4px 8px',
    }}>
      <span style={{ fontSize: 11, color: dark, fontWeight: 600, lineHeight: 1 }}>
        {n} × {n + 1} =
      </span>
      <span style={{
        fontFamily: 'var(--font-display), sans-serif',
        fontSize: 38, fontWeight: 700, color: dark, lineHeight: 1,
      }}>
        {result}
      </span>
      <span style={{
        fontSize: 9, color: `${dark}88`, fontWeight: 700, lineHeight: 1, marginTop: 2,
      }}>
        {sq} + {n}
      </span>
    </div>
  );
}

function ArrowGap({ label, dir }: { label: string; dir: '←' | '→' }) {
  return (
    <div style={{
      width: 64, flexShrink: 0,
      height: ROW_H,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 2,
    }}>
      <span style={{ fontSize: 9, fontWeight: 800, color: '#6b7280', letterSpacing: '0.04em' }}>
        {label}
      </span>
      <span style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1 }}>{dir}</span>
    </div>
  );
}

export default function NearSquares() {
  return (
    <div style={{ padding: '12px 20px 10px' }}>

      {/* ── Concept banner ── */}
      <div style={{
        backgroundColor: '#fafafa',
        border: '1.5px solid #e5e7eb',
        borderRadius: 10,
        padding: '8px 16px',
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: '#374151' }}>
          ■ Know a square?
        </span>
        <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>
          Add one group to get the <strong style={{ color: '#374151' }}>next</strong> fact.&nbsp;&nbsp;
          Subtract one group to get the <strong style={{ color: '#374151' }}>previous</strong> fact.
        </span>
        <span style={{
          marginLeft: 'auto',
          fontSize: 12, fontWeight: 700, color: '#9ca3af',
          fontFamily: 'var(--font-display), sans-serif',
          letterSpacing: '0.03em',
        }}>
          n×n ± n = n×(n±1)
        </span>
      </div>

      {/* ── Rows ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: ROW_GAP }}>
        {ROWS.map(n => {
          const { accent, dark, bg } = ROW_COLORS[n];
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <LeftBox n={n} accent={accent} dark={dark} />
              <ArrowGap label={`−${n}`} dir="←" />
              <SquareBox n={n} accent={accent} dark={dark} />
              <ArrowGap label={`+${n}`} dir="→" />
              <NearBox n={n} accent={accent} dark={dark} bg={bg} />
            </div>
          );
        })}
      </div>

    </div>
  );
}
