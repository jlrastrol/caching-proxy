import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import Cache from './cache';

export const proxyMiddleware = (origin: string) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        const url = `${origin}${req.url}`
        const key = `${req.method}:${req.url}`
        const cache = new Cache();
        cache.connect()
        const cachedResponse = await cache.get(key);

        if (cachedResponse) {
            console.log(`Cache hit for ${key}`);
            res.set('X-Cache', 'HIT');
            await cache.disconnect()
            return res.send(cachedResponse);
        }
        try {
            res.set('X-Cache', 'MISS');
            const response = await axios.get(url)
            await cache.set(key, JSON.stringify(response.data)); 
            await cache.disconnect()
            return res.send(response.data);
        } catch (error) {
            await cache.disconnect()
            console.error(`Error fetching from ${url}:`, error);
            res.status(500).send('Internal Server Error');
        }
    }
}