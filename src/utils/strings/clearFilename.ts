const clearFilename = (filename: string): string => {
  return filename.replace(/\.zip$/i, "");
};

export default clearFilename;
