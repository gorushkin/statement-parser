import { Box, Button, Container, Text } from '@chakra-ui/react';
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

type FROM_MODE = 'file' | 'name';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DropZoneProps {}

const FileForm: FC<DropZoneProps> = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [isHover, setIsHover] = useState(false);
  const input = useRef<HTMLInputElement>(null);

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
    if (input.current) {
      input.current.files = null;
    }
  };

  const [{ error, message }, fetchData] = useFetch(uploadFileRequest);
  console.log('error: ', error);
  console.log('message: ', message);

  const handleStartButtonClick = () => {
    if (!fileInfo) return;
    void fetchData({ file: fileInfo.file, name: 'uuuu' });
  };

  const handleAddFileButtonClick = () => {
    if (!input.current) return;
    input.current.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    fileStateUpdateHandler(files);
  };

  const isFormValid = !!fileInfo;

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
          <Text className={styles.textWrapper} isTruncated>
            {fileInfo.name}
          </Text>
        )}
        {!fileInfo && (
          <Text textAlign={'center'}>
            Drag'n'drop your statement or{' '}
            <Text as={'button'} className={styles.link} onClick={handleAddFileButtonClick}>
              click here
            </Text>
          </Text>
        )}
      </Box>
      <input hidden={true} onChange={handleInputChange} ref={input} type="file" />
      <Box className={styles.buttonGroup}>
        <Button
          background={'green.400'}
          isDisabled={!isFormValid}
          onClick={handleStartButtonClick}
          size={'lg'}
          variant={'solid'}
        >
          Upload
        </Button>
        <Button
          background={'red.400'}
          isDisabled={!isFormValid}
          onClick={handleResetButtonClick}
          size={'lg'}
          variant={'outline'}
        >
          Reset
        </Button>
      </Box>
    </Container>
  );
};

export { FileForm };
