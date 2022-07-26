import React, { useContext } from "react";
import GameContext from "../../context/GameContext";
import "./MoveBoard.scss";

const MoveBoard = ({ player }) => {
  const { moves, pgn, handleGotoMoveDirectly } = useContext(GameContext);
  const playerMoves = moves
    .filter((move) => player.side.includes(move.turn))
    .reverse();

  const latestMove = (move) => {
    const moveSplit = move.move.split(" ");
    return moveSplit[moveSplit.length - 1];
  };

  return (
    <div className="move-board" data-testid="move-board">
      <h4>{player.name}'s Moves</h4>
      <ul>
        {playerMoves.map((move, index) => (
          <li
            data-testid="move-list-item"
            className={move.move === pgn ? "active" : ""}
            onClick={() => handleGotoMoveDirectly(move)}
            key={index}
          >
            {latestMove(move)}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MoveBoard;
