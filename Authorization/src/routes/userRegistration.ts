import express from "express";
import { userSignUpController } from "../controller/userRegistration";
import { errorHandler } from "../middleware/errorHandler/errorHandler";

const router: express.Router = express.Router();

const checkOverlapIdRouter = errorHandler(userSignUpController.checkOverlapId);

router.post("/check/id", checkOverlapIdRouter);

export default router;