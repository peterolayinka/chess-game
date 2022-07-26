import { render, screen } from "@testing-library/react";
import PlayerDeck from "..";
import GameContext from "../../../context/GameContext";
import { mockTestData } from "../../../test_utils";

const renderContext = (player) => {
  return render(
    <GameContext.Provider value={mockTestData}>
      <PlayerDeck playerInfo={player} />;
    </GameContext.Provider>
  );
};

describe("PlayerDeck", () => {
  beforeEach(() => {
  });
  it("should render properly for player 1", () => {
    const player = mockTestData.playerInfo[0]
    renderContext(player);
    expect(screen.getByRole("heading", { name: "John" })).toBeInTheDocument();
    expect(screen.getByTestId("player-timer")).toBeInTheDocument();
    expect(screen.getByTestId("player-1--status")).toBeInTheDocument();
    expect(screen.queryByTestId("player-2--status")).not.toBeInTheDocument();
  });
  it("should render properly for player 2", () => {
    const player = mockTestData.playerInfo[1]
    renderContext(player);
    expect(screen.getByRole("heading", { name: "Doe" })).toBeInTheDocument();
    expect(screen.getByTestId("player-timer")).toBeInTheDocument();
    expect(screen.getByTestId("player-2--status")).toBeInTheDocument();
    expect(screen.queryByTestId("player-1--status")).not.toBeInTheDocument();
  });
});
