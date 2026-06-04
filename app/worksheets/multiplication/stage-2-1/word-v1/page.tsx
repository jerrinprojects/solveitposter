import type { Metadata } from "next";
import Stage21WordProblemsFrame from "@/components/Stage21WordProblemsFrame";

export const metadata: Metadata = {
  title: "Multiplication Stage 2.1 Word Problems · V1 | Solve It Maths",
};

export default function Page() {
  return <Stage21WordProblemsFrame version={1} />;
}
