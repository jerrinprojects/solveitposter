/* Static SVG previews for every Decimal Place Value skill (Stage 1–4).
 * Uses the shared RationalSvg primitives + new PVTable / DigitHighlight.
 *
 * Decimal PV uses IDs 1.1–4.10 which overlap with Rational Phase 1–3
 * codes — so this component has its own MAP, separate from
 * RationalExercisePreview. Routes that show Decimal PV posters wire
 * through DecimalPvSectionBlock → this file.
 */
import React from "react";
import {
  DecimalNumberLine,
  NumberLine,
  TenthsStrip,
  DecimalGrid,
  ThousandthsBar,
  OpsBlock,
  CompareSymbol,
  PVTable,
  DigitHighlight,
  Caption,
  PINK_DEEP,
  PINK_MID,
  PINK_SOFT,
  PINK_PALE,
  INK,
  MUTED,
} from "./RationalSvg";

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

const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({
  children,
  gap = 12,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap,
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
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
 * STAGE 1 — Tenths (Year 4)
 * ════════════════════════════════════════════════════════════════════ */

const D1_1: React.FC = () => (
  <Frame>
    <NumberLine
      width={320}
      height={60}
      divisions={10}
      hideEndpoints
      marks={[
        { pos: 0,   label: "0" },
        { pos: 0.1, label: "0.1" },
        { pos: 0.2, label: "0.2" },
        { pos: 0.3, label: "0.3" },
        { pos: 0.4, label: "0.4" },
        { pos: 0.5, label: "0.5" },
        { pos: 0.6, label: "0.6" },
        { pos: 0.7, label: "0.7" },
        { pos: 0.8, label: "0.8" },
        { pos: 0.9, label: "0.9" },
        { pos: 1,   label: "1" },
      ]}
    />
    <Caption>count up in tenths from 0 to 1</Caption>
  </Frame>
);

const D1_2: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      Which digit is in the tenths place?
    </div>
    <DigitHighlight
      size={36}
      parts={[
        { text: "0" },
        { text: "." },
        { text: "7", highlight: true },
      ]}
    />
    <Caption color={PINK_DEEP}>tenths = 7</Caption>
  </Frame>
);

const D1_3: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      How many tenths in 1.4?
    </div>
    <Row gap={8}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 28, color: INK }}>1.4</span>
      <CompareSymbol symbol="=" size={22} />
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 22, color: PINK_DEEP }}>
        14 tenths
      </span>
    </Row>
  </Frame>
);

const D1_4: React.FC = () => (
  <Frame>
    <OpsBlock size={20}>
      <span>1.7</span>
      <CompareSymbol symbol="=" size={20} />
      <span style={{ color: PINK_DEEP }}>1</span>
      <span>+</span>
      <span style={{ color: PINK_DEEP }}>0.7</span>
    </OpsBlock>
    <Caption>expanded form (ones + tenths)</Caption>
  </Frame>
);

const D1_5: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 18, color: INK }}>
      1.7
    </div>
    <PVTable
      size={26}
      cells={[
        { label: "Ones", value: "1" },
        { label: "Tenths", value: "7" },
      ]}
    />
    <Caption color={PINK_DEEP}>1 one + 7 tenths</Caption>
  </Frame>
);

const D1_6: React.FC = () => (
  <Frame>
    <Row gap={8}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 24, color: INK }}>1.7</span>
      <CompareSymbol symbol="=" size={20} />
    </Row>
    <span
      style={{
        fontFamily: "Fredoka, sans-serif",
        fontWeight: 700,
        fontSize: 15,
        color: PINK_DEEP,
        textAlign: "center",
      }}
    >
      one and seven tenths
    </span>
  </Frame>
);

const D1_7: React.FC = () => (
  <Frame>
    <Row gap={10}>
      <Col gap={3}>
        <TenthsStrip shaded={4} width={110} height={20} />
        <Caption color={PINK_DEEP}>0.4</Caption>
      </Col>
      <CompareSymbol symbol="<" size={24} />
      <Col gap={3}>
        <TenthsStrip shaded={12} width={130} height={20} />
        <Caption color={PINK_DEEP}>1.2</Caption>
      </Col>
    </Row>
  </Frame>
);

