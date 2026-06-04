import type { Metadata } from "next";
import Stage21WorksheetFrame from "@/components/Stage21WorksheetFrame";

export const metadata: Metadata = {
  title: "Multiplication Stage 2.1 · V3 | Solve It Maths",
};

export default function Page() {
  return <Stage21WorksheetFrame version={3} />;
}
