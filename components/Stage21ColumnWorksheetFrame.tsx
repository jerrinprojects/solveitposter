import ColumnWorksheetFrame from "@/components/ColumnWorksheetFrame";
import { WorksheetVersion } from "@/components/MultiplicationInlineWorksheet";
import { getStage } from "@/data/multiplicationStages";

export default function Stage21ColumnWorksheetFrame({ version }: { version: WorksheetVersion }) {
  const stage = getStage("stage-2-1")!;
  return <ColumnWorksheetFrame stage={stage} version={version} />;
}
