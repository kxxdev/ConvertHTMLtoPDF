import { Response } from "express";

interface DownloadAsyncOptions {
  res: Response;
  path: string;
  filename: string;
}

const downloadAsync = ({
  res,
  path,
  filename = "file",
}: DownloadAsyncOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    res.download(path, filename, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export default downloadAsync;
