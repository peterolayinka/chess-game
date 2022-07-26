import React, { useContext } from "react";
import Button from "../Button";
import { FaGlassCheers } from "react-icons/fa";
import GameContext from "../../context/GameContext";
import "./GameResult.scss";

const GameResult = () => {
  const { handleGameStart, handleCancelGame, gameWinner, gameMessage } =
    useContext(GameContext);

  return (
    <div className="game-result">
      <h2>Game Over! </h2>

      <p data-testid="game-message">
        {gameWinner.name ? (
          <React.Fragment>
            <FaGlassCheers /> {gameWinner.name} Won! <FaGlassCheers />
          </React.Fragment>
        ) : (
          gameMessage
        )}
      </p>
      <Button handleClick={handleGameStart} className="full-btn primary-btn">
        Play Again
      </Button>
      <Button
        handleClick={handleCancelGame}
        className="full-btn cancel-btn mt-10"
      >
        Cancel Game
      </Button>
    </div>
  );
};
export default GameResult;
