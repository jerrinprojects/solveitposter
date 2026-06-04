import type { Metadata } from "next";
import InlineWorksheetFrame from "@/components/InlineWorksheetFrame";
import { DIVISION_STAGES, getDivisionStage } from "@/data/divisionStages";
import { notFound } from "next/navigation";

export function generateStaticParams() { return DIVISION_STAGES.map((s) => ({ stage: s.id })); }
export const metadata: Metadata = { title: "Division Worksheet · V3 | Solve It Maths" };

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageId } = await params;
  const stage = getDivisionStage(stageId);
  if (!stage) notFound();
  return <InlineWorksheetFrame stage={stage} version={3} />;
}
