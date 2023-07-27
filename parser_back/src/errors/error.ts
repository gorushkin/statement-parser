const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

const DEFAULT_ERROR = {
  name: '',
  stack: '',
  message: DEFAULT_ERROR_MESSAGE,
};

export enum ERROR_PLACES {
  'uploadFile',
  'readJSONData',
  'writeJSONData',
  'getCurrencyValue',
  'saveStatement',
  'getXMLCurrencies',
  'gettingCurrencies',
}

const ERROR_MESSAGES: Record<ERROR_PLACES, string> = {
  [ERROR_PLACES.uploadFile]: 'Uploading statement failed',
  [ERROR_PLACES.readJSONData]: 'There is an error with reading currencies',
  [ERROR_PLACES.writeJSONData]: 'There is an error with adding currencies',
  [ERROR_PLACES.getCurrencyValue]: 'Something wrong with rates reading',
  [ERROR_PLACES.saveStatement]: 'The file name is not correct',
  [ERROR_PLACES.getXMLCurrencies]: 'Getting currencies was not successful',
  [ERROR_PLACES.gettingCurrencies]: 'There is no info about currencies',
};

export class BaseError extends Error {
  name: string;
  place: ERROR_PLACES;
  userMessage: string;
  statusCode: number;

  constructor(place: ERROR_PLACES, statusCode: number, error?: unknown) {
    const { name, stack, message } = error instanceof Error ? error : DEFAULT_ERROR;
    super(message);
    this.name = 'BaseError';
    this.stack = stack;
    this.name = name;
    this.place = place;
    this.userMessage = ERROR_MESSAGES[place];
    this.statusCode = statusCode;
  }
}

export class AppError extends BaseError {
  constructor(place: ERROR_PLACES, error?: unknown) {
    super(place, 500, error);
    this.name = 'AppError';
  }
}

export class ValidationError extends BaseError {
  constructor(place: ERROR_PLACES, error?: unknown) {
    super(place, 403, error);
    this.name = 'ValidationError';
  }
}

export class DBError extends BaseError {
  constructor(place: ERROR_PLACES, error?: unknown) {
    super(place, 500, error);
    this.name = 'DBError';
  }
}

export class APIError extends BaseError {
  constructor() {
    super(ERROR_PLACES.getXMLCurrencies, 500);
    this.name = 'APIError';
  }
}
