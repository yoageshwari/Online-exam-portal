type Props = {
  score: number;
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
};

export default function ResultCard({ score, total, correct, incorrect, unanswered }: Props) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 40;

  return (
    <div className="card-surface animate-rise p-8 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        {passed ? "Congratulations!" : "Keep Practising"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Your exam has been submitted successfully.</p>

      <p className="mt-6 text-5xl font-semibold tracking-tight text-primary">
        {score} <span className="text-2xl text-muted-foreground">/ {total}</span>
      </p>
      <p className="mt-1 text-lg font-medium text-foreground">{percentage}%</p>

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-success/10 p-3">
          <p className="text-xl font-semibold text-success">{correct}</p>
          <p className="text-xs text-muted-foreground">Correct</p>
        </div>
        <div className="rounded-lg bg-destructive/10 p-3">
          <p className="text-xl font-semibold text-destructive">{incorrect}</p>
          <p className="text-xs text-muted-foreground">Incorrect</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xl font-semibold text-foreground">{unanswered}</p>
          <p className="text-xs text-muted-foreground">Unanswered</p>
        </div>
      </div>
    </div>
  );
}