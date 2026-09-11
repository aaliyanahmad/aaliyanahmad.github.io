import type { ButtonHTMLAttributes } from "react";

import { buttonStyles, type ButtonVariant } from "./button-styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  magnetic?: boolean;
  variant?: ButtonVariant;
};

export function Button({
  className = "",
  magnetic = true,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles(variant, className)}
      data-magnetic={magnetic ? "true" : undefined}
      type={type}
      {...props}
    />
  );
}
