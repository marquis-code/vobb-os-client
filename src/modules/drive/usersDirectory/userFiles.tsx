import React from "react";
import { fetchFoldersQueryParams, FilesResponse } from "types";
import { FilesContainer } from "components/files";

export interface UserFilesUIProps {
  userFiles: {
    filesData: FilesResponse;
    loading: boolean;
    error: boolean;
    params: fetchFoldersQueryParams;
  };
  handleParams: (param: string, value: string | number) => void;
  handleFetchUserFiles: () => void;
  handleFileRename: (id: string, newName: string) => void;
  renameLoading: boolean;
  handleUploadFiles: (files: File[], id: string) => void;
  uploadLoading: boolean;
  showUploadModal: boolean;
  setShowUploadModal: (val: boolean) => void;
}

const UserFilesUI: React.FC<UserFilesUIProps> = ({
  userFiles,
  handleParams,
  handleFetchUserFiles,
  handleFileRename,
  renameLoading,
  handleUploadFiles,
  uploadLoading,
  showUploadModal,
  setShowUploadModal
}) => {
  return (
    <FilesContainer
      files={userFiles}
      handleFetchFiles={handleFetchUserFiles}
      handleParams={handleParams}
      path="user"
      handleFileRename={handleFileRename}
      renameLoading={renameLoading}
      handleUploadFiles={handleUploadFiles}
      uploadLoading={uploadLoading}
      showUploadModal={showUploadModal}
      setShowUploadModal={setShowUploadModal}
    />
  );
};

export { UserFilesUI };
