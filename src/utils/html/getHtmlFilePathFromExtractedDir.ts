import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

const getHtmlFilePathFromExtractedDir = (folderPath: string): string | null => {
  const files = readdirSync(folderPath);

  if (!files) {
    throw "Архив оказался пустым";
  }

  const htmlFile = files.find(
    (file) => extname(file).toLowerCase() === ".html"
  );

  if (htmlFile) return join(folderPath, htmlFile);

  for (const file of files) {
    const fullPath = join(folderPath, file);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      const htmlFile = getHtmlFilePathFromExtractedDir(fullPath);
      if (htmlFile) {
        return htmlFile;
      }
    }
  }

  return null;
};

export default getHtmlFilePathFromExtractedDir;
