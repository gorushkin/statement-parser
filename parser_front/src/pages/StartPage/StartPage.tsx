import { useExportContext } from '../../context/AppContext';
import { Button } from '../../components/Button/Button';
import { getTest } from '../../services/api';
import style from './StartPage.module.scss';
import { useFetch } from '../../hooks/useFetch';
import { DropZone } from './DropZone';
import { useState } from 'react';
import { FileForm } from './FileForm';
import { Files } from './Files';

export const StartPage = () => {
  const { fileInfo } = useExportContext();
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [{ isLoading }, getTestHandler] = useFetch(getTest);

  const handleTestClick = () => getTestHandler();

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleStartClick = () => {
    if (!fileInfo.content) {
      alert('There is no file!!!');
      return;
    }
    setIsFormVisible(true);
  };

  const handleCloseFrom = () => {
    setIsFormVisible(false);
    setShouldUpdate(true);
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.inner}>
          {!isFormVisible && (
            <>
              <h1>Vakif statements parser</h1>
              <DropZone className={style.dropzone} />
              <div className={style.controls}>
                <Button
                  disabled={!fileInfo.content}
                  onClick={handleStartClick}
                  label="Start"
                />
                <Button onClick={handleStartClick} label="Check saved files" />
                <Button
                  label="Test Api"
                  isLoading={isLoading}
                  onClick={handleTestClick}
                />
              </div>
            </>
          )}
          {isFormVisible && <FileForm onFormSave={handleCloseFrom} />}
          {!isFormVisible && (
            <Files
              shouldUpdate={shouldUpdate}
              setShouldUpdate={setShouldUpdate}
            />
          )}
        </div>
      </div>
    </>
  );
};
