import { TEMP_FILES_DIR_NAME } from './config';
import { Currency } from './types';
import { join } from 'path';

export const xlsType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
export const defaultCurrency: Currency = 'TRY';

export const tempFilesPath = join(process.cwd(), TEMP_FILES_DIR_NAME);
