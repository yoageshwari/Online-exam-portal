import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

type Props = { minutes: number; onExpire: () => void };

export default function Timer({ minutes, onExpire }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          onExpire();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onExpire]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const low = secondsLeft < 60;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold tabular-nums ${
        low ? "bg-destructive/10 text-destructive" : "bg-primary-soft text-primary"
      }`}
    >
      <Clock size={15} />
      {mm}:{ss}
    </span>
  );
}