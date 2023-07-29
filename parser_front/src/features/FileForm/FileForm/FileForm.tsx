import { Box, Button, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ConvertDirections, Currencies, StatementCurrencies } from 'src/shared/api/models';
import { uploadFileRequest } from 'src/shared/api/statement';
import { useFetch } from 'src/shared/useFetch';
import { Payload } from 'src/shared/useFetch/types';
import { useNotify } from 'src/shared/useNotify';
import { cn } from 'src/shared/utils';

import { CurrencySelector } from '../CurrencySelector';
import { useFileDrop } from '../lib/';
import { FileInfo } from '../types';
import styles from './FileForm.module.scss';

const FileForm: FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [name, setName] = useState('');
  const [currencies, setCurrencies] = useState<StatementCurrencies>({
    sourceCurrency: Currencies.TRY,
    targetCurrency: Currencies.RUB,
  });
  const [isFormValid, setIsFromValid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  const { addErrorMessage, addSuccessMessage } = useNotify();

  const handleUploadSuccess = (e: Payload<null>) => {
    addSuccessMessage({ message: e.message });
    handleFormReset();
  };

  const handleUploadError = (e: Payload<null>) => {
    addErrorMessage({ message: e.message });
    setIsFromValid(true);
    handleReset();
  };

  const [{ error, handleReset }, fetchData] = useFetch(uploadFileRequest, {
    onError: handleUploadError,
    onSuccess: handleUploadSuccess,
  });

  const fileStateUpdateHandler = (files: FileList) => {
    for (const file of files) {
      const { name, size } = file;
      setFileInfo({ file, name, size });
      setName(name);
      setIsFromValid(!!name);
    }
  };

  const { handleFileDragLeave, handleFileDragOver, handleFileDrop, isHover } = useFileDrop(fileStateUpdateHandler);

  const handleFormReset = () => {
    setFileInfo(null);
    setName('');
    setIsFromValid(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    handleReset();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileInfo) return;
    void fetchData({ currencies, file: fileInfo.file, name });
  };

  const handleAddFileButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFileInputChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    fileStateUpdateHandler(files);
  };

  const handleTextInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = value.trim();
    setName(trimmedValue);
    setIsFromValid(!!trimmedValue && !!fileInfo?.name);
  };

  useEffect(() => {
    textInputRef.current?.select();
    textInputRef.current?.focus();
  }, [fileInfo]);

  const handleCurrenciesChange = useCallback(
    ({ direction, value }: { direction: ConvertDirections; value: Currencies }) => {
      setCurrencies((state) => ({ ...state, [direction]: value }));
    },
    []
  );

  const isResetButtonDisabled = !fileInfo;
  const isUploadButtonDisabled = !isFormValid || !!error;

  return (
    <form onSubmit={handleFormSubmit}>
      <Box
        className={cn(styles.form, isHover && styles.formHover, isFormValid && styles.formValid)}
        onDragLeave={handleFileDragLeave}
        onDragOver={handleFileDragOver}
        onDrop={handleFileDrop}
        title={fileInfo?.name ? fileInfo?.name : ''}
      >
        {!!fileInfo?.name && (
          <Box className={styles.textWrapper} isTruncated>
            <Text className={styles.filename}>{fileInfo.name}</Text>
            <Input
              className={styles.input}
              name="name"
              onChange={handleTextInputChange}
              ref={textInputRef}
              type="text"
              value={name}
            />
            <CurrencySelector onChange={handleCurrenciesChange} values={currencies} />
          </Box>
        )}
        {!fileInfo && (
          <Text textAlign={'center'}>
            Drag'n'drop your statement or{' '}
            <Text as={'button'} className={styles.link} onClick={handleAddFileButtonClick} type="button">
              click here
            </Text>
          </Text>
        )}
        <input
          accept=".csv, .xls"
          hidden={true}
          name="file"
          onChange={handleFileInputChange}
          ref={fileInputRef}
          type="file"
        />
      </Box>
      <Box className={styles.buttonGroup}>
        <Button
          background={'red.400'}
          isDisabled={isResetButtonDisabled}
          onClick={handleFormReset}
          size={'lg'}
          variant={'outline'}
        >
          Reset
        </Button>
        <Button
          background={'green.400'}
          isDisabled={isUploadButtonDisabled}
          size={'lg'}
          type="submit"
          variant={'solid'}
        >
          Upload
        </Button>
      </Box>
    </form>
  );
};

export { FileForm };
