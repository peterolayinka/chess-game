import { render } from "@testing-library/react";
import { default as CheckBoardBox } from "..";
import GameContext from "../../../context/GameContext";
import { mockTestData } from "../../../test_utils";
import Chessboard from "chessboardjsx";

jest.mock("chessboardjsx", () => {
  const ComponentToMock = () => <div />;
  return jest.fn(() => <ComponentToMock />);
});

const renderContext = () => {
  return render(
    <GameContext.Provider value={mockTestData}>
      <CheckBoardBox />;
    </GameContext.Provider>
  );
};

describe("ChessBoard", () => {
  it("should be rendered", async () => {
    renderContext();
    const param = {
      boardStyle: {
        borderRadius: "5px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        margin: "0 auto",
      },
      id: "humanVsHuman",
      position: "start",
      width: 320,
    };
    expect(Chessboard).toHaveBeenCalledTimes(1);
    expect(Chessboard.mock.calls[0][0].position).toEqual(param.position);
    expect(Chessboard.mock.calls[0][0].width).toEqual(param.width);
    expect(Chessboard.mock.calls[0][0].boardStyle).toEqual(param.boardStyle);
    expect(Chessboard.mock.calls[0][0].id).toEqual(param.id);
  });
});

