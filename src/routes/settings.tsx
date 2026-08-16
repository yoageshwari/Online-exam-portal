import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import Select from "@/components/Select";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | ExamPortal" },
      {
        name: "description",
        content: "Manage exam reminders, result notifications and language preferences for your account.",
      },
      { property: "og:title", content: "Settings | ExamPortal" },
      { property: "og:description", content: "Notification and preference settings for your account." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [reminders, setReminders] = useState(true);
  const [resultAlerts, setResultAlerts] = useState(true);
  const [language, setLanguage] = useState("en");

  const toggles = [
    {
      label: "Exam reminders",
      description: "Get notified one day before an exam starts.",
      value: reminders,
      set: setReminders,
    },
    {
      label: "Result notifications",
      description: "Notify me when a result is published.",
      value: resultAlerts,
      set: setResultAlerts,
    },
  ];

  return (
    <AppLayout title="Settings">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="card-surface p-6">
          <h2 className="font-semibold text-foreground">Notifications</h2>
          <div className="mt-4 space-y-4">
            {toggles.map((t) => (
              <label key={t.label} className="flex items-start justify-between gap-4">
                <span>
                  <span className="block text-sm font-medium text-foreground">{t.label}</span>
                  <span className="block text-xs text-muted-foreground">{t.description}</span>
                </span>
                <input
                  type="checkbox"
                  checked={t.value}
                  onChange={(e) => t.set(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--primary)]"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="card-surface p-6">
          <h2 className="mb-4 font-semibold text-foreground">Preferences</h2>
          <Select
            id="language"
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={[
              { value: "en", label: "English" },
              { value: "hi", label: "Hindi" },
              { value: "mr", label: "Marathi" },
            ]}
          />
          <div className="mt-5">
            <Button size="sm">Save Preferences</Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}