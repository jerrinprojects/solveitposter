import { notFound } from "next/navigation";
import GridShapeFrame from "@/components/GridShapeFrame";
import { LENGTH_LEVELS, getLengthLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return LENGTH_LEVELS
    .filter((l) => l.id === "year-4-4" || l.id === "year-3-3" || l.id === "year-2-4")
    .map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getLengthLevel(levelId);
  if (!level || (level.id !== "year-4-4" && level.id !== "year-3-3" && level.id !== "year-2-4")) notFound();
  return <GridShapeFrame level={level} version={3} />;
}
