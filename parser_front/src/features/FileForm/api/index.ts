import { axios, Response } from 'src/shared/api';

const UPLOAD_FILE_ROUTE = 'files';

type UploadFileProps = { file: File; name: string };

export const uploadFileRequest = async ({ file, name }: UploadFileProps) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append(name, file);
  const response = await axios.post<Response<null>>(UPLOAD_FILE_ROUTE, formData);
  return response.data;
};
