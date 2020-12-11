import redis from "redis";
import * as dotenv from "dotenv";
import path from "path";
import { promisify } from "util";

dotenv.config({ path: path.join(__dirname, "../.env") });

const redisClient: redis.RedisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

const asyncRedistGet: (email: string) => Promise<string | null> = promisify(redisClient.get).bind(redisClient);

export default redisClient;
export { asyncRedistGet };