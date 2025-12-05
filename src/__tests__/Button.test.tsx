import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

describe("Button", () => {
  it("renders label", () => {
    render(<Button>Save</Button>);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("shows spinner when loading", () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByLabelText("loading")).toBeInTheDocument();
  });

  it("handles clicks", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalled();
  });
});
