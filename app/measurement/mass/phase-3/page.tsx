import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import MassSectionBlock from "@/components/MassSectionBlock";
import { meta as meta7, skills as skills7 } from "@/data/massYear7";
import { meta as meta8, skills as skills8 } from "@/data/massYear8";

const footerData = { brand: "Solveitmaths.com" };

export default function MassPhase3Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta7, skills: skills7 },
        { meta: meta8, skills: skills8 },
      ]}
      footerData={footerData}
      SectionBlock={MassSectionBlock}
    />
  );
}
