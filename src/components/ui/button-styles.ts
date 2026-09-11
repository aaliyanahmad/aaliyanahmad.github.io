export type ButtonVariant = "primary" | "secondary" | "text";

const baseStyles =
  "magnetic-interaction group inline-flex min-h-12 items-center justify-center gap-2 text-sm font-semibold tracking-[0.01em]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-bone bg-bone px-6 text-carbon hover:border-bone-soft hover:bg-bone-soft focus-visible:border-bone-soft focus-visible:bg-bone-soft",
  secondary:
    "border border-[var(--line-strong)] bg-transparent px-6 text-bone hover:border-bone-soft hover:bg-surface-raised focus-visible:border-bone-soft focus-visible:bg-surface-raised",
  text: "min-h-0 border-b border-[var(--line-strong)] py-1 text-bone hover:border-copper hover:text-copper focus-visible:border-copper focus-visible:text-copper",
};

export function buttonStyles(variant: ButtonVariant, className = "") {
  return `${baseStyles} ${variantStyles[variant]} ${className}`;
}
