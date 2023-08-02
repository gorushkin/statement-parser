import { Box, Checkbox, Select } from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';
import { ConvertDirections, Currencies, StatementCurrencies } from 'src/shared/api/models';

import { HandleCurrenciesChangeType } from '../types';
import styles from './CurrencySelector.module.scss';

interface CurrencySelectorProps {
  isSelectorEnabled: boolean;
  onChange: HandleCurrenciesChangeType;
  onCheckboxChange: (value: boolean) => void;
  values: StatementCurrencies;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({ isSelectorEnabled, onChange, onCheckboxChange, values }) => {
  const handleCurrencyChange = ({ target: { name, value } }: ChangeEvent<HTMLSelectElement>) => {
    onChange({ direction: name as ConvertDirections, value: Currencies[value as Currencies] });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(e.target.checked);
  };

  return (
    <Box className={styles.container}>
      <Checkbox className={styles.checkbox} colorScheme="orange" onChange={handleCheckboxChange} size="lg">
        Convert currency?
      </Checkbox>
      <Box className={styles.selectWrapper}>
        <Box>
          <Select
            className={styles.select}
            disabled={!isSelectorEnabled}
            name={ConvertDirections.SOURCE}
            onChange={handleCurrencyChange}
            value={values.sourceCurrency || ''}
          >
            {Object.keys(Currencies).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Select
            className={styles.select}
            disabled={!isSelectorEnabled}
            name={ConvertDirections.TARGET}
            onChange={handleCurrencyChange}
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
    </Box>
  );
};

export { CurrencySelector };
