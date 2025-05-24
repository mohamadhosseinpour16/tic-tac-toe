import React, { Component } from 'react';
import Cell from './Cell';
import GameStatus from './GameStatus';
import styles from '../styles/GameBoard.module.css';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      isXNext: true,
      winner: null,
      winningLine: [],
      isDraw: false
    };
  }

  componentDidMount() {
    const savedState = localStorage.getItem('tictactoe-state');
    if (savedState) this.setState(JSON.parse(savedState));
  }

  componentDidUpdate() {
    localStorage.setItem('tictactoe-state', JSON.stringify(this.state));
  }

  checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // ردیف‌ها
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // ستون‌ها
      [0, 4, 8], [2, 4, 6] // قطرها
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], winningLine: line };
      }
    }

    if (board.every(cell => cell !== null)) {
      return { isDraw: true };
    }

    return null;
  };

  handleClick = (index) => {
    if (this.state.board[index] || this.state.winner) return;

    const newBoard = [...this.state.board];
    newBoard[index] = this.state.isXNext ? 'X' : 'O';
    const result = this.checkWinner(newBoard);

    this.setState({
      board: newBoard,
      isXNext: !this.state.isXNext,
      ...result
    });
  };

  resetGame = () => {
    this.setState({
      board: Array(9).fill(null),
      isXNext: true,
      winner: null,
      winningLine: [],
      isDraw: false
    });
  };

  render() {
    return (
      <div className={styles.gameContainer}>
        <GameStatus 
          winner={this.state.winner}
          isDraw={this.state.isDraw}
          isXNext={this.state.isXNext}
        />
        
        <div className={styles.board}>
          {this.state.board.map((cell, index) => (
            <Cell
              key={index}
              value={cell}
              onClick={() => this.handleClick(index)}
              isWinning={this.state.winningLine.includes(index)}
            />
          ))}
        </div>

        <button 
          onClick={this.resetGame}
          className={styles.resetButton}
        >
          شروع بازی جدید
        </button>
      </div>
    );
  }
}

export default GameBoard;