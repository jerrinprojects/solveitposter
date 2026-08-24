/* Static SVG previews for every Rational Numbers Phase 1 skill (Y1–Y3).
 * Built from the shared RationalSvg primitives so all fractions render
 * with consistent geometry and the same pink palette as the existing
 * Number Structures posters.
 *
 * Add a new preview → drop the component into the right Year section
 * and register it in MAP at the bottom (and add the code to
 * HAS_RATIONAL_PREVIEW in SectionBlock).
 */
import React from "react";
import {
  PieFraction,
  BarFraction,
  FractionLabel,
  NumberLine,
  GroupShare,
  EqualsArrow,
  Caption,
  TenthsStrip,
  DecimalGrid,
  DecimalNumberLine,
  PercentBar,
  RatioBar,
  MixedNumberVis,
  SimplifyArrow,
  SimplifyVisual,
  ScaleArrow,
  OpsBlock,
  CompareSymbol,
  FractionMultGrid,
  DivByUnitFraction,
  FractionDivByWhole,
  LCDFractions,
  ThousandthsBar,
  PINK_DEEP,
  PINK_MID,
  PINK_SOFT,
  PINK_PALE,
  INK,
  MUTED,
} from "./RationalSvg";

/* ── Layout shell — centers content in the preview card */
const Frame: React.FC<{
  children: React.ReactNode;
  bg?: string;
  pad?: number;
}> = ({ children, bg = PINK_PALE, pad = 14 }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      minHeight: 148,
      background: bg,
      borderRadius: 14,
      padding: pad,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);

const Row: React.FC<{
  children: React.ReactNode;
  gap?: number;
}> = ({ children, gap = 12 }) => (
  <div style={{ display: "flex", alignItems: "center", gap, flexWrap: "wrap", justifyContent: "center" }}>
    {children}
  </div>
);

const Col: React.FC<{ children: React.ReactNode; gap?: number }> = ({
  children,
  gap = 4,
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap }}>
    {children}
  </div>
);

/* ════════════════════════════════════════════════════════════════════
 * YEAR 1 (4 skills) — Halves & Quarters
 * ════════════════════════════════════════════════════════════════════ */

const P1_1: React.FC = () => (
  <Frame>
    <Row gap={20}>
      <Col><PieFraction num={1} den={2} size={70} /><FractionLabel num={1} den={2} size={14} color={PINK_DEEP} /></Col>
      <Col><PieFraction num={1} den={4} size={70} /><FractionLabel num={1} den={4} size={14} color={PINK_DEEP} /></Col>
    </Row>
    <Caption>Spot halves and quarters</Caption>
  </Frame>
);

const P1_2: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 800, color: INK }}>
      6 cookies → 2 plates
    </div>
    <Row gap={28}>
      <PlateOfDots count={3} />
      <PlateOfDots count={3} />
    </Row>
    <Caption color={PINK_DEEP}>3 + 3 = a fair half</Caption>
  </Frame>
);

const P1_3: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 800, color: INK }}>
      8 apples → 4 plates
    </div>
    <Row gap={12}>
      {[0, 1, 2, 3].map((i) => (
        <PlateOfDots key={i} count={2} small />
      ))}
    </Row>
    <Caption color={PINK_DEEP}>2 + 2 + 2 + 2 = a fair quarter</Caption>
  </Frame>
);

const P1_4: React.FC = () => (
  <Frame>
    <Row gap={4}>
      <PlateOfDots count={4} small />
      <EqualsArrow symbol="→" />
      <Col gap={4}>
        <Row gap={6}>
          <PlateOfDots count={2} mini />
          <PlateOfDots count={2} mini />
        </Row>
      </Col>
      <EqualsArrow symbol="→" />
      <Col gap={4}>
        <Row gap={6}>
          <PlateOfDots count={1} mini />
          <PlateOfDots count={1} mini />
          <PlateOfDots count={1} mini />
          <PlateOfDots count={1} mini />
        </Row>
      </Col>
    </Row>
    <Caption>4 → half → half again = quarters</Caption>
  </Frame>
);

const PlateOfDots: React.FC<{ count: number; small?: boolean; mini?: boolean }> = ({
  count,
  small,
  mini,
}) => {
  const r = mini ? 6 : small ? 8 : 10;
  const gap = mini ? 4 : 6;
  const w = count * (r * 2) + (count - 1) * gap + 12;
  const h = r * 2 + 12;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x={1} y={1} width={w - 2} height={h - 2} rx={h / 2}
        fill="#fff" stroke={PINK_DEEP} strokeWidth={1.5} />
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          cx={6 + r + i * (r * 2 + gap)}
          cy={h / 2}
          r={r}
          fill={PINK_MID}
          stroke={PINK_DEEP}
          strokeWidth={1.5}
        />
      ))}
    </svg>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * YEAR 2 (7 skills) — Halves, Thirds, Quarters + Equivalent
 * ════════════════════════════════════════════════════════════════════ */

const P2_1: React.FC = () => (
  <Frame>
    <Row gap={14}>
      <Col><PieFraction num={1} den={2} size={62} /><FractionLabel num={1} den={2} size={13} color={PINK_DEEP} /></Col>
      <Col><PieFraction num={1} den={3} size={62} /><FractionLabel num={1} den={3} size={13} color={PINK_DEEP} /></Col>
      <Col><PieFraction num={1} den={4} size={62} /><FractionLabel num={1} den={4} size={13} color={PINK_DEEP} /></Col>
    </Row>
    <Caption>halves · thirds · quarters</Caption>
  </Frame>
);

const P2_2: React.FC = () => (
  <Frame>
    <Row gap={20}>
      <PieFraction num={1} den={3} size={70} />
      <Col>
        <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 800, color: INK }}>
          one third
        </div>
        <FractionLabel num={1} den={3} size={22} color={PINK_DEEP} />
      </Col>
    </Row>
    <Caption>match words and fractions</Caption>
  </Frame>
);

const P2_3: React.FC = () => (
  <Frame>
    <Col gap={4}>
      <Row gap={6}><BarFraction num={1} den={2} width={150} height={20} /><FractionLabel num={1} den={2} size={13} color={PINK_DEEP} /></Row>
      <Row gap={6}><BarFraction num={1} den={3} width={150} height={20} /><FractionLabel num={1} den={3} size={13} color={PINK_DEEP} /></Row>
      <Row gap={6}><BarFraction num={1} den={4} width={150} height={20} /><FractionLabel num={1} den={4} size={13} color={PINK_DEEP} /></Row>
    </Col>
    <Caption>which is bigger?</Caption>
  </Frame>
);

/* InlineFracExpr — flex row that lets a stacked FractionLabel sit
 * inline with surrounding text in a math expression (e.g. "⅓ of 12"). */
const InlineFracExpr: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
}> = ({ children, size = 14, color = INK }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: size, color,
  }}>
    {children}
  </div>
);

const P2_4: React.FC = () => (
  <Frame pad={10}>
    <InlineFracExpr>
      <FractionLabel num={1} den={3} size={12} color={INK} />
      <span>of 12</span>
    </InlineFracExpr>
    <GroupShare total={12} groups={3} dotSize={11} />
    <Caption color={PINK_DEEP}>4 in each group</Caption>
  </Frame>
);

/* FindWholeBar — unified bar model for "given fraction part, find whole".
 *
 * One bar split into `den` equal segments; the first `num` are pink-
 * filled. Per-segment value labels show "1 part = partValue / num",
 * so students can see the unit value directly. A top bracket marks the
 * shaded portion as "num/den = partValue"; a bottom bracket spans the
 * full bar with "whole = N". Used by Y2.5, Y3.7, Y5.5, Y6.5 to replace
 * the older two-row PlateOfDots layout that hid the relationship. */
