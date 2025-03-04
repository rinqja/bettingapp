class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;
  private messageQueue: any[] = [];
  private handlers: Map<string, Function[]> = new Map();
  private pingInterval: number | null = null;
  private isConnecting: boolean = false;
  private isAuthenticated: boolean = false;

  constructor() {
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5000';
    this.connect(`${wsUrl}/ws`); // Add /ws path
  }

  private connect(wsUrl: string) {
    if (this.isConnecting) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token available, skipping connection');
        return;
      }

      this.isConnecting = true;
      
      // Send token in headers instead of URL
      this.ws = new WebSocket(wsUrl);
      
      // Set token in connection handshake
      this.ws.onopen = () => {
        this.ws?.send(JSON.stringify({
          action: 'authenticate',
          data: { token }
        }));
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === 'auth' && message.success) {
            console.log('Authentication confirmed');
            this.isAuthenticated = true;
            this.reconnectAttempts = 0;
            this.isConnecting = false;
            this.processMessageQueue();
          }

          this.handleMessage(message);
        } catch (error) {
          console.error('Message parsing error:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });
        
        this.isAuthenticated = false;
        this.isConnecting = false;
        
        if (this.pingInterval) {
          clearInterval(this.pingInterval);
          this.pingInterval = null;
        }

        if (event.code !== 1000 && event.code !== 1001) {
          this.handleDisconnect(wsUrl);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnecting = false;
      };

    } catch (error) {
      console.error('Connection error:', error);
      this.isConnecting = false;
    }
  }

  private handleDisconnect(wsUrl: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectTimeout * Math.pow(2, this.reconnectAttempts - 1);
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    setTimeout(() => {
      this.connect(wsUrl);
    }, delay);
  }

  private processMessageQueue() {
    console.log('Processing message queue:', this.messageQueue.length, 'messages');
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message && this.ws?.readyState === WebSocket.OPEN) {
        console.log('Sending queued message:', message);
        this.ws.send(message);
      }
    }
  }

  private handleMessage(message: any) {
    console.log('Handling WebSocket message:', message);
    const callbacks = this.handlers.get(message.type);
    if (callbacks) {
      callbacks.forEach(callback => callback(message.data));
    }
  }

  public send(action: string, data: any) {
    const message = JSON.stringify({ action, data });
    
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  public on(action: string, callback: Function) {
    if (!this.handlers.has(action)) {
      this.handlers.set(action, []);
    }
    this.handlers.get(action)?.push(callback);
  }

  public off(action: string) {
    // Remove all handlers for this action
    this.handlers.delete(action);
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Create a single instance
export const wsService = new WebSocketService();

// Default export for backwards compatibility
export default wsService; 