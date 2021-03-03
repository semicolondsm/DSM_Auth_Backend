import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import * as dotenv from "dotenv";
import session from "express-session";
import cors from "cors";

import { Request, Response, NextFunction } from "express";
import { db } from "./models/index";
import dsmAuthRouter from "./routes";
import { HttpError } from "./middleware/errorHandler/customError";

dotenv.config({ path: path.join(__dirname, "../.env")});

const app: express.Application = express();

db.sequelize.sync({ force: false })
  .then(() => console.log("DATABASE CONNECTION"))
  .catch(console.error);

app.set("port", process.env.PORT || "8080");

app.use((req: Request, res: Response, next: NextFunction) => {
  morgan("dev")(req, res, next);
});

app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET!,
  resave: false,
  saveUninitialized: false,
}));

app.use("/", dsmAuthRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("sorry, cannot found");
});

app.use((err: HttpError, req: Request, res: Response) => {
  res.status(err.status || 500).json({ message: err.status !== 500 ? err.message : "" });
})

export default app;