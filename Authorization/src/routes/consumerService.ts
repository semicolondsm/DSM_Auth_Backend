import express from "express";
import { BusinessLogic } from "../middleware/businessLogicInterface";
import { verifyToken } from "../middleware/verifyToken";
import { errorHandler } from "../middleware/errorHandler/errorHandler";
import * as consumerService from "../controller/consumerService";

const router: express.Router = express.Router();

const consumerRegistrationRouter: BusinessLogic = errorHandler(consumerService.consumerRegstration);

router.post("/registration", verifyToken, consumerRegistrationRouter);

export default router;