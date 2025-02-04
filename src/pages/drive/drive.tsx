import { DriveUI } from "modules";
import { fetchDefaultFoldersService } from "api";
import { useApiRequest } from "hooks";
import { useEffect, useMemo } from "react";
import { DefaultFolder } from "types";
import { toast } from "components";

const Drive = () => {
  const {
    run: runFetchDefaultFolders,
    data: fetchDefaultFoldersResponse,
    error: fetchDefaultFoldersError,
    requestStatus: fetchDefaultFoldersStatus
  } = useApiRequest({});

  const handleFetchDefaultFolders = () => {
    runFetchDefaultFolders(fetchDefaultFoldersService());
  };

  useEffect(() => {
    handleFetchDefaultFolders();
  }, []);

  const defaultFoldersData = useMemo<DefaultFolder[]>(() => {
    if (fetchDefaultFoldersResponse?.status === 200) {
      return fetchDefaultFoldersResponse.data.data.map((item) => ({
        id: item._id,
        name: item.name,
        is_default: item.is_default,
        path: item.path,
        type: item.type,
        files_count: item.files_count,
        total_files_size: item.total_files_size
      }));
    } else if (fetchDefaultFoldersError) {
      toast({ description: fetchDefaultFoldersError?.response?.data.error });
    }

    return [];
  }, [fetchDefaultFoldersResponse, fetchDefaultFoldersError]);
  return (
    <>
      <DriveUI
        allDefaultFolders={{
          defaultFoldersData,
          loading: fetchDefaultFoldersStatus.isPending,
          error: fetchDefaultFoldersError || fetchDefaultFoldersStatus.isRejected
        }}
      />
    </>
  );
};

export { Drive };
