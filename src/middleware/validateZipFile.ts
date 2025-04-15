import { NextFunction, Request, Response } from "express";
import path from "path";
import logger from "../utils/logger/logger";
import removeTempFiles from "../utils/files/removeTempFiles";
import errorResponse from "../utils/logger/errorResponse";
import { LoggerTypes, MAX_FILE_SIZE } from "../constants/constants";

const zipValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.file) {
    errorResponse({
      res,
      code: 400,
      err: "Файл не был загружен",
      json: true,
      loggerType: LoggerTypes.Error,
    });
    return;
  }

  const fileExtname = path.extname(req.file.filename).toLowerCase();

  if (fileExtname !== ".zip") {
    errorResponse({
      res,
      code: 400,
      err: "Файл не является ZIP-архивом",
      json: true,
      loggerType: LoggerTypes.Error,
    });

    removeTempFiles(req.file.filename);
    return;
  }

  if (req.file.size > MAX_FILE_SIZE) {
    errorResponse({
      res,
      code: 400,
      err: `Файл превышает максимально допустимый объем ${(
        MAX_FILE_SIZE /
        1024 /
        1024 /
        1024
      ).toFixed(2)} ГБ`,
      json: true,
      loggerType: LoggerTypes.Error,
    });

    removeTempFiles(req.file.filename);
    return;
  }

  next();
};

export default zipValidationMiddleware;