const D1_8: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      Order from smallest to largest
    </div>
    <Row gap={6}>
      <OpsBlock size={18}>0.4</OpsBlock>
      <span style={{ fontSize: 16, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <OpsBlock size={18}>0.7</OpsBlock>
      <span style={{ fontSize: 16, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <OpsBlock size={18}>1.2</OpsBlock>
    </Row>
  </Frame>
);

const D1_9: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={20}>1.6</OpsBlock>
      <svg width={40} height={14} viewBox="0 0 40 14">
        <line x1={2} y1={7} x2={32} y2={7} stroke={PINK_DEEP} strokeWidth={2.5} />
        <polygon points="38,7 32,3 32,11" fill={PINK_DEEP} />
      </svg>
      <OpsBlock size={20}>2</OpsBlock>
    </Row>
    <Caption color={PINK_DEEP}>round to the nearest one (1.6 → 2)</Caption>
  </Frame>
);

const D1_10: React.FC = () => (
  <Frame>
    <DecimalNumberLine
      width={280}
      height={56}
      divisions={10}
      marks={[{ pos: 0.7, label: "0.7" }]}
    />
    <Caption>place 0.7 on a number line</Caption>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * STAGE 2 — Hundredths (Year 5)
 * ════════════════════════════════════════════════════════════════════ */

const D2_1: React.FC = () => (
  <Frame>
    <NumberLine
      width={320} height={60} divisions={10} hideEndpoints
      marks={[
        { pos: 0,   label: "0.3" },
        { pos: 0.1, label: "0.31" },
        { pos: 0.2, label: "0.32" },
        { pos: 0.3, label: "0.33" },
        { pos: 0.4, label: "0.34" },
        { pos: 0.5, label: "0.35" },
        { pos: 0.6, label: "0.36" },
        { pos: 0.7, label: "0.37" },
        { pos: 0.8, label: "0.38" },
        { pos: 0.9, label: "0.39" },
        { pos: 1,   label: "0.4" },
      ]}
    />
    <Caption>count up in hundredths from 0.3 to 0.4</Caption>
  </Frame>
);

const D2_2: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      Which digit is in the hundredths place?
    </div>
    <DigitHighlight
      size={36}
      parts={[{ text: "0" }, { text: "." }, { text: "3" }, { text: "4", highlight: true }]}
    />
    <Caption color={PINK_DEEP}>hundredths = 4</Caption>
  </Frame>
);

const D2_3: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      How many hundredths in 1.42?
    </div>
    <Row gap={8}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 28, color: INK }}>1.42</span>
      <CompareSymbol symbol="=" size={22} />
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 22, color: PINK_DEEP }}>
        142 hundredths
      </span>
    </Row>
  </Frame>
);

const D2_4: React.FC = () => (
  <Frame>
    <OpsBlock size={18}>
      <span>1.47</span>
      <CompareSymbol symbol="=" size={18} />
      <span style={{ color: PINK_DEEP }}>1</span>
      <span>+</span>
      <span style={{ color: PINK_DEEP }}>0.4</span>
      <span>+</span>
      <span style={{ color: PINK_DEEP }}>0.07</span>
    </OpsBlock>
    <Caption>ones + tenths + hundredths</Caption>
  </Frame>
);

const D2_5: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 18, color: INK }}>
      1.47
    </div>
    <PVTable
      size={24}
      cells={[
        { label: "Ones", value: "1" },
        { label: "Tenths", value: "4" },
        { label: "Hundredths", value: "7" },
      ]}
    />
    <Caption color={PINK_DEEP}>1 one + 4 tenths + 7 hundredths</Caption>
  </Frame>
);

const D2_6: React.FC = () => (
  <Frame>
    <Row gap={8}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 24, color: INK }}>1.47</span>
      <CompareSymbol symbol="=" size={20} />
    </Row>
    <span
      style={{
        fontFamily: "Fredoka, sans-serif", fontWeight: 700, fontSize: 14,
        color: PINK_DEEP, textAlign: "center",
      }}
    >
      one and forty-seven hundredths
    </span>
  </Frame>
);

const D2_7: React.FC = () => (
  <Frame>
    <Row gap={10}>
      <Col gap={3}>
        <DecimalGrid shaded={40} size={70} />
        <Caption color={PINK_DEEP}>0.40</Caption>
      </Col>
      <CompareSymbol symbol=">" size={24} />
      <Col gap={3}>
        <DecimalGrid shaded={34} size={70} />
        <Caption color={PINK_DEEP}>0.34</Caption>
      </Col>
    </Row>
  </Frame>
);

