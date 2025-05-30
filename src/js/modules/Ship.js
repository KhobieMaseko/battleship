export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    if (!this.sunk) {
      this.hits += 1;
      if (this.hits >= this.length) {
        this.sunk = true;
      }
    }
  }

  isSunk() {
    return this.sunk;
  }
}
