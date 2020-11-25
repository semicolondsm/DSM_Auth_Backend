import { BusinessLogic, CustomRequest, CustomResponse, NextFunction } from "../businessLogicInterface";

const errorHandler = (myFunc: BusinessLogic): BusinessLogic => {
  return async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
    try {
      await myFunc(req, res, next);
    } catch(err) {
      console.log(err);
      res.status(err.status || 500).json({
        code: err.status || 500,
        message: err.message || "Interval Server Error",
      });
    }
  }
}

export {
  errorHandler
}