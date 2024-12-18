import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import httpStatus from "http-status";
import { morganErrorHandler, morganSuccessHandler } from "./config";
import CustomError from "./helpers/CustomError";
import { errorConverter, errorHandler } from "./middleware";
import routes from "./routes";

const app: Application = express();

// Middleware
app.use(morganSuccessHandler);
app.use(morganErrorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res
    .status(httpStatus.OK)
    .json({ status: "OK", message: "Server is running" });
});

// Routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new CustomError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
