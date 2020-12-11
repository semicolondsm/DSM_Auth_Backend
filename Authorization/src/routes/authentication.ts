import express from "express";
import * as dsmAuthentication from "../controller/dsmAuthentication";;
import { errorHandler } from "../middleware/errorHandler/errorHandler";
import { BusinessLogic } from "../middleware/businessLogicInterface";

const router: express.Router = express.Router();

const dsmLoginRouter: BusinessLogic = errorHandler(dsmAuthentication.dsmLogin);

router.post("/login", dsmLoginRouter);

export default router;