import AdmZip from "adm-zip";
import { join } from "path";
import { UNZIPPED_PATH, ZIP_PATH } from "../../constants/constants";

const unzipFile = (filename: string): void => {
  try {
    const zip = new AdmZip(join(ZIP_PATH, `${filename}.zip`));
    zip.extractAllTo(join(UNZIPPED_PATH, filename), true);
  } catch (err) {
    throw `Ошибка при распаковке архива: ${err}`;
  }
};

export default unzipFile;
