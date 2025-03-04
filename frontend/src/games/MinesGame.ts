export class MinesGame {
  private grid: Array<{ position: number; isMine: boolean; revealed: boolean }>;
  private betAmount: number;
  private minesCount: number;
  private currentMultiplier: number;
  private revealedCount: number;
  private gameOver: boolean;

  constructor(betAmount: number, minesCount: number) {
    this.betAmount = betAmount;
    this.minesCount = minesCount;
    this.currentMultiplier = 1;
    this.revealedCount = 0;
    this.gameOver = false;
    this.grid = this.initializeGrid();
  }

  private initializeGrid() {
    // Create empty grid
    const grid = Array(25).fill(null).map((_, index) => ({
      position: index,
      isMine: false,
      revealed: false
    }));

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < this.minesCount) {
      const position = Math.floor(Math.random() * 25);
      if (!grid[position].isMine) {
        grid[position].isMine = true;
        minesPlaced++;
      }
    }

    return grid;
  }

  public revealTile(position: number) {
    if (this.gameOver || this.grid[position].revealed) {
      return null;
    }

    this.grid[position].revealed = true;

    if (this.grid[position].isMine) {
      this.gameOver = true;
      return {
        isMine: true,
        currentMultiplier: this.currentMultiplier,
        currentProfit: 0,
        gameOver: true,
        grid: this.grid
      };
    }

    this.revealedCount++;
    this.updateMultiplier();

    return {
      isMine: false,
      currentMultiplier: this.currentMultiplier,
      currentProfit: this.calculateProfit(),
      gameOver: false,
      grid: this.grid
    };
  }

  private updateMultiplier() {
    // Calculate new multiplier based on revealed tiles and mines count
    const safeSpots = 25 - this.minesCount;
    const remainingSafeSpots = safeSpots - this.revealedCount;
    this.currentMultiplier = safeSpots / remainingSafeSpots;
  }

  public calculateProfit(): number {
    return this.betAmount * this.currentMultiplier;
  }

  public getState() {
    return {
      grid: this.grid,
      currentMultiplier: this.currentMultiplier,
      currentProfit: this.calculateProfit(),
      gameOver: this.gameOver,
      revealedCount: this.revealedCount
    };
  }
} 