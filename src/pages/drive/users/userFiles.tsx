import { fetchUserFilesService, renameFileService, uploadFileService } from "api";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { fetchFoldersQueryParams, FilesResponse, DefaultFile, DefaultFileResponse } from "types";
import { toast } from "components";
import { useParams } from "react-router-dom";
import { UserFilesUI } from "modules";

const UserFiles = () => {
  const {
    run: runFetchUserFiles,
    data: fetchUserFilesResponse,
    error: fetchUserFilesError,
    requestStatus: fetchUserFilesStatus
  } = useApiRequest({});

  const {
    run: runUploadFiles,
    data: uploadFilesResponse,
    error: uploadFilesError,
    requestStatus: uploadFilesStatus
  } = useApiRequest({});

  const {
    run: runRename,
    data: renameResponse,
    error: renameError,
    requestStatus: renameStatus
  } = useApiRequest({});

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [userFilesQueryParams, setUserFilesQueryParams] = useState<fetchFoldersQueryParams>({
    page: 1,
    limit: 30,
    search: "",
    sort: "asc"
  });

  const { page, limit, search, sort } = userFilesQueryParams;

  const handleUpdateQueryParams = (param: string, value: string | number) => {
    setUserFilesQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const { id } = useParams<{ id: string }>();

  const handleFetchUserFiles = () => {
    if (id) {
      runFetchUserFiles(
        fetchUserFilesService(id, {
          page,
          limit,
          search,
          sort
        })
      );
    }
  };

  const handleFileRename = (_id: string, newName: string) => {
    runRename(renameFileService(_id, { name: newName }));
  };

  const handleUploadFiles = (files: File[], id: string) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    if (id) {
      runUploadFiles(uploadFileService(id, "user", formData));
    }
  };

  useEffect(() => {
    handleFetchUserFiles();
  }, []);

  useEffect(() => {
    handleFetchUserFiles();
  }, [userFilesQueryParams]);

  const filesData = useMemo<FilesResponse>(() => {
    if (fetchUserFilesResponse?.status === 200) {
      const files = fetchUserFilesResponse.data.data.files.map((item: DefaultFileResponse) => ({
        id: item._id,
        name: item.name,
        path: item.path,
        type: item.type,
        file_size: item.file_size,
        file_url: item.file_url
      }));
      return {
        files,
        total_count: fetchUserFilesResponse.data.total_count || 0,
        total_pages: fetchUserFilesResponse.data.total_pages || 0,
        page: fetchUserFilesResponse.data.page || 1
      };
    } else if (fetchUserFilesError) {
      toast({ description: fetchUserFilesError?.response?.data.error });
    }

    return {} as FilesResponse;
  }, [fetchUserFilesResponse, fetchUserFilesError]);

  useMemo(() => {
    if (renameResponse?.status === 200) {
      toast({
        description: renameResponse?.data?.message
      });
      handleFetchUserFiles();
    } else if (renameError) {
      toast({
        variant: "destructive",
        description: renameError?.response?.data?.error
      });
    }
  }, [renameResponse, renameError]);

  useMemo(() => {
    if (uploadFilesResponse?.status === 201) {
      toast({
        description: uploadFilesResponse?.data?.message
      });
      handleFetchUserFiles();
      setShowUploadModal(false);
    } else if (uploadFilesError) {
      toast({
        variant: "destructive",
        description: uploadFilesError?.response?.data?.error
      });
    }
  }, [uploadFilesResponse, uploadFilesError]);

  return (
    <UserFilesUI
      userFiles={{
        filesData,
        loading: fetchUserFilesStatus.isPending,
        params: userFilesQueryParams,
        error: fetchUserFilesError || fetchUserFilesStatus.isRejected
      }}
      handleParams={handleUpdateQueryParams}
      handleFetchUserFiles={handleFetchUserFiles}
      handleFileRename={handleFileRename}
      renameLoading={renameStatus.isPending}
      showUploadModal={showUploadModal}
      setShowUploadModal={setShowUploadModal}
      handleUploadFiles={handleUploadFiles}
      uploadLoading={uploadFilesStatus.isPending}
    />
  );
};

export { UserFiles };
