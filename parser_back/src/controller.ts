import { Parser, Transaction } from 'parser';
import { Request, Response } from 'express';
import { FormattedRequest } from './types';
import fs from 'fs/promises';
import { db, logger } from '.';
import { getBody } from './until';
import { AppError } from './error';
const parser = new Parser();

export const getData = (data: Buffer) => parser.parse(data);

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const qwe = req as FormattedRequest;
    const files = Object.values(qwe.files);
    const fileInfo = files[0];
    const { fieldName, path } = fileInfo;
    const fileContent = await fs.readFile(path);
    const parsedData = getData(fileContent);
    const { error, ok } = await db.generateStatement(parsedData.transactions, fieldName);
    if (ok) {
      logger.info(`File "${fieldName}" was successfully uploaded`);
      return res.status(200).send({
        message: `File "${fieldName}" was uploaded and will be available in a few minutes`,
      });
    }
    const message = error instanceof Error ? error.message : 'Something went wrong';
    throw new AppError(message);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    logger.error(`There is an error with file uploading with text/n${message}`);
    res.status(400).send({ error: message });
  }
};

export const getStatements = async (_req: Request, res: Response) => {
  const { data, error, ok } = await db.getStatements();
  if (ok) return res.status(200).send({ data });
  res.status(400).send({ error });
};

export const getStatement = async (req: Request, res: Response) => {
  const { name } = req.params;
  const result = await db.getStatement(name);
  if (result.ok) return res.status(200).send({ data: result.data });
  res.status(400).send({ error: result.error });
};

type StatementPayload = {
  name: string;
  statement: Transaction[];
};

export const uploadStatement = async (req: Request, res: Response) => {
  const body: StatementPayload = JSON.parse((await getBody(req)).toString());
  const { name, statement } = body;
  const { data, error, ok } = await db.saveStatement(name, statement);
  if (ok) return res.status(200).send({ data });
  res.status(400).send({ error });
};
