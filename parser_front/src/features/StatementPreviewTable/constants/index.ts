/* eslint-disable perfectionist/sort-enums */
export const mandatoryFields = ['date', 'payee', 'memo', 'amount', 'inflow', 'outflow'];

export enum MANDATORY_FIELD {
  DATE = 'date',
  PAYEE = 'payee',
  MEMO = 'memo',
  INFLOW = 'inflow',
  OUTFLOW = 'outflow',
  AMOUNT = 'amount',
}
