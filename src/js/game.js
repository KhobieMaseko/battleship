import Player from './modules/Player';
import DOMController from './modules/dom';

export default class Game {
  constructor() {
    this.player = new Player('Player');
    this.computer = new Player('Computer', true);
    this.domController = new DOMController(this.player, this.computer);
  }

  init() {
    this.domController.setupShips();
    this.domController.renderBoards();
    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('restart-btn').addEventListener('click', () => {
      this.resetGame();
    });
  }

  resetGame() {
    this.player = new Player('Player');
    this.computer = new Player('Computer', true);
    this.domController = new DOMController(this.player, this.computer);
    this.init();
  }
}