const FindWholeBar: React.FC<{
  num: number;
  den: number;
  partValue: number;
  width?: number;
}> = ({ num, den, partValue, width = 250 }) => {
  const perPart = partValue / num;
  const whole = perPart * den;
  const padX = 18;
  const innerW = width - padX * 2;
  const segW = innerW / den;
  const barH = 26;
  // Layout — top label (stacked fraction needs vertical room),
  // bracket, bar, bottom bracket, whole label. Extra padding around
  // the stacked-fraction label so it never collides with the bar.
  const yLabelTop = 6;            // start of foreignObject (label region)
  const labelH = 30;              // height for stacked fraction + "= N"
  const yTopBracket = yLabelTop + labelH + 4;
  const yBar = yTopBracket + 6;
  const yBottomBracket = yBar + barH + 6;
  const yWholeLabel = yBottomBracket + 14;
  const shadedW = segW * num;
  const midShaded = padX + shadedW / 2;
  // Pretty-format per-part value (integer if whole, 1dp otherwise).
  const fmt = (v: number) =>
    Number.isInteger(v) ? `${v}` : `${Number(v.toFixed(1))}`;
  return (
    <svg width={width} height={yWholeLabel + 4}
      viewBox={`0 0 ${width} ${yWholeLabel + 4}`}>
      {/* top bracket — only over the shaded portion */}
      <g stroke={PINK_DEEP} strokeWidth={1.2} fill="none">
        <line x1={padX} y1={yTopBracket} x2={padX + shadedW} y2={yTopBracket} />
        <line x1={padX} y1={yTopBracket - 3} x2={padX} y2={yTopBracket + 3} />
        <line x1={padX + shadedW} y1={yTopBracket - 3} x2={padX + shadedW} y2={yTopBracket + 3} />
      </g>
      {/* stacked fraction "num/den = value" rendered via foreignObject so
          the numerator/denominator stack like a proper fraction. The
          region is sized generously (labelH) and centred over the
          shaded portion of the bar so it never touches the bracket. */}
      <foreignObject x={midShaded - 36} y={yLabelTop} width={72} height={labelH}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
          fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 12, color: PINK_DEEP,
          width: "100%", height: "100%",
        }}>
          <FractionLabel num={num} den={den} size={11} color={PINK_DEEP} />
          <span>= {fmt(partValue)}</span>
        </div>
      </foreignObject>
      {/* bar segments */}
      {Array.from({ length: den }, (_, i) => (
        <g key={i}>
          <rect x={padX + i * segW} y={yBar} width={segW} height={barH}
            fill={i < num ? PINK_MID : "#ffffff"}
            stroke={PINK_DEEP} strokeWidth={1.5} />
          <text x={padX + i * segW + segW / 2} y={yBar + barH / 2 + 4.5}
            textAnchor="middle" fontFamily="Fredoka, sans-serif"
            fontWeight={800} fontSize={12}
            fill={i < num ? "#ffffff" : INK}>
            {fmt(perPart)}
          </text>
        </g>
      ))}
      {/* bottom bracket — spans the whole bar */}
      <g stroke={INK} strokeWidth={1.1} fill="none">
        <line x1={padX} y1={yBottomBracket} x2={padX + innerW} y2={yBottomBracket} />
        <line x1={padX} y1={yBottomBracket - 3} x2={padX} y2={yBottomBracket + 3} />
        <line x1={padX + innerW} y1={yBottomBracket - 3} x2={padX + innerW} y2={yBottomBracket + 3} />
      </g>
      <text x={width / 2} y={yWholeLabel} textAnchor="middle"
        fontFamily="Fredoka, sans-serif" fontWeight={800} fontSize={12} fill={INK}>
        whole = {fmt(whole)}
      </text>
    </svg>
  );
};

const P2_5: React.FC = () => (
  <Frame>
    <FindWholeBar num={1} den={4} partValue={4} />
    <Caption color={PINK_DEEP}>4 ÷ 1 = 4 per part, then × 4 = 16</Caption>
  </Frame>
);

const P2_6: React.FC = () => (
  <Frame>
    <Row gap={10}>
      <PieFraction num={1} den={2} size={62} />
      <EqualsArrow />
      <PieFraction num={2} den={4} size={62} />
    </Row>
    <Row gap={20}>
      <FractionLabel num={1} den={2} size={20} color={PINK_DEEP} />
      <span style={{ fontSize: 22, color: PINK_DEEP, fontWeight: 800 }}>=</span>
      <FractionLabel num={2} den={4} size={20} color={PINK_DEEP} />
    </Row>
  </Frame>
);

