import Ship from './Ship';

export default class Gameboard {
  constructor() {
    this.board = Array(10).fill().map(() => Array(10).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship, x, y, isVertical) {
    if (this.isValidPlacement(ship, x, y, isVertical)) {
      if (isVertical) {
        for (let i = 0; i < ship.length; i++) {
          this.board[x][y + i] = ship;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          this.board[x + i][y] = ship;
        }
      }
      this.ships.push(ship);
      return true;
    }
    return false;
  }

  isValidPlacement(ship, x, y, isVertical) {
    if (isVertical) {
      if (y + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][y + i] !== null) return false;
      }
    } else {
      if (x + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x + i][y] !== null) return false;
      }
    }
    return true;
  }

  receiveAttack(x, y) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;

    const cell = this.board[x][y];
    if (cell === 'miss' || cell === 'hit') return false;

    if (cell instanceof Ship) {
      cell.hit();
      this.board[x][y] = 'hit';
      return true;
    }

    this.missedAttacks.push({ x, y });
    this.board[x][y] = 'miss';
    return true;
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}
