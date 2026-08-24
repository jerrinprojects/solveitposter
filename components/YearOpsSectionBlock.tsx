import type { PosterSkill } from "@/types";
import YearOpsExercisePreview, {
  HAS_YEAR_OPS_PREVIEW,
} from "./YearOpsExercisePreview";
import ImageCard from "./ImageCard";

interface Props { skill: PosterSkill; }

/* Mirrors solveit's `formatLevelId` (src/utils/levelDisplay.js) — turns
 * "3.10" into "3 · 10" so students don't read the dotted ID as a decimal. */
function formatLevelId(id: string) {
  return id.replace(".", " · ");
}

export default function YearOpsSectionBlock({ skill }: Props) {
  const hasPreview = HAS_YEAR_OPS_PREVIEW.has(skill.code);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print-card">
      <div className="bg-white rounded-2xl border-2 border-pink-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col justify-center">
        <p className="font-fredoka font-bold text-2xl sm:text-3xl text-pink-500 text-center leading-none mb-2 sm:mb-3">
          {formatLevelId(skill.code)}
        </p>
        <p className="font-nunito font-bold text-base sm:text-lg text-gray-800 leading-snug">
          {skill.description}
        </p>
      </div>
      {skill.imageUrl ? (
        <div className="rounded-2xl overflow-hidden border-2 border-pink-200" style={{ minHeight: 148 }}>
          <img src={skill.imageUrl} alt={`${skill.code} exercise`} className="w-full h-full object-cover" />
        </div>
      ) : hasPreview ? (
        <YearOpsExercisePreview code={skill.code} />
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ minHeight: 148 }}>
          <ImageCard defaultAlt={`${skill.code} exercise screenshot`} />
        </div>
      )}
    </div>
  );
}
