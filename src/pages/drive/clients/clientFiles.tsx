import { fetchClientFilesService, renameFileService, uploadFileService } from "api";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { fetchFoldersQueryParams, FilesResponse, DefaultFile, DefaultFileResponse } from "types";
import { toast } from "components";
import { useParams } from "react-router-dom";
import { ClientFilesUI } from "modules";

const ClientFiles = () => {
  const {
    run: runFetchClientFiles,
    data: fetchClientFilesResponse,
    error: fetchClientFilesError,
    requestStatus: fetchClientFilesStatus
  } = useApiRequest({});

  const {
    run: runRename,
    data: renameResponse,
    error: renameError,
    requestStatus: renameStatus
  } = useApiRequest({});

  const {
    run: runUploadFiles,
    data: uploadFilesResponse,
    error: uploadFilesError,
    requestStatus: uploadFilesStatus
  } = useApiRequest({});

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [clientFilesQueryParams, setClientFilesQueryParams] = useState<fetchFoldersQueryParams>({
    page: 1,
    limit: 30,
    search: "",
    sort: "asc"
  });

  const { page, limit, search, sort } = clientFilesQueryParams;

  const handleUpdateQueryParams = (param: string, value: string | number) => {
    setClientFilesQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const { id } = useParams<{ id: string }>();

  const handleFetchClientFiles = () => {
    if (id) {
      runFetchClientFiles(
        fetchClientFilesService(id, {
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
      runUploadFiles(uploadFileService(id, "client", formData));
    }
  };

  useEffect(() => {
    handleFetchClientFiles();
  }, []);

  useEffect(() => {
    handleFetchClientFiles();
  }, [clientFilesQueryParams]);

  const filesData = useMemo<FilesResponse>(() => {
    if (fetchClientFilesResponse?.status === 200) {
      const files = fetchClientFilesResponse.data.data.files.map((item: DefaultFileResponse) => ({
        id: item._id,
        name: item.name,
        path: item.path,
        type: item.type,
        file_size: item.file_size,
        file_url: item.file_url
      }));
      return {
        files,
        total_count: fetchClientFilesResponse.data.total_count || 0,
        total_pages: fetchClientFilesResponse.data.total_pages || 0,
        page: fetchClientFilesResponse.data.page || 1
      };
    } else if (fetchClientFilesError) {
      toast({ description: fetchClientFilesError?.response?.data.error });
    }

    return {} as FilesResponse;
  }, [fetchClientFilesResponse, fetchClientFilesError]);

  useMemo(() => {
    if (renameResponse?.status === 200) {
      toast({
        description: renameResponse?.data?.message
      });
      handleFetchClientFiles();
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
      handleFetchClientFiles();
      setShowUploadModal(false);
    } else if (uploadFilesError) {
      toast({
        variant: "destructive",
        description: uploadFilesError?.response?.data?.error
      });
    }
  }, [uploadFilesResponse, uploadFilesError]);

  return (
    <ClientFilesUI
      clientFiles={{
        filesData,
        loading: fetchClientFilesStatus.isPending,
        params: clientFilesQueryParams,
        error: fetchClientFilesError || fetchClientFilesStatus.isRejected
      }}
      handleParams={handleUpdateQueryParams}
      handleFetchClientFiles={handleFetchClientFiles}
      handleFileRename={handleFileRename}
      renameLoading={renameStatus.isPending}
      handleUploadFiles={handleUploadFiles}
      uploadLoading={uploadFilesStatus.isPending}
      showUploadModal={showUploadModal}
      setShowUploadModal={setShowUploadModal}
    />
  );
};

export { ClientFiles };
