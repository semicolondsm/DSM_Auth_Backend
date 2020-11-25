import express from "express";

import userRegistrationRouter from "./userRegistration";
import consumerRouter from "./consumer";
import authenticationRouter from "./authentication";

const router: express.Router = express.Router();

router.use("/auth", userRegistrationRouter);
router.use("/consumer", consumerRouter);
router.use("/dsmauth", authenticationRouter);

export default router;