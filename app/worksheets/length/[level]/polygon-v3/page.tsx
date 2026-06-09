import { notFound } from "next/navigation";
import PolygonWorksheetFrame from "@/components/PolygonWorksheetFrame";
import { POLYGON_LEVELS, getPolygonLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return POLYGON_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getPolygonLevel(levelId);
  if (!level) notFound();
  return <PolygonWorksheetFrame level={level} version={3} />;
}
