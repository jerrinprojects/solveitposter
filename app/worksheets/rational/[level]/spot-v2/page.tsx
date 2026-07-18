import { notFound } from "next/navigation";
import SpotFractionWorksheetFrame from "@/components/SpotFractionWorksheetFrame";
import { SPOT_LEVELS, getSpotLevel } from "@/data/rationalWsLevels";

export function generateStaticParams() {
  return SPOT_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getSpotLevel(levelId);
  if (!level) notFound();
  return <SpotFractionWorksheetFrame level={level} version={2} mode="tick" />;
}
