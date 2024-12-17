import mongoose from "mongoose";
import app from "./app";
import { config, logger } from "./config";

// Log MongoDB URI and connection attempt
logger.debug(config.MONGO_URI);
logger.info("Connecting to the database...");

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("Mongoose connection established");
    app.listen(config.PORT, () => {
      logger.info(`Server listening on port ${config.PORT}`);
    });
  })
  .catch((e) => {
    logger.error("Mongoose connection error");
    logger.error(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  logger.debug("Mongoose default connection is open to " + config.MONGO_URI);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  logger.error("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose default connection disconnected");
});

// Catch uncaught exceptions and log
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception: " + err);
  setTimeout(() => process.exit(1), 100); // Graceful shutdown on uncaught exception
});
