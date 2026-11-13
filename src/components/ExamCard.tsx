import { Link } from "@tanstack/react-router";
import { Bookmark, CalendarDays, Clock, FileQuestion } from "lucide-react";
import type { Exam } from "@/data/mockData";
import Badge from "./Badge";
import Button from "./Button";

type Props = {
  exam: Exam;
  action?: "start" | "details";
  isSaved?: boolean;
  onToggleSave?: (examId: string) => void;
};

export default function ExamCard({
  exam,
  action = "start",
  isSaved = false,
  onToggleSave,
}: Props) {
  return (
    <div className="card-surface animate-rise flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-primary">{exam.subject}</p>
          <h3 className="mt-1 font-semibold text-foreground">{exam.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          {onToggleSave && (
            <button
              type="button"
              onClick={() => onToggleSave(exam.id)}
              aria-label={
                isSaved
                  ? `Remove ${exam.name} from saved exams`
                  : `Save ${exam.name}`
              }
              aria-pressed={isSaved}
              title={isSaved ? "Remove from saved exams" : "Save exam"}
              className={`rounded-md p-2 transition-colors hover:bg-muted ${
                isSaved ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
            </button>
          )}
          <Badge status={exam.status} />
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CalendarDays size={14} /> {exam.date}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} /> {exam.duration} min
        </div>
        <div className="flex items-center gap-1.5">
          <FileQuestion size={14} /> {exam.questions.length} Qs
        </div>
      </dl>

      <div className="mt-5">
        <Link to="/exams/$examId" params={{ examId: exam.id }}>
          <Button
            variant={action === "start" ? "primary" : "outline"}
            size="sm"
            className="w-full"
          >
            {action === "start" ? "Start Exam" : "View Details"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
