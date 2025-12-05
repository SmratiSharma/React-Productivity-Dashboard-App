import Card from "../components/Card";
import Text from "../components/Text";
import Button from "../components/Button";
import { useStats } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { totalTasks, completedTasks, totalNotes } = useStats();

  const stats = [
    { label: "Open Tasks", value: totalTasks - completedTasks },
    { label: "Completed", value: completedTasks },
    { label: "Notes", value: totalNotes },
  ];

  return (
    <div className="grid cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <Card.Header>
            <Text as="h3" bold>
              {stat.label}
            </Text>
          </Card.Header>
          <Card.Body>
            <Text as="p" bold style={{ fontSize: "2rem" }}>
              {stat.value}
            </Text>
            <Text muted>Overview of your productivity at a glance.</Text>
          </Card.Body>
          <Card.Footer>
            <Button
              as={Link}
              to={`/${stat.label === "Notes" ? "notes" : "tasks"}`}
              variant="outline"
            >
              View {stat.label}
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
