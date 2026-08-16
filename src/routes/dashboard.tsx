import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, Clock3, TrendingUp } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import ExamCard from "@/components/ExamCard";
import StatCard from "@/components/StatCard";
import Button from "@/components/Button";
import { exams } from "@/data/mockData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard | ExamPortal" },
      {
        name: "description",
        content: "Track upcoming exams, completed tests, pending papers and your average score.",
      },
      { property: "og:title", content: "Student Dashboard | ExamPortal" },
      { property: "og:description", content: "Your exam overview: upcoming, completed and average score." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const upcoming = exams.filter((e) => e.status === "upcoming");
  const pending = exams.filter((e) => e.status === "pending");

  return (
    <AppLayout title="Dashboard">
      <div className="card-surface animate-rise mb-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Welcome back, Ananya 👋</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            You have {upcoming.length} upcoming exams this month. Best of luck!
          </p>
        </div>
        <Link to="/exams">
          <Button variant="soft" size="sm">
            Browse all exams
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Upcoming Exams" value={upcoming.length} icon={BookOpen} />
        <StatCard label="Completed Exams" value={8} icon={CheckCircle2} />
        <StatCard label="Average Score" value="78%" icon={TrendingUp} hint="+4% from last month" />
        <StatCard label="Pending Exams" value={pending.length} icon={Clock3} />
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Upcoming Exams</h2>
          <Link to="/exams" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-semibold text-foreground">Pending Exams</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pending.map((exam) => (
            <ExamCard key={exam.id} exam={exam} action="details" />
          ))}
        </div>
      </section>
    </AppLayout>
  );
}