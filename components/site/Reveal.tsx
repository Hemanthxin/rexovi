"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** Shared observer — one instance for the whole page rather than one per node. */
let observer: IntersectionObserver | null = null;
const registry = new WeakMap<Element, () => void>();

function observe(el: Element, onEnter: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => {};
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          registry.get(entry.target)?.();
          observer?.unobserve(entry.target);
          registry.delete(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
  }
  registry.set(el, onEnter);
  observer.observe(el);
  return () => {
    observer?.unobserve(el);
    registry.delete(el);
  };
}

interface RevealProps {
  children: ReactNode;
  /** Rendered element — keeps markup semantic (li, section, figure…). */
  as?: ElementType;
  /** Stagger, in ms. */
  delay?: number;
  className?: string;
  /** `mask` slides text up from behind an overflow edge. */
  variant?: "fade" | "mask";
  id?: string;
  style?: React.CSSProperties;
}

export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  variant = "fade",
  id,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already past the fold on load (e.g. deep link) — show immediately.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }
    return observe(el, () => setShown(true));
  }, []);

  const base = variant === "mask" ? "reveal-line" : "reveal";

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${base}${shown ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {variant === "mask" ? <span>{children}</span> : children}
    </Tag>
  );
}
