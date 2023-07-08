import express from 'express';
import cors from 'cors';
import formData from 'express-form-data';
import { tempFilesPath } from '../helpers/constants';
import { router } from './router/routes';

const app = express();

app.use(cors());
const options = {
  uploadDir: tempFilesPath,
  autoClean: true,
};
app.use(formData.parse(options));
app.use('/', router);

export { app };
