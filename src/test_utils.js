import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

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

export const mockTestData = {
  gameOver: false,
  playerInfo: initialPlayerInfo,
  moves: [],
  handleSetPlayerInfo: jest.fn(),
  handleCancelGame: jest.fn(),
  handleGotoMove: jest.fn(),
  fen: "start",
  setFen: jest.fn(),
  pgn: "",
  setPgn: jest.fn(),
  gameStarted: false,
  handleGameStart: jest.fn(),
  gameDuration: 600,
  setGameDuration: jest.fn(),
  gameWinner: {},
  setGameWinner: jest.fn(),
  setGameOver: jest.fn(),
  configError: "",
  handleUpdateMoves: jest.fn(),
  updatePlayerMoveDuration: jest.fn(),
  handleGameOver: jest.fn(),
  gameMessage: "",
  setGameMessage: jest.fn(),
  handleUpdateTurn: jest.fn(),
  handleGotoMoveDirectly: jest.fn(),
};
