import type { FooterData } from "@/types";

interface PageFooterProps {
  data: FooterData;
}

export default function PageFooter({ data }: PageFooterProps) {
  return (
    <footer className="mt-3 print:mt-2 pt-3 pb-2 border-t border-pink-200 text-center print-card">
      <p className="font-fredoka font-bold text-base tracking-[0.3em] text-pink-500 uppercase">
        {data.brand}
      </p>
    </footer>
  );
}