const P2_7: React.FC = () => (
  <Frame>
    <PieFraction num={3} den={4} size={92} />
    <FractionLabel num={3} den={4} size={26} color={PINK_DEEP} />
    <Caption>three quarters</Caption>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * YEAR 3 (11 skills) — Unit Fractions, Number Line, +/−
 * ════════════════════════════════════════════════════════════════════ */

const P3_1: React.FC = () => (
  <Frame pad={10}>
    <Row gap={8}>
      <Col gap={2}><PieFraction num={1} den={2} size={42} /><FractionLabel num={1} den={2} size={12} color={PINK_DEEP} /></Col>
      <Col gap={2}><PieFraction num={1} den={3} size={42} /><FractionLabel num={1} den={3} size={12} color={PINK_DEEP} /></Col>
      <Col gap={2}><PieFraction num={1} den={4} size={42} /><FractionLabel num={1} den={4} size={12} color={PINK_DEEP} /></Col>
    </Row>
    <Row gap={8}>
      <Col gap={2}><PieFraction num={1} den={5} size={42} /><FractionLabel num={1} den={5} size={12} color={PINK_DEEP} /></Col>
      <Col gap={2}><PieFraction num={1} den={6} size={42} /><FractionLabel num={1} den={6} size={12} color={PINK_DEEP} /></Col>
      <Col gap={2}><PieFraction num={1} den={8} size={42} /><FractionLabel num={1} den={8} size={12} color={PINK_DEEP} /></Col>
    </Row>
  </Frame>
);

const P3_2: React.FC = () => (
  <Frame>
    <NumberLine width={260} height={68} divisions={4}
      marks={[
        { pos: 1 / 4, fraction: { num: 1, den: 4 } },
        { pos: 1 / 2, fraction: { num: 1, den: 2 } },
        { pos: 3 / 4, fraction: { num: 3, den: 4 } },
      ]} />
    <Caption>place fractions on a number line</Caption>
  </Frame>
);

const P3_3: React.FC = () => (
  <Frame pad={10}>
    <Col gap={3}>
      <Row gap={6}><BarFraction num={1} den={2} width={140} height={14} /><FractionLabel num={1} den={2} size={11} color={PINK_DEEP} /></Row>
      <Row gap={6}><BarFraction num={1} den={3} width={140} height={14} /><FractionLabel num={1} den={3} size={11} color={PINK_DEEP} /></Row>
      <Row gap={6}><BarFraction num={1} den={4} width={140} height={14} /><FractionLabel num={1} den={4} size={11} color={PINK_DEEP} /></Row>
      <Row gap={6}><BarFraction num={1} den={6} width={140} height={14} /><FractionLabel num={1} den={6} size={11} color={PINK_DEEP} /></Row>
      <Row gap={6}><BarFraction num={1} den={8} width={140} height={14} /><FractionLabel num={1} den={8} size={11} color={PINK_DEEP} /></Row>
    </Col>
  </Frame>
);

const P3_4: React.FC = () => (
  <Frame pad={10}>
    <Row gap={2}>
      <Col gap={2}><PieFraction num={1} den={2} size={44} /><FractionLabel num={1} den={2} size={12} color={PINK_DEEP} /></Col>
      <span style={{ fontSize: 18, color: PINK_DEEP, fontWeight: 800, padding: "0 2px" }}>=</span>
      <Col gap={2}><PieFraction num={2} den={4} size={44} /><FractionLabel num={2} den={4} size={12} color={PINK_DEEP} /></Col>
      <span style={{ fontSize: 18, color: PINK_DEEP, fontWeight: 800, padding: "0 2px" }}>=</span>
      <Col gap={2}><PieFraction num={3} den={6} size={44} /><FractionLabel num={3} den={6} size={12} color={PINK_DEEP} /></Col>
      <span style={{ fontSize: 18, color: PINK_DEEP, fontWeight: 800, padding: "0 2px" }}>=</span>
      <Col gap={2}><PieFraction num={4} den={8} size={44} /><FractionLabel num={4} den={8} size={12} color={PINK_DEEP} /></Col>
    </Row>
  </Frame>
);

const P3_5: React.FC = () => (
  <Frame>
    <Row gap={16}>
      <Col>
        <PieFraction num={1} den={6} size={66} />
        <FractionLabel num={1} den={6} size={16} color={PINK_DEEP} />
        <span style={{
          background: PINK_MID, color: "#fff", padding: "3px 10px",
          borderRadius: 999, fontFamily: "Fredoka, sans-serif",
          fontWeight: 800, fontSize: 11, marginTop: 2,
        }}>
          UNIT FRACTION ✓
        </span>
      </Col>
      <Col>
        <PieFraction num={5} den={6} size={66} />
        <FractionLabel num={5} den={6} size={16} color={PINK_DEEP} />
        <span style={{
          background: "#fee2e2", color: "#b91c1c", padding: "3px 10px",
          borderRadius: 999, fontFamily: "Fredoka, sans-serif",
          fontWeight: 800, fontSize: 11, marginTop: 2,
        }}>
          NOT UNIT ✗
        </span>
      </Col>
    </Row>
  </Frame>
);

const P3_6: React.FC = () => (
  <Frame pad={10}>
    <InlineFracExpr>
      <FractionLabel num={1} den={5} size={12} color={INK} />
      <span>of 20</span>
    </InlineFracExpr>
    <GroupShare total={20} groups={5} dotSize={9} highlightGroup={0} />
    <Caption color={PINK_DEEP}>= 4</Caption>
  </Frame>
);

const P3_7: React.FC = () => (
  <Frame>
    <FindWholeBar num={1} den={3} partValue={5} />
    <Caption color={PINK_DEEP}>5 ÷ 1 = 5 per part, then × 3 = 15</Caption>
  </Frame>
);

const P3_8: React.FC = () => (
  <Frame>
    <Row gap={8}>
      <BarFraction num={1} den={5} width={80} height={26} />
      <span style={{ fontSize: 22, color: PINK_DEEP, fontWeight: 800 }}>+</span>
      <BarFraction num={2} den={5} width={80} height={26} />
      <span style={{ fontSize: 22, color: PINK_DEEP, fontWeight: 800 }}>=</span>
      <BarFraction num={3} den={5} width={80} height={26} />
    </Row>
    <Row gap={6}>
      <FractionLabel num={1} den={5} size={16} color={PINK_DEEP} />
      <span style={{ fontSize: 18, color: PINK_DEEP, fontWeight: 800 }}>+</span>
      <FractionLabel num={2} den={5} size={16} color={PINK_DEEP} />
      <span style={{ fontSize: 18, color: PINK_DEEP, fontWeight: 800 }}>=</span>
      <FractionLabel num={3} den={5} size={16} color={PINK_DEEP} />
    </Row>
  </Frame>
);

const P3_9: React.FC = () => (
  <Frame>
    <Row gap={8}>
      <BarFraction num={4} den={6} width={90} height={26} />
      <span style={{ fontSize: 22, color: PINK_DEEP, fontWeight: 800 }}>−</span>
      <BarFraction num={1} den={6} width={90} height={26} />
      <span style={{ fontSize: 22, color: PINK_DEEP, fontWeight: 800 }}>=</span>
      <BarFraction num={3} den={6} width={90} height={26} />
    </Row>
    <Row gap={6}>
      <FractionLabel num={4} den={6} size={16} color={PINK_DEEP} />
      <span style={{ fontSize: 18, color: PINK_DEEP, fontWeight: 800 }}>−</span>
      <FractionLabel num={1} den={6} size={16} color={PINK_DEEP} />
      <span style={{ fontSize: 18, color: PINK_DEEP, fontWeight: 800 }}>=</span>
      <FractionLabel num={3} den={6} size={16} color={PINK_DEEP} />
    </Row>
  </Frame>
);

/* 3.10 "count in unit fractions up to 1" — sixths counting.
 * Custom SVG: tick marks at each sixth, stacked-fraction labels under
 * each, and a "+ ⅙" arc above each segment so students see the count
 * action explicitly. */
const P3_10: React.FC = () => {
  const w = 320;
  const padX = 24;
  const innerW = w - padX * 2;
  const yLine = 38;
  const xFor = (k: number) => padX + (k / 6) * innerW;
  // Stacked fraction label drawn directly in SVG (small num/den centred).
  const StackedFrac = ({ x, num, den }: { x: number; num: string; den: string }) => (
    <g>
      <text x={x} y={yLine + 22} textAnchor="middle"
        fontFamily="Fredoka, sans-serif" fontWeight={800} fontSize={11} fill={PINK_DEEP}>
        {num}
      </text>
      <line x1={x - 5} x2={x + 5} y1={yLine + 25} y2={yLine + 25}
        stroke={PINK_DEEP} strokeWidth={1.2} />
      <text x={x} y={yLine + 36} textAnchor="middle"
        fontFamily="Fredoka, sans-serif" fontWeight={800} fontSize={11} fill={PINK_DEEP}>
        {den}
      </text>
    </g>
  );
  return (
    <Frame>
      <svg width={w} height={84} viewBox={`0 0 ${w} 84`}>
        {/* axis with arrowheads */}
        <line x1={padX} y1={yLine} x2={w - padX} y2={yLine} stroke={INK} strokeWidth={2} />
        <polygon points={`${padX},${yLine} ${padX + 6},${yLine - 4} ${padX + 6},${yLine + 4}`} fill={INK} />
        <polygon points={`${w - padX},${yLine} ${w - padX - 6},${yLine - 4} ${w - padX - 6},${yLine + 4}`} fill={INK} />
        {/* ticks */}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={xFor(i)} x2={xFor(i)} y1={yLine - 5} y2={yLine + 5} stroke={INK} strokeWidth={1.5} />
        ))}
        {/* labels under each tick */}
        <text x={xFor(0)} y={yLine + 30} textAnchor="middle"
          fontFamily="Fredoka, sans-serif" fontWeight={800} fontSize={14} fill={INK}>0</text>
        <StackedFrac x={xFor(1)} num="1" den="6" />
        <StackedFrac x={xFor(2)} num="2" den="6" />
        <StackedFrac x={xFor(3)} num="3" den="6" />
        <StackedFrac x={xFor(4)} num="4" den="6" />
        <StackedFrac x={xFor(5)} num="5" den="6" />
        <text x={xFor(6)} y={yLine + 30} textAnchor="middle"
          fontFamily="Fredoka, sans-serif" fontWeight={800} fontSize={14} fill={INK}>1</text>
        {/* "+ ⅙" arcs above each segment */}
        {Array.from({ length: 6 }, (_, i) => {
          const x1 = xFor(i);
          const x2 = xFor(i + 1);
          const mid = (x1 + x2) / 2;
          const r = (x2 - x1) / 2;
          return (
            <g key={`arc-${i}`}>
              <path
                d={`M ${x1} ${yLine - 1} A ${r} ${r * 0.85} 0 0 1 ${x2} ${yLine - 1}`}
                fill="none" stroke={PINK_MID} strokeWidth={1.6}
              />
              <text x={mid} y={yLine - r * 0.7 - 1} textAnchor="middle"
                fontFamily="Fredoka, sans-serif" fontWeight={700} fontSize={9} fill={PINK_DEEP}>
                +⅙
              </text>
            </g>
          );
        })}
      </svg>
      <Caption color={PINK_DEEP}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          count by ⅙ to get to 1 whole (
          <FractionLabel num={6} den={6} size={12} color={PINK_DEEP} />
          )
        </span>
      </Caption>
    </Frame>
  );
};

