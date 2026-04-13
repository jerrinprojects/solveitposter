import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthYear8";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthYear8Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
