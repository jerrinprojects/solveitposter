import type { Metadata } from "next";
import Stage21ColumnWorksheetFrame from "@/components/Stage21ColumnWorksheetFrame";

export const metadata: Metadata = {
  title: "Multiplication Stage 2.1 Column · V1 | Solve It Maths",
};

export default function Page() {
  return <Stage21ColumnWorksheetFrame version={1} />;
}
