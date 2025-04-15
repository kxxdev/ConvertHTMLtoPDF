import { existsSync, rmSync } from "fs";
import { resolve, join } from "path";
import {
  OUTPUT_PATH,
  UNZIPPED_PATH,
  ZIP_PATH,
} from "../../constants/constants";

const getAbsolutePath = (subDir: string, fileName: string): string => {
  return resolve(join(subDir, fileName));
};

const removeTempFiles = (fileName: string | undefined) => {
  if (!fileName) return;

  const unzippedPath = getAbsolutePath(UNZIPPED_PATH, fileName);
  const zipPath = getAbsolutePath(ZIP_PATH, fileName);
  const resultPath = getAbsolutePath(OUTPUT_PATH, `${fileName}.pdf`);
  const tempHTMLPath = getAbsolutePath(OUTPUT_PATH, `${fileName}_temp.html`);
  if (existsSync(unzippedPath)) {
    rmSync(unzippedPath, { recursive: true, force: true });
  }
  if (existsSync(zipPath)) {
    rmSync(zipPath);
  }
  if (existsSync(resultPath)) {
    rmSync(resultPath);
  }
  if (existsSync(tempHTMLPath)) {
    rmSync(tempHTMLPath);
  }
};

export default removeTempFiles;
