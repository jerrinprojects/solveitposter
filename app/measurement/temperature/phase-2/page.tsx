import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import TemperatureSectionBlock from "@/components/TemperatureSectionBlock";
import { meta as meta4, skills as skills4 } from "@/data/temperatureYear4";
import { meta as meta5, skills as skills5 } from "@/data/temperatureYear5";
import { meta as meta6, skills as skills6 } from "@/data/temperatureYear6";

const footerData = { brand: "Solveitmaths.com" };

export default function TemperaturePhase2Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta4, skills: skills4 },
        { meta: meta5, skills: skills5 },
        { meta: meta6, skills: skills6 },
      ]}
      footerData={footerData}
      SectionBlock={TemperatureSectionBlock}
    />
  );
}
