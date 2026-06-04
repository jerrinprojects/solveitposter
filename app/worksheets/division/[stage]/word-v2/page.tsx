import type { Metadata } from "next";
import WordProblemsFrame from "@/components/WordProblemsFrame";
import { DIVISION_STAGES, getDivisionStage } from "@/data/divisionStages";
import { notFound } from "next/navigation";

export function generateStaticParams() { return DIVISION_STAGES.map((s) => ({ stage: s.id })); }
export const metadata: Metadata = { title: "Division Word Problems · V2 | Solve It Maths" };

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageId } = await params;
  const stage = getDivisionStage(stageId);
  if (!stage) notFound();
  return <WordProblemsFrame stage={stage} version={2} />;
}
