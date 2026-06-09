import { notFound } from "next/navigation";
import CompareWorksheetFrame from "@/components/CompareWorksheetFrame";
import { COMPARE_LEVELS, getCompareLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return COMPARE_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getCompareLevel(levelId);
  if (!level) notFound();
  return <CompareWorksheetFrame level={level} version={2} />;
}
