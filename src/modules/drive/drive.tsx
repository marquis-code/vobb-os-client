import React, { useEffect } from "react";
import { DirectoryCard, LoadingSpinner, TableEmptyState } from "components";
import { DefaultFolder } from "types";
import { DirectoryEmptyState } from "components/emptyStates/DirectoryEmptyState";
import { DirectoryIcon } from "assets";

export interface DriveUIProps {
  allDefaultFolders: {
    defaultFoldersData: DefaultFolder[] | undefined | null;
    loading: boolean;
    error: boolean;
  };
}

const DriveUI: React.FC<DriveUIProps> = ({ allDefaultFolders }) => {
  const { defaultFoldersData, loading, error } = allDefaultFolders;
  useEffect(() => {
    console.log(error);
  }, []);
  return (
    <div className="h-[calc(100vh-55px)]">
      <section role="heading" className="flex items-start justify-center px-4 relative h-[70%]">
        {loading ? (
          <LoadingSpinner data-testid="loading-spinner" />
        ) : !defaultFoldersData?.length || error ? (
          <DirectoryEmptyState
            title="No folders available"
            description="Uh-oh, we failed to fetch your folders, please contact support if this issue persists."
            pageIcon={<DirectoryIcon stroke="#000000" />}
          />
        ) : (
          <div className="flex w-full items-start justify-start gap-4 flex-wrap my-4">
            {defaultFoldersData?.map((defaultFolder, index) => (
              <DirectoryCard
                key={index}
                id={defaultFolder.id}
                name={defaultFolder.name}
                fileCount={defaultFolder.files_count}
                folderSize={defaultFolder.total_files_size}
                path={defaultFolder.path}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export { DriveUI };
