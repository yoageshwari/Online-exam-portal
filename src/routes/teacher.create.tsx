import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { subjects, type Question } from "@/data/mockData";
import { teacherExamsStore } from "@/lib/storage";

export const Route = createFileRoute("/teacher/create")({
  head: () => ({
    meta: [
      { title: "Create Exam | ExamPortal" },
      {
        name: "description",
        content: "Create a new exam by adding a name, subject, date, duration and multiple-choice questions.",
      },
      { property: "og:title", content: "Create Exam | ExamPortal" },
      { property: "og:description", content: "Add exam details and questions from the teacher panel." },
    ],
  }),
  component: CreateExam,
});

const emptyQuestion = { text: "", options: ["", "", "", ""], answer: 0 };

function CreateExam() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(subjects[0]!);
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("30");
  const [questions, setQuestions] = useState([{ ...emptyQuestion, options: ["", "", "", ""] }]);
  const [error, setError] = useState("");

  function updateQuestion(index: number, patch: Partial<(typeof questions)[number]>) {
    setQuestions((qs) => qs.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !date || questions.some((q) => !q.text.trim())) {
      setError("Please fill in the exam name, date and every question text.");
      return;
    }
    const built: Question[] = questions.map((q, i) => ({
      id: i + 1,
      text: q.text,
      options: q.options.map((o, oi) => o || `Option ${oi + 1}`),
      answer: q.answer,
    }));
    teacherExamsStore.add({
      id: `custom-${Date.now()}`,
      name,
      subject,
      date,
      duration: Number(duration) || 30,
      totalMarks: built.length * 5,
      status: "upcoming",
      questions: built,
    });
    navigate({ to: "/teacher" });
  }

  return (
    <AppLayout title="Create Exam">
      <form onSubmit={save} className="mx-auto max-w-3xl space-y-4">
        <div className="card-surface grid gap-4 p-6 sm:grid-cols-2">
          <Input id="name" label="Exam Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Select
            id="subject"
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={subjects.map((s) => ({ value: s, label: s }))}
          />
          <Input id="date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input
            id="duration"
            label="Duration (minutes)"
            type="number"
            min={5}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <p className="text-sm text-muted-foreground sm:col-span-2">
            Number of questions: <span className="font-medium text-foreground">{questions.length}</span>
          </p>
        </div>

        {questions.map((q, index) => (
          <div key={index} className="card-surface space-y-3 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Question {index + 1}</h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => setQuestions((qs) => qs.filter((_, i) => i !== index))}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  aria-label="Remove question"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <Input
              id={`q-${index}`}
              label="Question text"
              value={q.text}
              onChange={(e) => updateQuestion(index, { text: e.target.value })}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {q.options.map((option, oi) => (
                <Input
                  key={oi}
                  id={`q-${index}-o-${oi}`}
                  label={`Option ${oi + 1}`}
                  value={option}
                  onChange={(e) =>
                    updateQuestion(index, {
                      options: q.options.map((o, i) => (i === oi ? e.target.value : o)),
                    })
                  }
                />
              ))}
            </div>
            <Select
              id={`q-${index}-answer`}
              label="Correct option"
              value={String(q.answer)}
              onChange={(e) => updateQuestion(index, { answer: Number(e.target.value) })}
              options={q.options.map((_, oi) => ({ value: String(oi), label: `Option ${oi + 1}` }))}
            />
          </div>
        ))}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setQuestions((qs) => [...qs, { ...emptyQuestion, options: ["", "", "", ""] }])}
          >
            <Plus size={15} /> Add Question
          </Button>
          <Button type="submit">Save Exam</Button>
        </div>
      </form>
    </AppLayout>
  );
}