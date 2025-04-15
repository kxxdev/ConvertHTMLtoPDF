import fs = require("fs");
import {
  LOGS_PATH,
  OUTPUT_PATH,
  UNZIPPED_PATH,
  ZIP_PATH,
} from "../../constants/constants";

const checkDirs = () => {
  if (!fs.existsSync(LOGS_PATH)) {
    fs.mkdirSync(LOGS_PATH);
  }

  if (!fs.existsSync(ZIP_PATH)) {
    fs.mkdirSync(ZIP_PATH);
  }

  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH);
  }

  if (!fs.existsSync(UNZIPPED_PATH)) {
    fs.mkdirSync(UNZIPPED_PATH);
  }
};

export default checkDirs;
