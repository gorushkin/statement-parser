import { Box, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { FileUploader } from 'src/widgets/FileUploader';

import style from './UploadFilePage.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UploadFilePageProps {}

const UploadFilePage: FC<UploadFilePageProps> = () => {
  return (
    <Box className={style.pageContentWrapper}>
      <Heading as="h1" className={style.contentTitle}>
        Upload File
      </Heading>
      <Box className={style.contentWrapper}>
        <FileUploader />
      </Box>
    </Box>
  );
};

export { UploadFilePage };
