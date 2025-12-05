import { FormEvent, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Text from "../components/Text";
import { useNotes } from "../context/AppContext";

export default function Notes() {
  const { notes, addNote, deleteNote } = useNotes();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    addNote(title.trim(), body.trim());
    setTitle("");
    setBody("");
  };

  return (
    <div className="grid" style={{ gap: "24px" }}>
      <Card>
        <Card.Header>
          <Text as="h2" bold>
            Notes
          </Text>
        </Card.Header>
        <Card.Body>
          <form
            onSubmit={handleSubmit}
            className="grid"
            style={{ gap: "12px" }}
          >
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Meeting recap"
              required
            />
            <div className="input-field">
              <label className="input-label" htmlFor="note-body">
                Body
              </label>
              <textarea
                id="note-body"
                className="input-control"
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Capture key decisions and action items"
                required
              />
            </div>
            <Button type="submit">Save Note</Button>
          </form>
        </Card.Body>
      </Card>

      <div className="grid" style={{ gap: "12px" }}>
        {notes.map((note) => (
          <Card key={note.id}>
            <Card.Header>
              <Text as="h3" bold>
                {note.title}
              </Text>
            </Card.Header>
            <Card.Body>
              <Text as="p">{note.body}</Text>
            </Card.Body>
            <Card.Footer>
              <Text muted>
                Updated {new Date(note.updatedAt).toLocaleString()}
              </Text>
              <Button
                variant="outline"
                onClick={() => deleteNote(note.id)}
                style={{ marginLeft: "auto" }}
              >
                Delete
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
}
