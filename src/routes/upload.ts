import express, { NextFunction, Response, Request, Express } from "express";
import multer from "multer";
import unzipFile from "../utils/files/unzipFile";
import uniqid from "uniqid";
import getHtmlFilePathFromExtractedDir from "../utils/html/getHtmlFilePathFromExtractedDir";
import generatePdf from "../utils/pdf/generatePdf";
import {
  LoggerTypes,
  MAX_FILE_SIZE,
  UNZIPPED_PATH,
} from "../constants/constants";
import removeTempFiles from "../utils/files/removeTempFiles";
import logger from "../utils/logger/logger";
import zipValidationMiddleware from "../middleware/validateZipFile";
import { join } from "path";
import errorResponse from "../utils/logger/errorResponse";
import downloadAsync from "../utils/files/downloadAsync";
import clearFilename from "../utils/strings/clearFilename";

const bufferOriginalname = (originalname: string): string => {
  return Buffer.from(originalname, "latin1").toString("utf8");
};

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${uniqid()}-${bufferOriginalname(file.originalname)}`);
  },
});

const uploadRouter = express.Router();

uploadRouter.post(
  "/",
  multer({
    storage: storageConfig,
  }).single("filedata"),
  zipValidationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const startMemory = process.memoryUsage().heapUsed;
    const startTime = Date.now();
    try {
      if (!req.file) {
        throw "Ошибка при загрузке файла";
      }

      const originalFilename = bufferOriginalname(
        clearFilename(req.file.originalname)
      );
      const uniqFilename = clearFilename(req.file.filename);

      unzipFile(uniqFilename);

      const htmlFilePath = getHtmlFilePathFromExtractedDir(
        join(UNZIPPED_PATH, uniqFilename)
      );

      if (!htmlFilePath) {
        throw "Не найден HTML файл в архиве";
      }

      const pdfPath = await generatePdf(htmlFilePath, uniqFilename);

      await downloadAsync({ res, path: pdfPath, filename: originalFilename });

      removeTempFiles(uniqFilename);

      const endMemory = process.memoryUsage().heapUsed;
      const endTime = Date.now();

      const memoryUsedMB = (endMemory - startMemory) / 1024 / 1024;
      const timeSpentMs = endTime - startTime;

      logger.info(
        `Файл ${originalFilename} сконвертирован. Время: ${timeSpentMs} мс. Память: ${memoryUsedMB.toFixed(
          2
        )} MB`
      );
    } catch (err) {
      if (req.file) {
        removeTempFiles(bufferOriginalname(req.file.filename));
      }
      errorResponse({
        res,
        code: 500,
        err,
        filename: req.file ? bufferOriginalname(req.file.filename) : null,
        startMemory: startMemory,
        startTime: startTime,
        json: true,
        loggerType: LoggerTypes.Error,
      });
    }
  }
);

export default uploadRouter;
