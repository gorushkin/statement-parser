import { Box, Button, Input, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef } from 'react';
import { statementList } from 'src/entities/statementList';
import { ConvertDirections, Currencies, StatementType } from 'src/shared/api/models';
import { uploadFileRequest } from 'src/shared/api/statement';
import { useFetch } from 'src/shared/useFetch';
import { Payload } from 'src/shared/useFetch/types';
import { useNotify } from 'src/shared/useNotify';
import { cn } from 'src/shared/utils';

import { CurrencySelector } from '../CurrencySelector';
import { useFileDrop } from '../lib/';
import { useForm } from '../lib/useForm';
import styles from './FileForm.module.scss';

const FileForm: FC = observer(() => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  const { addErrorMessage, addSuccessMessage } = useNotify();

  const { handleCheckboxChange, setValues, values } = useForm();

  const handleUploadSuccess = (e: Payload<StatementType>) => {
    statementList.addStatement(e.data);
    addSuccessMessage({ message: e.message });
    handleFormReset();
  };

  const handleUploadError = (e: Payload<StatementType>) => {
    addErrorMessage({ message: e.message });
    setValues.setIsFromValid(true);
    handleReset();
  };

  const [{ error, handleReset }, uploadFile] = useFetch(uploadFileRequest, {
    onError: handleUploadError,
    onSuccess: handleUploadSuccess,
  });

  const fileStateUpdateHandler = (files: FileList) => {
    for (const file of files) {
      const { name, size } = file;
      setValues.setFileInfo({ file, name, size });
      setValues.setName(name);
      setValues.setIsFromValid(!!name);
    }
  };

  const { handleFileDragLeave, handleFileDragOver, handleFileDrop, isHover } = useFileDrop(fileStateUpdateHandler);

  const handleFormReset = () => {
    setValues.setFileInfo(null);
    setValues.setName('');
    setValues.setIsFromValid(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    handleReset();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.fileInfo) return;
    console.log(values.fileInfo);
    // void uploadFile({ currencies, file: fileInfo.file, name });
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
    setValues.setName(trimmedValue);
    setValues.setIsFromValid(!!trimmedValue && !!values.fileInfo?.name);
  };

  useEffect(() => {
    textInputRef.current?.select();
    textInputRef.current?.focus();
  }, [values.fileInfo]);

  const handleCurrenciesChange = useCallback(
    ({ direction, value }: { direction: ConvertDirections; value: Currencies }) => {
      setValues.setCurrencies((state) => ({ ...state, [direction]: value }));
    },
    [setValues]
  );

  const isResetButtonDisabled = !values.fileInfo;
  const isUploadButtonDisabled = !values.isFormValid || !!error;

  return (
    <form onSubmit={handleFormSubmit}>
      <Box
        className={cn(styles.form, isHover && styles.formHover, values.isFormValid && styles.formValid)}
        onDragLeave={handleFileDragLeave}
        onDragOver={handleFileDragOver}
        onDrop={handleFileDrop}
        title={values.fileInfo?.name ? values.fileInfo?.name : ''}
      >
        {!!values.fileInfo?.name && (
          <Box className={styles.textWrapper} isTruncated>
            <Text className={styles.filename}>{values.fileInfo.name}</Text>
            <Input
              className={styles.input}
              name="name"
              onChange={handleTextInputChange}
              ref={textInputRef}
              type="text"
              value={values.name}
            />
            <CurrencySelector
              isSelectorEnabled={values.isSelectorEnabled}
              onChange={handleCurrenciesChange}
              onCheckboxChange={handleCheckboxChange}
              values={values.currencies}
            />
          </Box>
        )}
        {!values.fileInfo && (
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
});

export { FileForm };