const D2_8: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      Order from smallest to largest
    </div>
    <Row gap={6}>
      <OpsBlock size={16}>0.34</OpsBlock>
      <span style={{ fontSize: 16, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <OpsBlock size={16}>0.4</OpsBlock>
      <span style={{ fontSize: 16, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <OpsBlock size={16}>0.43</OpsBlock>
    </Row>
  </Frame>
);

const D2_9: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={20}>0.47</OpsBlock>
      <svg width={40} height={14} viewBox="0 0 40 14">
        <line x1={2} y1={7} x2={32} y2={7} stroke={PINK_DEEP} strokeWidth={2.5} />
        <polygon points="38,7 32,3 32,11" fill={PINK_DEEP} />
      </svg>
      <OpsBlock size={20}>0.5</OpsBlock>
    </Row>
    <Caption color={PINK_DEEP}>round to the nearest tenth (0.47 → 0.5)</Caption>
  </Frame>
);

const D2_10: React.FC = () => (
  <Frame>
    <DecimalNumberLine
      width={280} height={56} divisions={10}
      marks={[{ pos: 0.47, label: "0.47" }]}
    />
    <Caption>place 0.47 on a number line</Caption>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * STAGE 3 — Thousandths (Year 6)
 * ════════════════════════════════════════════════════════════════════ */

const D3_1: React.FC = () => (
  <Frame pad={8}>
    <NumberLine
      width={330} height={56} divisions={10} hideEndpoints labelSize={9}
      marks={[
        { pos: 0,   label: "0.34" },
        { pos: 0.1, label: "0.341" },
        { pos: 0.2, label: "0.342" },
        { pos: 0.3, label: "0.343" },
        { pos: 0.4, label: "0.344" },
        { pos: 0.5, label: "0.345" },
        { pos: 0.6, label: "0.346" },
        { pos: 0.7, label: "0.347" },
        { pos: 0.8, label: "0.348" },
        { pos: 0.9, label: "0.349" },
        { pos: 1,   label: "0.35" },
      ]}
    />
    <Caption>count in thousandths: 0.34 → 0.35</Caption>
  </Frame>
);

const D3_2: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      Which digit is in the thousandths place?
    </div>
    <DigitHighlight
      size={32}
      parts={[
        { text: "0" }, { text: "." }, { text: "3" }, { text: "4" }, { text: "7", highlight: true },
      ]}
    />
    <Caption color={PINK_DEEP}>thousandths = 7</Caption>
  </Frame>
);

const D3_3: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      How many thousandths in 0.347?
    </div>
    <Row gap={8}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 26, color: INK }}>0.347</span>
      <CompareSymbol symbol="=" size={22} />
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 20, color: PINK_DEEP }}>
        347 thousandths
      </span>
    </Row>
  </Frame>
);

const D3_4: React.FC = () => (
  <Frame>
    <OpsBlock size={16}>
      <span>1.347</span>
      <CompareSymbol symbol="=" size={16} />
      <span style={{ color: PINK_DEEP }}>1</span>
      <span>+</span>
      <span style={{ color: PINK_DEEP }}>0.3</span>
      <span>+</span>
      <span style={{ color: PINK_DEEP }}>0.04</span>
      <span>+</span>
      <span style={{ color: PINK_DEEP }}>0.007</span>
    </OpsBlock>
  </Frame>
);

const D3_5: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 18, color: INK }}>
      1.347
    </div>
    <PVTable
      size={22}
      cells={[
        { label: "Ones", value: "1" },
        { label: "Tenths", value: "3" },
        { label: "Hundredths", value: "4" },
        { label: "Thousandths", value: "7" },
      ]}
    />
  </Frame>
);

const D3_6: React.FC = () => (
  <Frame>
    <Row gap={8}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 22, color: INK }}>1.347</span>
      <CompareSymbol symbol="=" size={20} />
    </Row>
    <span
      style={{
        fontFamily: "Fredoka, sans-serif", fontWeight: 700, fontSize: 13,
        color: PINK_DEEP, textAlign: "center", lineHeight: 1.3,
      }}
    >
      one and three hundred forty-seven thousandths
    </span>
  </Frame>
);

const D3_7: React.FC = () => (
  <Frame>
    <Row gap={10}>
      <Col gap={3}>
        <ThousandthsBar shaded={347} width={140} height={20} showTicks={false} />
        <Caption color={PINK_DEEP}>0.347</Caption>
      </Col>
      <CompareSymbol symbol=">" size={24} />
      <Col gap={3}>
        <ThousandthsBar shaded={340} width={140} height={20} showTicks={false} />
        <Caption color={PINK_DEEP}>0.34</Caption>
      </Col>
    </Row>
  </Frame>
);

