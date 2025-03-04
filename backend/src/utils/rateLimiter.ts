export class RateLimiter {
  private static requests: Map<string, number[]> = new Map();
  private static readonly WINDOW_MS = 60 * 1000; // 1 minute
  private static readonly MAX_REQUESTS = 10; // Max requests per minute

  static async checkRateLimit(key: string): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - this.WINDOW_MS;
    
    // Get existing timestamps for this key
    let timestamps = this.requests.get(key) || [];
    
    // Remove old timestamps
    timestamps = timestamps.filter(time => time > windowStart);
    
    // Check if we're at the limit
    if (timestamps.length >= this.MAX_REQUESTS) {
      return false;
    }
    
    // Add new timestamp
    timestamps.push(now);
    this.requests.set(key, timestamps);
    
    return true;
  }

  static async waitForRateLimit(key: string): Promise<void> {
    while (!(await this.checkRateLimit(key))) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
} 