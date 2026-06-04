import type { Metadata } from "next";
import WordProblemsFrame from "@/components/WordProblemsFrame";
import { SUBTRACTION_STAGES, getSubtractionStage } from "@/data/subtractionStages";
import { notFound } from "next/navigation";

export function generateStaticParams() { return SUBTRACTION_STAGES.map((s) => ({ stage: s.id })); }
export const metadata: Metadata = { title: "Subtraction Word Problems · V1 | Solve It Maths" };

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageId } = await params;
  const stage = getSubtractionStage(stageId);
  if (!stage) notFound();
  return <WordProblemsFrame stage={stage} version={1} />;
}
