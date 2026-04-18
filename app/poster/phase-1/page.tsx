import type { Metadata } from "next";
import PosterYearSection from "@/components/PosterYearSection";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Number Structures – Phase 1 | Solve It Maths",
};

import { posterMeta as meta0a, posterSkills as skills0a, footerData as footer0a } from "@/data/posterData";
import { posterMeta as meta0b, posterSkills as skills0b, footerData as footer0b } from "@/data/posterYear0b";
import { posterMeta as meta1,  posterSkills as skills1,  footerData as footer1  } from "@/data/posterYear1";
import { posterMeta as meta2,  posterSkills as skills2,  footerData as footer2  } from "@/data/posterYear2";
import { posterMeta as meta3,  posterSkills as skills3,  footerData as footer3  } from "@/data/posterYear3";

const years = [
  { meta: meta0a, skills: skills0a, footer: footer0a },
  { meta: meta0b, skills: skills0b, footer: footer0b },
  { meta: meta1,  skills: skills1,  footer: footer1  },
  { meta: meta2,  skills: skills2,  footer: footer2  },
  { meta: meta3,  skills: skills3,  footer: footer3  },
];

export default function Phase1PosterPage() {
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
