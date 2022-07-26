import React, { useEffect, useContext } from "react";
import { FaClock } from 'react-icons/fa';
import GameContext from "../../context/GameContext";
import "./Timer.scss"

const Timer = ({ playerData }) => {
  const {
    handleGameOver,
    playerInfo,
    handleSetPlayerInfo,
  } = useContext(GameContext);

  const minutes = `${Math.floor(playerData.duration / 60)}`.padStart(2, "0");
  const seconds = `${(playerData.duration - minutes * 60)}`.padStart(2, "0");

  useEffect(() => {
    const timer = setInterval(() => {
        if (playerData.turn){
          handleSetPlayerInfo(playerData.id, {
            duration: playerData.duration - 1,
          });
        }
      if (playerData.duration <= 0) {
        const otherPlayer = playerInfo.find(
          (secondPlayer) => secondPlayer.id !== playerData.id
        );
        handleGameOver(otherPlayer);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div data-testid="player-timer" className="timer">
        <FaClock className="timer-icon" />
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
};

export default Timer;
