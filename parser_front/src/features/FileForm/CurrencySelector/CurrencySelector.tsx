import { Box, Select } from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';
import { ConvertDirections, Currencies, StatementCurrencies } from 'src/shared/api/models';

import { HandleCurrenciesChangeType } from '../types';
import styles from './CurrencySelector.module.scss';

interface CurrencySelectorProps {
  onChange: HandleCurrenciesChangeType;
  values: StatementCurrencies;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({ onChange, values }) => {
  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLSelectElement>) => {
    onChange({ direction: name as ConvertDirections, value: Currencies[value as Currencies] });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.selectWrapper}>
        <Select
          className={styles.select}
          name={ConvertDirections.SOURCE}
          onChange={handleChange}
          value={values.sourceCurrency || ''}
        >
          {Object.keys(Currencies).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Box>
      <Box className={styles.selectWrapper}>
        <Select
          className={styles.select}
          name={ConvertDirections.TARGET}
          onChange={handleChange}
          value={values.targetCurrency || ''}
        >
          {Object.keys(Currencies).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export { CurrencySelector };
