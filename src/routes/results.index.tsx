import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import type { ResultRecord } from "@/data/mockData";
import { resultsStore } from "@/lib/storage";

export const Route = createFileRoute("/results/")({
  head: () => ({
    meta: [
      { title: "Results History | ExamPortal" },
      {
        name: "description",
        content: "See every exam you have attempted with scores, percentage and pass status.",
      },
      { property: "og:title", content: "Results History | ExamPortal" },
      { property: "og:description", content: "All past exam scores and percentages in one table." },
    ],
  }),
  component: ResultsHistory,
});

function ResultsHistory() {
  const [results, setResults] = useState<ResultRecord[] | null>(null);

  useEffect(() => {
    setResults(resultsStore.all());
  }, []);

  if (!results) {
    return (
      <AppLayout title="Results">
        <LoadingState label="Loading your results..." />
      </AppLayout>
    );
  }

  if (results.length === 0) {
    return (
      <AppLayout title="Results">
        <EmptyState title="No results yet" message="Attempt an exam to see your scores here." />
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Results">
      <div className="card-surface overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Exam", "Subject", "Date", "Score", "Percentage", "Status", ""].map((h) => (
                <th key={h} className="px-5 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r) => {
              const pct = Math.round((r.score / r.total) * 100);
              return (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/60">
                  <td className="px-5 py-4 font-medium text-foreground">{r.examName}</td>
                  <td className="px-5 py-4 text-muted-foreground">{r.subject}</td>
                  <td className="px-5 py-4 text-muted-foreground">{r.date}</td>
                  <td className="px-5 py-4 text-foreground">
                    {r.score}/{r.total}
                  </td>
                  <td className="px-5 py-4 text-foreground">{pct}%</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        pct >= 40 ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {pct >= 40 ? "Passed" : "Failed"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link to="/results/$resultId" params={{ resultId: r.id }}>
                      <Button variant="outline" size="sm">
                        View Result
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}