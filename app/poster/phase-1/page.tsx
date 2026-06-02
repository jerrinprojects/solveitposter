import type { Metadata } from "next";
import BrandYearSection from "@/components/BrandYearSection";
import PrintButton from "@/components/PrintButton";
import { BackToTopics } from "@/components/PosterFrame";

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
    <main style={{ background: "#fff3e6", minHeight: "100vh", paddingBottom: 48 }}>
      <BackToTopics />

      {years.map(({ meta, skills, footer }) => (
        <BrandYearSection key={meta.year} meta={meta} skills={skills} footer={footer} />
      ))}

      <PrintButton />
    </main>
  );
}
