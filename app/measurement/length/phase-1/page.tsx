import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthPhase1";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthPhase1Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
