import dotenv from 'dotenv';
dotenv.config();

export const cacheConfig = {
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD || '',
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 12110,
};