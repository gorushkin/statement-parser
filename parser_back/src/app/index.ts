import express from 'express';
import cors from 'cors';
import formData from 'express-form-data';
import { router } from './router/routes';
import { TEMP_FILES_PATH } from '../helpers/config';

const app = express();

app.use(cors());
const options = {
  uploadDir: TEMP_FILES_PATH,
  autoClean: true,
};
app.use(formData.parse(options));
app.use('/', router);

export { app };
