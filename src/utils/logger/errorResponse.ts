import { Response } from "express";
import logger from "./logger";
import { HttpStatusCode, LoggerTypes } from "../../constants/constants";

interface ErrorResponseOptions {
  res: Response;
  code: HttpStatusCode;
  err: unknown;
  filename?: string | null;
  json?: boolean;
  loggerType?: LoggerTypes;
  startMemory?: number;
  startTime?: number;
}

const errorResponse = ({
  res,
  code,
  err,
  filename = null,
  json = false,
  loggerType = LoggerTypes.Info,
  startMemory,
  startTime,
}: ErrorResponseOptions): void => {
  let convertedInfo = "";
  if (startMemory && startTime) {
    const endMemory = process.memoryUsage().heapUsed;
    const endTime = Date.now();

    const memoryUsedMB = (endMemory - startMemory) / 1024 / 1024;
    const timeSpentMs = endTime - startTime;

    convertedInfo = `Файл ${filename}. Время: ${timeSpentMs} мс. Память: ${memoryUsedMB.toFixed(
      2
    )} MB. Ошибка: `;
  }

  switch (loggerType) {
    case LoggerTypes.Info:
      logger.info(`${convertedInfo}HTTP ${code} - ${err}`);
      return;
    case LoggerTypes.Warn:
      logger.warn(`${convertedInfo}HTTP ${code} - ${err}`);
      break;
    case LoggerTypes.Error:
      logger.error(`${convertedInfo}HTTP ${code} - ${err}`);
      break;
  }

  if (json) {
    res.status(code).json({ error: err });
  } else {
    res.status(code).send({ error: err });
  }
};

export default errorResponse;
