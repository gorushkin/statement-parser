import pino, { Logger as Pino } from 'pino';

export class Logger {
  logger: Pino<{
    transport: {
      target: string;
    };
  }>;
  constructor() {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
      },
    });
  }

  info = (message: string) => this.logger.info(message);
  error = (message: string) => this.logger.error(message);
}

export const logger = new Logger();
