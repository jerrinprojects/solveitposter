// Times Table Patterns Poster

// Brand-aligned palette (matches Tricky 12 — pink / mint / sunny / grape rotation).
// Names kept for backwards-compat with card refs; values map to brand accents.
const ACCENT = {
  teal:   '#14b8a6', // mint (Card 1 Commutative)
  blue:   '#a78bda', // grape (Card 2 Doubling)
  purple: '#ec407a', // pink  (Card 3 ×9 Patterns)
  orange: '#e8a93e', // sunny (Card 4 ×5 ×10)
  green:  '#14b8a6', // mint  (Card 5 Squares)
  pink:   '#a78bda', // grape (Card 6 Tripling)
};
const DARK = {
  teal:   '#0d9488',
  blue:   '#7c3aed',
  purple: '#d6336c',
  orange: '#b8860b',
  green:  '#0d9488',
  pink:   '#7c3aed',
};
// Card bg washes for each accent
const SOFT = {
  teal:   '#e6fbf5', // mint bg
  blue:   '#f3edff', // grape bg
  purple: '#fff0f7', // pink bg
  orange: '#fff7d9', // sunny bg
  green:  '#e6fbf5', // mint bg
  pink:   '#f3edff', // grape bg
};

function Card({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div style={{
      borderRadius: 20,
      border: `2px solid ${color}`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fffaf3',
      boxShadow: '0 2px 0 rgba(0,0,0,0.04)',
    }}>
      {children}
    </div>
  );
}

function CardHead({ title, subtitle, color }: { title: string; subtitle?: string; color: string }) {
  return (
    <div style={{ backgroundColor: color, padding: '7px 12px' }}>
      <div style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.88)', fontWeight: 700, marginTop: 1 }}>{subtitle}</div>
      )}
    </div>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '10px 12px', flex: 1 }}>{children}</div>
  );
}

