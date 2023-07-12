import { Box, Button, Container, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, DragEvent, FC, useRef, useState } from 'react';
import { useFetch } from 'src/shared/useFetch';
import { cn } from 'src/shared/utils';

import { uploadFileRequest } from '../API';
import styles from './FileForm.module.scss';

type FileInfo = {
  file: File;
  name: string;
  size: number;
};

const FileForm: FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [isHover, setIsHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');

  const [isFormValid, setIsFromValid] = useState(false);

  const isResetButtonDisabled = !fileInfo;

  const fileStateUpdateHandler = (files: FileList) => {
    for (const file of files) {
      const { name, size } = file;
      setFileInfo({ file, name, size });
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

  const handleResetButtonClick = () => {
    setFileInfo(null);
    setIsFromValid(false);
    if (inputRef.current) {
      inputRef.current.files = null;
    }
  };

  const [{ error, message }, fetchData] = useFetch(uploadFileRequest);
  console.log('error: ', error);
  console.log('message: ', message);

  const handleStartButtonClick = () => {
    if (!fileInfo) return;
    void fetchData({ file: fileInfo.file, name });
  };

  const handleAddFileButtonClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
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

  return (
    <Container>
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
            <Input className={styles.input} name="name" onChange={handleInputChange} type="text" />
          </Box>
        )}
        {!fileInfo && (
          <Text textAlign={'center'}>
            Drag'n'drop your statement or{' '}
            <Text as={'button'} className={styles.link} onClick={handleAddFileButtonClick}>
              click here
            </Text>
          </Text>
        )}
        <input hidden={true} name="file" onChange={handleFileInputChange} ref={inputRef} type="file" />
      </Box>
      <Box className={styles.buttonGroup}>
        <Button
          background={'red.400'}
          isDisabled={isResetButtonDisabled}
          onClick={handleResetButtonClick}
          size={'lg'}
          variant={'outline'}
        >
          Reset
        </Button>
        <Button
          background={'green.400'}
          isDisabled={!isFormValid}
          onClick={handleStartButtonClick}
          size={'lg'}
          variant={'solid'}
        >
          Upload
        </Button>
      </Box>
    </Container>
  );
};

export { FileForm };
