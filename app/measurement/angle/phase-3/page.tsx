import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import AngleSectionBlock from "@/components/AngleSectionBlock";
import { meta as meta7, skills as skills7 } from "@/data/angleYear7";
import { meta as meta8, skills as skills8 } from "@/data/angleYear8";

const footerData = { brand: "Solveitmaths.com" };

export default function AnglePhase3Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta7, skills: skills7 },
        { meta: meta8, skills: skills8 },
      ]}
      footerData={footerData}
      SectionBlock={AngleSectionBlock}
    />
  );
}
