import { Parser } from 'parser';
import { Request, Response } from 'express';
import fs from 'fs/promises';
import { AppError, BaseError, ERROR_PLACES, ValidationError } from '../../errors/error';
import { logger } from '../../logger';
import { db } from '../../entities';
import { FormattedRequest, File, StatementPayload, FileWithoutExt } from './types';
import { getBody } from '../utils';
const parser = new Parser();

export const getData = (data: Buffer) => parser.parse(data);

const getFileDate = (fileInfo: File): FileWithoutExt => {
  if ('xlsx' in fileInfo) return fileInfo?.xlsx;
  if ('csv' in fileInfo) return fileInfo?.csv;
  return fileInfo;
};

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const formattedRequest = req as unknown as FormattedRequest;
    const { to, from } = formattedRequest.body;
    if (!to || !from) throw new ValidationError(ERROR_PLACES.gettingCurrencies);
    const files = Object.values(formattedRequest.files);
    const fileInfo = files[0];
    const { fieldName, path } = getFileDate(fileInfo);
    const fileContent = await fs.readFile(path);
    const parsedData = getData(fileContent);
    const { error, ok } = await db.createStatement(parsedData.transactions, fieldName);
    if (ok) {
      logger.info(`File "${fieldName}" was successfully uploaded`);
      return res.status(200).send({
        message: `File "${fieldName}" was uploaded and will be available in a few minutes`,
        ok: true,
      });
    }
    throw new AppError(ERROR_PLACES.uploadFile, error);
  } catch (error) {
    const message = error instanceof BaseError ? error.userMessage : 'Something went wrong';
    logger.error(`There is an error with file uploading with text/n${message}`);
    res.status(400).send({ error: message });
  }
};

export const getStatements = async (_req: Request, res: Response) => {
  const { data, error, ok } = await db.getStatements();
  if (ok) return res.status(200).send({ data, ok: true });
  res.status(400).send({ error });
};

export const getStatement = async (req: Request, res: Response) => {
  const { name } = req.params;
  const result = await db.getStatementById(name);
  if (result.ok) return res.status(200).send({ data: result.data, ok: true });
  res.status(400).send({ error: result.error, ok: false });
};

export const uploadStatement = async (req: Request, res: Response) => {
  const body: StatementPayload = JSON.parse((await getBody(req)).toString());
  const { name, statement } = body;
  const { data, error, ok } = await db.updateStatement(name, statement);
  if (ok) return res.status(200).send({ data });
  res.status(400).send({ error });
};
