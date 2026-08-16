import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import StatCard from "@/components/StatCard";
import { BookOpen, Users, ClipboardList } from "lucide-react";
import type { Exam } from "@/data/mockData";
import { pastResults } from "@/data/mockData";
import { allExams } from "@/lib/storage";

export const Route = createFileRoute("/teacher/")({
  head: () => ({
    meta: [
      { title: "Teacher Dashboard | ExamPortal" },
      {
        name: "description",
        content: "Teacher view to manage exams, add questions and review student results.",
      },
      { property: "og:title", content: "Teacher Dashboard | ExamPortal" },
      { property: "og:description", content: "Manage exams and review student performance." },
    ],
  }),
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    setExams(allExams());
  }, []);

  return (
    <AppLayout title="Teacher Dashboard">
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Exams" value={exams.length} icon={BookOpen} />
        <StatCard label="Students" value={64} icon={Users} />
        <StatCard label="Results Published" value={pastResults.length} icon={ClipboardList} />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Exams</h2>
        <Link to="/teacher/create">
          <Button size="sm">
            <Plus size={15} /> Create Exam
          </Button>
        </Link>
      </div>

      <div className="card-surface overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Exam", "Subject", "Date", "Questions", "Status"].map((h) => (
                <th key={h} className="px-5 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exams.map((e) => (
              <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/60">
                <td className="px-5 py-4 font-medium text-foreground">{e.name}</td>
                <td className="px-5 py-4 text-muted-foreground">{e.subject}</td>
                <td className="px-5 py-4 text-muted-foreground">{e.date}</td>
                <td className="px-5 py-4 text-foreground">{e.questions.length}</td>
                <td className="px-5 py-4">
                  <Badge status={e.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mb-4 mt-8 font-semibold text-foreground">Recent Student Results</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {pastResults.map((r) => (
          <div key={r.id} className="card-surface p-5">
            <p className="text-xs font-medium text-primary">{r.subject}</p>
            <p className="mt-1 font-medium text-foreground">{r.examName}</p>
            <p className="mt-3 text-2xl font-semibold text-foreground">
              {r.score}
              <span className="text-sm text-muted-foreground">/{r.total}</span>
            </p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}