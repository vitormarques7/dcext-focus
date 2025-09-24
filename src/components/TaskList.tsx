import { useState } from "react";
import { SimpleCard, SimpleButton, SimpleInput } from "./SimpleUI";
import { PlusIcon, XIcon, CheckIcon } from "./Icons";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

// Simple Checkbox component without external dependencies
function SimpleCheckbox({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-4 w-4 shrink-0 rounded border border-gray-300 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${
          checked
            ? "bg-primary border-primary"
            : "bg-white dark:bg-gray-800 dark:border-gray-600"
        }
      `}
    >
      {checked && (
        <div className="absolute top-0.5 left-0.5 text-white">
          <CheckIcon />
        </div>
      )}
    </button>
  );
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Revisar documentação do projeto", completed: false },
    { id: "2", text: "Preparar para reunião da equipe", completed: true },
    { id: "3", text: "Atualizar cronograma do projeto", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setIsAdding(false);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <SimpleCard className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Tarefas de Hoje</h3>
          <p className="text-sm text-muted-foreground">
            {completedCount} de {tasks.length} concluídas
          </p>
        </div>
        <SimpleButton
          variant="ghost"
          size="sm"
          onClick={() => setIsAdding(true)}
          className="h-10 w-10 p-0" // Tamanho do botão restaurado para o maior
        >
          <PlusIcon />
        </SimpleButton>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 group">
            <SimpleCheckbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <span
              className={`flex-1 text-sm ${
                task.completed
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {task.text}
            </span>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="flex gap-2">
          <SimpleInput
            placeholder="Adicionar nova tarefa..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
              if (e.key === "Escape") {
                setIsAdding(false);
                setNewTask("");
              }
            }}
            className="flex-1"
            autoFocus
          />
          <SimpleButton size="sm" onClick={addTask}>
            Adicionar
          </SimpleButton>
        </div>
      )}
    </SimpleCard>
  );
}
