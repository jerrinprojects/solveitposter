import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import { meta as meta7, skills as skills7 } from "@/data/lengthYear7";
import { meta as meta8, skills as skills8 } from "@/data/lengthYear8";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthPhase3Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta7, skills: skills7 },
        { meta: meta8, skills: skills8 },
      ]}
      footerData={footerData}
    />
  );
}
