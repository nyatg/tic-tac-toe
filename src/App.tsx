import './App.css';
import { useState, useEffect } from 'react';
import Box from './Box/Box';

type Scores = {
  [key: string]: number
}
const initGameState = ['', '', '', '', '', '', '', '', ''];
const initScores: Scores = {X: 0, O:0 }
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


function App() {
  const [gameState, setGameState] = useState(initGameState);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [scores, setScores] = useState(initScores);


  useEffect(() => {
    checkForWinner()
  }, [gameState]);

  const resetBoard = () => setGameState(initGameState);

  const handleWin = () => {
    window.alert(`Grattis player ${currentPlayer}! Du vann!`)

    const newPlayerScore = scores[currentPlayer] + 1
    const newScores = { ...scores }
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores)
  }
  const handleDraw = () => {
    window.alert(window.alert('Oavgjort... :/'))
    
  }

  const checkForWinner = () => {
    let roundWon = false

    for (let i = 0; i < winningCombos.length; i++) {
      const winCombo = winningCombos[i];

      let a = gameState[winCombo[0]]
      let b = gameState[winCombo[1]]
      let c = gameState[winCombo[2]]

      if ([a, b, c].includes('')) {
        continue
      }

      if (a === b && b === c) {
        roundWon = true
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 200)
      return;
    }

    if (!gameState.includes('')) {
      setTimeout(() => handleDraw(), 200)
      return;
    }

    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  };


  const handleCellClick = (e:any) => {
    const cellIndex = Number(e.target.getAttribute('data-cell-index'))

    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return
    }

    const newValues = [...gameState]
    newValues[cellIndex] = currentPlayer
    setGameState(newValues)
  }

  return (
  <div>
      <h1>Tic Tac Toe</h1>
      <div>
        <h3>Your turn, player {currentPlayer}</h3>
        <div className='board'>{gameState.map((player, index) => (
          <Box key={index} onClick={handleCellClick} {...{index, player}} />
      ))}</div>
        <div className='score'>
          <h4>Scores</h4>
          <p>X: {scores['X']}</p>
          <p>O: {scores['O']}</p>
          <button onClick={resetBoard}> Restart game</button>
        </div>
        
      </div>
  </div>)
}

export default App
