/**
 * Defines server and middleware.
 */

import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { isHttpError } from "http-errors";
import taskRoutes from "src/routes/task";
import tasksRoutes from "src/routes/tasks"; // add this line
import userRoutes from "src/routes/user";

const app = express();

// initializes Express to accept JSON in the request/response body
app.use(express.json());

// sets the "Access-Control-Allow-Origin" header on all responses to allow
// requests from the frontend, which has a different origin - see the following
// pages for more info:
// https://expressjs.com/en/resources/middleware/cors.html
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  }),
);

app.use("/api/task", taskRoutes);
app.use("/api/tasks", tasksRoutes); // add this line
app.use("/api/user", userRoutes);

/**
 * Error handler; all errors thrown by server are handled here.
 * Explicit typings required here because TypeScript cannot infer the argument types.
 *
 * An eslint-disable is being used below because the "next" argument is never used. However,
 * it is still required for Express to recognize it as an error handler. For this reason, I've
 * disabled the eslint error. This should be used sparingly and only in situations where the lint
 * error cannot be fixed in another way.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  // 500 is the "internal server error" error code, this will be our fallback
  let statusCode = 500;
  let errorMessage = "An error has occurred.";

  // check is necessary because anything can be thrown, type is not guaranteed
  if (isHttpError(error)) {
    // error.status is unique to the http error class, it allows us to pass status codes with errors
    statusCode = error.status;
    errorMessage = error.message;
  }
  // prefer custom http errors but if they don't exist, fallback to default
  else if (error instanceof Error) {
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
