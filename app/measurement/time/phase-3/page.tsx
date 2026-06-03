import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import TimeSectionBlock from "@/components/TimeSectionBlock";
import { meta as meta7, skills as skills7 } from "@/data/timeYear7";
import { meta as meta8, skills as skills8 } from "@/data/timeYear8";

const footerData = { brand: "Solveitmaths.com" };

export default function TimePhase3Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta7, skills: skills7 },
        { meta: meta8, skills: skills8 },
      ]}
      footerData={footerData}
      SectionBlock={TimeSectionBlock}
    />
  );
}
