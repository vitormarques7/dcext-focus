import { useState, useEffect, useRef } from "react";
import { SimpleButton, SimpleCard } from "./SimpleUI";
import { PlayIcon, PauseIcon, RotateCcwIcon } from "./Icons";

interface FocusTimerProps {
  onSessionComplete?: () => void;
  focusMinutes?: number;
}

// Simple Progress component without external dependencies
function SimpleProgress({ value }: { value: number }) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
        }}
      />
    </div>
  );
}

export function FocusTimer({
  onSessionComplete,
  focusMinutes = 25,
}: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(focusMinutes * 60); // custom minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalTime = isBreak ? 5 * 60 : focusMinutes * 60; // 5 min break, custom min focus

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            if (!isBreak) {
              onSessionComplete?.();
              setIsBreak(true);
              return 5 * 60; // Start break
            } else {
              setIsBreak(false);
              return focusMinutes * 60; // Start focus session
            }
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, isBreak, onSessionComplete, focusMinutes]);

  // Update timer when focusMinutes changes (only if not active and not in break)
  useEffect(() => {
    if (!isActive && !isBreak) {
      setTimeLeft(focusMinutes * 60);
    }
  }, [focusMinutes, isActive, isBreak]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? 5 * 60 : focusMinutes * 60);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <SimpleCard className="p-6 text-center space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm text-muted-foreground uppercase tracking-wide">
          {isBreak ? "Tempo de Pausa" : "Tempo de Foco"}
        </h3>
        <div className="text-4xl font-mono tracking-tight">
          {formatTime(timeLeft)}
        </div>
      </div>

      <SimpleProgress value={progress} />

      <div className="flex justify-center gap-2">
        <SimpleButton
          variant="default"
          size="sm"
          onClick={toggleTimer}
          className="w-20"
        >
          {isActive ? <PauseIcon /> : <PlayIcon />}
        </SimpleButton>
        {/* O botão de Reset que estava aqui foi removido */}
      </div>
    </SimpleCard>
  );
}
