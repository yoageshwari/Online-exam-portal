import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string };

export default function Input({ label, className, id, ...rest }: Props) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20",
          className,
        )}
        {...rest}
      />
    </div>
  );
}