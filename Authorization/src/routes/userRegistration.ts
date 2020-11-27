import express from "express";
import * as userRegistration from "../controller/userRegistration";
import { errorHandler } from "../middleware/errorHandler/errorHandler";

const router: express.Router = express.Router();

const checkOverlapIdRouter = errorHandler(userRegistration.checkOverlapId);
const emailAuthenticationRouter = errorHandler(userRegistration.emailAuthentication);

router.post("/check/id", checkOverlapIdRouter);
router.post("/email", emailAuthenticationRouter);

export default router;