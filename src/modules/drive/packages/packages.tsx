import React, { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { CustomInput, LoadingSpinner, PackageCard, SortBy } from "components";
import { fetchFoldersQueryParams, FoldersResponse } from "types";
import { DirectoryEmptyState } from "components/emptyStates/DirectoryEmptyState";
import { useDebounce } from "hooks";
import { DirectoryIcon } from "assets";

type optionType = {
  label: string;
  value: string;
};

export interface PackagesUIProps {
  packagesFolders: {
    packagesFoldersData: FoldersResponse;
    loading: boolean;
    error: boolean;
    params: fetchFoldersQueryParams;
  };
  handleParams: (param: string, value: string | number) => void;
  handleFetchPackagesFolders: () => void;
}

const PackagesUI: React.FC<PackagesUIProps> = ({
  packagesFolders,
  handleParams,
  handleFetchPackagesFolders
}) => {
  const {
    packagesFoldersData: { folders: packagesFoldersData },
    loading,
    error,
    params
  } = packagesFolders;

  const { search, sort } = params;
  const [packagesFoldersSearchQuery, setPackagesFoldersSearchQuery] = useState(search || "");
  const debouncedPackagesFoldersSearchQuery = useDebounce(packagesFoldersSearchQuery, 1000);

  const handlePackagesFoldersSearch = (value: string) => {
    setPackagesFoldersSearchQuery(value);
  };

  const handleSortChange = (option: optionType | undefined) => {
    if (option) {
      handleParams("sort", option.value);
    }
  };

  useEffect(() => {
    handleParams("search", debouncedPackagesFoldersSearchQuery);
  }, [debouncedPackagesFoldersSearchQuery]);

  return (
    <div className="h-[calc(100vh-55px)]">
      <section className="flex justify-end items-center px-4 py-2 border-b bg-white relative z-[100]">
        <div className="flex items-center gap-3 text-vobb-neutral-80">
          <CustomInput
            icon={<IconSearch size={16} />}
            placeholder="Search packages"
            value={packagesFoldersSearchQuery}
            onChange={(e) => handlePackagesFoldersSearch(e.target.value)}
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
          testId="packages-sort-button"
        />
      </section>

      <section className="flex items-start justify-center px-4 relative h-[70%]">
        {loading ? (
          <LoadingSpinner data-testid="packages-loading-spinner" />
        ) : error ? (
          <DirectoryEmptyState
            title="No folders available"
            description="Uh-oh, you don't seem to have any packages, please contact support if this issue persists."
          />
        ) : debouncedPackagesFoldersSearchQuery && !packagesFoldersData?.length ? (
          <DirectoryEmptyState
            title={`No packages found for "${search}"`}
            description="Please try again using a different keyword"
            pageIcon={<DirectoryIcon stroke="#000000" />}
          />
        ) : !packagesFoldersData?.length ? (
          <DirectoryEmptyState
            title="No packages have been created"
            description="Create packages to begin storing documents here for better organization."
            btnText="Create a package"
            pageIcon={<DirectoryIcon stroke="#000000" />}
          />
        ) : (
          <div className="flex w-full items-start justify-start gap-4 flex-wrap my-4">
            {packagesFoldersData?.map((packageFolder, index) => (
              <PackageCard
                key={index}
                id={packageFolder.id}
                name={packageFolder.name}
                fileCount={packageFolder.files_count}
                folderSize={packageFolder.total_files_size}
                path={packageFolder.path}
                handleFetchFolders={handleFetchPackagesFolders}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export { PackagesUI };
