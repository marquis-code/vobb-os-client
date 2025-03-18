import { fetchClientsFoldersService, renameFolderService } from "api";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { DefaultFolderResponse, fetchFoldersQueryParams, FoldersResponse } from "types";
import { toast } from "components";
import { ClientsUI } from "modules";

const Clients = () => {
  const {
    run: runFetchClientsFolders,
    data: fetchClientsFoldersResponse,
    error: fetchClientsFoldersError,
    requestStatus: fetchClientsFoldersStatus
  } = useApiRequest({});

  const {
    run: runRename,
    data: renameResponse,
    error: renameError,
    requestStatus: renameStatus
  } = useApiRequest({});

  const [clientsFoldersQueryParams, setClientsFoldersQueryParams] =
    useState<fetchFoldersQueryParams>({
      page: 1,
      limit: 30,
      search: "",
      sort: "asc"
    });

  const { page, limit, search, sort } = clientsFoldersQueryParams;

  const handleUpdateQueryParams = (param: string, value: string | number) => {
    setClientsFoldersQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleFetchClientsFolders = () => {
    runFetchClientsFolders(
      fetchClientsFoldersService({
        page,
        limit,
        search,
        sort
      })
    );
  };

  useEffect(() => {
    handleFetchClientsFolders();
  }, []);

  useEffect(() => {
    handleFetchClientsFolders();
  }, [clientsFoldersQueryParams]);

  const clientsFoldersData = useMemo<FoldersResponse>(() => {
    if (fetchClientsFoldersResponse?.status === 200) {
      const folders = fetchClientsFoldersResponse.data.data.folders.map((item: DefaultFolderResponse) => ({
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
        total_count: fetchClientsFoldersResponse.data.total_count || 0,
        total_pages: fetchClientsFoldersResponse.data.total_pages || 0,
        page: fetchClientsFoldersResponse.data.page || 1
      };
    } else if (fetchClientsFoldersError) {
      toast({ description: fetchClientsFoldersError?.response?.data.error });
    }

    return {} as FoldersResponse;
  }, [fetchClientsFoldersResponse, fetchClientsFoldersError]);

  const handleFolderRename = (id: string, newName: string) => {
    runRename(renameFolderService(id, { name: newName }));
  };
  useMemo(() => {
    if (renameResponse?.status === 200) {
      toast({
        description: renameResponse?.data?.message
      });
      handleFetchClientsFolders();
    } else if (renameError) {
      toast({
        variant: "destructive",
        description: renameError?.response?.data?.error
      });
    }
  }, [renameResponse, renameError]);

  return (
    <ClientsUI
      clientsFolders={{
        clientsFoldersData,
        loading: fetchClientsFoldersStatus.isPending,
        params: clientsFoldersQueryParams,
        error: fetchClientsFoldersError || fetchClientsFoldersStatus.isRejected
      }}
      handleParams={handleUpdateQueryParams}
      handleFetchClientsFolders={handleFetchClientsFolders}
      handleFolderRename={handleFolderRename}
      renameLoading={renameStatus.isPending}
    />
  );
};

export { Clients };
