import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import TemperatureSectionBlock from "@/components/TemperatureSectionBlock";
import { meta as meta7, skills as skills7 } from "@/data/temperatureYear7";
import { meta as meta8, skills as skills8 } from "@/data/temperatureYear8";

const footerData = { brand: "Solveitmaths.com" };

export default function TemperaturePhase3Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta7, skills: skills7 },
        { meta: meta8, skills: skills8 },
      ]}
      footerData={footerData}
      SectionBlock={TemperatureSectionBlock}
    />
  );
}
