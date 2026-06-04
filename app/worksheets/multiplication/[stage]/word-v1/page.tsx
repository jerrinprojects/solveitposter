import { notFound } from "next/navigation";
import WordProblemsFrame from "@/components/WordProblemsFrame";
import { MULTIPLICATION_STAGES, getStage } from "@/data/multiplicationStages";

export function generateStaticParams() {
  return MULTIPLICATION_STAGES
    .filter((s) => s.id !== "stage-2-1")
    .map((s) => ({ stage: s.id }));
}

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageId } = await params;
  const stage = getStage(stageId);
  if (!stage) notFound();
  return <WordProblemsFrame stage={stage} version={1} />;
}
