import { notFound } from "next/navigation";
import QuadWorksheetFrame from "@/components/QuadWorksheetFrame";
import { QUAD_LEVELS, getQuadLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return QUAD_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getQuadLevel(levelId);
  if (!level) notFound();
  return <QuadWorksheetFrame level={level} version={3} />;
}
