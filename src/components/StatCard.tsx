import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
};

export default function StatCard({ label, value, icon: Icon, hint }: Props) {
  return (
    <div className="card-surface animate-rise p-5 transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className="rounded-lg bg-primary-soft p-2 text-primary">
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}