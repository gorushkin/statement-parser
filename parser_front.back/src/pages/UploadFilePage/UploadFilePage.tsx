import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { FileUploader } from 'src/widgets/FileUploader';

import style from './UploadFilePage.module.scss';

const UploadFilePage: FC = () => (
  <Box className={style.pageContentWrapper}>
    <Box className={style.contentWrapper}>
      <FileUploader />
    </Box>
  </Box>
);

export { UploadFilePage };
