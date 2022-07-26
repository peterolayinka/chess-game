import { render, screen } from "@testing-library/react";
import Timer from "..";
import GameContext from "../../../context/GameContext";
import { mockTestData } from "../../../test_utils";


const renderContext = (player) => {
  return render(
    <GameContext.Provider value={mockTestData}>
      <Timer playerData={player} />;
    </GameContext.Provider>
  );
};

describe("Timer", () => {
  beforeEach(() => {
  });
  it("should render properly", () => {
    const player = mockTestData.playerInfo[0]
    player.duration = 600;
    player.turn = true
    renderContext(player);
    expect(screen.getByTestId("player-timer")).toHaveTextContent("10:00");
  });
});
