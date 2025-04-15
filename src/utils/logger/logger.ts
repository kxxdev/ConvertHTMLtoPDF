import { join } from "path";
import winston, { format, transports } from "winston";
import { LOGS_PATH } from "../../constants/constants";

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: join(LOGS_PATH, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: join(LOGS_PATH, "combined.log"),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
