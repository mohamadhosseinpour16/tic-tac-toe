import React, { Component } from 'react';
import styles from "../styles/GameBoard.module.css"

class Cell extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className={styles.Cell}>
        {this.props.value}
      </button>
    );
  }
}

export default Cell;
