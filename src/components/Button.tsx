import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "danger" | "soft";
  size?: "sm" | "md";
};

const variants = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border border-border bg-card text-foreground hover:bg-muted",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
  danger: "bg-destructive text-destructive-foreground hover:opacity-90",
  soft: "bg-primary-soft text-primary hover:brightness-97",
};

export default function Button({ variant = "primary", size = "md", className, ...rest }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2.5 text-sm",
        variants[variant],
        className,
      )}
      {...rest}
    />
  );
}