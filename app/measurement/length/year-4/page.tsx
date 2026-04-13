import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthYear4";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthYear4Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
