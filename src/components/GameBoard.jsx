import React, { Component } from 'react';
import Cell from './Cell';
import styles from "../styles/GameBoard.module.css"

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      isXNext: true,
    };
  }

  handleClick = (index) => {
    const board = [...this.state.board];
    if (board[index]) return; // خانه اشغال‌شده
    board[index] = this.state.isXNext ? 'X' : 'O';
    this.setState({ board, isXNext: !this.state.isXNext });
  };

  renderCell(index) {
    return (
      <Cell
        value={this.state.board[index]}
        onClick={() => this.handleClick(index)}
      />
    );
  }

  render() {
    return (
      <div className={styles.board}>
        {[...Array(9)].map((_, i) => this.renderCell(i))}
      </div>
    );
  }
}

export default GameBoard;
