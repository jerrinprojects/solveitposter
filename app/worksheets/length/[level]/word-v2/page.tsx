import { notFound } from "next/navigation";
import LengthWordFrame from "@/components/LengthWordFrame";
import { LENGTH_LEVELS, getLengthLevel } from "@/data/lengthLevels";

export function generateStaticParams() {
  return LENGTH_LEVELS.map((l) => ({ level: l.id }));
}

export default async function Page({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getLengthLevel(levelId);
  if (!level) notFound();
  return <LengthWordFrame level={level} version={2} />;
}
