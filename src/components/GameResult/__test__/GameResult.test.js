import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import GameResult from "..";
import GameContext from "../../../context/GameContext";
import { mockTestData } from "../../../test_utils";

let newMockData = {}

const renderContext = () => {
  return render(
    <GameContext.Provider value={newMockData}>
      <GameResult />;
    </GameContext.Provider>
  );
};

describe("GameResult", () => {
  beforeEach(() => {
    newMockData = {
      ...mockTestData,
    }
  });
  it("should render with winner and button", () => {
    newMockData.gameWinner = {
      id: 0,
      name: "John",
      side: "white",
      status: "",
      turn: false,
      duration: 0,
    }
    renderContext();
    expect(
      screen.getByRole("heading", { name: "Game Over!" })
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("game-message")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Play Again" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancel Game" })
    ).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Play Again" }));
      expect(mockTestData.handleGameStart).toHaveBeenCalledTimes(1);
      fireEvent.click(screen.getByRole("button", { name: "Cancel Game" }));
      expect(mockTestData.handleCancelGame).toHaveBeenCalledTimes(1);
  });
  it("should render game message", () => {
    newMockData.gameMessage = "Draw!";
    renderContext();
    expect(
      screen.getByTestId("game-message")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("game-message")
    ).toHaveTextContent("Draw!");

  })
});
