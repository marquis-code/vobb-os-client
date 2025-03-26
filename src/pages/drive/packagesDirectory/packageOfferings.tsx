import { fetchPackageOfferingsService, renameFolderService } from "api";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { DefaultFolderResponse, fetchFoldersQueryParams, FoldersResponse } from "types";
import { toast } from "components";
import { PackageOfferingsUI } from "modules";
import { useParams } from "react-router-dom";

const PackageOfferings = () => {
  const {
    run: runFetchPackageOfferings,
    data: fetchPackageOfferingsResponse,
    error: fetchPackageOfferingsError,
    requestStatus: fetchPackageOfferingsStatus
  } = useApiRequest({});

  const {
    run: runRename,
    data: renameResponse,
    error: renameError,
    requestStatus: renameStatus
  } = useApiRequest({});

  const [packageOfferingsQueryParams, setPackageOfferingsQueryParams] =
    useState<fetchFoldersQueryParams>({
      page: 1,
      limit: 30,
      search: "",
      sort: "asc",
      start_date: "2024-12-01",
      end_date: "2025-02-04"
    });

  const { page, limit, search, sort, start_date, end_date } = packageOfferingsQueryParams;

  const handleUpdateQueryParams = (param: string, value: string | number) => {
    setPackageOfferingsQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const { id } = useParams<{ id: string }>();

  const handleFetchPackageOfferings = () => {
    if (id) {
      runFetchPackageOfferings(
        fetchPackageOfferingsService(id, {
          page,
          limit,
          search,
          sort,
          start_date,
          end_date
        })
      );
    }
  };

  useEffect(() => {
    handleFetchPackageOfferings();
  }, []);

  useEffect(() => {
    handleFetchPackageOfferings();
  }, [packageOfferingsQueryParams]);

  const packageOfferingsData = useMemo<FoldersResponse>(() => {
    if (fetchPackageOfferingsResponse?.status === 200) {
      const folders = fetchPackageOfferingsResponse.data.data.folders.map(
        (item: DefaultFolderResponse) => ({
          id: item._id,
          name: item.name,
          is_default: item.is_default,
          path: item.path,
          type: item.type,
          files_count: item.files_count,
          total_files_size: item.total_files_size
        })
      );
      return {
        folders,
        total_count: fetchPackageOfferingsResponse.data.total_count || 0,
        total_pages: fetchPackageOfferingsResponse.data.total_pages || 0,
        page: fetchPackageOfferingsResponse.data.page || 1
      };
    } else if (fetchPackageOfferingsError) {
      toast({ description: fetchPackageOfferingsError?.response?.data.error });
    }

    return {} as FoldersResponse;
  }, [fetchPackageOfferingsResponse, fetchPackageOfferingsError]);

  const handleFolderRename = (id: string, newName: string) => {
    runRename(renameFolderService(id, { name: newName }));
  };
  useMemo(() => {
    if (renameResponse?.status === 200) {
      toast({
        description: renameResponse?.data?.message
      });
      handleFetchPackageOfferings();
    } else if (renameError) {
      toast({
        variant: "destructive",
        description: renameError?.response?.data?.error
      });
    }
  }, [renameResponse, renameError]);
  return (
    <PackageOfferingsUI
      packageOfferings={{
        packageOfferingsData,
        loading: fetchPackageOfferingsStatus.isPending,
        params: packageOfferingsQueryParams,
        error: fetchPackageOfferingsError || fetchPackageOfferingsStatus.isRejected
      }}
      handleParams={handleUpdateQueryParams}
      handleFetchPackageOfferings={handleFetchPackageOfferings}
      handleFolderRename={handleFolderRename}
      renameLoading={renameStatus.isPending}
    />
  );
};

export { PackageOfferings };
