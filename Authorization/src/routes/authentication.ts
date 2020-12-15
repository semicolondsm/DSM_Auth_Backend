import express from "express";
import * as dsmAuthentication from "../controller/dsmAuthentication";;
import { errorHandler } from "../middleware/errorHandler/errorHandler";
import { BusinessLogic } from "../middleware/businessLogicInterface";

const router: express.Router = express.Router();

const dsmLoginRouter: BusinessLogic = errorHandler(dsmAuthentication.dsmLogin);
const provideTokenRouter: BusinessLogic = errorHandler(dsmAuthentication.provideToken);
const refreshTokenRouter: BusinessLogic = errorHandler(dsmAuthentication.refreshToken);

router.post("/login", dsmLoginRouter);
router.post("/token", provideTokenRouter);
router.get("/refresh", refreshTokenRouter);

export default router;