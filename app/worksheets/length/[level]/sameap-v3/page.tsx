import { notFound } from "next/navigation";
import SameAPWorksheetFrame from "@/components/SameAPWorksheetFrame";
import { SAME_AP_LEVELS, getSameAPLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return SAME_AP_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getSameAPLevel(levelId);
  if (!level) notFound();
  return <SameAPWorksheetFrame level={level} version={3} />;
}
