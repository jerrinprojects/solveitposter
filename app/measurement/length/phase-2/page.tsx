import MeasurementPhasePostersPage from "@/components/MeasurementPhasePostersPage";
import { meta as meta4, skills as skills4 } from "@/data/lengthYear4";
import { meta as meta5, skills as skills5 } from "@/data/lengthYear5";
import { meta as meta6, skills as skills6 } from "@/data/lengthYear6";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthPhase2Page() {
  return (
    <MeasurementPhasePostersPage
      years={[
        { meta: meta4, skills: skills4 },
        { meta: meta5, skills: skills5 },
        { meta: meta6, skills: skills6 },
      ]}
      footerData={footerData}
    />
  );
}
