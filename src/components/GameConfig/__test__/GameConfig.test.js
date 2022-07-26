import { render, screen } from "@testing-library/react";
import GameConfig from "..";
import GameContext from "../../../context/GameContext";
import { mockTestData } from '../../../test_utils';

const renderContext = () => {
  return render(
    <GameContext.Provider value={mockTestData}>
      <GameConfig />;
    </GameContext.Provider>
  );
};

describe("GameConfig", () => {
  it("should be rendered", () => {
    renderContext()
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});
