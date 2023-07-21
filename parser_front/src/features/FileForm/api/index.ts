import { axios, Response } from 'src/shared/api';

const UPLOAD_FILE_ROUTE = 'files';

type UploadFileProps = { file: File; name: string };

type uploadFileResponse = { message: string; ok: boolean };

export const uploadFileRequest = async ({ file, name }: UploadFileProps) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append(name, file);
  const response = await axios.post<Response<uploadFileResponse>>(UPLOAD_FILE_ROUTE, formData);
  return response.data;
};
