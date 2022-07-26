import { useContext } from 'react';
import BoardDisplay from "./components/BoardDisplay";
import GameConfig from "./components/GameConfig";
import GameContext from './context/GameContext';
import "./App.scss";

function App() {
  const { gameStarted } = useContext(GameContext);
  return (
      <div className="container">
      {gameStarted ? <BoardDisplay /> : <GameConfig/>}
      </div>
  );
}

export default App;