const P3_11: React.FC = () => (
  <Frame>
    <Row gap={20}>
      <Col>
        <BarFraction num={3} den={8} width={110} height={30} />
        <FractionLabel num={3} den={8} size={16} color={PINK_DEEP} />
      </Col>
      <span style={{ fontSize: 26, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <Col>
        <BarFraction num={5} den={8} width={110} height={30} />
        <FractionLabel num={5} den={8} size={16} color={PINK_DEEP} />
      </Col>
    </Row>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * YEAR 4 (13 skills) — Simplify, Decimals (Tenths) & Scaling
 * ════════════════════════════════════════════════════════════════════ */

const P4_1: React.FC = () => (
  <Frame pad={10}>
    <SimplifyVisual num={4} den={8} divBy={4} simpNum={1} simpDen={2} size={18} />
    <SimplifyVisual num={6} den={9} divBy={3} simpNum={2} simpDen={3} size={18} />
    <Caption>divide top and bottom by the same number</Caption>
  </Frame>
);

const P4_2: React.FC = () => (
  <Frame pad={10}>
    <Row gap={8}>
      <Col gap={3}>
        <Row gap={4}>
          <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 18, color: PINK_DEEP }}>1</span>
          <FractionLabel num={1} den={4} size={14} color={PINK_DEEP} />
        </Row>
        <Caption>mixed</Caption>
      </Col>
      <EqualsArrow />
      <MixedNumberVis wholes={1} num={1} den={4} pieSize={40} />
      <EqualsArrow />
      <Col gap={3}>
        <FractionLabel num={5} den={4} size={16} color={PINK_DEEP} />
        <Caption>improper</Caption>
      </Col>
    </Row>
  </Frame>
);

const P4_3: React.FC = () => (
  <Frame>
    <NumberLine width={260} height={68} divisions={5}
      marks={[
        { pos: 1 / 5, fraction: { num: 1, den: 5 } },
        { pos: 3 / 5, fraction: { num: 3, den: 5 } },
      ]} />
    <Caption>place a fraction on a number line</Caption>
  </Frame>
);

const P4_4: React.FC = () => (
  <Frame>
    <Row gap={8}>
      <Col><BarFraction num={1} den={3} width={100} height={22} /><FractionLabel num={1} den={3} size={13} color={PINK_DEEP} /></Col>
      <CompareSymbol symbol=">" size={26} />
      <Col><BarFraction num={1} den={5} width={100} height={22} /><FractionLabel num={1} den={5} size={13} color={PINK_DEEP} /></Col>
    </Row>
    <Caption>same numerator — smaller denominator wins</Caption>
  </Frame>
);

const P4_5: React.FC = () => (
  <Frame pad={10}>
    <InlineFracExpr>
      <FractionLabel num={1} den={4} size={12} color={INK} />
      <span>of 16</span>
    </InlineFracExpr>
    <GroupShare total={16} groups={4} dotSize={10} highlightGroup={0} />
    <Caption color={PINK_DEEP}>= 4</Caption>
  </Frame>
);

const P4_6: React.FC = () => (
  <Frame>
    <OpsBlock size={18}>
      <FractionLabel num={2} den={7} size={14} color={PINK_DEEP} />
      <span>+</span>
      <FractionLabel num={3} den={7} size={14} color={PINK_DEEP} />
      <span>=</span>
      <FractionLabel num={5} den={7} size={14} color={PINK_DEEP} />
    </OpsBlock>
    <Caption>add fractions with the same denominator</Caption>
  </Frame>
);

const P4_7: React.FC = () => (
  <Frame>
    <Row gap={10}>
      <Col><FractionLabel num={3} den={10} size={18} color={PINK_DEEP} /></Col>
      <EqualsArrow />
      <Col>
        <TenthsStrip shaded={3} width={140} height={24} />
        <Caption color={PINK_DEEP}>0.3</Caption>
      </Col>
    </Row>
  </Frame>
);

const P4_8: React.FC = () => (
  <Frame>
    <Row gap={10}>
      <Col>
        <TenthsStrip shaded={4} width={110} height={20} />
        <Caption color={PINK_DEEP}>0.4</Caption>
      </Col>
      <CompareSymbol symbol=">" size={26} />
      <Col>
        <TenthsStrip shaded={2} width={110} height={20} />
        <Caption color={PINK_DEEP}>0.2</Caption>
      </Col>
    </Row>
  </Frame>
);

const P4_9: React.FC = () => (
  <Frame pad={10}>
    <Row gap={10}>
      <Col><FractionLabel num={1} den={2} size={16} color={PINK_DEEP} /></Col>
      <CompareSymbol symbol="=" size={22} />
      <Col><FractionLabel num={5} den={10} size={16} color={PINK_DEEP} /></Col>
      <CompareSymbol symbol="=" size={22} />
      <Col>
        <TenthsStrip shaded={5} width={110} height={20} />
        <Caption color={PINK_DEEP}>0.5</Caption>
      </Col>
    </Row>
  </Frame>
);

const P4_10: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={20}>40</OpsBlock>
      <ScaleArrow op="÷" by={10} />
      <OpsBlock size={20}>4</OpsBlock>
    </Row>
    <Caption>divide a whole number by 10</Caption>
  </Frame>
);

const P4_11: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={20}>0.7</OpsBlock>
      <ScaleArrow op="×" by={10} />
      <OpsBlock size={20}>7</OpsBlock>
    </Row>
    <Caption>multiply a tenth by 10</Caption>
  </Frame>
);

const P4_12: React.FC = () => (
  <Frame>
    <OpsBlock size={20}>0.3 + 0.4 = 0.7</OpsBlock>
    <OpsBlock size={20}>1.5 − 0.6 = 0.9</OpsBlock>
  </Frame>
);

const P4_13: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={20}>6 cookies</OpsBlock>
      <ScaleArrow op="×" by={2} />
      <OpsBlock size={20}>12 cookies</OpsBlock>
    </Row>
    <Caption color={PINK_DEEP}>double the quantity</Caption>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * YEAR 5 (16 skills) — Hundredths, Percentages & Ratio
 * ════════════════════════════════════════════════════════════════════ */