// ── Card 1: Commutative Law ───────────────────────────────────────
function CommutativeCard() {
  return (
    <Card color={ACCENT.teal}>
      <CardHead title="Commutative Law" subtitle="a × b = b × a" color={ACCENT.teal} />
      <CardBody>
        <p style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, marginBottom: 7, lineHeight: 1.4 }}>
          3×7 is the same as 7×3 — so you only need to learn{' '}
          <strong style={{ color: DARK.teal }}>half the table!</strong>
        </p>
        {/* Mini 10×10 grid */}
        <div>
          {Array.from({ length: 10 }, (_, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 1, marginBottom: 1 }}>
              {Array.from({ length: 10 }, (_, ci) => {
                const isDiag = ci === ri;
                const isAbove = ci < ri;
                return (
                  <div key={ci} style={{
                    width: 22, height: 15,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, fontWeight: 700,
                    borderRadius: 3,
                    backgroundColor: isDiag ? ACCENT.teal : isAbove ? '#f3f4f6' : '#e6fbf5',
                    color: isDiag ? '#fff' : isAbove ? '#d1d5db' : DARK.teal,
                  }}>
                    {(ri + 1) * (ci + 1)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {/* Legend */}
        <div style={{ marginTop: 7, display: 'flex', gap: 10, fontSize: 9, fontWeight: 600, flexWrap: 'wrap' }}>
          {[
            { bg: ACCENT.teal, border: 'none', color: '#fff', label: 'Squares (n×n)' },
            { bg: '#e6fbf5', border: `1px solid ${ACCENT.teal}`, color: DARK.teal, label: 'Learn these' },
            { bg: '#f3f4f6', border: 'none', color: '#9ca3af', label: 'Covered by earlier row' },
          ].map(({ bg, border, color, label }) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: bg, border, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ color }}>{label}</span>
            </span>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

// ── Card 2: ×2 → ×4 → ×8 Doubling Chain ─────────────────────────
function DoublingCard() {
  const examples = [3, 5, 6, 7];
  return (
    <Card color={ACCENT.blue}>
      <CardHead title="Doubling Family" subtitle="×2 → ×4 → ×8" color={ACCENT.blue} />
      <CardBody>
        <p style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>
          Know ×2? <strong style={{ color: DARK.blue }}>Double it</strong> to get ×4.{' '}
          Double again for ×8!
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {examples.map(n => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {[2, 4, 8].map((mult, mi) => (
                <div key={mult} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{
                    background: mi === 2 ? `${ACCENT.blue}44` : `${ACCENT.blue}18`,
                    border: `1.5px solid ${mi === 2 ? DARK.blue : ACCENT.blue}`,
                    borderRadius: 7,
                    padding: '3px 8px',
                    textAlign: 'center',
                    minWidth: 48,
                  }}>
                    <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 600, lineHeight: 1 }}>{n}×{mult}=</div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: DARK.blue, lineHeight: 1.1 }}>{n * mult}</div>
                  </div>
                  {mi < 2 && (
                    <span style={{ fontSize: 10, color: ACCENT.blue, fontWeight: 800 }}>×2</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

// ── Card 3: ×9 Patterns ───────────────────────────────────────────
function NinesCard() {
  const multiples = Array.from({ length: 10 }, (_, i) => {
    const result = (i + 1) * 9;
    return { n: i + 1, result, tens: Math.floor(result / 10), ones: result % 10 };
  });
  return (
    <Card color={ACCENT.purple}>
      <CardHead title="×9 Patterns" subtitle="two tricks in one" color={ACCENT.purple} />
      <CardBody>
        <p style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, marginBottom: 7, lineHeight: 1.4 }}>
          Tens go <strong style={{ color: DARK.purple }}>↑</strong>, ones go{' '}
          <strong style={{ color: DARK.purple }}>↓</strong>. Digits always add to{' '}
          <strong style={{ color: DARK.purple }}>9</strong>.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {multiples.map(({ n, tens, ones }) => (
            <div key={n} style={{
              backgroundColor: '#fff0f7',
              border: `1.5px solid ${ACCENT.purple}66`,
              borderRadius: 6,
              padding: '3px 6px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 600, lineHeight: 1 }}>{n}×9</div>
              <div style={{ fontSize: 16, fontWeight: 900, lineHeight: 1.1 }}>
                <span style={{ color: DARK.purple }}>{tens}</span>
                <span style={{ color: ACCENT.purple }}>{ones}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, backgroundColor: '#fff0f7', borderRadius: 7, padding: '5px 8px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: DARK.purple }}>
            Shortcut: 9×n = (10×n) − n
          </span>
          <div style={{ fontSize: 9, color: '#6b7280', fontWeight: 600, marginTop: 1 }}>
            e.g. 9×7 = 70 − 7 = 63
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// ── Card 4: ×5 and ×10 ───────────────────────────────────────────
function FivesAndTensCard() {
  return (
    <Card color={ACCENT.orange}>
      <CardHead title="×5 and ×10" subtitle="the easiest tables" color={ACCENT.orange} />
      <CardBody>
        <div style={{ display: 'flex', gap: 10 }}>
          {/* ×10 */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: DARK.orange, marginBottom: 5 }}>×10 — Add a Zero</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'baseline', gap: 2, fontSize: 12 }}>
                  <span style={{ color: '#9ca3af', fontWeight: 600, minWidth: 28, fontSize: 10 }}>{n}×10=</span>
                  <span style={{ fontWeight: 900, color: DARK.orange }}>
                    {n}<span style={{ color: ACCENT.orange, fontSize: 14 }}>0</span>
                  </span>
                </div>
              ))}
              <span style={{ fontSize: 9, color: '#9ca3af', fontWeight: 600 }}>…and so on</span>
            </div>
          </div>
          <div style={{ width: 1, backgroundColor: '#f3edff', flexShrink: 0 }} />
          {/* ×5 */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: DARK.orange, marginBottom: 5 }}>×5 = Half of ×10</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[2, 4, 6, 8, 10].map(n => (
                <div key={n} style={{ fontSize: 10, color: '#6b7280', fontWeight: 600 }}>
                  {n}×10={n * 10} ÷2=<strong style={{ color: DARK.orange, fontSize: 11 }}> {n * 5}</strong>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 6, backgroundColor: '#fff7d9', borderRadius: 6, padding: '4px 7px', fontSize: 9, fontWeight: 700, color: DARK.orange }}>
              Always ends in <strong>0</strong> or <strong>5</strong>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// ── Card 5: Square Numbers ────────────────────────────────────────
function SquaresCard() {
  const squares = Array.from({ length: 10 }, (_, i) => ({ n: i + 1, sq: (i + 1) ** 2 }));
  return (
    <Card color={ACCENT.green}>
      <CardHead title="Square Numbers" subtitle="n × n — the diagonal" color={ACCENT.green} />
      <CardBody>
        <p style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, marginBottom: 7, lineHeight: 1.4 }}>
          These 10 facts sit on the <strong style={{ color: DARK.green }}>diagonal</strong> of every times table chart.
          Learn them — they come up everywhere!
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {squares.map(({ n, sq }) => (
            <div key={n} style={{
              backgroundColor: '#e6fbf5',
              border: `2px solid ${ACCENT.green}`,
              borderRadius: 8,
              padding: '4px 8px',
              textAlign: 'center',
              minWidth: 38,
            }}>
              <div style={{ fontSize: 9, color: '#6b7280', fontWeight: 700 }}>{n}²</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: DARK.green, lineHeight: 1 }}>{sq}</div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

// ── Card 6: ×3 → ×6 Tripling ─────────────────────────────────────
function TriplingCard() {
  const examples = [4, 5, 6, 7];
  return (
    <Card color={ACCENT.pink}>
      <CardHead title="Tripling Family" subtitle="×3 → ×6" color={ACCENT.pink} />
      <CardBody>
        <p style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>
          Know ×3? <strong style={{ color: DARK.pink }}>Double it</strong> to get ×6!
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {examples.map(n => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                background: `${ACCENT.pink}18`,
                border: `1.5px solid ${ACCENT.pink}`,
                borderRadius: 7,
                padding: '3px 8px',
                textAlign: 'center',
                minWidth: 52,
              }}>
                <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 600, lineHeight: 1 }}>{n}×3=</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: DARK.pink, lineHeight: 1.1 }}>{n * 3}</div>
              </div>
              <span style={{ fontSize: 11, color: ACCENT.pink, fontWeight: 800 }}>×2 →</span>
              <div style={{
                background: `${ACCENT.pink}33`,
                border: `2px solid ${DARK.pink}`,
                borderRadius: 7,
                padding: '3px 8px',
                textAlign: 'center',
                minWidth: 52,
              }}>
                <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 600, lineHeight: 1 }}>{n}×6=</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: DARK.pink, lineHeight: 1.1 }}>{n * 6}</div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

// ── Main Export ───────────────────────────────────────────────────
export default function TimesTablePatterns() {
  return (
    <div style={{ padding: '14px 20px 10px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
      }}>
        <CommutativeCard />
        <DoublingCard />
        <NinesCard />
        <FivesAndTensCard />
        <SquaresCard />
        <TriplingCard />
      </div>
    </div>
  );
}
