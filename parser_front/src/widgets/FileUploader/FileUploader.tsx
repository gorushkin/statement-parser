import { Container, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { DropZone } from 'src/features/DropZone';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FileUploaderProps {}

const FileUploader: FC<FileUploaderProps> = () => {
  return (
    <Container maxW="500px">
      <Heading as="h1" mb="5" textAlign="center">
        Upload Statement
      </Heading>
      <DropZone />
    </Container>
  );
};

export { FileUploader };
