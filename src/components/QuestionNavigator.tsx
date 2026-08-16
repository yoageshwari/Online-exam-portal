type Props = {
  total: number;
  current: number;
  answers: Record<number, number | null>;
  marked: number[];
  onJump: (index: number) => void;
};

function stateOf(i: number, current: number, answers: Record<number, number | null>, marked: number[]) {
  if (i === current) return "bg-primary text-primary-foreground border-primary";
  if (marked.includes(i)) return "bg-warning/25 text-warning-foreground border-warning/40";
  if (answers[i] !== undefined && answers[i] !== null)
    return "bg-success/15 text-success border-success/30";
  return "bg-card text-muted-foreground border-border";
}

export default function QuestionNavigator({ total, current, answers, marked, onJump }: Props) {
  const legend = [
    ["bg-primary", "Current"],
    ["bg-success/40", "Answered"],
    ["bg-warning/40", "Marked"],
    ["bg-muted", "Unanswered"],
  ] as const;

  return (
    <div className="card-surface p-5">
      <h3 className="text-sm font-semibold text-foreground">Question Palette</h3>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onJump(i)}
            className={`h-9 rounded-lg border text-sm font-medium transition-colors ${stateOf(i, current, answers, marked)}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
        {legend.map(([color, label]) => (
          <li key={label} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded ${color}`} /> {label}
          </li>
        ))}
      </ul>
    </div>
  );
}