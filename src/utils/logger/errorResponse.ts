import { Response } from "express";
import logger from "./logger";
import { HttpStatusCode, LoggerTypes } from "../../constants/constants";

interface ErrorResponseOptions {
  res: Response;
  code: HttpStatusCode;
  err: unknown;
  json?: boolean;
  loggerType?: LoggerTypes;
}

const errorResponse = ({
  res,
  code,
  err,
  json = false,
  loggerType = LoggerTypes.Info,
}: ErrorResponseOptions): void => {
  switch (loggerType) {
    case LoggerTypes.Info:
      logger.info(`HTTP ${code} - ${err}`);
      return;
    case LoggerTypes.Warn:
      logger.warn(`HTTP ${code} - ${err}`);
      break;
    case LoggerTypes.Error:
      logger.error(`HTTP ${code} - ${err}`);
      break;
  }

  if (json) {
    res.status(code).json({ error: err });
  } else {
    res.status(code).send({ error: err });
  }
};

export default errorResponse;