const D3_8: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      Order from smallest to largest
    </div>
    <Row gap={6}>
      <OpsBlock size={16}>0.340</OpsBlock>
      <span style={{ fontSize: 16, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <OpsBlock size={16}>0.342</OpsBlock>
      <span style={{ fontSize: 16, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <OpsBlock size={16}>0.345</OpsBlock>
    </Row>
  </Frame>
);

const D3_9: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={20}>0.347</OpsBlock>
      <svg width={40} height={14} viewBox="0 0 40 14">
        <line x1={2} y1={7} x2={32} y2={7} stroke={PINK_DEEP} strokeWidth={2.5} />
        <polygon points="38,7 32,3 32,11" fill={PINK_DEEP} />
      </svg>
      <OpsBlock size={20}>0.35</OpsBlock>
    </Row>
    <Caption color={PINK_DEEP}>round to the nearest hundredth (0.347 → 0.35)</Caption>
  </Frame>
);

const D3_10: React.FC = () => (
  <Frame>
    <DecimalNumberLine
      width={280} height={56} divisions={10}
      marks={[{ pos: 0.347, label: "0.347" }]}
    />
    <Caption>place 0.347 on a number line</Caption>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * STAGE 4 — Mixed (Year 6+)
 * ════════════════════════════════════════════════════════════════════ */

const D4_1: React.FC = () => {
  const lineWidth = 320;
  const labelStyle: React.CSSProperties = {
    fontFamily: "Nunito, sans-serif",
    fontWeight: 800,
    fontSize: 10,
    color: PINK_DEEP,
    letterSpacing: "0.06em",
  };
  return (
    <Frame pad={8}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <span style={labelStyle}>TENTHS</span>
        <NumberLine
          width={lineWidth} height={32} divisions={10} hideEndpoints labelSize={9}
          marks={[{ pos: 0, label: "0" }, { pos: 0.5, label: "0.5" }, { pos: 1, label: "1" }]}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <span style={labelStyle}>HUNDREDTHS</span>
        <NumberLine
          width={lineWidth} height={32} divisions={10} hideEndpoints labelSize={9}
          marks={[{ pos: 0, label: "0.3" }, { pos: 0.5, label: "0.35" }, { pos: 1, label: "0.4" }]}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <span style={labelStyle}>THOUSANDTHS</span>
        <NumberLine
          width={lineWidth} height={32} divisions={10} hideEndpoints labelSize={9}
          marks={[{ pos: 0, label: "0.34" }, { pos: 0.5, label: "0.345" }, { pos: 1, label: "0.35" }]}
        />
      </div>
    </Frame>
  );
};

const D4_2: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      Find any place — tenths · hundredths · thousandths
    </div>
    <DigitHighlight
      size={28}
      parts={[
        { text: "0" }, { text: "." },
        { text: "3", highlight: true }, { text: "4" }, { text: "7" },
      ]}
    />
    <Caption color={PINK_DEEP}>tenths = 3 · hundredths = 4 · thousandths = 7</Caption>
  </Frame>
);

const D4_3: React.FC = () => (
  <Frame>
    <Row gap={8}>
      <OpsBlock size={16}>0.3 = 3 tenths</OpsBlock>
    </Row>
    <Row gap={8}>
      <OpsBlock size={16}>0.34 = 34 hundredths</OpsBlock>
    </Row>
    <Row gap={8}>
      <OpsBlock size={16}>0.347 = 347 thousandths</OpsBlock>
    </Row>
  </Frame>
);

const D4_4: React.FC = () => (
  <Frame>
    <OpsBlock size={14}>
      <span>12.456</span>
      <CompareSymbol symbol="=" size={14} />
      <span style={{ color: PINK_DEEP }}>10</span>
      <span>+</span>
      <span style={{ color: PINK_DEEP }}>2</span>
      <span>+</span>
      <span style={{ color: PINK_DEEP }}>0.4</span>
      <span>+</span>
      <span style={{ color: PINK_DEEP }}>0.05</span>
      <span>+</span>
      <span style={{ color: PINK_DEEP }}>0.006</span>
    </OpsBlock>
  </Frame>
);

const D4_5: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 18, color: INK }}>
      12.456
    </div>
    <PVTable
      size={20}
      cells={[
        { label: "Tens", value: "1" },
        { label: "Ones", value: "2" },
        { label: "Tenths", value: "4" },
        { label: "Hundredths", value: "5" },
        { label: "Thousandths", value: "6" },
      ]}
    />
  </Frame>
);

const D4_6: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 22, color: INK }}>12.456</span>
      <CompareSymbol symbol="=" size={18} />
    </Row>
    <span style={{
      fontFamily: "Fredoka, sans-serif", fontWeight: 700, fontSize: 12,
      color: PINK_DEEP, textAlign: "center", lineHeight: 1.3, padding: "0 8px",
    }}>
      twelve and four hundred fifty-six thousandths
    </span>
  </Frame>
);

