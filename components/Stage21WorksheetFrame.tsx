import InlineWorksheetFrame from "@/components/InlineWorksheetFrame";
import { WorksheetVersion } from "@/components/MultiplicationInlineWorksheet";
import { getStage } from "@/data/multiplicationStages";

export default function Stage21WorksheetFrame({ version }: { version: WorksheetVersion }) {
  const stage = getStage("stage-2-1")!;
  return <InlineWorksheetFrame stage={stage} version={version} />;
}
