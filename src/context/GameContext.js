import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const GameContext = createContext();

export const initialPlayerInfo = [
  {
    id: 0,
    name: "John",
    side: "white",
    status: "",
    turn: false,
    duration: 0,
  },
  {
    id: 1,
    name: "Doe",
    side: "black",
    status: "",
    turn: false,
    duration: 0,
  },
];

export function GameProvider({ children }) {

  const [playerInfo, setPlayerInfo] = useLocalStorage(
    "playerInfo",
    initialPlayerInfo
  );

  const [pgn, setPgn] = useLocalStorage("pgn", "");
  const [fen, setFen] = useLocalStorage("fen", "start");
  const [gameOver, setGameOver] = useLocalStorage("gameOver", false);
  const [gameStarted, setGameStarted] = useLocalStorage("gameStarted", false);
  const [gameMessage, setGameMessage] = useLocalStorage("gameMessage", "");
  const [gameDuration, setGameDuration] = useLocalStorage("gameDuration", 600);
  const [gameWinner, setGameWinner] = useLocalStorage("gameWinner", {});
  const [configError, setConfigError] = useState("");
  const [moves, setMoves] = useLocalStorage("moves", []);

  const handleUpdateMoves = (move, turn) => {
    const playerDuration = playerInfo.map((player) => ({
      id: player.id,
      duration: player.duration,
    }));
    setMoves([...moves, { move, turn, duration: playerDuration }]);
  };

  const updatePlayerMoveDuration = () => {
    const players = playerInfo.map((player) => {
      const move = moves.find((move) => move.move === pgn);
      if (move) {
        const playerMoveDuration = move.duration.find(
          (duration) => player.id === duration.id
        );
        return {
          ...player,
          duration: playerMoveDuration.duration,
        };
      }
      return player;
    });
    setPlayerInfo(players);
  };

  const handleSetPlayerInfo = (id, data, otherPlayerData = {}) => {
    const newPlayerInfo = playerInfo.map((player) => {
      if (player.id === id) {
        return {
          ...player,
          ...data,
        };
      }
      // otherPlayerData is used to update other player's data
      return { ...player, ...otherPlayerData };
    });
    setPlayerInfo(newPlayerInfo);
  };

  const handleGameStart = () => {
    const valid = playerInfo.every(
      (player) => player.name && player.name.length > 0
    );

    if (valid) {
      const newPlayerInfo = playerInfo.map((player) => {
        return {
          ...player,
          duration: parseInt(gameDuration),
        };
      });

      setPlayerInfo(newPlayerInfo);
      setGameWinner({});
      setGameStarted(true);
      setGameOver(false);
      setPgn("");
      setGameMessage("");
      setFen("start");
      setMoves([])
    } else {
      setConfigError("Please enter a name for both players");
    }
  };

  const handleGotoMove = (direction) => {
    let currentMoveIndex;
    if (pgn) {
      currentMoveIndex = moves.findIndex((move) => move.move === pgn);
    } else {
      currentMoveIndex = moves.length - 1;
    }

    if (direction === "prev") {
      if (currentMoveIndex > 0) {
        setPgn(moves[currentMoveIndex - 1].move);
      }
    } else if (direction === "next") {
      if (currentMoveIndex < moves.length - 1) {
        setPgn(moves[currentMoveIndex + 1].move);
      }
    }
  };

  const handleGotoMoveDirectly = (move) => {
    setPgn(move.move);
  };

  const handleUpdateTurn = async (turn) => {
    const player = playerInfo.find((player) =>
      player.side.includes(turn)
    );
    const playerData = {
      lastPaused: new Date(), // lastPaused
      turn: true,
    };
    if (player && player.name){
      handleSetPlayerInfo(
        player.id, // playerId
        playerData,
        {
          turn: false,
        }
      );
    }
  };

  const handleGameOver = (winner) => {
    setGameOver(true);
    setGameWinner(winner);
  }

  const handleCancelGame = () => {
    const verifyCancel = window.confirm(
      "Are you sure you want to cancel the game?"
    );
    if (verifyCancel) {
      setGameStarted(false);
      setPlayerInfo(initialPlayerInfo);
      setGameOver(false);
      setGameDuration(600);
      setGameWinner({});
      setGameMessage("");
      setPgn("");
      setFen("start");
      setMoves([]);
    }
  };

  return (
    <GameContext.Provider
      value={{
        fen,
        setFen,
        pgn,
        setPgn,
        moves,
        playerInfo,
        handleSetPlayerInfo,
        gameStarted,
        handleGameStart,
        handleCancelGame,
        gameDuration,
        setGameDuration,
        gameWinner,
        setGameWinner,
        gameOver,
        setGameOver,
        configError,
        handleUpdateMoves,
        updatePlayerMoveDuration,
        handleGameOver,
        handleGotoMove,
        handleUpdateTurn,
        gameMessage,
        setGameMessage,
        handleGotoMoveDirectly
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
