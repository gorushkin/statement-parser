import express, { Express } from 'express';
import cors from 'cors';
import formData from 'express-form-data';
import { join } from 'path';
import { DB } from './db';
import { dbPath } from './constants';
import { checkFilesPath } from './until';
import { router } from './routes';
import pino from 'pino';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export const db = new DB();
db.init(dbPath);

const app = express();

const PORT = 3000;
const tempFilesPath = join(process.cwd(), 'files');

const init = async (app: Express, tempFilesPath: string, port: number) => {
  await checkFilesPath(tempFilesPath);
  logger.info(`Temp files dir exist`);
  app.use(cors());
  const options = {
    uploadDir: tempFilesPath,
    autoClean: true,
  };
  app.use(formData.parse(options));
  app.use('/', router);
  app.listen(3000, () => {
    logger.info(`Server started on port ${port}`);
  });
};

init(app, tempFilesPath, PORT);
