import type { Metadata } from "next";
import WordProblemsFrame from "@/components/WordProblemsFrame";
import { ADDITION_STAGES, getAdditionStage } from "@/data/additionStages";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ADDITION_STAGES.map((s) => ({ stage: s.id }));
}

export const metadata: Metadata = {
  title: "Addition Word Problems · V3 | Solve It Maths",
};

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageId } = await params;
  const stage = getAdditionStage(stageId);
  if (!stage) notFound();
  return <WordProblemsFrame stage={stage} version={3} />;
}
