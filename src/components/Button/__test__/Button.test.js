import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import Button from "..";

describe("Button", () => {
  it("that the button is rendered", () => {
    render(<Button>Start</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Start");
  });
  it("can be clicked", () => {
    const handleClick = jest.fn();

    render(<Button handleClick={handleClick}>Start</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
