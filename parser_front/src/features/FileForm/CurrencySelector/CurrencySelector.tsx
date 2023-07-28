import { Box, Select } from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';
import { Currencies } from 'src/shared/api/models';

import { ConvertDirection, CurrencyState, HandleCurrenciesChangeType } from '../types';
import styles from './CurrencySelector.module.scss';

interface CurrencySelectorProps {
  onChange: HandleCurrenciesChangeType;
  values: CurrencyState;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({ onChange, values }) => {
  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLSelectElement>) => {
    onChange({ direction: name as ConvertDirection, value: Currencies[value as Currencies] });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.selectWrapper}>
        <Select className={styles.select} name="from" onChange={handleChange} value={values.from}>
          {Object.keys(Currencies).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Box>
      <Box className={styles.selectWrapper}>
        <Select className={styles.select} name="to" onChange={handleChange} value={values.to}>
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
