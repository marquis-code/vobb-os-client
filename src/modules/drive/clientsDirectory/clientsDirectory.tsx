import React, { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { ClientCard, CustomInput, LoadingSpinner, SortBy } from "components";
import { fetchFoldersQueryParams, FoldersResponse } from "types";
import { DirectoryEmptyState } from "components/emptyStates/DirectoryEmptyState";
import { useDebounce } from "hooks";
import { DirectoryIcon } from "assets";

type optionType = {
  label: string;
  value: string;
};

export interface ClientsDirectoryUIProps {
  clientsFolders: {
    clientsFoldersData: FoldersResponse;
    loading: boolean;
    error: boolean;
    params: fetchFoldersQueryParams;
  };
  handleParams: (param: string, value: string | number) => void;
  handleFetchClientsFolders: () => void;
  handleFolderRename: (id: string, newName: string) => void;
  renameLoading: boolean;
}

const ClientsDirectoryUI: React.FC<ClientsDirectoryUIProps> = ({
  clientsFolders,
  handleParams,
  handleFetchClientsFolders,
  handleFolderRename,
  renameLoading
}) => {
  const {
    clientsFoldersData: { folders: clientsFoldersData },
    loading,
    error,
    params
  } = clientsFolders;

  const { search, sort } = params;
  const [clientsFoldersSearchQuery, setClientsFoldersSearchQuery] = useState(search || "");
  const debouncedClientsFoldersSearchQuery = useDebounce(clientsFoldersSearchQuery, 1000);

  const handleClientsFoldersSearch = (value: string) => {
    setClientsFoldersSearchQuery(value);
  };

  const handleSortChange = (option: optionType | undefined) => {
    if (option) {
      handleParams("sort", option.value);
    }
  };

  useEffect(() => {
    handleParams("search", debouncedClientsFoldersSearchQuery);
  }, [debouncedClientsFoldersSearchQuery]);

  return (
    <div className="h-[calc(100vh-55px)]">
      <section className="flex justify-end items-center px-4 py-2 border-b">
        <div className="flex items-center gap-3 text-vobb-neutral-80">
          <CustomInput
            icon={<IconSearch size={16} />}
            placeholder="Search clients"
            value={clientsFoldersSearchQuery}
            onChange={(e) => handleClientsFoldersSearch(e.target.value)}
            parentClassName="mb-0 min-w-[250px] text-sm"
          />
        </div>
      </section>
      <section className="flex gap-2 px-4 py-2 border-b">
        <SortBy
          isClearable
          sort={{
            active: { label: "Date created", value: sort },
            items: [{ label: "Date created", value: "asc" }],
            handleChange: handleSortChange
          }}
          order={{
            show: true,
            active: sort === "asc" ? "asc" : "desc",
            handleChange: (order) => handleParams("sort", order === "asc" ? "asc" : "desc")
          }}
          testId="clients-sort-button"
        />
      </section>

      <section className="flex items-start justify-center px-4 relative h-[70%]">
        {loading ? (
          <LoadingSpinner data-testid="clients-loading-spinner" />
        ) : error ? (
          <DirectoryEmptyState
            title="No folders available"
            description="Uh-oh, you don't seem to have any user folders, please contact support if this issue persists."
          />
        ) : debouncedClientsFoldersSearchQuery && !clientsFoldersData?.length ? (
          <DirectoryEmptyState
            title={`No clients found for "${search}"`}
            description="Please try again using a different keyword"
            pageIcon={<DirectoryIcon stroke="#000000" />}
          />
        ) : !clientsFoldersData?.length ? (
          <DirectoryEmptyState
            title="No clients have been created"
            description="Create clients to begin storing documents here for better organization."
            btnText="Create client"
            pageIcon={<DirectoryIcon stroke="#000000" />}
          />
        ) : (
          <div className="flex w-full items-start justify-start gap-4 flex-wrap my-4">
            {clientsFoldersData?.map((clientFolder, index) => (
              <ClientCard
                id={clientFolder.id}
                key={index}
                name={clientFolder.name}
                fileCount={clientFolder.files_count}
                folderSize={clientFolder.total_files_size}
                path={clientFolder.path}
                handleFetchFolders={handleFetchClientsFolders}
                handleFolderRename={handleFolderRename}
                renameLoading={renameLoading}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export { ClientsDirectoryUI };
