import express from "express";
import winston from "winston";

const app = express();

// Create a Winston logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(),
  ],
});

// Simulated service that throws an error
function riskyService(orderId) {
  if (isNaN(orderId)) {
    const error = new Error("Order ID must be a number");
    error.code = "INVALID_ORDER_ID";
    throw error;
  }
  // Simulate other operations...
  return `Order ${orderId} processed successfully`;
}

// Route that calls the risky service
app.get("/process-order/:orderId", (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    logger.info(`Received request to process order ${orderId}`);

    const result = riskyService(orderId); // Call the risky service
    res.send(result);
  } catch (err) {
    // Add context before passing the error to the top-level error handler
    err.context = `Processing order context: ${req.params.orderId}`;
    next(err);
  }
});

// Middleware for logging errors at a high level
app.use((err, req, res, next) => {
  logger.error(`Error caught at top level: ${err.message}`, {
    code: err.code,
    context: err.context,
  });
  res.status(500).json({ error: "Something went wrong!" });
});

export { app, logger };
