import type { Metadata } from "next";
import BrandYearSection from "@/components/BrandYearSection";
import PrintButton from "@/components/PrintButton";
import { BackToTopics } from "@/components/PosterFrame";

export const metadata: Metadata = {
  title: "Number Structures – Phase 3 | Solve It Maths",
};

import { posterMeta as meta7, posterSkills as skills7, footerData as footer7 } from "@/data/posterYear7";
import { posterMeta as meta8, posterSkills as skills8, footerData as footer8 } from "@/data/posterYear8";

const years = [
  { meta: meta7, skills: skills7, footer: footer7 },
  { meta: meta8, skills: skills8, footer: footer8 },
];

export default function Phase3PosterPage() {
  return (
    <main style={{ background: "#fff3e6", minHeight: "100vh", paddingBottom: 48 }}>
      <BackToTopics />

      {years.map(({ meta, skills, footer }) => (
        <BrandYearSection key={meta.year} meta={meta} skills={skills} footer={footer} />
      ))}

      <PrintButton />
    </main>
  );
}
