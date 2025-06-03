import Ship from './Ship';
import Gameboard from './Gameboard';
import Player from './Player';

export default class DOMController {
  constructor(player, computer) {
    this.player = player;
    this.computer = computer;
    this.currentPlayer = player;
    this.gameOver = false;
    this.messageElement = this.initializeMessageElement();

    this.setupShips();
    this.renderBoards();
    this.bindCellClickEvents();
  }

  initializeMessageElement() {
    let element = document.getElementById('game-message');
    if (!element) {
      element = document.createElement('div');
      element.id = 'game-message';
      element.style.display = 'none';
      document.body.appendChild(element);
    }
    return element;
  }

  resetGame() {
    // Reset game state
    this.gameOver = false;
    this.currentPlayer = this.player;

    // Clear and hide message
    this.messageElement.textContent = '';
    this.messageElement.style.display = 'none';

    // Reset gameboards
    this.player.gameboard = new Gameboard();
    this.computer.gameboard = new Gameboard();

    // Reinitialize game
    this.setupShips();
    this.renderBoards();
    this.bindCellClickEvents();

    // Force DOM update
    void this.messageElement.offsetWidth;
  }

  bindCellClickEvents() {
    const computerBoard = document.getElementById('computer-board');

    // Remove old event listeners
    if (computerBoard) {
      const newBoard = computerBoard.cloneNode(true);
      computerBoard.parentNode.replaceChild(newBoard, computerBoard);

      // Add new listener
      newBoard.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
          this.handlePlayerAttack(e);
        }
      });
    }
  }

  handlePlayerAttack(e) {
    if (this.gameOver || this.currentPlayer.isComputer) return;

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    if (this.currentPlayer.attack(this.computer.gameboard, x, y)) {
      this.renderBoards();

      if (this.computer.gameboard.allShipsSunk()) {
        this.endGame(this.player);
        return;
      }

      this.currentPlayer = this.computer;
      setTimeout(() => this.handleComputerAttack(), 1000);
    }
  }

  handleComputerAttack() {
    if (this.gameOver || !this.currentPlayer.isComputer) return;

    this.currentPlayer.randomAttack(this.player.gameboard);
    this.renderBoards();

    if (this.player.gameboard.allShipsSunk()) {
      this.endGame(this.computer);
      return;
    }

    this.currentPlayer = this.player;
  }

  endGame(winner) {
    this.gameOver = true;
    this.messageElement.textContent = `${winner.name} Wins!!!`;
    this.messageElement.style.display = 'block';
  }

  setupShips() {
    const shipLengths = [5, 4, 3, 3, 2];

    // Player ships
    shipLengths.forEach(length => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const isVertical = Math.random() > 0.5;
        const ship = new Ship(length);
        placed = this.player.gameboard.placeShip(ship, x, y, isVertical);
      }
    });

    // Computer ships
    shipLengths.forEach(length => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const isVertical = Math.random() > 0.5;
        const ship = new Ship(length);
        placed = this.computer.gameboard.placeShip(ship, x, y, isVertical);
      }
    });
  }

  renderBoards() {
    this.renderPlayerBoard();
    this.renderComputerBoard();
  }

  renderPlayerBoard() {
    const boardElement = document.getElementById('player-board');
    this.renderBoard(boardElement, this.player.gameboard, true);
  }

  renderComputerBoard() {
    const boardElement = document.getElementById('computer-board');
    this.renderBoard(boardElement, this.computer.gameboard, false);
  }

  renderBoard(boardElement, gameboard, showShips) {
    if (!boardElement) return;

    boardElement.innerHTML = '';

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.x = x;
        cell.dataset.y = y;

        if (boardElement.id === 'computer-board') {
          cell.classList.add('computer-cell');
        }

        const cellContent = gameboard.board[x][y];
        if (cellContent === 'hit') {
          cell.classList.add('hit');
        } else if (cellContent === 'miss') {
          cell.classList.add('miss');
        } else if (showShips && cellContent instanceof Ship) {
          cell.classList.add('ship');
        }

        boardElement.appendChild(cell);
      }
    }
  }
}
