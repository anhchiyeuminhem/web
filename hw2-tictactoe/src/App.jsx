import './App.css';
import GameStatus from './components/GameStatus';
import Board from './components/Board';

function App() {
  const sampleBoard = [
    'X', 'O', 'X',
    'O', 'X', 'O',
    null, null, 'X'
  ];

  const statusText = 'Player X wins! 🎉';

  return (
    <main className="game-container">
      <h1>Tic-Tac-Toe (React)</h1>
      <GameStatus status={statusText} />
      <Board squares={sampleBoard} />
      <button className="reset-btn" type="button">
        Restart Game
      </button>
    </main>
  );
}

export default App;