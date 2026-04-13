import type { PosterMeta, PosterSkill, FooterData } from "@/types";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import PrintButton from "./PrintButton";
import MeasurementSectionBlock from "./MeasurementSectionBlock";
import Link from "next/link";

interface MeasurementPosterPageProps {
  meta: PosterMeta;
  skills: PosterSkill[];
  footerData: FooterData;
}

export default function MeasurementPosterPage({ meta, skills, footerData }: MeasurementPosterPageProps) {
  return (
    <div className="min-h-screen bg-pink-50 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-3xl mx-auto">

        {/* Back link — screen only */}
        <div className="no-print mb-4">
          <Link
            href="/"
            className="font-nunito text-sm font-semibold text-pink-400 hover:text-pink-600 transition-colors"
          >
            ← Back to Topics
          </Link>
        </div>

        <PageHeader meta={meta} />

        <div className="space-y-3 mt-3">
          {skills.map((skill) => (
            <MeasurementSectionBlock key={skill.code} skill={skill} />
          ))}
        </div>

        <PageFooter data={footerData} />
      </div>

      <PrintButton />
    </div>
  );
}
