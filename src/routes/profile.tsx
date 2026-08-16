import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { profileStore, type Profile } from "@/lib/storage";
import { student } from "@/data/mockData";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile | ExamPortal" },
      {
        name: "description",
        content: "View and edit your student profile details such as name, ID, email, phone and department.",
      },
      { property: "og:title", content: "Student Profile | ExamPortal" },
      { property: "og:description", content: "Editable student profile details." },
    ],
  }),
  component: ProfilePage,
});

const fields: { key: keyof Profile; label: string }[] = [
  { key: "name", label: "Full Name" },
  { key: "studentId", label: "Student ID" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "department", label: "Department" },
  { key: "semester", label: "Semester" },
];

function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(student);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(profileStore.get());
  }, []);

  function save() {
    profileStore.save(profile);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AppLayout title="Profile">
      <div className="mx-auto max-w-2xl">
        <div className="card-surface animate-rise p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-xl font-semibold text-primary">
              {profile.name.charAt(0)}
            </span>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">
                {profile.studentId} · {profile.department}
              </p>
            </div>
            <Button
              variant={editing ? "outline" : "soft"}
              size="sm"
              className="ml-auto"
              onClick={() => setEditing((v) => !v)}
            >
              {editing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {fields.map(({ key, label }) => (
              <Input
                key={key}
                id={key}
                label={label}
                value={profile[key]}
                disabled={!editing}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
              />
            ))}
          </div>

          {editing && (
            <div className="mt-6">
              <Button onClick={save}>Save Changes</Button>
            </div>
          )}
          {saved && <p className="mt-4 text-sm text-success">Profile updated successfully.</p>}
        </div>
      </div>
    </AppLayout>
  );
}