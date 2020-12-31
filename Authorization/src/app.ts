import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import * as dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import connect_redis from "connect-redis";
import redisClient from "./redisClient";

import { Request, Response, NextFunction } from "express";
import { db } from "./models/index";
import dsmAuthRouter from "./routes";

dotenv.config({ path: path.join(__dirname, "../.env")});

const RedisStore: connect_redis.RedisStore = connect_redis(session);

const app: express.Application = express();

db.sequelize.sync({ force: false })
  .then(() => console.log("DATABASE CONNECTION"))
  .catch(console.error);

app.set("port", process.env.PORT || "8080");

app.use((req: Request, res: Response, next: NextFunction) => {
  morgan("dev")(req, res, next);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const allowOrigins: string[] = [process.env.ALLOW_ORIGINS1!, process.env.ALLOW_ORIGINS2!];
  const origin: string = req.headers.origin!;
  if(allowOrigins.includes(origin)) {
    return cors({
      origin,
      credentials: true,
    })(req, res, next);
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
}));

app.use("/", dsmAuthRouter);

export default app;