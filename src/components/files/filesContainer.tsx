import React, { useEffect, useState } from "react";
import { IconDotsVertical, IconSearch, IconUpload } from "@tabler/icons-react";
import {
  Button,
  CustomInput,
  LoadingSpinner,
  MultiCheckActions,
  SortBy,
  UploadFileModal
} from "components";
import { ActionsList, fetchFoldersQueryParams, FilesResponse } from "types";
import { DirectoryEmptyState } from "components/emptyStates/DirectoryEmptyState";
import { useDebounce } from "hooks";
import { FileCard } from "components/cards/fileCard";
import { FileIcon } from "assets";
import { useMultiCheckViewContext } from "context";
import { DownloadIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import { useParams } from "react-router-dom";
import { handleDownloadFile } from "lib";

type optionType = {
  label: string;
  value: string;
};

export interface FilesContainerProps {
  files: {
    filesData: FilesResponse;
    loading: boolean;
    error: boolean;
    params: fetchFoldersQueryParams;
  };
  handleParams: (param: string, value: string | number) => void;
  handleFetchFiles: () => void;
  path: "user" | "client" | "general" | "offering";
  handleFileRename: (id: string, newName: string) => void;
  renameLoading: boolean;
  handleUploadFiles: (files: File[], id: string) => void;
  uploadLoading: boolean;
  showUploadModal: boolean;
  setShowUploadModal: (val: boolean) => void;
}

const FilesContainer: React.FC<FilesContainerProps> = ({
  files,
  handleParams,
  handleFetchFiles,
  handleFileRename,
  renameLoading,
  handleUploadFiles,
  uploadLoading,
  showUploadModal,
  setShowUploadModal
}) => {
  const {
    filesData: { files: filesData },
    loading,
    error,
    params
  } = files;

  const { id } = useParams<{ id: string }>();
  const { search, sort } = params;
  const [filesSearchQuery, setFilesSearchQuery] = useState(search || "");
  const debouncedFilesSearchQuery = useDebounce(filesSearchQuery, 1000);
  const { multiCheckView, selectedCheckboxes } = useMultiCheckViewContext();

  const handleFilesSearch = (value: string) => {
    setFilesSearchQuery(value);
  };

  const handleSortChange = (option: optionType | undefined) => {
    if (option) {
      handleParams("sort", option.value);
    }
  };

  useEffect(() => {
    handleParams("search", debouncedFilesSearchQuery);
  }, [debouncedFilesSearchQuery]);

  const handleDownloadFiles = () => {
    if (filesData) {
      handleDownloadFile(undefined, filesData, Array.from(selectedCheckboxes));
    }
  };
  const fileActions: ActionsList[] = [
    {
      name: "Download files",
      callback: handleDownloadFiles,
      icon: <DownloadIcon />,
      btnVariant: "outline"
    }
  ];

  const close = () => {
    setShowUploadModal(false);
  };

  return (
    <div className="h-[calc(100vh-55px)]">
      <section className="flex justify-between items-center px-4 py-2 border-b relative bg-white z-[100]">
        <Button
          onClick={() => setShowUploadModal(true)}
          className="flex gap-1 text-xs"
          variant={"fill"}
          data-testid="empty-state-action">
          <IconUpload width={20} />
          Upload a New file
        </Button>
        <div className="flex items-center gap-3 text-vobb-neutral-80 ">
          <CustomInput
            icon={<IconSearch size={16} />}
            placeholder="Search files"
            value={filesSearchQuery}
            onChange={(e) => handleFilesSearch(e.target.value)}
            parentClassName="mb-0 min-w-[250px] text-sm flex"
          />
        </div>
      </section>
      <section className="flex justify-between px-4 py-2 border-b bg-white relative z-[100]">
        <SortBy
          isClearable
          sort={{
            active: { label: "Date created", value: "asc" },
            items: [{ label: "Date created", value: "asc" }],
            handleChange: handleSortChange
          }}
          order={{
            show: true,
            active: sort === "asc" ? "asc" : "desc",
            handleChange: (order) => handleParams("sort", order === "asc" ? "asc" : "desc")
          }}
          testId="files-sort-button"
        />
        {multiCheckView && (
          <div className="flex items-center gap-2">
            <span>{selectedCheckboxes.size} selected</span>
            <DropdownMenu>
              <DropdownMenuTrigger role="data-test-dropdown-trigger" asChild>
                <Button variant="ghost" className="p-1 outline-none border">
                  <span className="sr-only">Open menu</span>
                  <IconDotsVertical className="cursor-pointer" size={16} color="#494949" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 mr-4 text-xs z-[200]">
                <DropdownMenuItem onClick={handleDownloadFiles}>
                  Download File{selectedCheckboxes.size > 1 && "s"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </section>

      <section className="flex items-start justify-center px-4 relative h-[70%]">
        {loading ? (
          <LoadingSpinner data-testid="files-loading-spinner" />
        ) : error ? (
          <DirectoryEmptyState
            title="No files available"
            description="Uh-oh, you don't seem to have any files, please contact support if this issue persists."
          />
        ) : debouncedFilesSearchQuery && !filesData?.length ? (
          <DirectoryEmptyState
            title={`No files found for "${search}"`}
            description="Please try again using a different keyword"
            pageIcon={<FileIcon stroke="#000000" />}
          />
        ) : !filesData?.length ? (
          <DirectoryEmptyState
            title="No files have been created"
            description="Upload files to begin storing documents here for better organization."
            btnText="Upload a New file"
            btnIcon={<IconUpload width={20} />}
            pageIcon={<FileIcon stroke="#000000" />}
          />
        ) : (
          <div className="flex w-full items-start justify-start gap-4 flex-wrap my-4">
            {filesData?.map((file, index) => (
              <FileCard
                files={filesData}
                key={index}
                name={file.name}
                file_url={file.file_url}
                size={file.file_size}
                id={file.id}
                handleFetchFiles={handleFetchFiles}
                handleFileRename={handleFileRename}
                renameLoading={renameLoading}
              />
            ))}
          </div>
        )}
      </section>
      <MultiCheckActions actions={fileActions} />
      <UploadFileModal
        id={id}
        show={showUploadModal}
        close={close}
        handleUploadFiles={handleUploadFiles}
        uploadLoading={uploadLoading}
      />
    </div>
  );
};

export { FilesContainer };
