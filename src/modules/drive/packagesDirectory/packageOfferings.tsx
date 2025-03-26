import React, { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import {
  CustomInput,
  LoadingSpinner,
  OfferingCard,
  PackageCard,
  SortBy,
  UserCard
} from "components";
import { fetchFoldersQueryParams, FoldersResponse } from "types";
import { DirectoryEmptyState } from "components/emptyStates/DirectoryEmptyState";
import { useDebounce } from "hooks";
import { DirectoryIcon } from "assets";

type optionType = {
  label: string;
  value: string;
};

export interface PackageOfferingsUIProps {
  packageOfferings: {
    packageOfferingsData: FoldersResponse;
    loading: boolean;
    error: boolean;
    params: fetchFoldersQueryParams;
  };
  handleParams: (param: string, value: string | number) => void;
  handleFetchPackageOfferings: () => void;
  handleFolderRename: (_id: string, newName: string) => void;
  renameLoading: boolean;
}

const PackageOfferingsUI: React.FC<PackageOfferingsUIProps> = ({
  packageOfferings,
  handleParams,
  handleFetchPackageOfferings,
  handleFolderRename,
  renameLoading
}) => {
  const {
    packageOfferingsData: { folders: packageOfferingsData },
    loading,
    error,
    params
  } = packageOfferings;

  const { search, sort } = params;
  const [packageOfferingsSearchQuery, setPackageOfferingsSearchQuery] = useState(search || "");
  const debouncedPackageOfferingsSearchQuery = useDebounce(packageOfferingsSearchQuery, 1000);

  const handlePackageOfferingsSearch = (value: string) => {
    setPackageOfferingsSearchQuery(value);
  };

  const handleSortChange = (option: optionType | undefined) => {
    if (option) {
      handleParams("sort", option.value);
    }
  };

  useEffect(() => {
    handleParams("search", debouncedPackageOfferingsSearchQuery);
  }, [debouncedPackageOfferingsSearchQuery]);

  return (
    <div className="h-[calc(100vh-55px)]">
      <section className="flex justify-end items-center px-4 py-2 border-b bg-white relative z-[100]">
        <div className="flex items-center gap-3 text-vobb-neutral-80">
          <CustomInput
            icon={<IconSearch size={16} />}
            placeholder="Search offerings"
            value={packageOfferingsSearchQuery}
            onChange={(e) => handlePackageOfferingsSearch(e.target.value)}
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
          testId="offerings-sort-button"
        />
      </section>

      <section className="flex items-start justify-center px-4 relative h-[70%]">
        {loading ? (
          <LoadingSpinner data-testid="offerings-loading-spinner" />
        ) : error ? (
          <DirectoryEmptyState
            title="No folders available"
            description="Uh-oh, you don't seem to have any package offerings, please contact support if this issue persists."
          />
        ) : debouncedPackageOfferingsSearchQuery && !packageOfferingsData?.length ? (
          <DirectoryEmptyState
            title={`No package offerings found for "${search}"`}
            description="Please try again using a different keyword"
            pageIcon={<DirectoryIcon stroke="#000000" />}
          />
        ) : !packageOfferingsData?.length ? (
          <DirectoryEmptyState
            title="No offerings have been created"
            description="Create an offering to begin storing documents here for better organization."
            btnText="Create offering"
            pageIcon={<DirectoryIcon stroke="#000000" />}
          />
        ) : (
          <div className="flex w-full items-start justify-start gap-4 flex-wrap my-4">
            {packageOfferingsData?.map((offering, index) => (
              <OfferingCard
                key={index}
                id={offering.id}
                name={offering.name}
                fileCount={offering.files_count}
                folderSize={offering.total_files_size}
                path={offering.path}
                handleFetchFolders={handleFetchPackageOfferings}
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

export { PackageOfferingsUI };
