import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthYear3";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthYear3Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
