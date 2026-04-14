import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import MassSectionBlock from "@/components/MassSectionBlock";
import { meta as meta4, skills as skills4 } from "@/data/massYear4";
import { meta as meta5, skills as skills5 } from "@/data/massYear5";
import { meta as meta6, skills as skills6 } from "@/data/massYear6";

const footerData = { brand: "Solveitmaths.com" };

export default function MassPhase2Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta4, skills: skills4 },
        { meta: meta5, skills: skills5 },
        { meta: meta6, skills: skills6 },
      ]}
      footerData={footerData}
      SectionBlock={MassSectionBlock}
    />
  );
}
