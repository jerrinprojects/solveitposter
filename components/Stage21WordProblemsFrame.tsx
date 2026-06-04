import WordProblemsFrame from "@/components/WordProblemsFrame";
import { WorksheetVersion } from "@/components/MultiplicationInlineWorksheet";
import { getStage } from "@/data/multiplicationStages";

export default function Stage21WordProblemsFrame({ version }: { version: WorksheetVersion }) {
  const stage = getStage("stage-2-1")!;
  return <WordProblemsFrame stage={stage} version={version} />;
}
