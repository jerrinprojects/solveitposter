import type { PosterSkill } from "@/types";
import ExercisePreview from "./ExercisePreview";
import ImageCard from "./ImageCard";

// Codes that have a built-in static exercise preview
const PREVIEW_CODES = new Set([
  "0.1a","0.2a","0.3a","0.4a","0.5a","0.6a","0.7a","0.8a","0.9a",
]);

interface SectionBlockProps {
  skill: PosterSkill;
}

export default function SectionBlock({ skill }: SectionBlockProps) {
  const hasPreview = PREVIEW_CODES.has(skill.code);

  return (
    <div className="grid grid-cols-2 gap-3 print-card">

      {/* Left: Skill code + "I can..." description */}
      <div className="bg-white rounded-2xl border-2 border-pink-200 px-6 py-7 flex flex-col justify-center">
        <p className="font-fredoka font-bold text-3xl text-pink-500 text-center leading-none mb-3">
          {skill.code}
        </p>
        <p className="font-nunito font-bold text-lg text-gray-800 leading-snug">
          {skill.description}
        </p>
      </div>

      {/* Right: exercise preview > uploaded image > empty placeholder */}
      {skill.imageUrl ? (
        <div className="rounded-2xl overflow-hidden border-2 border-pink-200" style={{ minHeight: 178 }}>
          <img
            src={skill.imageUrl}
            alt={`${skill.code} exercise`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : hasPreview ? (
        <ExercisePreview code={skill.code} />
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ minHeight: 178 }}>
          <ImageCard defaultAlt={`${skill.code} exercise screenshot`} />
        </div>
      )}

    </div>
  );
}
