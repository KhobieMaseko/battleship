import Player from '../src/js/modules/Player';
import Gameboard from '../src/js/modules/Gameboard';

describe('Player', () => {
  let player;
  let computer;
  let enemyGameboard;

  beforeEach(() => {
    player = new Player('Player');
    computer = new Player('Computer', true);
    enemyGameboard = new Gameboard();
  });

  test('creates a player with a name', () => {
    expect(player.name).toBe('Player');
  });

  test('creates a computer player', () => {
    expect(computer.isComputer).toBe(true);
  });

  test('player has a gameboard', () => {
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test('player can attack enemy gameboard', () => {
    const result = player.attack(enemyGameboard, 0, 0);
    expect(result).toBe(true);
    expect(enemyGameboard.missedAttacks).toContainEqual({ x: 0, y: 0 });
  });

  test('computer can make random attacks', () => {
    // Fill all cells except one
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (x !== 5 || y !== 5) {
          enemyGameboard.receiveAttack(x, y);
        }
      }
    }

    const result = computer.randomAttack(enemyGameboard);
    expect(result).toBe(true);
    expect(enemyGameboard.missedAttacks).toContainEqual({ x: 5, y: 5 });
  });
});
