import { useState } from "react";
import { SimpleCard, SimpleBadge, SimpleButton, SimpleInput } from "./SimpleUI";
import {
  ShieldIcon,
  ShieldOffIcon,
  SettingsIcon,
  ClockIcon,
  ChevronUpIcon,
} from "./Icons";

interface FocusControlsProps {
  onTimerChange?: (minutes: number) => void;
  currentTimer?: number;
}

// Simple Switch component without external dependencies
function SimpleSwitch({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-5 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${checked ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          ${checked ? "translate-x-3" : "translate-x-0"}
        `}
      />
    </button>
  );
}

export function FocusControls({
  onTimerChange,
  currentTimer = 25,
}: FocusControlsProps) {
  const [distractionsBlocked, setDistractionsBlocked] = useState(false);
  const [notificationsBlocked, setNotificationsBlocked] = useState(true);
  const [focusSessionsToday, setFocusSessionsToday] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);
  const [customTimer, setCustomTimer] = useState(currentTimer.toString());

  const toggleDistractionBlocker = () => {
    setDistractionsBlocked(!distractionsBlocked);
    // In a real extension, this would interact with content scripts
    // to block distracting websites
  };

  const handleTimerChange = () => {
    const minutes = parseInt(customTimer);
    if (minutes >= 1 && minutes <= 120) {
      onTimerChange?.(minutes);
    }
  };

  return (
    <SimpleCard className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Controles de Foco</h3>
        <SimpleButton
          variant="ghost"
          size="sm"
          className="h-10 w-10 p-0" // <-- Aumentamos os valores aqui
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUpIcon /> : <SettingsIcon />}
        </SimpleButton>
      </div>

      {isExpanded && (
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">Bloquear Distrações</span>
                {distractionsBlocked ? (
                  <div className="text-green-600">
                    <ShieldIcon />
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    <ShieldOffIcon />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Bloqueia redes sociais e sites de entretenimento
              </p>
            </div>
            <SimpleSwitch
              checked={distractionsBlocked}
              onCheckedChange={toggleDistractionBlocker}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-sm">Silenciar Notificações</span>
              <p className="text-xs text-muted-foreground">
                Minimiza notificações não essenciais
              </p>
            </div>
            <SimpleSwitch
              checked={notificationsBlocked}
              onCheckedChange={setNotificationsBlocked}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">Alterar Temporizador</span>
                <div className="text-muted-foreground">
                  <ClockIcon />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Tempo de foco em minutos (1-120)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SimpleInput
                type="number"
                min="1"
                max="120"
                value={customTimer}
                onChange={(e) => setCustomTimer(e.target.value)}
                onBlur={handleTimerChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleTimerChange();
                }}
                className="w-16 text-center"
              />
              <span className="text-xs text-muted-foreground">min</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Sessões Hoje
              </span>
              <SimpleBadge variant="secondary">
                {focusSessionsToday}
              </SimpleBadge>
            </div>
          </div>
        </div>
      )}
    </SimpleCard>
  );
}
