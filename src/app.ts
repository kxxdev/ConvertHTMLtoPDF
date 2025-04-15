import express from "express";
import uploadRouter from "./routes/upload";
import logger from "./utils/logger/logger";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";
import checkDirs from "./utils/files/checkDirs";

checkDirs();

const app = express();
const port = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/upload", uploadRouter);

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
