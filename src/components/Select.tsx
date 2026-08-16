import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
};

export default function Select({ label, options, className, id, ...rest }: Props) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
          className,
        )}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}