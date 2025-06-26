import { createClient, RedisClientType } from "redis";
import { cacheConfig } from "./config";       

class Cache {
    private client: RedisClientType;
    
    constructor() {
        this.client = createClient({username: cacheConfig.username,
            password: cacheConfig.password,
            socket: {
                host: cacheConfig.host,
                port: cacheConfig.port
            }});
        this.client.on("error", (err) => console.error("Redis Client Error", err));
    }
    
    async connect() {
        await this.client.connect();
        console.log("Connected to Redis");
    }
    
    async disconnect() {
        await this.client.quit();
    }
    
    async set(key: string, value: string, ttl?: number) {
        if (ttl) {
        await this.client.setEx(key, ttl, value);
        } else {
        await this.client.set(key, value);
        }
    }
    
    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }
    
    async del(key: string) {
        await this.client.del(key);
    }

    async clear() {
        await this.client.flushAll();
    }
}

export default Cache;
