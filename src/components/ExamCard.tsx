import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, FileQuestion } from "lucide-react";
import type { Exam } from "@/data/mockData";
import Badge from "./Badge";
import Button from "./Button";

type Props = { exam: Exam; action?: "start" | "details" };

export default function ExamCard({ exam, action = "start" }: Props) {
  return (
    <div className="card-surface animate-rise flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-primary">{exam.subject}</p>
          <h3 className="mt-1 font-semibold text-foreground">{exam.name}</h3>
        </div>
        <Badge status={exam.status} />
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
          <Button variant={action === "start" ? "primary" : "outline"} size="sm" className="w-full">
            {action === "start" ? "Start Exam" : "View Details"}
          </Button>
        </Link>
      </div>
    </div>
  );
}