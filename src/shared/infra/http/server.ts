import "reflect-metadata";
import express, { Response, Request, NextFunction } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";

import swaggerFile from "../../../swagger.json";
import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "Error!",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is running!"));
