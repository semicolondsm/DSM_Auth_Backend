import express from "express";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import * as dotenv from "dotenv";

import { Request, Response, NextFunction } from "express";
import dsmAPIRouter from "./routes/index";

dotenv.config({ path: path.join(__dirname, ".env") });

const app: express.Application = express();

app.set("port", process.env.PORT || "8090");

app.use(morgan<Request, Response>("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", dsmAPIRouter);

app.listen(app.get("port"), () => {
  console.log("server on ", app.get("port"));
});