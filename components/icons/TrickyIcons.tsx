// Chunky friendly icons for The Tricky 12 poster.
// 24x24 viewBox, 2.4px stroke, rounded caps/joins, currentColor.

import React from "react";

type Props = { size?: number };
const base = (size: number): React.SVGProps<SVGSVGElement> => ({
  viewBox: "0 0 24 24",
  width: size,
  height: size,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconScissors = ({ size = 20 }: Props) => (
  <svg {...base(size)}>
    <circle cx="6" cy="6.5" r="2.8" />
    <circle cx="6" cy="17.5" r="2.8" />
    <line x1="20" y1="4.5" x2="8" y2="16.5" />
    <line x1="14.5" y1="14.5" x2="20" y2="20" />
    <line x1="8" y1="7.5" x2="12" y2="11.5" />
  </svg>
);

export const IconRepeat = ({ size = 20 }: Props) => (
  <svg {...base(size)}>
    <polyline points="16 3 20 7 16 11" />
    <path d="M4 12V9a3 3 0 0 1 3-3h13" />
    <polyline points="8 21 4 17 8 13" />
    <path d="M20 12v3a3 3 0 0 1-3 3H4" />
  </svg>
);

export const IconQuote = ({ size = 20 }: Props) => (
  <svg {...base(size)}>
    <path d="M21 14a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
    <circle cx="8.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="12.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const IconArrowDown = ({ size = 20 }: Props) => (
  <svg {...base(size)}>
    <line x1="12" y1="4" x2="12" y2="20" />
    <polyline points="6 14 12 20 18 14" />
  </svg>
);

export const IconStar = ({ size = 20 }: Props) => (
  <svg {...base(size)}>
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.9z" />
  </svg>
);

export const IconStairs = ({ size = 20 }: Props) => (
  <svg {...base(size)}>
    <polyline points="3 20 3 16 8 16 8 12 13 12 13 8 18 8 18 4 21 4" />
  </svg>
);

export const IconMinus = ({ size = 20 }: Props) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="8.5" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

export const IconChecker = ({ size = 20 }: Props) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" stroke="none">
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="3" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <rect x="3" y="15" width="6" height="6" rx="1" />
    <rect x="15" y="15" width="6" height="6" rx="1" />
  </svg>
);

export const IconCalendar = ({ size = 20 }: Props) => (
  <svg {...base(size)}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <line x1="3.5" y1="10.5" x2="20.5" y2="10.5" />
    <line x1="8" y1="3" x2="8" y2="6.5" />
    <line x1="16" y1="3" x2="16" y2="6.5" />
  </svg>
);
