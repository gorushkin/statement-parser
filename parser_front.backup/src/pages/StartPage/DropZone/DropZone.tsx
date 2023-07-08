import { useExportContext } from '../../../context/AppContext';
import style from './DropZone.module.scss';
import { cn } from '../../../utils/utils';
import React, { useState } from 'react';

const DropZone = ({ className }: { className: string }) => {
  const { setFileInfo, fileInfo } = useExportContext();
  const [isZoneActive, setIsZoneActive] = useState(false);

  const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsZoneActive(false);
    const { files } = e.dataTransfer;
    for (const file of files) {
      const { size, name } = file;
      setFileInfo({ size, name, content: file });
    }
  };

  const handleFileDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsZoneActive(true);
  };

  const handleFileDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsZoneActive(false);
  };

  return (
    <div
      onDragOver={handleFileDragOver}
      onDragLeave={handleFileDragLeave}
      onDrop={handleFileDrop}
      className={cn(
        `${style.wrapper} ${className}`,
        isZoneActive && style.wrapperActive
      )}
    >
      {fileInfo.name ? fileInfo.name : `Drag'n'drop your file`}
    </div>
  );
};

export { DropZone };
