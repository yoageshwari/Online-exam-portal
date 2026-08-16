import type { Question } from "@/data/mockData";

type Props = {
  question: Question;
  index: number;
  selected: number | null;
  onSelect: (optionIndex: number) => void;
};

export default function QuestionCard({ question, index, selected, onSelect }: Props) {
  return (
    <div className="card-surface p-6">
      <p className="text-sm font-medium text-primary">Question {index + 1}</p>
      <h2 className="mt-2 text-lg font-semibold leading-relaxed text-foreground">{question.text}</h2>

      <div className="mt-6 space-y-3">
        {question.options.map((option, i) => {
          const active = selected === i;
          return (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 text-sm transition-colors ${
                active
                  ? "border-primary bg-primary-soft text-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                checked={active}
                onChange={() => onSelect(i)}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}