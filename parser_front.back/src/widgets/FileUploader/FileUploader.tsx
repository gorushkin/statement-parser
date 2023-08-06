import { Container, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { FileForm } from 'src/features/FileForm';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FileUploaderProps {}

const FileUploader: FC<FileUploaderProps> = () => {
  return (
    <Container maxW="700px">
      <Heading as="h1" mb="5" textAlign="center">
        Upload Statement
      </Heading>
      <FileForm />
    </Container>
  );
};

export { FileUploader };
