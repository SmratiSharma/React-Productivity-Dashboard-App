import { FormEvent, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Text from "../components/Text";
import { useTasks } from "../context/AppContext";

export default function Tasks() {
  const { tasks, addTask, toggleTask, removeTask } = useTasks();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title.trim());
    setTitle("");
  };

  return (
    <div className="grid" style={{ gap: "24px" }}>
      <Card>
        <Card.Header>
          <Text as="h2" bold>
            Tasks
          </Text>
        </Card.Header>
        <Card.Body>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "12px" }}
          >
            <Input
              label="Add task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type a new task"
              required
            />
            <Button type="submit">Add</Button>
          </form>
        </Card.Body>
      </Card>

      <div className="grid" style={{ gap: "12px" }}>
        {tasks.map((task) => (
          <Card key={task.id}>
            <Card.Body>
              <label
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <Text as="span" bold={task.completed} muted={task.completed}>
                  {task.title}
                </Text>
              </label>
            </Card.Body>
            <Card.Footer>
              <Button variant="danger" onClick={() => removeTask(task.id)}>
                Delete
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
}
