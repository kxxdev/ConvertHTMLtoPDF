import puppeteer from "puppeteer";
import { join } from "path";
import { OUTPUT_PATH } from "../../constants/constants";
import saveTempHtml from "../html/saveTempHtml";

const generatePdf = async (
  htmlPath: string,
  fileName: string
): Promise<string> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const tempHtmlPath = saveTempHtml(htmlPath, fileName);
  const outputPdfPath = join(OUTPUT_PATH, `${fileName}.pdf`);

  await page.goto(tempHtmlPath, { waitUntil: "networkidle0" });
  await page.emulateMediaType("screen");

  await page.pdf({
    path: outputPdfPath,
    printBackground: true,
    format: "A4",
  });

  await browser.close();

  return outputPdfPath;
};

export default generatePdf;
