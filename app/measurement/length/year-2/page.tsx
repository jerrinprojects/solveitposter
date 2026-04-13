import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthYear2";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthYear2Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
