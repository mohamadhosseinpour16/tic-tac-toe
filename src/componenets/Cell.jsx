import React from 'react';
import styles from '../styles/GameBoard.module.css';

class Cell extends React.Component {
  render() {
    const { value, onClick, isWinning } = this.props;
    const cellClass = `${styles.cell} ${isWinning ? styles.winningCell : ''}`;
    
    return (
      <button 
        className={cellClass}
        onClick={onClick}
      >
        {value}
      </button>
    );
  }
}

export default Cell;