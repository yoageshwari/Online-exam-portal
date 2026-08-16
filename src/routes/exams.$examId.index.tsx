import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AlertCircle, CalendarDays, Clock, FileQuestion, Trophy } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import { exams } from "@/data/mockData";

export const Route = createFileRoute("/exams/$examId/")({
  head: () => ({
    meta: [
      { title: "Exam Instructions | ExamPortal" },
      {
        name: "description",
        content: "Read the exam instructions, duration, marks and question count before starting your test.",
      },
      { property: "og:title", content: "Exam Instructions | ExamPortal" },
      { property: "og:description", content: "Duration, marks and rules for your upcoming exam." },
    ],
  }),
  component: ExamInstructions,
});

const instructions = [
  "Read every question carefully before answering.",
  "Do not refresh the page during the exam.",
  "Submit your paper before the timer ends.",
  "Unanswered questions will not receive marks.",
  "There is no negative marking in this exam.",
];

function ExamInstructions() {
  const { examId } = useParams({ from: "/exams/$examId/" });
  const exam = exams.find((e) => e.id === examId);

  if (!exam) {
    return (
      <AppLayout title="Exam">
        <EmptyState title="Exam not found" message="This exam does not exist in the mock data." />
      </AppLayout>
    );
  }

  const details = [
    { icon: CalendarDays, label: "Date", value: exam.date },
    { icon: Clock, label: "Duration", value: `${exam.duration} minutes` },
    { icon: FileQuestion, label: "Questions", value: `${exam.questions.length}` },
    { icon: Trophy, label: "Total Marks", value: `${exam.totalMarks}` },
  ];

  return (
    <AppLayout title="Exam Instructions">
      <div className="mx-auto max-w-3xl">
        <div className="card-surface animate-rise p-6 sm:p-8">
          <p className="text-sm font-medium text-primary">{exam.subject}</p>
          <h2 className="mt-1 text-2xl font-semibold text-foreground">{exam.name}</h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-lg bg-muted p-4">
                <Icon size={16} className="text-primary" />
                <p className="mt-2 text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <h3 className="flex items-center gap-2 font-semibold text-foreground">
              <AlertCircle size={17} className="text-primary" /> Instructions
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {instructions.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/exams/$examId/attempt" params={{ examId: exam.id }} className="sm:w-auto">
              <Button className="w-full sm:w-auto">Start Exam</Button>
            </Link>
            <Link to="/exams">
              <Button variant="outline" className="w-full sm:w-auto">
                Back to Exams
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}