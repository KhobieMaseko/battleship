import Game from './game';
import './../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing game...');
  const game = new Game();
  game.init();

  // Boards verification
  console.log('Player board element:', document.getElementById('player-board'));
  console.log('Computer board element:', document.getElementById('computer-board'));
});
