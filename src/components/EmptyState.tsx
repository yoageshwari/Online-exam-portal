import { SearchX } from "lucide-react";

export default function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="card-surface flex flex-col items-center justify-center p-12 text-center">
      <span className="rounded-full bg-muted p-3 text-muted-foreground">
        <SearchX size={22} />
      </span>
      <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}