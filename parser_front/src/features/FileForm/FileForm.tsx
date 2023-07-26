import { Box, Button, Container, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, DragEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { uploadFileRequest } from 'src/shared/api/statement';
import { useFetch } from 'src/shared/useFetch';
import { Payload } from 'src/shared/useFetch/types';
import { useNotify } from 'src/shared/useNotify';
import { cn } from 'src/shared/utils';

import styles from './FileForm.module.scss';

type FileInfo = {
  file: File;
  name: string;
  size: number;
};

const FileForm: FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [isHover, setIsHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');

  const { addErrorMessage, addSuccessMessage } = useNotify();

  const [isFormValid, setIsFromValid] = useState(false);

  const handleUploadSuccess = (e: Payload<null>) => {
    addSuccessMessage({ message: e.message });
    handleFormReset();
  };

  const [{ error, handleReset }, fetchData] = useFetch(uploadFileRequest, {
    onError: (e) => {
      addErrorMessage({ message: e.message });
      setIsFromValid(true);
      handleReset();
    },
    onSuccess: handleUploadSuccess,
  });

  const isResetButtonDisabled = !fileInfo;
  const isUploadButtonDisabled = !isFormValid || !!error;

  const fileStateUpdateHandler = (files: FileList) => {
    for (const file of files) {
      const { name, size } = file;
      setFileInfo({ file, name, size });
      setName(name);
      setIsFromValid(!!name);
    }
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(false);
    const { files } = e.dataTransfer;
    fileStateUpdateHandler(files);
  };

  const handleFileDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(true);
  };

  const handleFileDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(false);
  };

  const handleFormReset = () => {
    setFileInfo(null);
    setIsFromValid(false);
    if (fileInputRef.current) fileInputRef.current.files = null;
    handleReset();
  };

  const handleStartButtonClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileInfo) return;
    void fetchData({ file: fileInfo.file, name });
  };

  const handleAddFileButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    fileStateUpdateHandler(files);
  };

  const handleInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = value.trim();
    setName(trimmedValue);
    setIsFromValid(!!trimmedValue && !!fileInfo?.name);
  };

  useEffect(() => {
    textInputRef.current?.select();
    textInputRef.current?.focus();
  }, [fileInfo]);

  return (
    <Container>
      <form onSubmit={(e) => handleStartButtonClick(e)}>
        <Box
          className={cn(styles.form, isHover && styles.formHover, isFormValid && styles.formValid)}
          onDragLeave={handleFileDragLeave}
          onDragOver={handleFileDragOver}
          onDrop={handleFileDrop}
          title={fileInfo?.name ? fileInfo?.name : ''}
        >
          {fileInfo?.name && (
            <Box className={styles.textWrapper} isTruncated>
              <Text className={styles.filename}>{fileInfo.name}</Text>
              <Input
                className={styles.input}
                name="name"
                onChange={handleInputChange}
                ref={textInputRef}
                type="text"
                value={name}
              />
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
    </Container>
  );
};

export { FileForm };