const P5_1: React.FC = () => (
  <Frame pad={10}>
    <SimplifyVisual num={8} den={12} divBy={4} simpNum={2} simpDen={3} size={18} />
    <SimplifyVisual num={6} den={10} divBy={2} simpNum={3} simpDen={5} size={18} />
    <Caption>divide top and bottom by the same number</Caption>
  </Frame>
);

const P5_2: React.FC = () => (
  <Frame pad={10}>
    <Row gap={6}>
      <Col gap={3}>
        <FractionLabel num={7} den={3} size={14} color={PINK_DEEP} />
        <Caption>improper</Caption>
      </Col>
      <EqualsArrow />
      <MixedNumberVis wholes={2} num={1} den={3} pieSize={36} />
      <EqualsArrow />
      <Col gap={3}>
        <Row gap={2}>
          <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 16, color: PINK_DEEP }}>2</span>
          <FractionLabel num={1} den={3} size={14} color={PINK_DEEP} />
        </Row>
        <Caption>mixed</Caption>
      </Col>
    </Row>
  </Frame>
);

const P5_3: React.FC = () => (
  <Frame>
    <Row gap={8}>
      <Col><BarFraction num={1} den={2} width={100} height={20} /><FractionLabel num={1} den={2} size={13} color={PINK_DEEP} /></Col>
      <CompareSymbol symbol=">" size={26} />
      <Col><BarFraction num={3} den={8} width={100} height={20} /><FractionLabel num={3} den={8} size={13} color={PINK_DEEP} /></Col>
    </Row>
    <Caption>convert to a common denominator first</Caption>
  </Frame>
);

const P5_4: React.FC = () => (
  <Frame pad={10}>
    <InlineFracExpr>
      <FractionLabel num={3} den={5} size={12} color={INK} />
      <span>of 20 = ?</span>
    </InlineFracExpr>
    <GroupShare total={20} groups={5} dotSize={9} highlightCount={3} />
    <Caption color={PINK_DEEP}>20 ÷ 5 = 4, then × 3 = 12</Caption>
  </Frame>
);

const P5_5: React.FC = () => (
  <Frame>
    <FindWholeBar num={2} den={5} partValue={6} />
    <Caption color={PINK_DEEP}>6 ÷ 2 = 3 per part, then × 5 = 15</Caption>
  </Frame>
);

const P5_6: React.FC = () => (
  <Frame>
    <OpsBlock size={18}>
      <FractionLabel num={1} den={2} size={14} color={PINK_DEEP} />
      <span>+</span>
      <FractionLabel num={1} den={4} size={14} color={PINK_DEEP} />
      <span>=</span>
      <FractionLabel num={3} den={4} size={14} color={PINK_DEEP} />
    </OpsBlock>
    <Caption>related denominators</Caption>
  </Frame>
);

const P5_7: React.FC = () => (
  <Frame pad={10}>
    <Row gap={10}>
      <Col><FractionLabel num={37} den={100} size={16} color={PINK_DEEP} /></Col>
      <EqualsArrow />
      <Col>
        <DecimalGrid shaded={37} size={86} />
        <Caption color={PINK_DEEP}>0.37</Caption>
      </Col>
    </Row>
  </Frame>
);

const P5_8: React.FC = () => (
  <Frame pad={10}>
    <Row gap={8}>
      <Col>
        <DecimalGrid shaded={40} size={70} />
        <Caption color={PINK_DEEP}>0.40</Caption>
      </Col>
      <CompareSymbol symbol=">" size={26} />
      <Col>
        <DecimalGrid shaded={34} size={70} />
        <Caption color={PINK_DEEP}>0.34</Caption>
      </Col>
    </Row>
  </Frame>
);

const P5_9: React.FC = () => (
  <Frame pad={10}>
    <Row gap={6}>
      <Col><FractionLabel num={3} den={4} size={14} color={PINK_DEEP} /></Col>
      <CompareSymbol symbol="=" size={20} />
      <Col><FractionLabel num={75} den={100} size={14} color={PINK_DEEP} /></Col>
      <CompareSymbol symbol="=" size={20} />
      <Col>
        <DecimalGrid shaded={75} size={70} />
        <Caption color={PINK_DEEP}>0.75</Caption>
      </Col>
    </Row>
  </Frame>
);

const P5_10: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={20}>400</OpsBlock>
      <ScaleArrow op="÷" by={100} />
      <OpsBlock size={20}>4</OpsBlock>
    </Row>
    <Caption>divide a whole number by 100</Caption>
  </Frame>
);

const P5_11: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={20}>0.37</OpsBlock>
      <ScaleArrow op="×" by={100} />
      <OpsBlock size={20}>37</OpsBlock>
    </Row>
    <Caption>multiply a hundredth by 100</Caption>
  </Frame>
);

const P5_12: React.FC = () => (
  <Frame>
    <OpsBlock size={20}>0.35 + 0.20 = 0.55</OpsBlock>
    <OpsBlock size={20}>1.42 − 0.18 = 1.24</OpsBlock>
  </Frame>
);

/* ── 5.13 / 6.6 / 6.7 — the 3-panel F ⇄ D ⇄ % conversion ── */
const TriplePanel: React.FC<{
  num: number;
  den: number;
  decimal: string;
  percent: number;
  gridShaded: number;
}> = ({ num, den, decimal, percent, gridShaded }) => (
  <Row gap={8}>
    <Col gap={4}>
      <DecimalGrid shaded={gridShaded} size={66} />
      <Caption color={PINK_DEEP}>{decimal}</Caption>
    </Col>
    <CompareSymbol symbol="=" size={20} />
    <Col gap={4}>
      <FractionLabel num={num} den={den} size={18} color={PINK_DEEP} />
      <Caption>fraction</Caption>
    </Col>
    <CompareSymbol symbol="=" size={20} />
    <Col gap={4}>
      <span style={{
        fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 22,
        color: PINK_DEEP,
      }}>{percent}%</span>
      <Caption>percent</Caption>
    </Col>
  </Row>
);

const P5_13: React.FC = () => (
  <Frame pad={8}>
    <TriplePanel num={1} den={4} decimal="0.25" percent={25} gridShaded={25} />
  </Frame>
);

/* AnnotatedPctBar — replaces the plain PercentBar for percent-of-amount
 * skills. Adds %-labels above and value-labels below each region so the
 * pictorial bar and the numbers students need to find are visible at the
 * same time. Used by Y5.14/Y5.15/Y6.10/Y6.11. */
