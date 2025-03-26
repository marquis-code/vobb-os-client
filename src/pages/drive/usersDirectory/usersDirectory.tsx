import { fetchUsersFoldersService, renameFolderService } from "api";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { DefaultFolderResponse, fetchFoldersQueryParams, FoldersResponse } from "types";
import { toast } from "components";
import { UsersDirectoryUI } from "modules";

const Users = () => {
  const {
    run: runFetchUsersFolders,
    data: fetchUsersFoldersResponse,
    error: fetchUsersFoldersError,
    requestStatus: fetchUsersFoldersStatus
  } = useApiRequest({});

  const {
    run: runRename,
    data: renameResponse,
    error: renameError,
    requestStatus: renameStatus
  } = useApiRequest({});

  const [usersFoldersQueryParams, setUsersFoldersQueryParams] = useState<fetchFoldersQueryParams>({
    page: 1,
    limit: 30,
    search: "",
    sort: "asc"
  });

  const { page, limit, search, sort } = usersFoldersQueryParams;

  const handleUpdateQueryParams = (param: string, value: string | number) => {
    setUsersFoldersQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleFetchUsersFolders = () => {
    runFetchUsersFolders(
      fetchUsersFoldersService({
        page,
        limit,
        search,
        sort
      })
    );
  };

  useEffect(() => {
    handleFetchUsersFolders();
  }, []);

  useEffect(() => {
    handleFetchUsersFolders();
  }, [usersFoldersQueryParams]);

  const usersFoldersData = useMemo<FoldersResponse>(() => {
    if (fetchUsersFoldersResponse?.status === 200) {
      const folders = fetchUsersFoldersResponse.data.data.folders.map((item: DefaultFolderResponse) => ({
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
        total_count: fetchUsersFoldersResponse.data.total_count || 0,
        total_pages: fetchUsersFoldersResponse.data.total_pages || 0,
        page: fetchUsersFoldersResponse.data.page || 1
      };
    } else if (fetchUsersFoldersError) {
      toast({ description: fetchUsersFoldersError?.response?.data.error });
    }

    return {} as FoldersResponse;
  }, [fetchUsersFoldersResponse, fetchUsersFoldersError]);

  const handleFolderRename = (id: string, newName: string) => {
    runRename(renameFolderService(id, { name: newName }));
  };
  useMemo(() => {
    if (renameResponse?.status === 200) {
      toast({
        description: renameResponse?.data?.message
      });
      handleFetchUsersFolders();
    } else if (renameError) {
      toast({
        variant: "destructive",
        description: renameError?.response?.data?.error
      });
    }
  }, [renameResponse, renameError]);

  return (
    <UsersDirectoryUI
      usersFolders={{
        usersFoldersData,
        loading: fetchUsersFoldersStatus.isPending,
        params: usersFoldersQueryParams,
        error: fetchUsersFoldersError || fetchUsersFoldersStatus.isRejected
      }}
      handleParams={handleUpdateQueryParams}
      handleFetchUsersFolders={handleFetchUsersFolders}
      handleFolderRename={handleFolderRename}
      renameLoading={renameStatus.isPending}
    />
  );
};

export { Users };
