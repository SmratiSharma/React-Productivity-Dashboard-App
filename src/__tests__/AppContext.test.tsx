import { renderHook, act } from "@testing-library/react";
import { AppProvider, useTasks } from "../context/AppContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe("AppContext tasks", () => {
  it("adds a task", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.addTask("Test task");
    });

    expect(result.current.tasks.some((t) => t.title === "Test task")).toBe(
      true
    );
  });

  it("toggles completion", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.toggleTask(taskId);
    });

    expect(result.current.tasks.find((t) => t.id === taskId)?.completed).toBe(
      true
    );
  });
});
