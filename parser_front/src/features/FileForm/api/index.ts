import { axios, Request, Response } from 'src/app/config';

const UPLOAD_FILE_ROUTE = 'files';

type UploadFileProps = { file: File; name: string };

type UploadFile = Request<UploadFileProps>;

export const uploadFileRequest: UploadFile = async ({ file, name }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append(name, file);
  const response = await axios.post<Response>(UPLOAD_FILE_ROUTE, formData);
  return response.data;
};
