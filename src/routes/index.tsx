import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { auth } from "@/lib/storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login | ExamPortal – Online Exam System" },
      {
        name: "description",
        content:
          "Sign in to ExamPortal, a student online examination system for taking tests, tracking scores and reviewing results.",
      },
      { property: "og:title", content: "Login | ExamPortal – Online Exam System" },
      {
        property: "og:description",
        content: "Student login for the ExamPortal online examination system.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("yoageshwari.sharma@college.edu");
  const [password, setPassword] = useState("student123");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || password.length < 4) {
      setError("Please enter a valid email / student ID and password.");
      return;
    }
    auth.login({ email, role: "student" });
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="rounded-xl bg-primary p-2.5 text-primary-foreground">
            <GraduationCap size={22} />
          </span>
          <h1 className="mt-3 text-2xl font-semibold text-foreground">ExamPortal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Online Examination System</p>
        </div>

        <form onSubmit={handleSubmit} className="card-surface animate-rise space-y-4 p-6">
          <Input
            id="email"
            label="Email / Student ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@college.edu"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => setError("Password reset is not available in this demo.")}
              className="font-medium text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full">
            Login
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Demo project — any valid-looking credentials will work.
          </p>
        </form>
      </div>
    </div>
  );
}
