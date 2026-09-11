import type { AnchorHTMLAttributes } from "react";

import { buttonStyles, type ButtonVariant } from "./button-styles";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  external?: boolean;
  magnetic?: boolean;
  showArrow?: boolean;
  variant?: ButtonVariant;
};

export function LinkButton({
  children,
  className = "",
  external = false,
  magnetic = true,
  rel,
  showArrow = false,
  style,
  target,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={buttonStyles(variant, className)}
      data-magnetic={magnetic ? "true" : undefined}
      rel={external ? rel ?? "noopener noreferrer" : rel}
      style={
        variant === "primary"
          ? { color: "var(--carbon)", ...style }
          : style
      }
      target={external ? target ?? "_blank" : target}
      {...props}
    >
      {children}
      {external || showArrow ? (
        <svg
          aria-hidden="true"
          className={`interaction-arrow size-3.5 ${external ? "interaction-arrow--external" : ""}`}
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d={external ? "M5 3h8v8M13 3 3 13" : "M3 8h10m-4-4 4 4-4 4"}
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth="1.5"
          />
        </svg>
      ) : null}
    </a>
  );
}
