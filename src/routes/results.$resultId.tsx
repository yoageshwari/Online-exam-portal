import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import ResultCard from "@/components/ResultCard";
import type { ResultRecord } from "@/data/mockData";
import { exams } from "@/data/mockData";
import { resultsStore } from "@/lib/storage";

export const Route = createFileRoute("/results/$resultId")({
  head: () => ({
    meta: [
      { title: "Exam Result | ExamPortal" },
      {
        name: "description",
        content: "Your exam score summary with correct, incorrect and unanswered breakdown and answer review.",
      },
      { property: "og:title", content: "Exam Result | ExamPortal" },
      { property: "og:description", content: "Score summary and performance chart for your attempt." },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const { resultId } = useParams({ from: "/results/$resultId" });
  const [result, setResult] = useState<ResultRecord | null | undefined>(undefined);
  const [review, setReview] = useState(false);

  useEffect(() => {
    setResult(resultsStore.find(resultId));
  }, [resultId]);

  if (result === undefined) {
    return (
      <AppLayout title="Result">
        <LoadingState label="Calculating your result..." />
      </AppLayout>
    );
  }

  if (!result) {
    return (
      <AppLayout title="Result">
        <EmptyState title="Result not found" message="We couldn't find this result." />
      </AppLayout>
    );
  }

  const exam = exams.find((e) => e.id === result.examId);
  const chartData = [
    { name: "Correct", value: result.correct },
    { name: "Incorrect", value: result.incorrect },
    { name: "Unanswered", value: result.unanswered },
  ];

  return (
    <AppLayout title="Exam Result">
      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
        <ResultCard
          score={result.score}
          total={result.total}
          correct={result.correct}
          incorrect={result.incorrect}
          unanswered={result.unanswered}
        />

        <div className="card-surface p-6">
          <h3 className="font-semibold text-foreground">Performance</h3>
          <p className="text-sm text-muted-foreground">{result.examName}</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="value" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-4xl flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="outline" onClick={() => setReview((v) => !v)}>
          {review ? "Hide Answers" : "Review Answers"}
        </Button>
        <Link to="/dashboard">
          <Button className="w-full sm:w-auto">Back to Dashboard</Button>
        </Link>
      </div>

      {review && exam && (
        <div className="mx-auto mt-6 max-w-4xl space-y-3">
          {exam.questions.map((q, i) => (
            <div key={q.id} className="card-surface p-5">
              <p className="text-sm font-medium text-foreground">
                {i + 1}. {q.text}
              </p>
              <p className="mt-2 text-sm text-success">Correct answer: {q.options[q.answer]}</p>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}