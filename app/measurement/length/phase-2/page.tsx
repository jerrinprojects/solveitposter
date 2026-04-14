import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthPhase2";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthPhase2Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
