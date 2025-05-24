import React from "react";
import styles from "../styles/GameBoard.module.css";

class GameStatus extends React.Component {
  render() {
    const { winner, isDraw, isXNext } = this.props;

    let status;
    if (winner) {
      status = `برنده : ${winner}`;
    } else if (isDraw) {
      status = "بازی مساوی شد !";
    } else {
      status = `نوبت : ${isXNext ? "X" : "O"}`;
    }

    return (
      <div className={`${styles.status} ${winner ? styles.winnerStatus : ""}`}>
        {status}
      </div>
    );
  }
}

export default GameStatus;
