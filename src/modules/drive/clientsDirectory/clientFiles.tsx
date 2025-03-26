import React from "react";
import { fetchFoldersQueryParams, FilesResponse } from "types";
import { FilesContainer } from "components/files";

export interface ClientFilesUIProps {
  clientFiles: {
    filesData: FilesResponse;
    loading: boolean;
    error: boolean;
    params: fetchFoldersQueryParams;
  };
  handleParams: (param: string, value: string | number) => void;
  handleFetchClientFiles: () => void;
  handleFileRename: (id: string, newName: string) => void;
  renameLoading: boolean;
  handleUploadFiles: (files: File[], id: string) => void;
  uploadLoading: boolean;
  showUploadModal: boolean;
  setShowUploadModal: (val: boolean) => void;
}

const ClientFilesUI: React.FC<ClientFilesUIProps> = ({
  clientFiles,
  handleParams,
  handleFetchClientFiles,
  handleFileRename,
  renameLoading,
  handleUploadFiles,
  uploadLoading,
  showUploadModal,
  setShowUploadModal
}) => {
  return (
      <FilesContainer
        files={clientFiles}
        handleFetchFiles={handleFetchClientFiles}
        handleParams={handleParams}
        path="client"
        handleFileRename={handleFileRename}
        renameLoading={renameLoading}
        handleUploadFiles={handleUploadFiles}
        uploadLoading={uploadLoading}
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
      />
  );
};

export { ClientFilesUI };
