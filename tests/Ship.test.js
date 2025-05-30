import Ship from '../src/js/modules/Ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('creates a ship with correct length', () => {
    expect(ship.length).toBe(3);
  });

  test('initializes with 0 hits', () => {
    expect(ship.hits).toBe(0);
  });

  test('initializes as not sunk', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('hit() increases hit count', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('isSunk() returns true when hits equal length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('cannot be hit after being sunk', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit(); // Extra hit
    expect(ship.hits).toBe(3);
  });
});
