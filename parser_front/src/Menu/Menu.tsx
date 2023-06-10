import { cn } from '../utils/utils';
import style from './Menu.module.scss';
import { useStatementContext } from '../context/StatementContext';
import { Button } from '../components/Button/Button';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../routes';

export const Menu = () => {
  const { isDataSynced, handleResetClick, handleSaveClick, handleLoadClick, handleCompareData } =
    useStatementContext();

  const message = isDataSynced
    ? 'The data is synced'
    : 'The data is not synced';

  return (
    <div className={style.wrapper}>
      <div className={cn(style.info, !isDataSynced && style.infoWarning)}>
        {message}
      </div>
      <div className={cn(style.controls, style.row)}>
        <div className={style.buttonWrapper}>
          <Button color="orange" onClick={handleResetClick}>
            Reset
          </Button>
          <Link className={style.buttonLink} to={APP_ROUTES.ROOT}>
            <Button color="orange">Back</Button>
          </Link>
        </div>
        <div className={style.buttonWrapper}>
          <Button onClick={handleLoadClick} color="blue">
            Load from disk
          </Button>
          <Button onClick={handleCompareData} color="blue">
            Check sync status
          </Button>
          <Button onClick={handleSaveClick} color="green">
            Save to disk
          </Button>
        </div>
      </div>
      <div className={style.row}>
        {/* <div className={cn(style.buttonWrapper, style.buttonWrapperRight)}>
          <Button onClick={onResetClick} color='blue'>
            Load from disk
          </Button>
          <Button onClick={handleSaveClick} color='green'>
            Save to disk
          </Button>
        </div> */}
      </div>
    </div>
  );
};
