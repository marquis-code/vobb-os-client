import { fetchPackagesFoldersService } from "api";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { DefaultFolderResponse, fetchFoldersQueryParams, FoldersResponse } from "types";
import { toast } from "components";
import { PackagesUI } from "modules";

const Packages = () => {
  const {
    run: runFetchPackagesFolders,
    data: fetchPackagesFoldersResponse,
    error: fetchPackagesFoldersError,
    requestStatus: fetchPackagesFoldersStatus
  } = useApiRequest({});

  const [packagesFoldersQueryParams, setPackagesFoldersQueryParams] =
    useState<fetchFoldersQueryParams>({
      page: 1,
      limit: 30,
      search: "",
      sort: "asc"
    });

  const { page, limit, search, sort } = packagesFoldersQueryParams;

  const handleUpdateQueryParams = (param: string, value: string | number) => {
    setPackagesFoldersQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleFetchPackagesFolders = () => {
    runFetchPackagesFolders(
      fetchPackagesFoldersService({
        page,
        limit,
        search,
        sort
      })
    );
  };

  useEffect(() => {
    handleFetchPackagesFolders();
  }, []);

  useEffect(() => {
    handleFetchPackagesFolders();
  }, [packagesFoldersQueryParams]);

  const packagesFoldersData = useMemo<FoldersResponse>(() => {
    if (fetchPackagesFoldersResponse?.status === 200) {
      const folders = fetchPackagesFoldersResponse.data.data.folders.map((item: DefaultFolderResponse) => ({
        id: item._id,
        name: item.name,
        is_default: item.is_default,
        path: item.path,
        type: item.type,
        files_count: item.files_count,
        total_files_size: item.total_files_size
      }));
      return {
        folders,
        total_count: fetchPackagesFoldersResponse.data.total_count || 0,
        total_pages: fetchPackagesFoldersResponse.data.total_pages || 0,
        page: fetchPackagesFoldersResponse.data.page || 1
      };
    } else if (fetchPackagesFoldersError) {
      toast({ description: fetchPackagesFoldersError?.response?.data.error });
    }

    return {} as FoldersResponse;
  }, [fetchPackagesFoldersResponse, fetchPackagesFoldersError]);

  return (
    <PackagesUI
      packagesFolders={{
        packagesFoldersData,
        loading: fetchPackagesFoldersStatus.isPending,
        params: packagesFoldersQueryParams,
        error: fetchPackagesFoldersError || fetchPackagesFoldersStatus.isRejected
      }}
      handleParams={handleUpdateQueryParams}
      handleFetchPackagesFolders={handleFetchPackagesFolders}
    />
  );
};

export { Packages };
