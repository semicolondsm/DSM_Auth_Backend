import express from "express";
import { userSignUpController } from "../controller/userRegistration";
import { errorHandler } from "../middleware/errorHandler/errorHandler";

const router: express.Router = express.Router();

const checkOverlapIdRouter = errorHandler(userSignUpController.checkOverlapId);
const emailAuthenticationRouter = errorHandler(userSignUpController.emailAuthentication);

router.post("/check/id", checkOverlapIdRouter);
router.post("/email", emailAuthenticationRouter);

export default router;