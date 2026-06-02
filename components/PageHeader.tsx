import type { PosterMeta } from "@/types";

interface PageHeaderProps {
  meta: PosterMeta;
}


export default function PageHeader({ meta }: PageHeaderProps) {
  return (
    <header className="mb-3 print-card">
      <div className="bg-pink-200 rounded-2xl px-5 sm:px-8 py-4 sm:py-5 text-center relative overflow-visible">
        {/* Title text — full width, centred independently of the mascot */}
        <div>
          <h1 className="font-fredoka text-3xl sm:text-5xl text-pink-600 leading-tight tracking-wide" style={{ fontWeight: 900, WebkitTextStroke: "1.2px #db2777" }}>
            {meta.subject}
          </h1>
          <h2 className="font-fredoka text-2xl sm:text-3xl text-gray-700 mt-1" style={{ fontWeight: 900 }}>
            {meta.phase} &ndash; {meta.year}
          </h2>
          <p className="font-fredoka text-base sm:text-xl text-gray-500 mt-0.5" style={{ fontWeight: 800 }}>
            {meta.theme}
          </p>
        </div>

        {/* Mascot — bottom-right of the pink banner */}
        <div className="absolute right-2 sm:right-3 bottom-0 pointer-events-none select-none">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/againsolveit.firebasestorage.app/o/Solvie_Number-removebg.png?alt=media&token=dec56a1b-bf95-4490-bb06-c642b8b9f753"
            alt="Solvie mascot"
            width={72}
            className="object-contain sm:w-24"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>
    </header>
  );
}
