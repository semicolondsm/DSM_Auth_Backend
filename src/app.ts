import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";

import { Request, Response, NextFunction } from "express";

dotenv.config();

const app: express.Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  morgan("dev")(req, res, next);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const allowOrigins: string[] = [process.env.ALLOW_ORIGINS1 as string];
  const origin: string = req.headers.origin as string;
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
  secret: process.env.COOKIE_SECRET as string,
  resave: false,
  saveUninitialized: false,
}));

app.listen(process.env.PORT, () => {
  console.log("server on ", process.env.PORT);
});