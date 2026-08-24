import type { PosterSkill } from "@/types";
import RationalExercisePreview, {
  HAS_RATIONAL_PREVIEW,
} from "./RationalExercisePreview";
import ImageCard from "./ImageCard";

interface SectionBlockProps {
  skill: PosterSkill;
}

export default function RationalSectionBlock({ skill }: SectionBlockProps) {
  const hasPreview = HAS_RATIONAL_PREVIEW.has(skill.code);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print-card">
      {/* Left: Skill code + I can description */}
      <div className="bg-white rounded-2xl border-2 border-pink-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col justify-center">
        <p className="font-fredoka font-bold text-2xl sm:text-3xl text-pink-500 text-center leading-none mb-2 sm:mb-3">
          {skill.code}
        </p>
        <p className="font-nunito font-bold text-base sm:text-lg text-gray-800 leading-snug">
          {skill.description}
        </p>
      </div>

      {/* Right: exercise preview > uploaded image > empty placeholder */}
      {skill.imageUrl ? (
        <div className="rounded-2xl overflow-hidden border-2 border-pink-200" style={{ minHeight: 148 }}>
          <img
            src={skill.imageUrl}
            alt={`${skill.code} exercise`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : hasPreview ? (
        <RationalExercisePreview code={skill.code} />
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ minHeight: 148 }}>
          <ImageCard defaultAlt={`${skill.code} exercise screenshot`} />
        </div>
      )}
    </div>
  );
}
