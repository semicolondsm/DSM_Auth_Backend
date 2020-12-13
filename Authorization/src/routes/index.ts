import express from "express";

import userRegistrationRouter from "./userRegistrationService";
import consumerRouter from "./consumerService";
import authenticationRouter from "./authentication";
import { userServices } from "../controller/userService";

import { verifyToken } from "../middleware/verifyToken";

const router: express.Router = express.Router();

router.use("/auth", userRegistrationRouter);
router.use("/consumer", consumerRouter);
router.use("/dsmauth", authenticationRouter);
router.get("/myservice", verifyToken, userServices);

export default router;