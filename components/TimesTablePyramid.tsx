'use client';

// ── Equilateral triangles ────────────────────────────────────────────────────
// Portrait content width = 760 − 40px padding = 720px
// 9 tiles (max row = ×2: 1 label + 8 facts) + 8 gaps
// TILE_W=76, H_GAP=4 → 9×76 + 8×4 = 684+32 = 716px ✓
// TILE_H = TILE_W × √3/2 = 76 × 0.866 ≈ 66px  (true equilateral)
//
// Layout: each row is LEFT-offset by (n-2) tiles so labels form left diagonal,
// and all rows share the SAME right edge → perfect right-triangle pyramid.
// Row ×n  offset = (n−2) × (TILE_W+GAP), tiles = (11−n)  [1 label + (10−n) facts]

const TILE_W  = 76;
const TILE_H  = Math.round(TILE_W * Math.sqrt(3) / 2); // 66
const H_GAP   = 4;
const V_GAP   = 4;

const ROWS = [9, 8, 7, 6, 5, 4, 3, 2] as const;

interface C {
  fill: string; stroke: string; result: string; factor: string;
  labelFill: string; labelText: string;
}
const COL: Record<number, C> = {
  9: { fill:'#fecdd3', stroke:'#fb7185', result:'#be123c', factor:'#9f1239', labelFill:'#f43f5e', labelText:'#fff' },
  8: { fill:'#ddd6fe', stroke:'#a78bfa', result:'#5b21b6', factor:'#4c1d95', labelFill:'#8b5cf6', labelText:'#fff' },
  7: { fill:'#bfdbfe', stroke:'#60a5fa', result:'#1e40af', factor:'#1e3a8a', labelFill:'#3b82f6', labelText:'#fff' },
  6: { fill:'#a7f3d0', stroke:'#34d399', result:'#065f46', factor:'#064e3b', labelFill:'#10b981', labelText:'#fff' },
  5: { fill:'#fef08a', stroke:'#facc15', result:'#713f12', factor:'#78350f', labelFill:'#eab308', labelText:'#fff' },
  4: { fill:'#bbf7d0', stroke:'#4ade80', result:'#14532d', factor:'#166534', labelFill:'#22c55e', labelText:'#fff' },
  3: { fill:'#fed7aa', stroke:'#fb923c', result:'#7c2d12', factor:'#9a3412', labelFill:'#f97316', labelText:'#fff' },
  2: { fill:'#fecaca', stroke:'#f87171', result:'#7f1d1d', factor:'#991b1b', labelFill:'#ef4444', labelText:'#fff' },
};

// Triangle SVG — upward-pointing equilateral
// Points: apex at top-centre, base at bottom
const pts = (w: number, h: number, pad = 1.5) =>
  `${w/2},${pad} ${pad},${h-pad} ${w-pad},${h-pad}`;

function LabelTile({ n, c }: { n: number; c: C }) {
  return (
    <svg width={TILE_W} height={TILE_H} viewBox={`0 0 ${TILE_W} ${TILE_H}`} style={{ display:'block', flexShrink:0 }}>
      <polygon points={pts(TILE_W, TILE_H)} fill={c.labelFill} stroke={c.stroke} strokeWidth="2.5" strokeLinejoin="round"/>
      <text
        x={TILE_W/2} y={TILE_H*0.62}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="Fredoka,sans-serif" fontWeight="700" fontSize="18" fill={c.labelText}
      >×{n}</text>
    </svg>
  );
}

function FactTile({ n, m, c }: { n: number; m: number; c: C }) {
  const result = n * m;
  const big = result >= 100;
  return (
    <svg width={TILE_W} height={TILE_H} viewBox={`0 0 ${TILE_W} ${TILE_H}`} style={{ display:'block', flexShrink:0 }}>
      <polygon points={pts(TILE_W, TILE_H)} fill={c.fill} stroke={c.stroke} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* product at apex zone */}
      <text
        x={TILE_W/2} y={TILE_H*0.42}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="Fredoka,sans-serif" fontWeight="700" fontSize={big ? 14 : 18} fill={c.result}
      >{result}</text>
      {/* left factor */}
      <text
        x={TILE_W*0.22} y={TILE_H*0.82}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="Nunito,sans-serif" fontWeight="800" fontSize="11" fill={c.factor}
      >{n}</text>
      {/* right factor */}
      <text
        x={TILE_W*0.78} y={TILE_H*0.82}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="Nunito,sans-serif" fontWeight="800" fontSize="11" fill={c.factor}
      >{m}</text>
    </svg>
  );
}

export default function TimesTablePyramid() {
  const step = TILE_W + H_GAP;

  return (
    <div>
      {/* ── Key ── */}
      <div style={{
        display:'flex', alignItems:'center', gap:12, marginBottom:10,
        paddingLeft: 7 * step,   // align under ×9 tile
      }}>
        <svg width={44} height={38} viewBox="0 0 44 38">
          <polygon points="22,2 2,36 42,36" fill="#fecdd3" stroke="#fb7185" strokeWidth="2.5" strokeLinejoin="round"/>
          <text x="22" y="16" textAnchor="middle" dominantBaseline="middle" fontFamily="Fredoka,sans-serif" fontWeight="700" fontSize="12" fill="#be123c">56</text>
          <text x="10" y="31" textAnchor="middle" dominantBaseline="middle" fontFamily="Nunito,sans-serif" fontWeight="800" fontSize="8.5" fill="#9f1239">7</text>
          <text x="34" y="31" textAnchor="middle" dominantBaseline="middle" fontFamily="Nunito,sans-serif" fontWeight="800" fontSize="8.5" fill="#9f1239">8</text>
        </svg>
        <div style={{
          fontFamily:'var(--font-body),sans-serif', fontSize:10.5, fontWeight:700,
          color:'#9d174d', lineHeight:1.65,
        }}>
          <b style={{color:'#be123c'}}>top</b> = product &nbsp;·&nbsp; <b style={{color:'#be123c'}}>corners</b> = factors<br/>
          7×8 = <b>56</b> &nbsp;→&nbsp; <b>56</b>÷7=8 &nbsp;and&nbsp; <b>56</b>÷8=7
        </div>
      </div>

      {/* ── Pyramid ── */}
      <div style={{ display:'flex', flexDirection:'column', gap:V_GAP }}>
        {ROWS.map((n) => {
          // offset left so all rows share the same RIGHT edge → labels form left diagonal
          const offsetPx = (n - 2) * step;
          const facts = Array.from({ length: 10 - n }, (_, i) => n + i); // n, n+1 … 9
          const c = COL[n];
          return (
            <div key={n} style={{ display:'flex', gap:H_GAP, marginLeft: offsetPx }}>
              <LabelTile n={n} c={c} />
              {facts.map((m) => <FactTile key={m} n={n} m={m} c={c} />)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
