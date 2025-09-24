import { useState, useEffect } from "react";
import { SimpleButton } from "./SimpleUI";
import { MoonIcon, SunIcon, TargetIcon } from "./Icons";

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const element = document.documentElement;
    element.classList.toggle("dark");
    const isDarkMode = element.classList.contains("dark");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    setIsDark(isDarkMode);
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <div className="text-primary-foreground">
            <TargetIcon />
          </div>
        </div>
        <div>
          <h1 className="text-lg tracking-tight">Foco</h1>
          <p className="text-xs text-muted-foreground">
            Seja produtivo, mantenha a calma
          </p>
        </div>
      </div>

      <SimpleButton
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className="h-10 w-10 p-0" // Tamanho do botão aumentado aqui
        aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </SimpleButton>
    </header>
  );
}
