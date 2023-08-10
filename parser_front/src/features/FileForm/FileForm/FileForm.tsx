import { Box, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { ChangeEvent, FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { statement } from 'src/entities/statement';
import { ROUTE } from 'src/shared/routes';
import { cn } from 'src/shared/utils';

import { useFileDrop } from '../lib/';
import styles from './FileForm.module.scss';

const FileForm: FC = observer(() => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (files: FileList) => {
    for (const file of files) {
      const { name } = file;
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        if (!reader.result) return;
        statement.convert(reader.result, name);
        navigate(ROUTE.STATEMENT_PREVIEW);
      });
      // TODO: add encoding selector
      reader.readAsText(file, 'CP1251');
    }
  };

  const { handleFileDragLeave, handleFileDragOver, handleFileDrop, isHover } = useFileDrop(handleSubmit);

  const handleAddFileButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFileInputChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    handleSubmit(files);
  };

  return (
    <Box
      className={cn(styles.form, isHover && styles.formHover)}
      onDragLeave={handleFileDragLeave}
      onDragOver={handleFileDragOver}
      onDrop={handleFileDrop}
    >
      <Text textAlign={'center'}>
        Drag'n'drop your statement or{' '}
        <Text as={'button'} className={styles.link} onClick={handleAddFileButtonClick} type="button">
          click here
        </Text>
      </Text>
      <input
        accept=".csv, .xls"
        hidden={true}
        name="file"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        type="file"
      />
    </Box>
  );
});

export { FileForm };
