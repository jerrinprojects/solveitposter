import { notFound } from "next/navigation";
import MissingDimWorksheetFrame from "@/components/MissingDimWorksheetFrame";
import { MISSING_DIM_LEVELS, getMissingDimLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return MISSING_DIM_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getMissingDimLevel(levelId);
  if (!level) notFound();
  return <MissingDimWorksheetFrame level={level} version={2} />;
}
