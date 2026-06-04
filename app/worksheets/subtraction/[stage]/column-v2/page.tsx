import type { Metadata } from "next";
import ColumnWorksheetFrame from "@/components/ColumnWorksheetFrame";
import { SUBTRACTION_STAGES, getSubtractionStage } from "@/data/subtractionStages";
import { notFound } from "next/navigation";

export function generateStaticParams() { return SUBTRACTION_STAGES.map((s) => ({ stage: s.id })); }
export const metadata: Metadata = { title: "Subtraction Column Worksheet · V2 | Solve It Maths" };

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageId } = await params;
  const stage = getSubtractionStage(stageId);
  if (!stage) notFound();
  return <ColumnWorksheetFrame stage={stage} version={2} />;
}
