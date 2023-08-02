import { useState } from 'react';
import { Currencies, StatementCurrencies } from 'src/shared/api/models';

import { FileInfo, FORMATS } from '../types';

export const useForm = () => {
  const [isSelectorEnabled, setIsSelectorEnabled] = useState(false);
  const [format, setFormat] = useState<FORMATS>(FORMATS.CSV);

  const [isFormValid, setIsFromValid] = useState(false);

  const [name, setName] = useState('');

  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

  const [currencies, setCurrencies] = useState<StatementCurrencies>({
    sourceCurrency: Currencies.TRY,
    targetCurrency: Currencies.RUB,
  });

  const handleCheckboxChange = (e: boolean) => setIsSelectorEnabled(e);

  return {
    handleCheckboxChange,
    setValues: {
      setCurrencies,
      setFileInfo,
      setIsFromValid,
      setName,
    },
    values: {
      currencies,
      fileInfo,
      isFormValid,
      isSelectorEnabled,
      name,
    },
  };
};
