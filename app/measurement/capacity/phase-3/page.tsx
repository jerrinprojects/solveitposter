import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import CapacitySectionBlock from "@/components/CapacitySectionBlock";
import { meta as meta7, skills as skills7 } from "@/data/capacityYear7";
import { meta as meta8, skills as skills8 } from "@/data/capacityYear8";

const footerData = { brand: "Solveitmaths.com" };

export default function CapacityPhase3Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta7, skills: skills7 },
        { meta: meta8, skills: skills8 },
      ]}
      footerData={footerData}
      SectionBlock={CapacitySectionBlock}
    />
  );
}
