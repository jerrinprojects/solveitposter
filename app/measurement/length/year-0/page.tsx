import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthYear0";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthYear0Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
