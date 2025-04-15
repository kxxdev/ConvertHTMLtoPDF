import { NextFunction, Request, Response } from "express";
import path from "path";
import logger from "../utils/logger/logger";
import removeTempFiles from "../utils/files/removeTempFiles";

const zipValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.file) {
    res.status(400).json({ error: "Файл не был загружен" });
    return;
  }

  const fileExtname = path.extname(req.file.filename).toLowerCase();

  if (fileExtname !== ".zip") {
    console.log(fileExtname);
    logger.warn("Файл не является ZIP архивом");
    removeTempFiles(req.file.filename);
    res.status(400).json({
      error: "Файл не является ZIP-архивом, пожалуйста загрузите ZIP архив",
    });
    return;
  }

  next();
};

export default zipValidationMiddleware;
