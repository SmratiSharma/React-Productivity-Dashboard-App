import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Text from "../components/Text";
import { useSettings } from "../context/AppContext";

export default function Settings() {
  const { settings, updateSettings } = useSettings();

  const toggleTheme = () =>
    updateSettings({ theme: settings.theme === "light" ? "dark" : "light" });

  return (
    <div className="grid" style={{ gap: "24px", maxWidth: "640px" }}>
      <Card>
        <Card.Header>
          <Text as="h2" bold>
            Preferences
          </Text>
        </Card.Header>
        <Card.Body className="grid" style={{ gap: "12px" }}>
          <label
            className="input-field"
            style={{ flexDirection: "row", alignItems: "center", gap: "12px" }}
          >
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) =>
                updateSettings({ notifications: e.target.checked })
              }
            />
            <Text as="span">Enable notifications</Text>
          </label>

          <Input
            label="Language"
            value={settings.language}
            onChange={(e) =>
              updateSettings({ language: e.target.value as "en" | "es" })
            }
          />

          <Text as="p">Theme: {settings.theme}</Text>
          <Button variant="outline" onClick={toggleTheme}>
            Toggle Theme
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
