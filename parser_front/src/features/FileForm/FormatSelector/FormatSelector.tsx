import { Radio, RadioGroup } from '@chakra-ui/react';
import { FC } from 'react';

import { FileFormat } from '../types';
import styles from './FormatSelector.module.scss';

interface FormatSelectorProps {
  fileFormat: FileFormat;
  onChange: (e: string) => void;
}

const FormatSelector: FC<FormatSelectorProps> = (props) => {
  const { fileFormat, onChange } = props;

  return (
    <RadioGroup className={styles.radios} name="fileFormat" onChange={onChange} value={fileFormat}>
      <Radio className={styles.radio} value={FileFormat.CSV}>
        CSV
      </Radio>
      <Radio className={styles.radio} value={FileFormat.XLS}>
        XLS
      </Radio>
    </RadioGroup>
  );
};

export { FormatSelector };
