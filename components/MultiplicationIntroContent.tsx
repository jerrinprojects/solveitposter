'use client';

import React from 'react';

// ── Shared ───────────────────────────────────────────────────────────────────

function SectionCard({
  title, accent, bg, children, style,
}: { title: string; accent: string; bg: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: bg, border: `2.5px solid ${accent}`, borderRadius: 14,
      padding: '12px 16px', gap: 10, ...style,
    }}>
      <div style={{
        fontFamily: 'var(--font-display),sans-serif',
        fontSize: 18, fontWeight: 700, color: accent,
        borderBottom: `2px solid ${accent}40`, paddingBottom: 7, flexShrink: 0,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Caption({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{
      fontFamily: 'var(--font-body),sans-serif',
      fontSize: 13, fontWeight: 700, color: color ?? '#6b7280',
      textAlign: 'center', margin: 0, flexShrink: 0,
    }}>
      {children}
    </p>
  );
}

// ── Page 1: What is Multiplication? ─────────────────────────────────────────

export function WhatIsMultiplicationContent() {
  return (
    <div style={{
      padding: '16px 22px 14px',
      display: 'flex', flexDirection: 'column', gap: 14,
      flex: 1, minHeight: 0, overflow: 'hidden',
    }}>

      {/* Top: labelled equation */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <TermBox value="4" label="factor" bg="#fce7f3" border="#f472b6" text="#9d174d" />
        <OpGlyph>×</OpGlyph>
        <TermBox value="3" label="factor" bg="#fce7f3" border="#f472b6" text="#9d174d" />
        <OpGlyph>=</OpGlyph>
        <TermBox value="12" label="product" bg="#f0fdfa" border="#0d9488" text="#0f766e" />
      </div>

      {/* Three visual models — fills remaining height */}
      <div style={{ display: 'flex', gap: 14, flex: 1, minHeight: 0, overflow: 'hidden' }}>

        {/* Equal Groups */}
        <SectionCard title="① Equal Groups" accent="#f472b6" bg="#fdf2f8">
          {/* Groups visual — fills card */}
          <div style={{
            flex: 1, display: 'flex', gap: 8, justifyContent: 'center',
            alignItems: 'center', padding: '4px 0',
          }}>
            {[0,1,2,3].map((g) => (
              <div key={g} style={{
                flex: 1, maxWidth: 86, borderRadius: 12,
                background: 'white', border: '3px solid #f472b6',
                display: 'flex', flexWrap: 'wrap', gap: 6,
                padding: '10px 8px', alignContent: 'center', justifyContent: 'center',
                aspectRatio: '1 / 1.3',
              }}>
                {[0,1,2].map((d) => (
                  <div key={d} style={{
                    width: '38%', aspectRatio: '1',
                    borderRadius: '50%', background: '#f472b6',
                  }}/>
                ))}
              </div>
            ))}
          </div>
          <Caption color="#9d174d">"4 groups of 3"</Caption>
          <div style={{
            textAlign: 'center', flexShrink: 0,
            fontFamily: 'var(--font-body),sans-serif', fontSize: 15, color: '#9d174d', fontWeight: 800,
          }}>
            3 + 3 + 3 + 3 = <strong style={{ fontSize: 17 }}>12</strong>
          </div>
        </SectionCard>

        {/* Array */}
        <SectionCard title="② Array" accent="#0d9488" bg="#f0fdfa">
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            gap: 10, alignItems: 'center', justifyContent: 'center',
          }}>
            {(['#fb7185','#fb923c','#facc15','#4ade80'] as const).map((col, r) => (
              <div key={r} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-body),sans-serif', fontSize: 11, fontWeight: 700,
                  color: '#9ca3af', width: 16, textAlign: 'right',
                }}>
                  {r+1}
                </span>
                {[0,1,2].map((c) => (
                  <div key={c} style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: col, border: '2px solid rgba(0,0,0,0.08)',
                  }}/>
                ))}
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, paddingLeft: 26 }}>
              {[1,2,3].map((c) => (
                <span key={c} style={{
                  fontFamily: 'var(--font-body),sans-serif', fontSize: 11, fontWeight: 700,
                  color: '#9ca3af', width: 34, textAlign: 'center',
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <Caption color="#0f766e">"4 rows × 3 columns"</Caption>
          <div style={{
            textAlign: 'center', flexShrink: 0,
            fontFamily: 'var(--font-body),sans-serif', fontSize: 15, color: '#0f766e', fontWeight: 800,
          }}>
            4 rows of 3 = <strong style={{ fontSize: 17 }}>12</strong>
          </div>
        </SectionCard>

        {/* Skip Counting */}
        <SectionCard title="③ Skip Counting" accent="#7c3aed" bg="#f5f3ff">
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SkipCountViz jump={3} steps={4} />
          </div>
          <Caption color="#6d28d9">"Count by 3s, four times"</Caption>
          <div style={{
            textAlign: 'center', flexShrink: 0,
            fontFamily: 'var(--font-body),sans-serif', fontSize: 15, color: '#6d28d9', fontWeight: 800,
          }}>
            3 → 6 → 9 → <strong style={{ fontSize: 17 }}>12</strong>
          </div>
        </SectionCard>

      </div>

      {/* Key idea */}
      <div style={{
        flexShrink: 0,
        background: 'linear-gradient(135deg,#fdf2f8,#fce7f3)',
        border: '2.5px solid #f9a8d4', borderRadius: 12,
        padding: '12px 24px', textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-body),sans-serif',
          fontSize: 15, fontWeight: 700, color: '#9d174d',
        }}>
          Multiplication is a <strong>fast way</strong> to count{' '}
          <strong>equal groups</strong> — all three models show the same thing!
        </span>
      </div>

    </div>
  );
}

function TermBox({ value, label, bg, border, text }:
  { value: string; label: string; bg: string; border: string; text: string }) {
  return (
    // position:relative so the label can sit below without affecting flex alignment
    <div style={{ position: 'relative', paddingBottom: 20 }}>
      <div style={{
        width: 82, height: 82, borderRadius: 14, background: bg, border: `3px solid ${border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-display),sans-serif', fontSize: 48, fontWeight: 700,
          color: text, lineHeight: 1,
        }}>
          {value}
        </span>
      </div>
      {/* absolute label — doesn't affect flex item height */}
      <span style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center',
        fontFamily: 'var(--font-body),sans-serif', fontSize: 10, fontWeight: 800, color: text,
        textTransform: 'uppercase', letterSpacing: '0.12em',
      }}>
        {label}
      </span>
    </div>
  );
}

function OpGlyph({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: 'var(--font-display),sans-serif', fontSize: 44, fontWeight: 700,
      color: '#d1d5db', lineHeight: 1, userSelect: 'none',
    }}>
      {children}
    </span>
  );
}

function SkipCountViz({ jump, steps }: { jump: number; steps: number }) {
  const W = 320, H = 140;
  const PAD = 24;
  const max = jump * steps;
  const lineY = 100;
  const mx = (n: number) => PAD + (n / max) * (W - 2 * PAD);
  const arrowColors = ['#f472b6', '#f97316', '#eab308', '#7c3aed'];

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', maxWidth: '100%' }}>
      <defs>
        {arrowColors.map((c, i) => (
          <marker key={i} id={`ah${i}`} markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill={c}/>
          </marker>
        ))}
      </defs>

      {/* Base line */}
      <line x1={PAD} y1={lineY} x2={W - PAD + 6} y2={lineY} stroke="#e5e7eb" strokeWidth="2.5"/>
      <polygon points={`${W-PAD+6},${lineY-5} ${W-PAD+14},${lineY} ${W-PAD+6},${lineY+5}`} fill="#e5e7eb"/>

      {/* Marks & numbers */}
      {Array.from({ length: steps + 1 }, (_, i) => {
        const val = i * jump;
        const x = mx(val);
        return (
          <g key={i}>
            <line x1={x} y1={lineY - 7} x2={x} y2={lineY + 7} stroke="#9ca3af" strokeWidth="2"/>
            <text x={x} y={lineY + 22} textAnchor="middle"
              fontFamily="Fredoka,sans-serif" fontWeight="700" fontSize="18" fill="#374151">
              {val}
            </text>
          </g>
        );
      })}

      {/* Jump arcs */}
      {Array.from({ length: steps }, (_, i) => {
        const x1 = mx(i * jump);
        const x2 = mx((i + 1) * jump);
        const midX = (x1 + x2) / 2;
        const c = arrowColors[i];
        return (
          <g key={i}>
            <path
              d={`M ${x1 + 2} ${lineY - 4} Q ${midX} ${lineY - 55} ${x2 - 3} ${lineY - 4}`}
              fill="none" stroke={c} strokeWidth="2.5"
              markerEnd={`url(#ah${i})`}
            />
            <text x={midX} y={lineY - 58}
              textAnchor="middle" fontFamily="Nunito,sans-serif" fontWeight="800" fontSize="14" fill={c}>
              +{jump}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Page 2: Repeated Addition → Times Tables ─────────────────────────────────

const TABLE_N = 3;
const CHIP_COLORS = [
  '#f472b6','#f97316','#facc15','#4ade80',
  '#22d3ee','#818cf8','#c084fc','#fb7185',
  '#34d399','#60a5fa',
];

export function RepeatedAdditionContent() {
  return (
    <div style={{
      padding: '16px 22px 14px',
      display: 'flex', flexDirection: 'column', gap: 12,
      flex: 1, minHeight: 0, overflow: 'hidden',
    }}>

      {/* Concept banner */}
      <div style={{
        flexShrink: 0,
        background: 'linear-gradient(135deg,#fdf2f8,#fce7f3)',
        border: '2.5px solid #f9a8d4', borderRadius: 12,
        padding: '10px 24px', textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-body),sans-serif', fontSize: 15, fontWeight: 700, color: '#9d174d',
        }}>
          Multiplication = <strong>Repeated Addition</strong>
          &ensp;—&ensp; adding the same number again and again!
        </span>
      </div>

      {/* Connecting example */}
      <div style={{
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 12, flexWrap: 'wrap',
        background: '#fdf4ff', border: '2.5px solid #e879f9', borderRadius: 12, padding: '10px 24px',
      }}>
        <span style={{ fontFamily: 'var(--font-display),sans-serif', fontSize: 26, fontWeight: 700, color: '#a21caf' }}>
          4 × 3 =
        </span>
        <span style={{ fontFamily: 'var(--font-body),sans-serif', fontSize: 17, fontWeight: 700, color: '#9ca3af' }}>
          3 + 3 + 3 + 3
        </span>
        <span style={{ fontFamily: 'var(--font-display),sans-serif', fontSize: 26, fontWeight: 700, color: '#a21caf' }}>
          = 12
        </span>
        <span style={{ fontFamily: 'var(--font-body),sans-serif', fontSize: 12, fontWeight: 600, color: '#c026d3' }}>
          (4 groups of 3)
        </span>
      </div>

      {/* Number line */}
      <SectionCard title={`Number Line — counting by ${TABLE_N}s (0 to 30)`} accent="#0d9488" bg="#f0fdfa" style={{ flexShrink: 0 }}>
        <BigNumberLine steps={10} jump={TABLE_N} />
      </SectionCard>

      {/* Building the ×3 table — fills remaining height */}
      <SectionCard title={`Building the ×${TABLE_N} Table`} accent="#7c3aed" bg="#f5f3ff" style={{ flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[1,2,3,4,5].map((n) => <TableRow key={n} n={n} />)}
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[6,7,8,9,10].map((n) => <TableRow key={n} n={n} />)}
          </div>
        </div>
      </SectionCard>

    </div>
  );
}

function BigNumberLine({ steps, jump }: { steps: number; jump: number }) {
  const W = 980, H = 72;
  const PAD = 24;
  const max = jump * steps;
  const lineY = 46;
  const mx = (n: number) => PAD + (n / max) * (W - 2 * PAD);

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      <defs>
        {CHIP_COLORS.map((c, i) => (
          <marker key={i} id={`bah${i}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c}/>
          </marker>
        ))}
      </defs>
      <line x1={PAD} y1={lineY} x2={W - PAD + 6} y2={lineY} stroke="#d1d5db" strokeWidth="2.5"/>
      <polygon points={`${W-PAD+6},${lineY-5} ${W-PAD+16},${lineY} ${W-PAD+6},${lineY+5}`} fill="#d1d5db"/>
      {Array.from({ length: steps + 1 }, (_, i) => {
        const val = i * jump;
        const x = mx(val);
        const c = i > 0 ? CHIP_COLORS[i-1] : '#9ca3af';
        return (
          <g key={i}>
            <line x1={x} y1={lineY - (i > 0 ? 10 : 6)} x2={x} y2={lineY + 6} stroke={c} strokeWidth="2"/>
            <text x={x} y={lineY + 20} textAnchor="middle"
              fontFamily="Fredoka,sans-serif" fontWeight="700" fontSize="15" fill={c}>
              {val}
            </text>
          </g>
        );
      })}
      {Array.from({ length: steps }, (_, i) => {
        const x1 = mx(i * jump);
        const x2 = mx((i + 1) * jump);
        return (
          <path key={i}
            d={`M ${x1 + 2} ${lineY - 3} Q ${(x1+x2)/2} ${lineY - 28} ${x2 - 2} ${lineY - 3}`}
            fill="none" stroke={CHIP_COLORS[i]} strokeWidth="2"
            markerEnd={`url(#bah${i})`}
          />
        );
      })}
      <text x={mx(jump * 5)} y={8}
        textAnchor="middle" fontFamily="Nunito,sans-serif" fontWeight="800" fontSize="12" fill="#9ca3af">
        +{jump} each jump
      </text>
    </svg>
  );
}

function TableRow({ n }: { n: number }) {
  const result = n * TABLE_N;
  const addStr = Array.from({ length: n }, () => TABLE_N).join(' + ');
  const chipColor = CHIP_COLORS[n - 1];

  return (
    <div style={{
      flex: 1,
      display: 'flex', alignItems: 'center', gap: 8,
      background: 'white', borderRadius: 8,
      border: `1.5px solid ${chipColor}50`,
      padding: '4px 10px',
    }}>
      <span style={{
        fontFamily: 'var(--font-display),sans-serif', fontSize: 17, fontWeight: 700,
        color: '#374151', minWidth: 68, flexShrink: 0,
      }}>
        {n} × {TABLE_N} =
      </span>
      <div style={{ display: 'flex', gap: 2, alignItems: 'center', flexShrink: 0 }}>
        {Array.from({ length: n }, (_, i) => (
          <div key={i} style={{
            width: 22, height: 22, borderRadius: 5, background: chipColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'var(--font-display),sans-serif', fontSize: 12, fontWeight: 700, color: 'white' }}>
              {TABLE_N}
            </span>
          </div>
        ))}
      </div>
      <span style={{
        fontFamily: 'var(--font-body),sans-serif', fontSize: 10, fontWeight: 700, color: '#9ca3af',
        flex: 1, minWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
      }}>
        = {addStr}
      </span>
      <span style={{
        fontFamily: 'var(--font-display),sans-serif', fontSize: 20, fontWeight: 700,
        color: chipColor, minWidth: 32, textAlign: 'right', flexShrink: 0,
      }}>
        {result}
      </span>
    </div>
  );
}
