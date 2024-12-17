import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { config, logger } from "../config";
import CustomError from "../helpers/CustomError";

export const errorConverter = (
  err: any,
  _req: Request,
  __res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof CustomError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new CustomError(statusCode, message as string, true, err.stack);
  }
  next(error);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (config.APP_ENV === "development" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.APP_ENV !== "development" && { stack: err.stack }),
  };

  if (config.APP_ENV !== "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
