// Simple in-memory lock implementation
export class LockService {
  private static locks: Map<string, number> = new Map();

  static async acquireLock(key: string, ttlMs: number = 4 * 60 * 1000): Promise<boolean> {
    const now = Date.now();
    const existingLock = this.locks.get(key);

    // If lock exists and hasn't expired
    if (existingLock && existingLock > now) {
      return false;
    }

    // Set or update lock
    this.locks.set(key, now + ttlMs);
    return true;
  }

  static releaseLock(key: string): void {
    this.locks.delete(key);
  }
} 