const D4_7: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={16}>0.4</OpsBlock>
      <span style={{ fontSize: 18, color: PINK_DEEP, fontWeight: 800 }}>&gt;</span>
      <OpsBlock size={16}>0.42</OpsBlock>
      <span style={{ fontSize: 18, color: PINK_DEEP, fontWeight: 800 }}>?</span>
    </Row>
    <Caption color={PINK_DEEP}>compare carefully: 0.40 vs 0.42 → 0.42 wins!</Caption>
    <Row gap={6}>
      <OpsBlock size={16}>0.40</OpsBlock>
      <span style={{ fontSize: 18, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <OpsBlock size={16}>0.42</OpsBlock>
    </Row>
  </Frame>
);

const D4_8: React.FC = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 800, fontSize: 14, color: INK }}>
      Order from smallest to largest
    </div>
    <Row gap={6}>
      <OpsBlock size={14}>0.4</OpsBlock>
      <span style={{ fontSize: 14, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <OpsBlock size={14}>0.412</OpsBlock>
      <span style={{ fontSize: 14, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <OpsBlock size={14}>0.42</OpsBlock>
      <span style={{ fontSize: 14, color: PINK_DEEP, fontWeight: 800 }}>&lt;</span>
      <OpsBlock size={14}>0.5</OpsBlock>
    </Row>
  </Frame>
);

const D4_9: React.FC = () => (
  <Frame>
    <Row gap={6}>
      <OpsBlock size={16}>0.347</OpsBlock>
      <svg width={32} height={14} viewBox="0 0 32 14">
        <line x1={2} y1={7} x2={24} y2={7} stroke={PINK_DEEP} strokeWidth={2.5} />
        <polygon points="30,7 24,3 24,11" fill={PINK_DEEP} />
      </svg>
      <OpsBlock size={16}>0.3</OpsBlock>
      <Caption color={PINK_DEEP}>(to tenth)</Caption>
    </Row>
    <Row gap={6}>
      <OpsBlock size={16}>0.347</OpsBlock>
      <svg width={32} height={14} viewBox="0 0 32 14">
        <line x1={2} y1={7} x2={24} y2={7} stroke={PINK_DEEP} strokeWidth={2.5} />
        <polygon points="30,7 24,3 24,11" fill={PINK_DEEP} />
      </svg>
      <OpsBlock size={16}>0.35</OpsBlock>
      <Caption color={PINK_DEEP}>(to hundredth)</Caption>
    </Row>
  </Frame>
);

const D4_10: React.FC = () => (
  <Frame>
    <DecimalNumberLine
      width={280} height={56} divisions={10}
      marks={[
        { pos: 0.3, label: "0.3" },
        { pos: 0.47, label: "0.47" },
        { pos: 0.812, label: "0.812" },
      ]}
    />
    <Caption>place decimals at any precision</Caption>
  </Frame>
);

/* ════════════════════════════════════════════════════════════════════
 * MAP — all 4 Stages
 * ════════════════════════════════════════════════════════════════════ */
const MAP: Record<string, React.FC> = {
  // Stage 1 — Tenths
  "1.1": D1_1, "1.2": D1_2, "1.3": D1_3, "1.4": D1_4, "1.5": D1_5,
  "1.6": D1_6, "1.7": D1_7, "1.8": D1_8, "1.9": D1_9, "1.10": D1_10,
  // Stage 2 — Hundredths
  "2.1": D2_1, "2.2": D2_2, "2.3": D2_3, "2.4": D2_4, "2.5": D2_5,
  "2.6": D2_6, "2.7": D2_7, "2.8": D2_8, "2.9": D2_9, "2.10": D2_10,
  // Stage 3 — Thousandths
  "3.1": D3_1, "3.2": D3_2, "3.3": D3_3, "3.4": D3_4, "3.5": D3_5,
  "3.6": D3_6, "3.7": D3_7, "3.8": D3_8, "3.9": D3_9, "3.10": D3_10,
  // Stage 4 — Mixed
  "4.1": D4_1, "4.2": D4_2, "4.3": D4_3, "4.4": D4_4, "4.5": D4_5,
  "4.6": D4_6, "4.7": D4_7, "4.8": D4_8, "4.9": D4_9, "4.10": D4_10,
};

export const HAS_DECIMAL_PV_PREVIEW = new Set(Object.keys(MAP));

export default function DecimalPvExercisePreview({ code }: { code: string }) {
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
