import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import AngleSectionBlock from "@/components/AngleSectionBlock";
import { meta as meta0, skills as skills0 } from "@/data/angleYear0";
import { meta as meta1, skills as skills1 } from "@/data/angleYear1";
import { meta as meta2, skills as skills2 } from "@/data/angleYear2";
import { meta as meta3, skills as skills3 } from "@/data/angleYear3";

const footerData = { brand: "Solveitmaths.com" };

export default function AnglePhase1Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta0, skills: skills0 },
        { meta: meta1, skills: skills1 },
        { meta: meta2, skills: skills2 },
        { meta: meta3, skills: skills3 },
      ]}
      footerData={footerData}
      SectionBlock={AngleSectionBlock}
    />
  );
}
