import { notFound } from "next/navigation";
import CompositeWordFrame from "@/components/CompositeWordFrame";
import { COMPOSITE_LEVELS, getCompositeLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return COMPOSITE_LEVELS.filter((l) => l.id === "year-7-5").map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getCompositeLevel(levelId);
  if (!level) notFound();
  return <CompositeWordFrame level={level} version={3} />;
}
