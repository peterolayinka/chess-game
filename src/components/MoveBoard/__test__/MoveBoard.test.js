import { render, screen, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import MoveBoard from "..";
import GameContext from "../../../context/GameContext";
import { mockTestData } from "../../../test_utils";

const renderContext = () => {
  return render(
    <GameContext.Provider value={mockTestData}>
      <MoveBoard player={mockTestData.playerInfo[0]} />;
    </GameContext.Provider>
  );
};

describe("MoveBoard", () => {
  it("should render move board", () => {
    mockTestData.moves = [
      {
        move: "e2 e4",
        duration: 60,
        turn: "w",
      },
      {
        move: "f2e4",
        duration: 60,
        turn: "b",
      }
    ];
    renderContext();
    expect(screen.getAllByTestId("move-list-item")).toHaveLength(1);
    expect(screen.getAllByTestId("move-list-item")[0]).toHaveTextContent(
      "e4"
    );
    fireEvent.click(screen.getAllByTestId("move-list-item")[0]);
    expect(mockTestData.handleGotoMoveDirectly).toHaveBeenCalledTimes(1);
  });
});
