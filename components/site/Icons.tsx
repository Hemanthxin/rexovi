import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false as const,
};

export function ArrowRight({ size = 16, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base} {...p}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowUpRight({ size = 16, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base} {...p}>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function Plus({ size = 14, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" {...base} {...p}>
      <path d="M7 1.5v11M1.5 7h11" />
    </svg>
  );
}

export function Close({ size = 16, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base} {...p}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function Search({ size = 16, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base} {...p}>
      <circle cx="7.2" cy="7.2" r="4.4" />
      <path d="M10.6 10.6 13.5 13.5" />
    </svg>
  );
}

export function Lock({ size = 12, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" {...base} strokeWidth={1.3} {...p}>
      <rect x="2.5" y="5.2" width="7" height="5" rx="1.2" />
      <path d="M4.2 5.2V3.9a1.8 1.8 0 0 1 3.6 0v1.3" />
    </svg>
  );
}

export function Eye({ size = 15, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base} {...p}>
      <path d="M1.5 8S4 3.8 8 3.8 14.5 8 14.5 8 12 12.2 8 12.2 1.5 8 1.5 8Z" />
      <circle cx="8" cy="8" r="1.9" />
    </svg>
  );
}

export function Layers({ size = 15, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base} {...p}>
      <path d="M8 1.8 14.5 5 8 8.2 1.5 5 8 1.8Z" />
      <path d="m1.5 8.4 6.5 3.2 6.5-3.2" />
      <path d="m1.5 11.4 6.5 3.2 6.5-3.2" />
    </svg>
  );
}

export function Menu({ size = 18, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" {...base} {...p}>
      <path d="M2 5.5h14M2 12.5h14" />
    </svg>
  );
}

export function LinkedIn({ size = 16, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden focusable={false} {...p}>
      <path d="M3.4 5.6h2.2v7.2H3.4V5.6Zm1.1-3.4a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Zm2.8 3.4h2.1v1h.03c.3-.55 1.02-1.13 2.1-1.13 2.24 0 2.66 1.42 2.66 3.28v3.05h-2.2V9.2c0-.8-.02-1.84-1.14-1.84-1.14 0-1.32.87-1.32 1.78v3.66H7.3V5.6Z" />
    </svg>
  );
}

export function Instagram({ size = 16, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base} strokeWidth={1.4} {...p}>
      <rect x="2.4" y="2.4" width="11.2" height="11.2" rx="3.4" />
      <circle cx="8" cy="8" r="2.7" />
      <circle cx="11.3" cy="4.7" r=".75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XMark({ size = 15, ...p }: P & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden focusable={false} {...p}>
      <path d="M12.1 2h2.16L9.54 7.4 15.1 14h-4.35L7.34 9.9 3.45 14H1.29l5.05-5.77L1 2h4.46l3.08 4.07L12.1 2Zm-.76 10.7h1.2L4.72 3.23H3.44l7.9 9.47Z" />
    </svg>
  );
}
