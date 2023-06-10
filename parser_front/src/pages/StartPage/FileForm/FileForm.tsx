import { useState } from 'react';
import { Button } from '../../../components/Button';
import { cn } from '../../../utils/utils';
import styles from './FileForm.module.scss';
import { useExportContext } from '../../../context/AppContext';
import { useFetch } from '../../../hooks/useFetch';
import { uploadFile } from '../../../services/api';

export const FileForm = ({ onFormSave }: { onFormSave: () => void }) => {
  const [value, setValue] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const [{ isLoading }, sendFileHandler] = useFetch(uploadFile, {
    onSuccess: onFormSave,
    onFail: (error: string) => console.log(error),
  });

  const { fileInfo } = useExportContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormValid(!!event.target.value.trim());
    setValue(event.target.value.trim());
  };

  const handleSaveCLick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!fileInfo.content) return;
    sendFileHandler({ file: fileInfo.content, name: value });
  };

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Input filename</h1>
      <input
        className={cn(styles.input, !isFormValid && styles.inputInvalid)}
        onChange={handleChange}
        value={value}
      />
      <div className={styles.buttonWrapper}>
        <Button
          onClick={handleSaveCLick}
          isLoading={isLoading}
          disabled={!isFormValid}
        >
          Save
        </Button>
        <Button>Cancel</Button>
      </div>
    </form>
  );
};
