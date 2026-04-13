import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthYear1";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthYear1Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
