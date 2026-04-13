import MeasurementPosterPage from "@/components/MeasurementPosterPage";
import { meta, skills } from "@/data/lengthYear7";

const footerData = { brand: "Solveitmaths.com" };

export default function LengthYear7Page() {
  return <MeasurementPosterPage meta={meta} skills={skills} footerData={footerData} />;
}
