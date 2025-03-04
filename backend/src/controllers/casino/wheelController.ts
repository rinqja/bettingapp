import { Request, Response } from "express";
import { DatabaseService } from "../../services/DatabaseService";
import CasinoGame from "../../models/CasinoGame";

const dbService = new DatabaseService();

// Define wheel symbols and their properties
const WHEEL_SYMBOLS = [
  { symbol: "7️⃣", multiplier: 50, name: "SEVEN" },
  { symbol: "🎰", multiplier: 25, name: "BAR" },
  { symbol: "🔔", multiplier: 15, name: "BELL" },
  { symbol: "🍒", multiplier: 10, name: "CHERRY" },
  { symbol: "🍋", multiplier: 8, name: "LEMON" },
  { symbol: "🍊", multiplier: 6, name: "ORANGE" },
  { symbol: "🫐", multiplier: 4, name: "PLUM" },
  { symbol: "🍇", multiplier: 3, name: "GRAPE" },
];

export const spin = async (req: Request, res: Response) => {
  try {
    const { betAmount } = req.body;
    // @ts-ignore
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Validate user and bet amount
    const user = await dbService.users.findById(userId);
    if (!user || user.balance < betAmount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    // Create game record
    const gameId = `wheel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Deduct bet amount
    const updatedUser = await dbService.users.updateBalance(userId, -betAmount);

    // Create game record
    await CasinoGame.create({
      gameId,
      userId,
      gameType: "wheel",
      betAmount,
      status: "completed",
      createdAt: new Date(),
      completedAt: new Date()
    });

    res.json({
      success: true,
      gameId,
      newBalance: updatedUser?.balance
    });

  } catch (error) {
    console.error("[WHEEL-CONTROLLER] Error processing spin:", error);
    res.status(500).json({
      success: false,
      message: "Error processing spin",
    });
  }
};

function calculateWin(reels: string[], betAmount: number) {
  // Check if all symbols match
  const isWin = reels.every((symbol) => symbol === reels[0]);

  if (!isWin) {
    return { winAmount: 0, multiplier: 1 };
  }

  const winningSymbol = WHEEL_SYMBOLS.find((s) => s.symbol === reels[0]);
  const multiplier = winningSymbol?.multiplier || 1;
  const winAmount = betAmount * multiplier;

  return { winAmount, multiplier };
}
