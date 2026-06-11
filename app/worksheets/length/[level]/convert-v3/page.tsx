import { notFound } from "next/navigation";
import ConvertWorksheetFrame from "@/components/ConvertWorksheetFrame";
import { CONVERT_LEVELS, getConvertLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return CONVERT_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getConvertLevel(levelId);
  if (!level) notFound();
  return <ConvertWorksheetFrame level={level} version={3} />;
}
