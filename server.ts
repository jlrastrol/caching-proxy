import express from 'express';
import Cache from './cache';
import {proxyMiddleware} from './proxy'; 

export const startServer = async (port: number, origin: string) => {
    const app = express();
    
    app.use((req, res, next) => {
        proxyMiddleware(origin)(req, res, next).catch(next);
    })

    app.listen(port, () => {
        console.log(`Server is running on port ${port} with origin ${origin}`);
    });

}

export const clearCache = async () => {
    console.log('Clearing proxy cache...');
    const cache = new Cache();
    await cache.connect();
    await cache.clear();
    await cache.disconnect();
    console.log('Cache cleared successfully.');
    
}