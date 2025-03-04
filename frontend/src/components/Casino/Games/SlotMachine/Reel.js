import Symbol from "./Symbol";

export default class Reel {
  constructor(symbols) {
    this.symbols = symbols;
    this.currentSymbols = this.generateRandomSymbols();
  }

  generateRandomSymbols() {
    return Array(3)
      .fill(null)
      .map(() => this.getRandomSymbol());
  }

  getRandomSymbol() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  spin() {
    this.currentSymbols = this.generateRandomSymbols();
  }
}
