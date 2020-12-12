import { CustomRequest, CustomResponse, BusinessLogic, NextFunction } from "../businessLogicInterface";

const errorHandler = (myFunc: BusinessLogic): BusinessLogic => {
  return async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
    try {
      await myFunc(req, res, next);
    } catch(err) {
      console.log(err);
      res.status(err.status || 500).json({
        code:  err.responseMessage || err.status || 500,
        message: err.message || "Interval Server Error",
      });
    }
  }
}

export { errorHandler }