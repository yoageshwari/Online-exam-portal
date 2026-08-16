// Tiny localStorage helpers — our stand-in for a database.
import { pastResults, exams as mockExams, student as mockStudent } from "@/data/mockData";
import type { Exam, ResultRecord } from "@/data/mockData";

const KEYS = {
  auth: "exam_portal_auth",
  results: "exam_portal_results",
  profile: "exam_portal_profile",
  teacherExams: "exam_portal_teacher_exams",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export type AuthUser = { email: string; role: "student" | "teacher" };

export const auth = {
  get: () => read<AuthUser | null>(KEYS.auth, null),
  login: (user: AuthUser) => write(KEYS.auth, user),
  logout: () => window.localStorage.removeItem(KEYS.auth),
};

export const resultsStore = {
  all: (): ResultRecord[] => read<ResultRecord[]>(KEYS.results, pastResults),
  add: (result: ResultRecord) => {
    const list = resultsStore.all();
    write(KEYS.results, [result, ...list.filter((r) => r.id !== result.id)]);
  },
  find: (id: string) => resultsStore.all().find((r) => r.id === id) ?? null,
};

export type Profile = typeof mockStudent;

export const profileStore = {
  get: (): Profile => read<Profile>(KEYS.profile, mockStudent),
  save: (profile: Profile) => write(KEYS.profile, profile),
};

export const teacherExamsStore = {
  all: (): Exam[] => read<Exam[]>(KEYS.teacherExams, []),
  add: (exam: Exam) => write(KEYS.teacherExams, [exam, ...teacherExamsStore.all()]),
};

export function allExams(): Exam[] {
  return [...teacherExamsStore.all(), ...mockExams];
}

export function findExam(id: string): Exam | undefined {
  return allExams().find((e) => e.id === id);
}