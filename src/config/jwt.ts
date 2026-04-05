import 'dotenv/config';

export const jwtSecret = process.env.JWT_SECRET || 'change-this-secret';
export const jwtExpiry = process.env.JWT_EXPIRES_IN || '7d';
