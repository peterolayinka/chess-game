import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import Board from "..";
import GameContext from "../../../context/GameContext";

import { mockTestData } from '../../../test_utils';

jest.mock("../../ChessBoard", () => () => {
  return <chess-board data-testid="chessboard" />;
});

const renderContext = () => {
  return render(
    <GameContext.Provider value={mockTestData}>
      <Board />;
    </GameContext.Provider>
  );
};

describe("Board", () => {
  it("should render the gameboard", () => {
    renderContext();
    expect(screen.getAllByTestId("move-board")).toHaveLength(2);
    expect(screen.getAllByTestId("player-deck")).toHaveLength(2);
    expect(screen.getByTestId("chessboard")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "redo desktop" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "undo desktop" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "redo mobile" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "undo mobile" })
    ).toBeInTheDocument();
  });
  it("should be able to cancel the game", () => {
    renderContext();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(mockTestData.handleCancelGame).toHaveBeenCalledTimes(1);
  });
  it("should be able to go to the next move", () => {
    renderContext();
    fireEvent.click(screen.getByRole("button", { name: "redo desktop" }));
    expect(mockTestData.handleGotoMove).toHaveBeenNthCalledWith(1, "next");
    fireEvent.click(screen.getByRole("button", { name: "redo mobile" }));
    expect(mockTestData.handleGotoMove).toHaveBeenNthCalledWith(1, "next");
  });
  it("should be able to go to the prev move", () => {
    renderContext();
    fireEvent.click(screen.getByRole("button", { name: "undo desktop" }));
    expect(mockTestData.handleGotoMove).toHaveBeenNthCalledWith(1, "prev");
    fireEvent.click(screen.getByRole("button", { name: "undo mobile" }));
    expect(mockTestData.handleGotoMove).toHaveBeenNthCalledWith(1, "prev");
  });
});
