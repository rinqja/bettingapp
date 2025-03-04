export class ServiceMonitor {
  private static instance: ServiceMonitor;
  private metrics: Map<string, {
    success: number;
    failure: number;
    timing: number[];
  }> = new Map();

  private constructor() {}

  static getInstance(): ServiceMonitor {
    if (!ServiceMonitor.instance) {
      ServiceMonitor.instance = new ServiceMonitor();
    }
    return ServiceMonitor.instance;
  }

  recordOperation(service: string, operation: string, success: boolean, timeMs: number) {
    const key = `${service}:${operation}`;
    const current = this.metrics.get(key) || { success: 0, failure: 0, timing: [] };
    
    if (success) {
      current.success++;
    } else {
      current.failure++;
    }
    current.timing.push(timeMs);
    
    // Keep only last 100 timing measurements
    if (current.timing.length > 100) {
      current.timing.shift();
    }
    
    this.metrics.set(key, current);
  }

  getMetrics() {
    const result: Record<string, any> = {};
    this.metrics.forEach((value, key) => {
      const avgTiming = value.timing.reduce((a, b) => a + b, 0) / value.timing.length;
      result[key] = {
        success: value.success,
        failure: value.failure,
        avgTiming: Math.round(avgTiming),
        successRate: `${((value.success / (value.success + value.failure)) * 100).toFixed(2)}%`
      };
    });
    return result;
  }
}

export const monitor = ServiceMonitor.getInstance(); 