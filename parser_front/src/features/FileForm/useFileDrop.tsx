import { DragEvent, useState } from 'react';

export const useFileDrop = (fileStateUpdateHandler: (files: FileList) => void) => {
  const [isHover, setIsHover] = useState(false);

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(false);
    const { files } = e.dataTransfer;
    fileStateUpdateHandler(files);
  };

  const handleFileDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(true);
  };

  const handleFileDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(false);
  };

  return { handleFileDragLeave, handleFileDragOver, handleFileDrop, isHover };
};
