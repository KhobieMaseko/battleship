import Gameboard from '../src/js/modules/Gameboard';
import Ship from '../src/js/modules/Ship';

describe('Gameboard', () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3);
  });

  test('creates a 10x10 board', () => {
    expect(gameboard.board.length).toBe(10);
    gameboard.board.forEach(row => {
      expect(row.length).toBe(10);
    });
  });

  test('places ship horizontally correctly', () => {
    gameboard.placeShip(ship, 2, 3, false);
    expect(gameboard.board[2][3]).toBe(ship);
    expect(gameboard.board[3][3]).toBe(ship);
    expect(gameboard.board[4][3]).toBe(ship);
    expect(gameboard.board[5][3]).toBe(null);
  });

  test('places ship vertically correctly', () => {
    gameboard.placeShip(ship, 2, 3, true);
    expect(gameboard.board[2][3]).toBe(ship);
    expect(gameboard.board[2][4]).toBe(ship);
    expect(gameboard.board[2][5]).toBe(ship);
    expect(gameboard.board[2][6]).toBe(null);
  });

  test('prevents overlapping ship placement', () => {
    gameboard.placeShip(ship, 2, 3, false);
    const newShip = new Ship(2);
    expect(gameboard.placeShip(newShip, 3, 2, true)).toBe(false);
  });

  test('records missed attacks', () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missedAttacks).toContainEqual({ x: 0, y: 0 });
    expect(gameboard.board[0][0]).toBe('miss');
  });

  test('records hit attacks', () => {
    gameboard.placeShip(ship, 0, 0, false);
    gameboard.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
    expect(gameboard.board[0][0]).toBe('hit');
  });

  test('detects when all ships are sunk', () => {
    const smallShip = new Ship(1);
    gameboard.placeShip(smallShip, 0, 0, false);
    expect(gameboard.allShipsSunk()).toBe(false);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
