import express from "express";
import { BusinessLogic } from "../middleware/businessLogicInterface";
import { verifyToken } from "../middleware/verifyToken";
import { errorHandler } from "../middleware/errorHandler/errorHandler";
import * as consumerService from "../controller/consumerService";

const router: express.Router = express.Router();

const consumerRegistrationRouter: BusinessLogic = errorHandler(consumerService.consumerRegstration);
const provideConsumerListRouter: BusinessLogic = errorHandler(consumerService.provideConsumerList);

router.post("/registration", verifyToken, consumerRegistrationRouter);
router.get("/list", provideConsumerListRouter);

export default router;