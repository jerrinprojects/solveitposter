import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthPhase3";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthPhase3Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