const AnnotatedPctBar: React.FC<{
  percent: number;
  shadedValue: number | string;
  unshadedValue: number | string;
  whole: number | string;
  width?: number;
}> = ({ percent, shadedValue, unshadedValue, whole, width = 230 }) => {
  const padX = 18;
  const innerW = width - padX * 2;
  const barH = 22;
  const shadedW = innerW * (percent / 100);
  const midShaded = padX + shadedW / 2;
  const midUnshaded = padX + shadedW + (innerW - shadedW) / 2;
  const yTop = 12;
  const yBar = 18;
  const yBottom = yBar + barH + 14;
  const yWhole = yBottom + 18;
  const yBracket = yBottom + 6;
  return (
    <svg width={width} height={yWhole + 4} viewBox={`0 0 ${width} ${yWhole + 4}`}>
      {/* top % labels */}
      <text x={midShaded} y={yTop} textAnchor="middle"
        fontFamily="Fredoka, sans-serif" fontWeight={800} fontSize={11} fill={PINK_DEEP}>
        {percent}%
      </text>
      <text x={midUnshaded} y={yTop} textAnchor="middle"
        fontFamily="Fredoka, sans-serif" fontWeight={700} fontSize={11} fill={MUTED}>
        {100 - percent}%
      </text>
      {/* bar */}
      <rect x={padX} y={yBar} width={innerW} height={barH} fill="#ffffff"
        stroke={PINK_DEEP} strokeWidth={1.6} />
      <rect x={padX} y={yBar} width={shadedW} height={barH} fill={PINK_MID} />
      <line x1={padX + shadedW} y1={yBar} x2={padX + shadedW} y2={yBar + barH}
        stroke={PINK_DEEP} strokeWidth={1.5} />
      {/* bottom value labels */}
      <text x={midShaded} y={yBottom} textAnchor="middle"
        fontFamily="Fredoka, sans-serif" fontWeight={800} fontSize={13} fill={PINK_DEEP}>
        {shadedValue}
      </text>
      <text x={midUnshaded} y={yBottom} textAnchor="middle"
        fontFamily="Fredoka, sans-serif" fontWeight={700} fontSize={13} fill={MUTED}>
        {unshadedValue}
      </text>
      {/* whole span bracket */}
      <line x1={padX} y1={yBracket} x2={padX + innerW} y2={yBracket}
        stroke={INK} strokeWidth={1.1} />
      <line x1={padX} y1={yBracket - 3} x2={padX} y2={yBracket + 3}
        stroke={INK} strokeWidth={1.1} />
      <line x1={padX + innerW} y1={yBracket - 3} x2={padX + innerW} y2={yBracket + 3}
        stroke={INK} strokeWidth={1.1} />
      <text x={width / 2} y={yWhole} textAnchor="middle"
        fontFamily="Fredoka, sans-serif" fontWeight={800} fontSize={12} fill={INK}>
        whole = {whole}
      </text>
    </svg>
  );
};

const P5_14: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 16, color: INK }}>
      25% of 40 = ?
    </div>
    <AnnotatedPctBar percent={25} shadedValue={10} unshadedValue={30} whole={40} />
    <Caption color={PINK_DEEP}>0.25 × 40 = 10</Caption>
  </Frame>
);

const P5_15: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 16, color: INK }}>
      25% = 12 → whole = ?
    </div>
    <AnnotatedPctBar percent={25} shadedValue={12} unshadedValue={36} whole={48} />
    <Caption color={PINK_DEEP}>12 ÷ 0.25 = 48</Caption>
  </Frame>
);

const P5_16: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <RatioBar a={2} b={3} cellSize={20} height={24} />
      <Caption color={PINK_DEEP}>2 : 3</Caption>
    </Row>
    <Row gap={4}>
      <OpsBlock size={18}>2 : 3</OpsBlock>
      <ScaleArrow op="×" by={4} />
      <OpsBlock size={18}>8 : 12</OpsBlock>
    </Row>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * YEAR 6 (13 skills) — F ⇄ D ⇄ % · Ratio · Mixed Numbers
 * ════════════════════════════════════════════════════════════════════ */

const P6_1: React.FC = () => (
  <Frame pad={10}>
    <SimplifyVisual num={12} den={18} divBy={6} simpNum={2} simpDen={3} size={18} />
    <SimplifyVisual num={15} den={25} divBy={5} simpNum={3} simpDen={5} size={18} />
    <Caption>divide top and bottom by the same number</Caption>
  </Frame>
);

const P6_2: React.FC = () => (
  <Frame pad={10}>
    <Row gap={6}>
      <Col gap={3}>
        <FractionLabel num={17} den={6} size={14} color={PINK_DEEP} />
        <Caption>improper</Caption>
      </Col>
      <EqualsArrow />
      <MixedNumberVis wholes={2} num={5} den={6} pieSize={32} />
      <EqualsArrow />
      <Col gap={3}>
        <Row gap={2}>
          <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 16, color: PINK_DEEP }}>2</span>
          <FractionLabel num={5} den={6} size={14} color={PINK_DEEP} />
        </Row>
        <Caption>mixed</Caption>
      </Col>
    </Row>
  </Frame>
);

const P6_3: React.FC = () => (
  <Frame>
    <Row gap={8}>
      <Col><BarFraction num={2} den={3} width={100} height={20} /><FractionLabel num={2} den={3} size={13} color={PINK_DEEP} /></Col>
      <CompareSymbol symbol=">" size={26} />
      <Col><BarFraction num={4} den={9} width={100} height={20} /><FractionLabel num={4} den={9} size={13} color={PINK_DEEP} /></Col>
    </Row>
    <Caption>common multiple as denominator</Caption>
  </Frame>
);

const P6_4: React.FC = () => (
  <Frame>
    <OpsBlock size={18}>
      <FractionLabel num={2} den={3} size={14} color={PINK_DEEP} />
      <span>+</span>
      <FractionLabel num={1} den={6} size={14} color={PINK_DEEP} />
      <span>=</span>
      <FractionLabel num={5} den={6} size={14} color={PINK_DEEP} />
    </OpsBlock>
    <Caption>related denominators</Caption>
  </Frame>
);

const P6_5: React.FC = () => (
  <Frame>
    <FindWholeBar num={3} den={5} partValue={12} />
    <Caption color={PINK_DEEP}>12 ÷ 3 = 4 per part, then × 5 = 20</Caption>
  </Frame>
);

const P6_6: React.FC = () => (
  <Frame pad={8}>
    <TriplePanel num={3} den={4} decimal="0.75" percent={75} gridShaded={75} />
  </Frame>
);

const P6_7: React.FC = () => (
  <Frame pad={10}>
    <Row gap={6}>
      <Col gap={4}>
        <FractionLabel num={3} den={5} size={14} color={PINK_DEEP} />
        <Caption color={PINK_DEEP}>0.6</Caption>
      </Col>
      <CompareSymbol symbol=">" size={22} />
      <Col gap={4}>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 16, color: PINK_DEEP }}>55%</span>
        <Caption color={PINK_DEEP}>0.55</Caption>
      </Col>
    </Row>
    <Caption>convert to compare</Caption>
  </Frame>
);

const P6_8: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={18}>0.04</OpsBlock>
      <ScaleArrow op="×" by={100} />
      <OpsBlock size={18}>4</OpsBlock>
    </Row>
    <Row gap={6}>
      <OpsBlock size={18}>5</OpsBlock>
      <ScaleArrow op="÷" by={1000} />
      <OpsBlock size={18}>0.005</OpsBlock>
    </Row>
  </Frame>
);

const P6_9: React.FC = () => (
  <Frame>
    <OpsBlock size={18}>12.345 + 7.890 = 20.235</OpsBlock>
    <OpsBlock size={18}>5.6 − 0.275 = 5.325</OpsBlock>
  </Frame>
);

const P6_10: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 16, color: INK }}>
      35% of 80 = ?
    </div>
    <AnnotatedPctBar percent={35} shadedValue={28} unshadedValue={52} whole={80} />
    <Caption color={PINK_DEEP}>0.35 × 80 = 28</Caption>
  </Frame>
);

const P6_11: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 16, color: INK }}>
      40% = 24 → whole = ?
    </div>
    <AnnotatedPctBar percent={40} shadedValue={24} unshadedValue={36} whole={60} />
    <Caption color={PINK_DEEP}>24 ÷ 0.40 = 60</Caption>
  </Frame>
);

const P6_12: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <RatioBar a={3} b={5} cellSize={18} height={22} />
      <Caption color={PINK_DEEP}>3 : 5</Caption>
    </Row>
    <Row gap={4}>
      <OpsBlock size={16}>3 : 5</OpsBlock>
      <ScaleArrow op="×" by={6} />
      <OpsBlock size={16}>18 : 30</OpsBlock>
    </Row>
  </Frame>
);

