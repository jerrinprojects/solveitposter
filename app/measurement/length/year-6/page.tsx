import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthYear6";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthYear6Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
