import type { Metadata } from "next";
import PosterYearSection from "@/components/PosterYearSection";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Number Structures – Phase 2 | Solve It Maths",
};

import { posterMeta as meta4,  posterSkills as skills4,  footerData as footer4  } from "@/data/posterYear4";
import { posterMeta as meta5a, posterSkills as skills5a, footerData as footer5a } from "@/data/posterYear5a";
import { posterMeta as meta5b, posterSkills as skills5b, footerData as footer5b } from "@/data/posterYear5b";
import { posterMeta as meta6,  posterSkills as skills6,  footerData as footer6  } from "@/data/posterYear6";

const years = [
  { meta: meta4,  skills: skills4,  footer: footer4  },
  { meta: meta5a, skills: skills5a, footer: footer5a },
  { meta: meta5b, skills: skills5b, footer: footer5b },
  { meta: meta6,  skills: skills6,  footer: footer6  },
];

export default function Phase2PosterPage() {
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
