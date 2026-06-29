import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import AngleSectionBlock from "@/components/AngleSectionBlock";
import { meta as meta4, skills as skills4 } from "@/data/angleYear4";
import { meta as meta5, skills as skills5 } from "@/data/angleYear5";
import { meta as meta6, skills as skills6 } from "@/data/angleYear6";

const footerData = { brand: "Solveitmaths.com" };

export default function AnglePhase2Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta4, skills: skills4 },
        { meta: meta5, skills: skills5 },
        { meta: meta6, skills: skills6 },
      ]}
      footerData={footerData}
      SectionBlock={AngleSectionBlock}
    />
  );
}
