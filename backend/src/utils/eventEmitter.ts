import { EventEmitter } from 'events';

class MatchEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(20); // Increase if needed
  }
}

export const eventEmitter = new MatchEventEmitter();

// Add listener for match settlement
eventEmitter.on('matchSettled', async (data) => {
  try {
    console.log('Match settled event received:', data);
    // Here you can add additional logic for bet settlement
    // For example, trigger bet settlement process
  } catch (error) {
    console.error('Error processing match settled event:', error);
  }
}); 