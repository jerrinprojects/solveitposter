import { notFound } from "next/navigation";
import ShapeWorksheetFrame from "@/components/ShapeWorksheetFrame";
import { LENGTH_LEVELS, getLengthLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return LENGTH_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getLengthLevel(levelId);
  if (!level) notFound();
  return <ShapeWorksheetFrame level={level} version={1} />;
}
