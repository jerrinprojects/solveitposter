// Brand-styled skill row (Tricky 12 design language) for Phase posters.
// Keeps the existing skill content ("I can…") and ExercisePreview visual on the right;
// only the surrounding card style is updated to match the Times Table poster look.

import type { PosterSkill } from "@/types";
import ExercisePreview from "./ExercisePreview";
import ImageCard from "./ImageCard";

const BRAND_PALETTE = [
  { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", number: "#ec407a" }, // pink
  { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", number: "#14b8a6" }, // mint
  { ink: "#b8860b", soft: "#fff7d9", chip: "#ffe8a0", number: "#e8a93e" }, // sunny
  { ink: "#7c3aed", soft: "#f3edff", chip: "#dccdfb", number: "#a78bda" }, // grape
] as const;

// Which codes have a built-in static exercise preview
const PREVIEW_CODES = new Set([
  "0.1a","0.2a","0.3a","0.4a","0.5a","0.6a","0.7a","0.8a","0.9a",
  "0.1b","0.2b","0.3b","0.4b","0.5b","0.6b","0.7b","0.8b","0.9b",
  "1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.9",
  "2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8","2.9",
  "3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9",
  "4.1","4.2","4.3","4.4","4.5","4.6","4.7","4.8","4.9",
  "5.1a","5.2a","5.3a","5.4a","5.5a","5.6a","5.7a","5.8a","5.9a",
  "5.1b","5.2b","5.3b","5.4b","5.5b","5.6b","5.7b","5.8b","5.9b",
  "6.1","6.2","6.3","6.4","6.5","6.6","6.7","6.8","6.9",
  "7.1","7.2","7.3","7.4","7.5","7.6","7.7","7.8","7.9",
  "8.1","8.2","8.3","8.4","8.5","8.6","8.7","8.8","8.9",
]);

interface Props {
  skill: PosterSkill;
  accentIndex: number;
}

export default function BrandSectionBlock({ skill, accentIndex }: Props) {
  const { ink, soft, chip, number } = BRAND_PALETTE[accentIndex % BRAND_PALETTE.length];
  const hasPreview = PREVIEW_CODES.has(skill.code);

  return (
    <div className="print-card" style={{
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
      gap: 12,
      borderRadius: 20,
      background: soft,
      border: `2px solid ${chip}`,
      overflow: "hidden",
      boxShadow: "0 2px 0 rgba(0,0,0,0.04)",
    }}>
      {/* Left: skill code + "I can…" description */}
      <div style={{
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 6,
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 30,
          fontWeight: 800,
          color: number,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}>
          {skill.code}
        </span>
        <p style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: "#2a2422",
          lineHeight: 1.4,
          margin: 0,
        }}>
          {skill.description}
        </p>
      </div>

      {/* Right: preview > uploaded image > placeholder */}
      <div style={{
        background: "#fffaf3",
        borderLeft: `2px solid ${chip}`,
        minHeight: 150,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "stretch",
        overflow: "hidden",
      }}>
        {skill.imageUrl ? (
          <img
            src={skill.imageUrl}
            alt={`${skill.code} exercise`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : hasPreview ? (
          <ExercisePreview code={skill.code} />
        ) : (
          <ImageCard defaultAlt={`${skill.code} exercise screenshot`} />
        )}
      </div>
    </div>
  );
}
