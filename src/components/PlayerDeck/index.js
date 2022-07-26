import React from "react";
import Timer from "../Timer";
import "./PlayerDeck.scss";

const PlayerDeck = ({ playerInfo }) => {
  const turn = playerInfo.turn ? "Your Turn!" : "";
  return (
    <div className="player-deck" data-testid="player-deck">
      {playerInfo.id % 2 === 0 ? <p data-testid="player-1--status" className="player-status">{turn}</p> : null}
      <div className="player-info">
        <div>
          <h2 className="player-name">{playerInfo.name}</h2>
        </div>
        <div>
          <Timer playerData={playerInfo} />
        </div>
      </div>
      {playerInfo.id % 2 !== 0 ? (
        <p data-testid="player-2--status" className="player-status">{turn}</p>
      ) : null}
    </div>
  );
};

export default PlayerDeck;
