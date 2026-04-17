import type { PosterSkill } from "@/types";
import ExercisePreview from "./ExercisePreview";
import ImageCard from "./ImageCard";

// Codes that have a built-in static exercise preview
const PREVIEW_CODES = new Set([
  // Year 0a
  "0.1a","0.2a","0.3a","0.4a","0.5a","0.6a","0.7a","0.8a","0.9a",
  // Year 0b
  "0.1b","0.2b","0.3b","0.4b","0.5b","0.6b","0.7b","0.8b","0.9b",
  // Year 1
  "1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.9",
  // Year 2
  "2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8","2.9",
  // Year 3
  "3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9",
  // Year 4
  "4.1","4.2","4.3","4.4","4.5","4.6","4.7","4.8","4.9",
  // Year 5a
  "5.1a","5.2a","5.3a","5.4a","5.5a","5.6a","5.7a","5.8a","5.9a",
  // Year 5b
  "5.1b","5.2b","5.3b","5.4b","5.5b","5.6b","5.7b","5.8b","5.9b",
  // Year 6
  "6.1","6.2","6.3","6.4","6.5","6.6","6.7","6.8","6.9",
  // Year 7
  "7.1","7.2","7.3","7.4","7.5","7.6","7.7","7.8","7.9",
  // Year 8
  "8.1","8.2","8.3","8.4","8.5","8.6","8.7","8.8","8.9",
]);

interface SectionBlockProps {
  skill: PosterSkill;
}

export default function SectionBlock({ skill }: SectionBlockProps) {
  const hasPreview = PREVIEW_CODES.has(skill.code);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print-card">

      {/* Left: Skill code + "I can..." description */}
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
        <ExercisePreview code={skill.code} />
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ minHeight: 148 }}>
          <ImageCard defaultAlt={`${skill.code} exercise screenshot`} />
        </div>
      )}

    </div>
  );
}
