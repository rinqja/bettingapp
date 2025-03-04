// Payline patterns where each array represents symbol positions (0=top, 1=middle, 2=bottom)
export const PAYLINE_PATTERNS: number[][] = [
  [1, 1, 1, 1, 1], // Middle horizontal
  [0, 0, 0, 0, 0], // Top horizontal
  [2, 2, 2, 2, 2], // Bottom horizontal
  [0, 1, 2, 1, 0], // V shape
  [2, 1, 0, 1, 2], // Inverted V
  [1, 0, 0, 0, 1], // Top curve
  [1, 2, 2, 2, 1], // Bottom curve
  [0, 1, 1, 1, 0], // Top small V
  [2, 1, 1, 1, 2], // Bottom small V
];

// Symbol configuration
export const SYMBOLS = {
  SEVEN: { name: 'SEVEN', emoji: '7️⃣', value: 100 },
  BAR: { name: 'BAR', emoji: '🎰', value: 50 },
  BELL: { name: 'BELL', emoji: '🔔', value: 25 },
  CHERRY: { name: 'CHERRY', emoji: '🍒', value: 15 },
  LEMON: { name: 'LEMON', emoji: '🍋', value: 10 },
  ORANGE: { name: 'ORANGE', emoji: '🍊', value: 8 },
  PLUM: { name: 'PLUM', emoji: '🫐', value: 5 },
  GRAPE: { name: 'GRAPE', emoji: '🍇', value: 3 },
} as const; 