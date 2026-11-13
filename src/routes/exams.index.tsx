import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import AppLayout from "@/components/AppLayout";
import ExamCard from "@/components/ExamCard";
import EmptyState from "@/components/EmptyState";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { exams, subjects } from "@/data/mockData";
import { savedExamsStore } from "@/lib/storage";

export const Route = createFileRoute("/exams/")({
  head: () => ({
    meta: [
      { title: "My Exams | ExamPortal" },
      {
        name: "description",
        content:
          "Search and filter all available exams by subject and status before you start.",
      },
      { property: "og:title", content: "My Exams | ExamPortal" },
      {
        property: "og:description",
        content: "All available exams with search, subject and status filters.",
      },
    ],
  }),
  component: MyExams,
});

function MyExams() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("all");
  const [status, setStatus] = useState("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(() =>
    savedExamsStore.all(),
  );

  function toggleSaved(examId: string) {
    setSavedIds(savedExamsStore.toggle(examId));
  }

  const filtered = useMemo(
    () =>
      exams.filter((exam) => {
        const matchesQuery = exam.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesSubject = subject === "all" || exam.subject === subject;
        const matchesStatus = status === "all" || exam.status === status;
        const matchesSaved = !savedOnly || savedIds.includes(exam.id);
        return matchesQuery && matchesSubject && matchesStatus && matchesSaved;
      }),
    [query, subject, status, savedOnly, savedIds],
  );

  return (
    <AppLayout title="My Exams">
      <div className="card-surface mb-6 grid gap-4 p-5 sm:grid-cols-3">
        <Input
          id="search"
          label="Search"
          placeholder="Search exams..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          id="subject"
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          options={[
            { value: "all", label: "All subjects" },
            ...subjects.map((s) => ({ value: s, label: s })),
          ]}
        />
        <Select
          id="status"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { value: "all", label: "All statuses" },
            { value: "upcoming", label: "Upcoming" },
            { value: "pending", label: "Pending" },
            { value: "completed", label: "Completed" },
          ]}
        />
        <label className="flex items-center gap-2 text-sm text-muted-foreground sm:col-span-3">
          <input
            type="checkbox"
            checked={savedOnly}
            onChange={(e) => setSavedOnly(e.target.checked)}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          Show saved exams only ({savedIds.length})
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={savedOnly ? "No saved exams yet" : "No exams found"}
          message={
            savedOnly
              ? "Bookmark an exam to add it to your saved list."
              : "Try changing your search or filters."
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              action="details"
              isSaved={savedIds.includes(exam.id)}
              onToggleSave={toggleSaved}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
