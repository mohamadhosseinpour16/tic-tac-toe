import React, { Component } from 'react';
import Cell from './Cell';
import styles from '../styles/GameBoard.module.css';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      isXNext: true,
      winner: null,
    };
  }

  handleClick = (index) => {
    const board = [...this.state.board];
    if (board[index] || this.state.winner) return;

    board[index] = this.state.isXNext ? 'X' : 'O';
    const winner = this.checkWinner(board);

    this.setState({
      board,
      isXNext: !this.state.isXNext,
      winner,
    });
  };

  checkWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  resetGame = () => {
    this.setState({
      board: Array(9).fill(null),
      isXNext: true,
      winner: null,
    });
  };

  renderCell(index) {
    return (
      <Cell
        value={this.state.board[index]}
        onClick={() => this.handleClick(index)}
        key={index}
      />
    );
  }

  render() {
    let status;
    if (this.state.winner) {
      status = `برنده: ${this.state.winner}`;
    } else if (this.state.board.every(cell => cell)) {
      status = 'بازی مساوی شد!';
    } else {
      status = `نوبت: ${this.state.isXNext ? 'X' : 'O'}`;
    }

    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>{status}</h2>

        <div className={styles.board}>
          {this.state.board.map((_, i) => this.renderCell(i))}
        </div>

        <button
          onClick={this.resetGame}
          className={styles.btn}
        >
          شروع بازی جدید
        </button>
      </div>
    );
  }
}

export default GameBoard;