const P6_13: React.FC = () => (
  <Frame pad={8}>
    <OpsBlock size={16}>
      <span>1</span>
      <FractionLabel num={1} den={2} size={12} color={PINK_DEEP} />
      <span>+</span>
      <span>2</span>
      <FractionLabel num={1} den={4} size={12} color={PINK_DEEP} />
      <span>=</span>
      <span>3</span>
      <FractionLabel num={3} den={4} size={12} color={PINK_DEEP} />
    </OpsBlock>
    <Caption>add mixed numbers</Caption>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * YEAR 7 (14 skills) — Conversions, Unlike Fractions, Ratio & Ops
 * ════════════════════════════════════════════════════════════════════ */

const P7_1: React.FC = () => (
  <Frame pad={8}>
    <Row gap={6}>
      <Col gap={3}>
        <FractionLabel num={342} den={1000} size={14} color={PINK_DEEP} />
        <Caption>fraction</Caption>
      </Col>
      <CompareSymbol symbol="=" size={20} />
      <Col gap={3}>
        <ThousandthsBar shaded={342} width={120} height={18} showTicks={false} />
        <Caption color={PINK_DEEP}>0.342</Caption>
      </Col>
      <CompareSymbol symbol="=" size={20} />
      <Col gap={3}>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 18, color: PINK_DEEP }}>34.2%</span>
        <Caption>percent</Caption>
      </Col>
    </Row>
  </Frame>
);

const P7_2: React.FC = () => (
  <Frame pad={10}>
    <Row gap={6}>
      <Col gap={3}>
        <FractionLabel num={3} den={8} size={14} color={PINK_DEEP} />
        <Caption color={PINK_DEEP}>0.375</Caption>
      </Col>
      <CompareSymbol symbol="<" size={22} />
      <Col gap={3}>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 16, color: PINK_DEEP }}>40%</span>
        <Caption color={PINK_DEEP}>0.4</Caption>
      </Col>
    </Row>
    <Caption>convert to decimals to compare</Caption>
  </Frame>
);

const P7_3: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={18}>2.34</OpsBlock>
      <ScaleArrow op="×" by={1000} />
      <OpsBlock size={18}>2340</OpsBlock>
    </Row>
    <Row gap={6}>
      <OpsBlock size={18}>56</OpsBlock>
      <ScaleArrow op="÷" by={100} />
      <OpsBlock size={18}>0.56</OpsBlock>
    </Row>
  </Frame>
);

const P7_4: React.FC = () => (
  <Frame pad={10}>
    <SimplifyVisual num={24} den={36} divBy={12} simpNum={2} simpDen={3} size={16} />
    <Caption>find the greatest common factor</Caption>
  </Frame>
);

const P7_5: React.FC = () => (
  <Frame pad={10}>
    <InlineFracExpr>
      <FractionLabel num={5} den={8} size={12} color={INK} />
      <span>of 56 = ?</span>
    </InlineFracExpr>
    <OpsBlock size={16}>56 ÷ 8 = 7, × 5 = 35</OpsBlock>
  </Frame>
);

const P7_6: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      30% = 18 → whole = ?
    </div>
    <Row gap={6}>
      <PercentBar percent={30} width={180} height={20} showTicks={false} />
      <Caption color={PINK_DEEP}>whole = 60</Caption>
    </Row>
  </Frame>
);

const P7_7: React.FC = () => (
  <Frame pad={8}>
    <div style={{
      fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK,
      display: "inline-flex", alignItems: "center", gap: 6,
    }}>
      <FractionLabel num={1} den={3} size={14} color={PINK_DEEP} />
      <span>+</span>
      <FractionLabel num={1} den={4} size={14} color={PINK_DEEP} />
      <span>=</span>
      <FractionLabel num={4} den={12} size={14} color={PINK_DEEP} />
      <span>+</span>
      <FractionLabel num={3} den={12} size={14} color={PINK_DEEP} />
      <span>=</span>
      <FractionLabel num={7} den={12} size={14} color={PINK_DEEP} />
    </div>
    <LCDFractions aNum={1} aDen={3} bNum={1} bDen={4} lcd={12} width={170} height={16} />
  </Frame>
);

const P7_8: React.FC = () => (
  <Frame>
    <OpsBlock size={18}>0.345 + 1.270 = 1.615</OpsBlock>
    <OpsBlock size={18}>2.500 − 0.875 = 1.625</OpsBlock>
  </Frame>
);

const P7_9: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <RatioBar a={3} b={4} cellSize={18} height={22} />
      <Caption color={PINK_DEEP}>3 : 4</Caption>
    </Row>
    <Row gap={4}>
      <OpsBlock size={16}>21 split 3:4</OpsBlock>
      <CompareSymbol symbol="=" size={18} />
      <OpsBlock size={16}>9 : 12</OpsBlock>
    </Row>
  </Frame>
);

const P7_10: React.FC = () => (
  <Frame>
    <InlineFracExpr>
      <span>6 ×</span>
      <FractionLabel num={2} den={3} size={12} color={INK} />
    </InlineFracExpr>
    <Row gap={6}>
      <GroupShare total={18} groups={6} dotSize={9} highlightCount={6} />
    </Row>
    <Caption color={PINK_DEEP}>6 × 2 ÷ 3 = 4</Caption>
  </Frame>
);

const P7_11: React.FC = () => (
  <Frame>
    <OpsBlock size={20}>0.6 × 4 = 2.4</OpsBlock>
    <OpsBlock size={20}>1.25 × 8 = 10</OpsBlock>
  </Frame>
);

const P7_12: React.FC = () => (
  <Frame pad={8}>
    <InlineFracExpr>
      <FractionLabel num={1} den={3} size={12} color={INK} />
      <span>÷ 2 =</span>
      <FractionLabel num={1} den={6} size={12} color={INK} />
    </InlineFracExpr>
    <FractionDivByWhole num={1} den={3} divBy={2} width={180} height={26} />
    <Caption color={PINK_DEEP}>split each third in half → sixths</Caption>
  </Frame>
);

const P7_13: React.FC = () => (
  <Frame pad={8}>
    <InlineFracExpr>
      <span>6 ÷</span>
      <FractionLabel num={1} den={2} size={12} color={INK} />
      <span>= 12</span>
    </InlineFracExpr>
    <DivByUnitFraction whole={6} splitInto={2} cellSize={14} />
    <Caption color={PINK_DEEP}>6 wholes = 12 halves</Caption>
  </Frame>
);

const P7_14: React.FC = () => (
  <Frame pad={10}>
    <Row gap={6}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 22, color: INK }}>1</span>
      <FractionLabel num={1} den={3} size={18} color={PINK_DEEP} />
      <span style={{ fontSize: 22, color: PINK_DEEP, fontWeight: 800 }}>+</span>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 22, color: INK }}>2</span>
      <FractionLabel num={1} den={4} size={18} color={PINK_DEEP} />
      <span style={{ fontSize: 22, color: PINK_DEEP, fontWeight: 800 }}>=</span>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 22, color: INK }}>3</span>
      <FractionLabel num={7} den={12} size={18} color={PINK_DEEP} />
    </Row>
    <Caption>add the wholes, then the fractions (common denominator 12)</Caption>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * YEAR 8 (10 skills) — Fraction × Fraction, Decimal Ops & Equivalence
 * ════════════════════════════════════════════════════════════════════ */

