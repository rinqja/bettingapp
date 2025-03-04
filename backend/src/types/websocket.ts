import { WebSocket } from 'ws';

export interface WebSocketMessage {
  type: string;
  action: string;
  data: any;
  payload: any;
}

export interface WebSocketClient extends WebSocket {
  userId?: string;
  isAlive?: boolean;
  isAuthenticated?: boolean;
} 