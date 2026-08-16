import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  upcoming: "bg-accent text-accent-foreground",
  completed: "bg-success/15 text-success",
  pending: "bg-warning/20 text-warning-foreground",
};

export default function Badge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        styles[status] ?? "bg-muted text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}