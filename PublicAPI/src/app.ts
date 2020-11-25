import express from "express";
import path from "path";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import morgan from "morgan";
const cors = require("cors");

import { Request, Response, NextFunction } from "express";
import dsmAPIRouter from "./routes/index";
import { db } from "./models/index";

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

db.sequelize.sync({ force: false })
  .then(() => console.log("DATABASE CONNECTION"))
  .catch(console.error);

app.set("port", process.env.PORT || "8090");

app.use((req: Request, res: Response, next: NextFunction) => {
  morgan("dev")(req, res, next);
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/v1", dsmAPIRouter);
app.use((req: Request, res: Response) => {
  res.end();
});

app.listen(app.get("port"), () => {
  console.log("server on ", app.get("port"));
});