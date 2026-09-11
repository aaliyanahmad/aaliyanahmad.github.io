type DividerProps = {
  className?: string;
};

export function Divider({ className = "" }: DividerProps) {
  return <hr className={`border-0 border-t border-[var(--line)] ${className}`} />;
}