const P8_1: React.FC = () => (
  <Frame pad={8}>
    <Row gap={6}>
      <Col gap={3}>
        <FractionLabel num={5} den={8} size={14} color={PINK_DEEP} />
        <Caption>fraction</Caption>
      </Col>
      <CompareSymbol symbol="=" size={20} />
      <Col gap={3}>
        <ThousandthsBar shaded={625} width={120} height={18} showTicks={false} />
        <Caption color={PINK_DEEP}>0.625</Caption>
      </Col>
      <CompareSymbol symbol="=" size={20} />
      <Col gap={3}>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 18, color: PINK_DEEP }}>62.5%</span>
        <Caption>percent</Caption>
      </Col>
    </Row>
  </Frame>
);

const P8_2: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={18}>0.0045</OpsBlock>
      <ScaleArrow op="×" by={10000} />
      <OpsBlock size={18}>45</OpsBlock>
    </Row>
    <Row gap={6}>
      <OpsBlock size={18}>87</OpsBlock>
      <ScaleArrow op="÷" by={1000} />
      <OpsBlock size={18}>0.087</OpsBlock>
    </Row>
  </Frame>
);

const P8_3: React.FC = () => (
  <Frame pad={10}>
    <Row gap={6}>
      <Col gap={3}>
        <FractionLabel num={23} den={5} size={14} color={PINK_DEEP} />
        <Caption>improper</Caption>
      </Col>
      <EqualsArrow />
      <MixedNumberVis wholes={4} num={3} den={5} pieSize={30} />
      <EqualsArrow />
      <Col gap={3}>
        <Row gap={2}>
          <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 16, color: PINK_DEEP }}>4</span>
          <FractionLabel num={3} den={5} size={14} color={PINK_DEEP} />
        </Row>
        <Caption>mixed</Caption>
      </Col>
    </Row>
  </Frame>
);

const P8_4: React.FC = () => (
  <Frame>
    <InlineFracExpr>
      <FractionLabel num={3} den={8} size={12} color={INK} />
      <span>× 24</span>
    </InlineFracExpr>
    <OpsBlock size={16}>24 ÷ 8 = 3, × 3 = 9</OpsBlock>
  </Frame>
);

const P8_5: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      18 is 45% — what's the whole?
    </div>
    <Row gap={6}>
      <PercentBar percent={45} width={180} height={20} showTicks={false} />
      <Caption color={PINK_DEEP}>whole = 40</Caption>
    </Row>
  </Frame>
);

const P8_6: React.FC = () => (
  <Frame>
    <OpsBlock size={20}>0.4 × 0.6 = 0.24</OpsBlock>
    <OpsBlock size={20}>1.5 × 0.8 = 1.2</OpsBlock>
  </Frame>
);

const P8_7: React.FC = () => (
  <Frame>
    <OpsBlock size={20}>2.4 ÷ 6 = 0.4</OpsBlock>
    <OpsBlock size={20}>0.96 ÷ 4 = 0.24</OpsBlock>
  </Frame>
);

const P8_8: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <RatioBar a={2} b={5} cellSize={18} height={22} />
      <Caption color={PINK_DEEP}>2 : 5</Caption>
    </Row>
    <Row gap={4}>
      <OpsBlock size={16}>$35 split 2:5</OpsBlock>
      <CompareSymbol symbol="=" size={18} />
      <OpsBlock size={16}>$10 : $25</OpsBlock>
    </Row>
  </Frame>
);

const P8_9: React.FC = () => (
  <Frame>
    <div style={{
      fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK,
      display: "inline-flex", alignItems: "center", gap: 6,
    }}>
      <FractionLabel num={2} den={3} size={14} color={PINK_DEEP} />
      <span>×</span>
      <FractionLabel num={3} den={4} size={14} color={PINK_DEEP} />
      <span>=</span>
      <FractionLabel num={6} den={12} size={14} color={PINK_DEEP} />
      <span>=</span>
      <FractionLabel num={1} den={2} size={14} color={PINK_DEEP} />
    </div>
    <FractionMultGrid aNum={2} aDen={3} bNum={3} bDen={4} size={96} />
  </Frame>
);

const P8_10: React.FC = () => (
  <Frame pad={10}>
    <Row gap={6}>
      <Col gap={3}>
        <PercentBar percent={45} width={120} height={16} showTicks={false} />
        <Caption color={PINK_DEEP}>45% × 20 = 9</Caption>
      </Col>
      <CompareSymbol symbol="=" size={20} />
      <Col gap={3}>
        <PercentBar percent={20} width={120} height={16} showTicks={false} />
        <Caption color={PINK_DEEP}>20% × 45 = 9</Caption>
      </Col>
    </Row>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * MAP — code → preview component
 * ════════════════════════════════════════════════════════════════════ */
const MAP: Record<string, React.FC> = {
  // Year 1
  "1.1": P1_1, "1.2": P1_2, "1.3": P1_3, "1.4": P1_4,
  // Year 2
  "2.1": P2_1, "2.2": P2_2, "2.3": P2_3, "2.4": P2_4,
  "2.5": P2_5, "2.6": P2_6, "2.7": P2_7,
  // Year 3
  "3.1": P3_1, "3.2": P3_2, "3.3": P3_3, "3.4": P3_4,
  "3.5": P3_5, "3.6": P3_6, "3.7": P3_7, "3.8": P3_8,
  "3.9": P3_9, "3.10": P3_10, "3.11": P3_11,
  // Year 4
  "4.1": P4_1, "4.2": P4_2, "4.3": P4_3, "4.4": P4_4,
  "4.5": P4_5, "4.6": P4_6, "4.7": P4_7, "4.8": P4_8,
  "4.9": P4_9, "4.10": P4_10, "4.11": P4_11, "4.12": P4_12, "4.13": P4_13,
  // Year 5
  "5.1": P5_1, "5.2": P5_2, "5.3": P5_3, "5.4": P5_4,
  "5.5": P5_5, "5.6": P5_6, "5.7": P5_7, "5.8": P5_8,
  "5.9": P5_9, "5.10": P5_10, "5.11": P5_11, "5.12": P5_12,
  "5.13": P5_13, "5.14": P5_14, "5.15": P5_15, "5.16": P5_16,
  // Year 6
  "6.1": P6_1, "6.2": P6_2, "6.3": P6_3, "6.4": P6_4,
  "6.5": P6_5, "6.6": P6_6, "6.7": P6_7, "6.8": P6_8,
  "6.9": P6_9, "6.10": P6_10, "6.11": P6_11, "6.12": P6_12, "6.13": P6_13,
  // Year 7
  "7.1": P7_1, "7.2": P7_2, "7.3": P7_3, "7.4": P7_4,
  "7.5": P7_5, "7.6": P7_6, "7.7": P7_7, "7.8": P7_8,
  "7.9": P7_9, "7.10": P7_10, "7.11": P7_11, "7.12": P7_12,
  "7.13": P7_13, "7.14": P7_14,
  // Year 8
  "8.1": P8_1, "8.2": P8_2, "8.3": P8_3, "8.4": P8_4,
  "8.5": P8_5, "8.6": P8_6, "8.7": P8_7, "8.8": P8_8,
  "8.9": P8_9, "8.10": P8_10,
};

export const HAS_RATIONAL_PREVIEW = new Set(Object.keys(MAP));

export default function RationalExercisePreview({ code }: { code: string }) {
  const Preview = MAP[code];
  if (!Preview) return null;
  return (
    <div
      className="rounded-2xl border-2 border-pink-200 bg-white overflow-hidden"
      style={{ minHeight: 148, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Preview />
    </div>
  );
}
