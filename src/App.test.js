import { render, screen, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import App from "./App";
import GameContext from "./context/GameContext";
import { mockTestData } from "./test_utils";

let newTestData = {}

const renderContext = () => {
  return render(
    <GameContext.Provider value={newTestData}>
      <App />;
    </GameContext.Provider>
  );
};

describe("PlayerDeck", () => {
  beforeEach(() => {
    newTestData = { ...mockTestData }
  });
  it("should render properly for player 1", () => {
    newTestData.gameStarted = true
    renderContext();
    expect(screen.getByTestId("board-display")).toBeInTheDocument();
  });
  it("should render properly for player 2", () => {
    newTestData.gameStarted = false
    renderContext();
    expect(screen.getByTestId("config-form")).toBeInTheDocument();
  });
});
