import React, { useContext } from "react";
import Button from "../Button";
import GameContext from "../../context/GameContext";
import "./GameConfig.scss";

const GameConfig = () => {
  const {
    playerInfo,
    handleGameStart,
    configError,
    handleSetPlayerInfo,
    setGameDuration,
  } = useContext(GameContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleGameStart();
  };

  const renderPlayerInputs = () =>
    playerInfo.map((player, index) => (
      <React.Fragment key={index}>
        <label htmlFor={`player-${index}`}>{`Player ${index + 1}`}</label>
        <input
          id={`player-${index}`}
          type="text"
          onChange={(e) => handleSetPlayerInfo(index, { name: e.target.value })}
          required
          defaultValue={player.name}
        />
      </React.Fragment>
    ));

  return (
    <form data-testid="config-form" onSubmit={handleFormSubmit} className="config-form">
      <h1>ChessBoard Game</h1>
      {renderPlayerInputs()}
      <label htmlFor="countdown">Countdown</label>
      <input
        id="countdown"
        name="countdown"
        type="number"
        defaultValue={600}
        onChange={(e) => setGameDuration(e.target.value)}
        required
      />
      {configError ? <p className="error">{configError}</p> : null}
      <Button className="full-btn primary-btn mt-20">Start</Button>
    </form>
  );
};
export default GameConfig;
