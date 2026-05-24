// Shared poster wrapper — header banner + footer band.
// See DESIGN_SYSTEM.md for design rationale.

import React from "react";
import Image from "next/image";

/** Caveat handwritten accent word for use inside titles. */
export function CaveatAccent({ children, size = 48 }: { children: React.ReactNode; size?: number }) {
  return (
    <span style={{
      fontFamily: "var(--font-hand), cursive",
      color: "#ec407a",
      fontWeight: 700,
      fontSize: size,
      transform: "rotate(-3deg)",
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

/** Pink-emphasis text inside the tagline pill. */
export function Highlight({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#ec407a", fontWeight: 800 }}>{children}</span>;
}

export function PosterHeader({
  section,
  title,
  tagline,
}: {
  section: string;          // e.g., "Solveitmaths · Times Tables"
  title: React.ReactNode;   // can include <CaveatAccent>
  tagline: React.ReactNode; // can include <Highlight>
}) {
  return (
    <div style={{
      padding: "22px 28px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      background: "linear-gradient(135deg, #fff5fa 0%, #fff0e8 100%)",
      borderBottom: "2px solid #ffd5e8",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "#fff", overflow: "hidden", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "3px solid #ffd5e8",
          boxShadow: "0 0 0 4px rgba(255, 105, 180, 0.10)",
        }}>
          <Image
            src="/mascot.png"
            alt="Solveitmaths mascot"
            width={56} height={56}
            style={{ objectFit: "cover", mixBlendMode: "multiply" }}
          />
        </div>

        <div>
          <p style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: 10,
            fontWeight: 800,
            color: "#ec407a",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}>
            {section}
          </p>
          <h1 style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: 38,
            fontWeight: 800,
            color: "#1f2937",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            margin: 0,
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            flexWrap: "wrap",
          }}>
            {title}
          </h1>
        </div>
      </div>

      <div style={{
        maxWidth: 300,
        alignSelf: "center",
        background: "#fff",
        borderRadius: 16,
        padding: "10px 16px",
        border: "2px solid #ffd5e8",
        textAlign: "right",
      }}>
        <p style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: 11,
          fontWeight: 600,
          color: "#5b4954",
          lineHeight: 1.45,
          margin: 0,
        }}>
          {tagline}
        </p>
      </div>
    </div>
  );
}

export function PosterFooter({ rightLabel = "Times Tables · Year 0–8" }: { rightLabel?: string }) {
  return (
    <div style={{
      padding: "12px 28px 14px",
      borderTop: "2px solid #ffd5e8",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#fff5fa",
    }}>
      <span style={{
        fontFamily: "var(--font-display), sans-serif",
        fontSize: 15,
        fontWeight: 800,
        color: "#ec407a",
        letterSpacing: "-0.01em",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}>
        <span style={{
          width: 10, height: 10, borderRadius: "50%", background: "#ff69b4",
          boxShadow: "0 0 0 3px rgba(255, 105, 180, 0.18)",
        }} />
        Solveitmaths.com
      </span>
      <span style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 10,
        color: "#a18791",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}>
        {rightLabel}
      </span>
    </div>
  );
}

/** Outer poster shell. Sets bg, border-radius, shadow consistently. */
export function PosterShell({
  width = 1063,
  className,
  children,
}: {
  width?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        width,
        background: "#fffaf3",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(236, 64, 122, 0.10)",
        margin: "16px auto",
      }}
    >
      {children}
    </div>
  );
}

/** No-print back link to topics list. */
export function BackToTopics() {
  return (
    <div className="no-print max-w-5xl mx-auto px-6 pt-4">
      <a
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-body), sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: "#ec407a",
          textDecoration: "none",
        }}
      >
        <span>←</span> Back to Topics
      </a>
    </div>
  );
}

/** Print stylesheet block. Drop into each poster page. */
export function PosterPrintStyles({ orientation = "landscape" }: { orientation?: "landscape" | "portrait" }) {
  return (
    <style>{`
      @media print {
        @page { size: A4 ${orientation}; margin: 7mm; }
        body { background-color: #fff3e6 !important; }
        .poster-shell {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
      }
    `}</style>
  );
}
