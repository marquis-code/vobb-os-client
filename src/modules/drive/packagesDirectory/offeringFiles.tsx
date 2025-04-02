import React from "react";
import { fetchFoldersQueryParams, FilesResponse } from "types";
import { FilesContainer } from "components/files";

export interface OfferingFilesUIProps {
  offeringFiles: {
    filesData: FilesResponse;
    loading: boolean;
    error: boolean;
    params: fetchFoldersQueryParams;
  };
  handleParams: (param: string, value: string | number) => void;
  handleFetchOfferingFiles: () => void;
  handleFileRename: (id: string, newName: string) => void;
  renameLoading: boolean;
  handleUploadFiles: (files: File[], id: string) => void;
  uploadLoading: boolean;
  showUploadModal: boolean;
  setShowUploadModal: (val: boolean) => void;
}

const OfferingFilesUI: React.FC<OfferingFilesUIProps> = ({
  offeringFiles,
  handleParams,
  handleFetchOfferingFiles,
  handleFileRename,
  renameLoading,
  handleUploadFiles,
  uploadLoading,
  showUploadModal,
  setShowUploadModal
}) => {
  return (
      <FilesContainer
        files={offeringFiles}
        handleFetchFiles={handleFetchOfferingFiles}
        handleParams={handleParams}
        path="offering"
        handleFileRename={handleFileRename}
        renameLoading={renameLoading}
        handleUploadFiles={handleUploadFiles}
        uploadLoading={uploadLoading}
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
      />
  );
};

export { OfferingFilesUI };
