import Gameboard from './Gameboard';

export default class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  attack(enemyGameboard, x, y) {
    return enemyGameboard.receiveAttack(x, y);
  }

  randomAttack(enemyGameboard) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (
      enemyGameboard.board[x][y] === 'hit' ||
      enemyGameboard.board[x][y] === 'miss'
    );

    return this.attack(enemyGameboard, x, y);
  }
}
