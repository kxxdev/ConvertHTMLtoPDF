import { resolve } from "path";

export const ZIP_PATH = resolve(process.cwd(), "uploads");
export const UNZIPPED_PATH = resolve(process.cwd(), "uploads/unzipped");
export const OUTPUT_PATH = resolve(process.cwd(), "uploads/results");
export const LOGS_PATH = resolve(process.cwd(), "logs");

export const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024;

export enum HttpStatusCode {
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

export enum LoggerTypes {
  Error = "error",
  Info = "info",
  Warn = "warn",
}
