import React, { useEffect, useRef, useContext } from "react";
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import GameContext from "../../context/GameContext";

import Chessboard from "chessboardjsx";

const HumanVsHuman = ({ children }) => {
  let game = useRef(new Chess());

  const {
    fen,
    setFen,
    pgn,
    playerInfo,
    setGameMessage,
    handleGameOver,
    handleUpdateTurn,
    handleUpdateMoves,
    updatePlayerMoveDuration,
  } = useContext(GameContext);

  useEffect(() => {
    // window.addEventListener("resize", game.calcWidth);
    handleUpdateTurn(game.current.turn());
    // return () => window.removeEventListener("resize", game.calcWidth);
  }, []);

  useEffect(() => {
    const check = game.current.load_pgn(pgn);
    if (check) {
      setFen(game.current.fen());
      handleUpdateTurn(game.current.turn());
      updatePlayerMoveDuration();
    }
  }, [pgn]);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    if (game) {
      const playerTurn = game.current.turn();

      // exit if the game is over
      if (game.current.in_checkmate()) {
        setGameMessage("Checkmate!");
        const player = playerInfo.find((player) =>
          player.side.includes(playerTurn)
        );
        handleGameOver(player);
        return;
      } else if (game.current.in_draw()) {
        setGameMessage("Draw!");
        handleGameOver({});
        return;
      } else if (game.current.in_stalemate()) {
        setGameMessage("Stalemate!");
        handleGameOver({});
        return;
      }

      // see if the move is legal
      let move = game.current.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });

      // illegal move
      if (move === null) return;

      setFen(game.current.fen());
      handleUpdateMoves(game.current.pgn(), playerTurn);
      handleUpdateTurn(game.current.turn());
    }
  };

  return children({
    position: fen,
    onDrop,
  });
};

export default function WithMoveValidation() {
  return (
    <div data-testid="chessboard">
      <HumanVsHuman>
        {({ position, onDrop }) => (
          <Chessboard
            id="humanVsHuman"
            width={320}
            position={position}
            onDrop={onDrop}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
              margin: "0 auto",
            }}
          />
        )}
      </HumanVsHuman>
    </div>
  );
}
