import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler.js";
import { ControllerType } from "../types/types.js";

export async function errorMiddleware(
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.message ||= "Internal Server Error.";
  err.statusCode ||= 500;

  return res.status(400).json({ message: err.message, success: false });
}

export const tryCatch = (func: ControllerType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};
