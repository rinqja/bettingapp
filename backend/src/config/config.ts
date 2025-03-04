import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  oddsApiKey: process.env.ODDS_API_KEY,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sportodds',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  allowedOrigins: (process.env.FRONTEND_URLS || '').split(','),
  isDevelopment: process.env.NODE_ENV === 'development'
};

// Validate required environment variables
const requiredEnvVars = ['ODDS_API_KEY', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} environment variable is not set`);
  }
}

export default config; 