import { notFound } from "next/navigation";
import CompositeWorksheetFrame from "@/components/CompositeWorksheetFrame";
import { COMPOSITE_LEVELS, getCompositeLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return COMPOSITE_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getCompositeLevel(levelId);
  if (!level) notFound();
  return <CompositeWorksheetFrame level={level} version={3} />;
}
