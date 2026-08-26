import type { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  ratio?: string;
}

export default function PhoneFrame({ children, className = "", style, ratio = "9 / 19" }: Props) {
  return (
    <div className={`ph${className ? ` ${className}` : ""}`} style={style}>
      <span className="ph__notch" aria-hidden />
      <div className="ph__screen pv-frame" style={{ aspectRatio: ratio }}>
        {children}
      </div>
    </div>
  );
}
