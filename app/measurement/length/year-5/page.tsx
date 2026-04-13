import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthYear5";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthYear5Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
