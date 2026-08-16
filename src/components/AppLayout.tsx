import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { auth } from "@/lib/storage";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/exams", label: "My Exams", icon: BookOpen },
  { to: "/results", label: "Results", icon: ListChecks },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/teacher", label: "Teacher", icon: GraduationCap },
] as const;

export default function AppLayout({ children, title }: { children: ReactNode; title: string }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function logout() {
    auth.logout();
    navigate({ to: "/" });
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="rounded-lg bg-primary p-2 text-primary-foreground">
          <GraduationCap size={18} />
        </span>
        <span className="font-semibold text-foreground">ExamPortal</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={17} /> {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="m-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
      >
        <LogOut size={17} /> Logout
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-border bg-card lg:block">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-card shadow-xl">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/80 px-4 py-3.5 backdrop-blur sm:px-6">
          <button
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <h1 className="text-base font-semibold text-foreground">{title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:block">Ananya Sharma</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
              A
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}