export default function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-12 text-sm text-muted-foreground">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
      {label}
    </div>
  );
}