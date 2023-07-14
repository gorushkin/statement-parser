export const ROUTES = {
  ROOT: '/',
  STATEMENTS: '/statements',
};

export const APP_ROUTES = {
  ROOT: ROUTES.ROOT,
  STATEMENTS: `${ROUTES.STATEMENTS}/:statementName`,
}

export const getStatementUrl = (statementName: string) => `${ROUTES.STATEMENTS}/${statementName}`
