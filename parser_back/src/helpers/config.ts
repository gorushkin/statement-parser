import { getAbsolutePath } from './until';

export const DB_PATH = 'db';
export const PORT = 3500;
const TEMP_FILES_DIR_NAME = 'files';

export const TEMP_FILES_PATH = getAbsolutePath(TEMP_FILES_DIR_NAME);
