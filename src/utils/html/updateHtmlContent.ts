import { dirname, resolve } from "path";

const updateHtmlContent = (htmlPath: string, htmlContent: string): string => {
  const dirPath = dirname(htmlPath);

  const replaceRelativePaths = (content: string, attr: "href" | "src") => {
    const regex = new RegExp(`${attr}="(.+?)"`, "g");

    return content.replace(regex, (match, relPath) => {
      if (relPath.startsWith("http")) {
        return match;
      }

      const fullPath = `file:///${resolve(dirPath, relPath).replace(
        /\\/g,
        "/"
      )}`;
      return `${attr}="${fullPath}"`;
    });
  };

  let updatedContent = htmlContent;
  updatedContent = replaceRelativePaths(updatedContent, "href");
  updatedContent = replaceRelativePaths(updatedContent, "src");

  return updatedContent;
};

export default updateHtmlContent;
