import Player from './modules/Player';
import DOMController from './modules/dom';
import './../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing game...');

  const player = new Player('Player');
  const computer = new Player('Computer', true);
  const game = new DOMController(player, computer);

  // Boards verification
  console.log('Player board element:', document.getElementById('player-board'));
  console.log('Computer board element:', document.getElementById('computer-board'));
});
