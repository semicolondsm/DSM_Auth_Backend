import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("dsmAPI server");
});

export default router;