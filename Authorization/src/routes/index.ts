import express, { Request, Response, NextFunction } from "express";

const router: express.Router = express.Router();

router.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("dsm_auth api server");
});

export default router;