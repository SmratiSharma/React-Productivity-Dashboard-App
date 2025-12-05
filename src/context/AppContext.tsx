import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  due?: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
};

export type Settings = {
  theme: "light" | "dark";
  notifications: boolean;
  language: "en" | "es";
};

export type AppContextValue = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  notes: Note[];
  addNote: (title: string, body: string) => void;
  updateNote: (id: string, body: string) => void;
  deleteNote: (id: string) => void;
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  stats: {
    totalTasks: number;
    completedTasks: number;
    totalNotes: number;
  };
};

const AppContext = createContext<AppContextValue | null>(null);

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Math.random().toString(16).slice(2)}`;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: createId(),
      title: "Plan sprint",
      completed: false,
      due: "2025-12-10",
    },
    { id: createId(), title: "Refine dashboard UI", completed: true },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: createId(),
      title: "Ideas",
      body: "- Add productivity streaks\n- Offline mode",
      updatedAt: new Date().toISOString(),
    },
  ]);

  const [settings, setSettings] = useState<Settings>({
    theme: "light",
    notifications: true,
    language: "en",
  });

  const addTask = useCallback((title: string) => {
    setTasks((prev) => [...prev, { id: createId(), title, completed: false }]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const addNote = useCallback((title: string, body: string) => {
    const now = new Date().toISOString();
    setNotes((prev) => [
      ...prev,
      { id: createId(), title, body, updatedAt: now },
    ]);
  }, []);

  const updateNote = useCallback((id: string, body: string) => {
    const now = new Date().toISOString();
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, body, updatedAt: now } : note
      )
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const stats = useMemo(
    () => ({
      totalTasks: tasks.length,
      completedTasks: tasks.filter((t) => t.completed).length,
      totalNotes: notes.length,
    }),
    [tasks, notes]
  );

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      toggleTask,
      removeTask,
      notes,
      addNote,
      updateNote,
      deleteNote,
      settings,
      updateSettings,
      stats,
    }),
    [
      tasks,
      addTask,
      toggleTask,
      removeTask,
      notes,
      addNote,
      updateNote,
      deleteNote,
      settings,
      updateSettings,
      stats,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}

export function useTasks() {
  const { tasks, addTask, toggleTask, removeTask } = useAppContext();
  return { tasks, addTask, toggleTask, removeTask };
}

export function useNotes() {
  const { notes, addNote, updateNote, deleteNote } = useAppContext();
  return { notes, addNote, updateNote, deleteNote };
}

export function useSettings() {
  const { settings, updateSettings } = useAppContext();
  return { settings, updateSettings };
}

export function useStats() {
  const { stats } = useAppContext();
  return stats;
}
