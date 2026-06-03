import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import TimeSectionBlock from "@/components/TimeSectionBlock";
import { meta as meta0, skills as skills0 } from "@/data/timeYear0";
import { meta as meta1, skills as skills1 } from "@/data/timeYear1";
import { meta as meta2, skills as skills2 } from "@/data/timeYear2";
import { meta as meta3, skills as skills3 } from "@/data/timeYear3";

const footerData = { brand: "Solveitmaths.com" };

export default function TimePhase1Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta0, skills: skills0 },
        { meta: meta1, skills: skills1 },
        { meta: meta2, skills: skills2 },
        { meta: meta3, skills: skills3 },
      ]}
      footerData={footerData}
      SectionBlock={TimeSectionBlock}
    />
  );
}
