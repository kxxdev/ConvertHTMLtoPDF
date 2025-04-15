import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { OUTPUT_PATH } from "../../constants/constants";
import updateHtmlContent from "./updateHtmlContent";

const saveTempHtml = (htmlPath: string, fileName: string): string => {
  const htmlContent = readFileSync(htmlPath, "utf-8");
  const updatedHtmlContent = updateHtmlContent(htmlPath, htmlContent);
  const tempHtmlPath = resolve(OUTPUT_PATH, `${fileName}_temp.html`);

  writeFileSync(tempHtmlPath, updatedHtmlContent, "utf-8");

  return `file:///${tempHtmlPath.replace(/\\/g, "/")}`;
};

export default saveTempHtml;
