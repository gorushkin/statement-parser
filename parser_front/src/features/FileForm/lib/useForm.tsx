import { useState } from 'react';
import { Currencies, StatementCurrencies } from 'src/shared/api/models';

import { FileFormat, FileInfo } from '../types';

export const useForm = () => {
  const [isSelectorEnabled, setIsSelectorEnabled] = useState(false);
  const [fileFormat, setFileFormat] = useState<FileFormat>(FileFormat.CSV);

  const [isFormValid, setIsFromValid] = useState(false);

  const [name, setName] = useState('');

  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

  const [currencies, setCurrencies] = useState<StatementCurrencies>({
    sourceCurrency: Currencies.TRY,
    targetCurrency: Currencies.RUB,
  });

  const handleCheckboxChange = (e: boolean) => setIsSelectorEnabled(e);

  const handleFormatChange = (e: string) => setFileFormat(e as FileFormat);

  return {
    handleCheckboxChange,
    setValues: {
      handleFormatChange,
      setCurrencies,
      setFileInfo,
      setIsFromValid,
      setName,
    },
    values: {
      currencies,
      fileFormat,
      fileInfo,
      isFormValid,
      isSelectorEnabled,
      name,
    },
  };
};
