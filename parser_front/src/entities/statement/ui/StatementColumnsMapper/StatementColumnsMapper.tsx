import { FC } from 'react';

import styles from './StatementColumnsMapper.module.scss';

interface StatementColumnsMapperProps {}

const mandatoryFields = ['date', 'payee', 'memo', 'amount', 'inflow', 'outflowZ'];

const StatementColumnsMapper: FC<StatementColumnsMapperProps> = () => {
  return <>StatementColumnsMapper</>;
};

export { StatementColumnsMapper };
