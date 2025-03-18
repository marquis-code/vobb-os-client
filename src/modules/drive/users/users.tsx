import React, { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { CustomInput, LoadingSpinner, SortBy, UserCard } from "components";
import { fetchFoldersQueryParams, FoldersResponse } from "types";
import { DirectoryEmptyState } from "components/emptyStates/DirectoryEmptyState";
import { useDebounce } from "hooks";
import { DirectoryIcon } from "assets";

type optionType = {
  label: string;
  value: string;
};

export interface UsersUIProps {
  usersFolders: {
    usersFoldersData: FoldersResponse;
    loading: boolean;
    error: boolean;
    params: fetchFoldersQueryParams;
  };
  handleParams: (param: string, value: string | number) => void;
  handleFetchUsersFolders: () => void;
  handleFolderRename: (_id: string, newName: string) => void;
  renameLoading: boolean;
}

const UsersUI: React.FC<UsersUIProps> = ({
  usersFolders,
  handleParams,
  handleFetchUsersFolders,
  handleFolderRename,
  renameLoading
}) => {
  const {
    usersFoldersData: { folders: usersFoldersData },
    loading,
    error,
    params
  } = usersFolders;

  const { search, sort } = params;
  const [usersFoldersSearchQuery, setUsersFoldersSearchQuery] = useState(search || "");
  const debouncedUsersFoldersSearchQuery = useDebounce(usersFoldersSearchQuery, 1000);

  const handleUsersFoldersSearch = (value: string) => {
    setUsersFoldersSearchQuery(value);
  };

  const handleSortChange = (option: optionType | undefined) => {
    if (option) {
      handleParams("sort", option.value);
    }
  };

  useEffect(() => {
    handleParams("search", debouncedUsersFoldersSearchQuery);
  }, [debouncedUsersFoldersSearchQuery]);

  return (
    <div className="h-[calc(100vh-55px)]">
      <section className="flex justify-end items-center px-4 py-2 border-b bg-white relative z-[100]">
        <div className="flex items-center gap-3 text-vobb-neutral-80">
          <CustomInput
            icon={<IconSearch size={16} />}
            placeholder="Search users"
            value={usersFoldersSearchQuery}
            onChange={(e) => handleUsersFoldersSearch(e.target.value)}
            parentClassName="mb-0 min-w-[250px] text-sm"
          />
        </div>
      </section>
      <section className="flex gap-2 px-4 py-2 border-b bg-white relative z-[100]">
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
          testId="users-sort-button"
        />
      </section>

      <section className="flex items-start justify-center px-4 relative h-[70%]">
        {loading ? (
          <LoadingSpinner data-testid="users-loading-spinner" />
        ) : debouncedUsersFoldersSearchQuery && !usersFoldersData?.length ? (
          <DirectoryEmptyState
            title={`No users found for "${search}"`}
            description="Please try again using a different keyword"
            pageIcon={<DirectoryIcon stroke="#000000" />}
          />
        ) : !usersFoldersData?.length || error ? (
          <DirectoryEmptyState
            title="No folders available"
            description="Uh-oh, we failed to fetch your folders, please contact support if this issue persists."
            pageIcon={<DirectoryIcon stroke="#000000" />}
          />
        ) : (
          <div className="flex w-full items-start justify-start gap-4 flex-wrap my-4">
            {usersFoldersData?.map((userFolder, index) => (
              <UserCard
                key={index}
                id={userFolder.id}
                name={userFolder.name}
                fileCount={userFolder.files_count}
                folderSize={userFolder.total_files_size}
                path={userFolder.path}
                handleFetchFolders={handleFetchUsersFolders}
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

export { UsersUI };
