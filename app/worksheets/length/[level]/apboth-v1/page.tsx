import { notFound } from "next/navigation";
import APBothWorksheetFrame from "@/components/APBothWorksheetFrame";
import { AP_BOTH_LEVELS, getAPBothLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return AP_BOTH_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getAPBothLevel(levelId);
  if (!level) notFound();
  return <APBothWorksheetFrame level={level} version={1} />;
}
