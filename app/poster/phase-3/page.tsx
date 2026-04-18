import type { Metadata } from "next";
import PosterYearSection from "@/components/PosterYearSection";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Number Structure – Phase 3 | Solve It Maths",
};

import { posterMeta as meta7, posterSkills as skills7, footerData as footer7 } from "@/data/posterYear7";
import { posterMeta as meta8, posterSkills as skills8, footerData as footer8 } from "@/data/posterYear8";

const years = [
  { meta: meta7, skills: skills7, footer: footer7 },
  { meta: meta8, skills: skills8, footer: footer8 },
];

export default function Phase3PosterPage() {
  return (
    <main className="bg-pink-100">
      <div className="no-print max-w-4xl mx-auto px-6 pt-4">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-700 transition-colors"
        >
          <span>←</span> Back to Topics
        </a>
      </div>

      {years.map(({ meta, skills, footer }) => (
        <PosterYearSection key={meta.year} meta={meta} skills={skills} footer={footer} />
      ))}

      <PrintButton />
    </main>
  );
}
