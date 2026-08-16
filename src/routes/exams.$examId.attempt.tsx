import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Flag } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import Modal from "@/components/Modal";
import QuestionCard from "@/components/QuestionCard";
import QuestionNavigator from "@/components/QuestionNavigator";
import Timer from "@/components/Timer";
import { exams } from "@/data/mockData";
import { resultsStore } from "@/lib/storage";

export const Route = createFileRoute("/exams/$examId/attempt")({
  head: () => ({
    meta: [
      { title: "Attempt Exam | ExamPortal" },
      {
        name: "description",
        content: "Answer questions with a live timer, question palette and mark-for-review support.",
      },
      { property: "og:title", content: "Attempt Exam | ExamPortal" },
      { property: "og:description", content: "Live exam interface with timer and question palette." },
    ],
  }),
  component: AttemptExam,
});

function AttemptExam() {
  const { examId } = useParams({ from: "/exams/$examId/attempt" });
  const navigate = useNavigate();
  const exam = exams.find((e) => e.id === examId);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [marked, setMarked] = useState<number[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const submit = useCallback(() => {
    if (!exam) return;
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    exam.questions.forEach((q, i) => {
      const given = answers[i];
      if (given === undefined || given === null) unanswered += 1;
      else if (given === q.answer) correct += 1;
      else incorrect += 1;
    });
    const perQuestion = exam.totalMarks / exam.questions.length;
    const result = {
      id: `r-${Date.now()}`,
      examId: exam.id,
      examName: exam.name,
      subject: exam.subject,
      date: new Date().toISOString().slice(0, 10),
      score: Math.round(correct * perQuestion),
      total: exam.totalMarks,
      correct,
      incorrect,
      unanswered,
    };
    resultsStore.add(result);
    navigate({ to: "/results/$resultId", params: { resultId: result.id } });
  }, [answers, exam, navigate]);

  if (!exam) {
    return (
      <AppLayout title="Exam">
        <EmptyState title="Exam not found" message="This exam does not exist in the mock data." />
      </AppLayout>
    );
  }

  const answeredCount = Object.values(answers).filter((v) => v !== null && v !== undefined).length;
  const question = exam.questions[current]!;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card px-4 py-3.5 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
          <div>
            <h1 className="font-semibold text-foreground">{exam.subject}</h1>
            <p className="text-xs text-muted-foreground">
              Question {current + 1} / {exam.questions.length}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Timer minutes={exam.duration} onExpire={submit} />
            <Button variant="danger" size="sm" onClick={() => setShowConfirm(true)}>
              Submit
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_260px]">
        <div>
          <QuestionCard
            question={question}
            index={current}
            selected={answers[current] ?? null}
            onSelect={(option) => setAnswers((a) => ({ ...a, [current]: option }))}
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setMarked((m) => (m.includes(current) ? m.filter((i) => i !== current) : [...m, current]))
              }
            >
              <Flag size={15} />
              {marked.includes(current) ? "Unmark" : "Mark for Review"}
            </Button>
            <Button
              className="ml-auto"
              onClick={() => setCurrent((c) => Math.min(exam.questions.length - 1, c + 1))}
              disabled={current === exam.questions.length - 1}
            >
              Save &amp; Next
            </Button>
          </div>
        </div>

        <QuestionNavigator
          total={exam.questions.length}
          current={current}
          answers={answers}
          marked={marked}
          onJump={setCurrent}
        />
      </main>

      <Modal
        open={showConfirm}
        title="Submit Exam?"
        onClose={() => setShowConfirm(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Continue Exam
            </Button>
            <Button onClick={submit}>Submit Exam</Button>
          </>
        }
      >
        <ul className="space-y-1.5">
          <li>
            Answered: <span className="font-medium text-foreground">{answeredCount}</span>
          </li>
          <li>
            Unanswered:{" "}
            <span className="font-medium text-foreground">{exam.questions.length - answeredCount}</span>
          </li>
          <li>
            Marked for Review: <span className="font-medium text-foreground">{marked.length}</span>
          </li>
        </ul>
        <p className="mt-4">Are you sure you want to submit your paper?</p>
      </Modal>
    </div>
  );
}