import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import CapacitySectionBlock from "@/components/CapacitySectionBlock";
import { meta as meta0, skills as skills0 } from "@/data/capacityYear0";
import { meta as meta1, skills as skills1 } from "@/data/capacityYear1";
import { meta as meta2, skills as skills2 } from "@/data/capacityYear2";
import { meta as meta3, skills as skills3 } from "@/data/capacityYear3";

const footerData = { brand: "Solveitmaths.com" };

export default function CapacityPhase1Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta0, skills: skills0 },
        { meta: meta1, skills: skills1 },
        { meta: meta2, skills: skills2 },
        { meta: meta3, skills: skills3 },
      ]}
      footerData={footerData}
      SectionBlock={CapacitySectionBlock}
    />
  );
}
