import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { FocusTimer } from "./components/FocusTimer";
import { TaskList } from "./components/TaskList";
import { FocusControls } from "./components/FocusControls";

export default function App() {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [completedSessions, setCompletedSessions] = useState(0);

  const handleSessionComplete = () => {
    setCompletedSessions((prev) => prev + 1);
  };

  const handleTimerChange = (minutes: number) => {
    setFocusMinutes(minutes);
  };

  // Efeito para carregar o tema do localStorage ou preferência do sistema
  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto bg-card">
        <Header />

        <main className="p-4 space-y-4">
          <FocusTimer
            focusMinutes={focusMinutes}
            onSessionComplete={handleSessionComplete}
          />

          <div className="grid gap-4">
            <TaskList />
            <FocusControls
              currentTimer={focusMinutes}
              onTimerChange={handleTimerChange}
            />
          </div>

          {completedSessions > 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                Ótimo trabalho! Você completou{" "}
                <span className="font-medium text-foreground">
                  {completedSessions}
                </span>{" "}
                sessão{completedSessions === 1 ? "" : "ões"} de foco hoje.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
