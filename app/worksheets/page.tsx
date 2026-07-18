import Link from "next/link";
import { ADDITION_STAGES } from "@/data/additionStages";
import { SUBTRACTION_STAGES } from "@/data/subtractionStages";
import { MULTIPLICATION_STAGES } from "@/data/multiplicationStages";
import { DIVISION_STAGES } from "@/data/divisionStages";
import { LENGTH_LEVELS, POLYGON_LEVELS, COMPARE_LEVELS } from "@/data/lengthLevels";
import { SPOT_LEVELS } from "@/data/rationalWsLevels";

type Category = {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  count: string;
  // Tailwind colour classes — kept inline so tailwind picks them up.
  borderClass: string;
  bgClass: string;
  textClass: string;
  hoverClass: string;
};

function CategoryCard({ category }: { category: Category }) {
  const { href, icon, title, subtitle, count, borderClass, bgClass, textClass, hoverClass } = category;
  return (
    <Link
      href={href}
      className={`group flex flex-col items-start gap-3 ${bgClass} border-2 ${borderClass} rounded-3xl px-6 py-7 transition-all hover:shadow-lg ${hoverClass}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl">{icon}</span>
        <h2 className={`font-fredoka font-bold text-3xl ${textClass} leading-none`}>
          {title}
        </h2>
      </div>
      <p className="font-nunito text-sm font-semibold text-gray-600">
        {subtitle}
      </p>
      <div className="flex w-full items-center justify-between mt-2">
        <span className="font-nunito text-xs font-bold text-gray-400 uppercase tracking-wider">
          {count}
        </span>
        <span className={`${textClass} text-lg font-bold group-hover:translate-x-1 transition-transform`}>
          →
        </span>
      </div>
    </Link>
  );
}

export default function WorksheetsLandingPage() {
  const lengthCount =
    LENGTH_LEVELS.length + POLYGON_LEVELS.length + COMPARE_LEVELS.length;

  const categories: Category[] = [
    {
      href: "/worksheets/addition",
      icon: "➕",
      title: "Addition",
      subtitle: "Inline, column and word problems",
      count: `Stages 1–5 · ${ADDITION_STAGES.length} levels`,
      borderClass: "border-pink-200",
      bgClass: "bg-pink-50",
      textClass: "text-pink-600",
      hoverClass: "hover:border-pink-400",
    },
    {
      href: "/worksheets/subtraction",
      icon: "➖",
      title: "Subtraction",
      subtitle: "Inline, column and word problems",
      count: `Stages 1–5 · ${SUBTRACTION_STAGES.length} levels`,
      borderClass: "border-amber-200",
      bgClass: "bg-amber-50",
      textClass: "text-amber-600",
      hoverClass: "hover:border-amber-400",
    },
    {
      href: "/worksheets/multiplication",
      icon: "✖️",
      title: "Multiplication",
      subtitle: "Inline, column and word problems",
      count: `Stages 1–5 · ${MULTIPLICATION_STAGES.length} levels`,
      borderClass: "border-teal-200",
      bgClass: "bg-teal-50",
      textClass: "text-teal-600",
      hoverClass: "hover:border-teal-400",
    },
    {
      href: "/worksheets/division",
      icon: "➗",
      title: "Division",
      subtitle: "Inline, long division and word problems",
      count: `Stages 1–5 · ${DIVISION_STAGES.length} levels`,
      borderClass: "border-purple-200",
      bgClass: "bg-purple-50",
      textClass: "text-purple-600",
      hoverClass: "hover:border-purple-400",
    },
    {
      href: "/worksheets/length",
      icon: "📐",
      title: "Length — Area & Perimeter",
      subtitle: "Diagrams, counting squares, polygons and word problems",
      count: `Years 3, 4, 6 · ${lengthCount} levels`,
      borderClass: "border-rose-200",
      bgClass: "bg-rose-50",
      textClass: "text-rose-600",
      hoverClass: "hover:border-rose-400",
    },
    {
      href: "/worksheets/rational",
      icon: "🍕",
      title: "Fractions",
      subtitle: "Spot halves, thirds and quarters in shapes",
      count: `Year 2 · ${SPOT_LEVELS.length} level`,
      borderClass: "border-fuchsia-200",
      bgClass: "bg-fuchsia-50",
      textClass: "text-fuchsia-600",
      hoverClass: "hover:border-fuchsia-400",
    },
  ];

  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <p className="font-nunito text-xs font-bold text-pink-400 tracking-[0.35em] uppercase mb-3">
          Solveitmaths.com
        </p>
        <h1 className="font-fredoka font-bold text-4xl sm:text-5xl text-pink-600 leading-tight">
          Worksheets
        </h1>
        <p className="font-nunito text-sm text-gray-500 mt-2">
          Printable practice sheets — pick a topic to begin.
        </p>
      </div>

      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((c) => (
          <CategoryCard key={c.href} category={c} />
        ))}
      </div>

      <div className="pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-700 transition-colors"
        >
          <span>←</span> Back to Posters
        </Link>
      </div>
    </main>
  );
}
