import express from "express";
import * as userRegistration from "../controller/userService";
import { errorHandler } from "../middleware/errorHandler/errorHandler";

const router: express.Router = express.Router();

const checkOverlapIdRouter = errorHandler(userRegistration.checkOverlapId);
const emailAuthenticationRouter = errorHandler(userRegistration.emailAuthentication);
const userSinupRouter = errorHandler(userRegistration.userSignup);

router.post("/check/id", checkOverlapIdRouter);
router.post("/email", emailAuthenticationRouter);
router.post("/signup", userSinupRouter);

export default router;