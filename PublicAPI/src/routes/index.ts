import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { provideInfo } from "../controller/provide.information";
import { errorHandler } from "../middleware/errorHandler/errorHandler";

const router: Router = Router();

const provideBasicInfoRouter = errorHandler(provideInfo.provideBasicInfo);

router.get("/info/basic", verifyToken, provideBasicInfoRouter);

export default router;