import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import MassSectionBlock from "@/components/MassSectionBlock";
import { meta as meta0, skills as skills0 } from "@/data/massYear0";
import { meta as meta1, skills as skills1 } from "@/data/massYear1";
import { meta as meta2, skills as skills2 } from "@/data/massYear2";
import { meta as meta3, skills as skills3 } from "@/data/massYear3";

const footerData = { brand: "Solveitmaths.com" };

export default function MassPhase1Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta0, skills: skills0 },
        { meta: meta1, skills: skills1 },
        { meta: meta2, skills: skills2 },
        { meta: meta3, skills: skills3 },
      ]}
      footerData={footerData}
      SectionBlock={MassSectionBlock}
    />
  );
}
