import { useContext } from "react";
import { FaRedo, FaUndo } from "react-icons/fa";
import ChessBoard from "../ChessBoard";
import PlayerDeck from "../PlayerDeck";
import Button from "../Button";
import MoveBoard from "../MoveBoard";
import GameResult from "../GameResult";
import GameContext from "../../context/GameContext";
import "./BoardDisplay.scss";

export const Board = () => {
  const { playerInfo, handleCancelGame, handleGotoMove } =
    useContext(GameContext);

  return (
    <div className="board">
      <div className="left-row">
        <MoveBoard player={playerInfo[1]} />
        <Button
          data-testid="prev-button"
          handleClick={() => handleGotoMove("prev")}
          className="hide-mobile"

        >
          <FaUndo title="undo desktop" />
        </Button>
      </div>
      <div className="center-row">
        <PlayerDeck playerInfo={playerInfo[1]} />
        <ChessBoard />
        <PlayerDeck playerInfo={playerInfo[0]} />
      </div>
      <div className="right-row">
        <div className="hide-desktop mobile-nav--btn">
          <Button
            handleClick={() => handleGotoMove("prev")}
          >
            <FaUndo title="undo mobile" />
          </Button>
          <Button
          data-testid="next-button"
            handleClick={() => handleGotoMove("next")}
          >
            <FaRedo title="redo mobile" />
          </Button>
        </div>
        <Button data-testid="cancel-button" className="cancel-btn mt-10" handleClick={handleCancelGame}>
          Cancel
        </Button>
        <div className="move-board--box push-down--14x">
          <Button
          data-testid="next-button"
            handleClick={() => handleGotoMove("next")}
            className="hide-mobile"
          >
            <FaRedo title="redo desktop" />
          </Button>
          <MoveBoard data-testid="move-board" player={playerInfo[0]} />
        </div>
      </div>
    </div>
  );
};

const BoardDisplay = () => {
  const { gameOver } = useContext(GameContext);
  return <div data-testid="board-display">
  {gameOver ? <GameResult /> : <Board />}
  </div>
};
export default BoardDisplay;
