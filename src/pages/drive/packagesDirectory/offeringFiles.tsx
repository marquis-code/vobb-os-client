import { fetchOfferingFilesService, renameFileService, uploadFileService } from "api";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { FilesResponse, DefaultFile, fetchFoldersQueryParams, DefaultFileResponse } from "types";
import { toast } from "components";
import { useParams } from "react-router-dom";
import { OfferingFilesUI } from "modules";

const OfferingFiles = () => {
  const {
    run: runFetchOfferingFiles,
    data: fetchOfferingFilesResponse,
    error: fetchOfferingFilesError,
    requestStatus: fetchOfferingFilesStatus
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
  const [offeringFilesQueryParams, setOfferingFilesQueryParams] = useState<fetchFoldersQueryParams>(
    {
      page: 1,
      limit: 30,
      search: "",
      sort: "asc",
      start_date: "2024-12-01",
      end_date: "2025-12-31"
    }
  );

  const { page, limit, search, sort, start_date, end_date } = offeringFilesQueryParams;

  const handleUpdateQueryParams = (param: string, value: string | number) => {
    setOfferingFilesQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const { id } = useParams<{ id: string }>();

  const handleFetchOfferingFiles = () => {
    if (id) {
      runFetchOfferingFiles(
        fetchOfferingFilesService(id, {
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

  const handleFileRename = (id: string, newName: string) => {
    runRename(renameFileService(id, { name: newName }));
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
    handleFetchOfferingFiles();
  }, []);

  useEffect(() => {
    handleFetchOfferingFiles();
  }, [offeringFilesQueryParams]);

  const filesData = useMemo<FilesResponse>(() => {
    if (fetchOfferingFilesResponse?.status === 200) {
      const files = fetchOfferingFilesResponse.data.data.files.map((item: DefaultFileResponse) => ({
        id: item._id,
        name: item.name,
        path: item.path,
        type: item.type,
        file_size: item.file_size,
        file_url: item.file_url
      }));
      return {
        files,
        total_count: fetchOfferingFilesResponse.data.total_count || 0,
        total_pages: fetchOfferingFilesResponse.data.total_pages || 0,
        page: fetchOfferingFilesResponse.data.page || 1
      };
    } else if (fetchOfferingFilesError) {
      toast({ description: fetchOfferingFilesError?.response?.data.error });
    }

    return {} as FilesResponse;
  }, [fetchOfferingFilesResponse, fetchOfferingFilesError]);

  useMemo(() => {
    if (renameResponse?.status === 200) {
      toast({
        description: renameResponse?.data?.message
      });
      handleFetchOfferingFiles();
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
      handleFetchOfferingFiles();
      setShowUploadModal(false);
    } else if (uploadFilesError) {
      toast({
        variant: "destructive",
        description: uploadFilesError?.response?.data?.error
      });
    }
  }, [uploadFilesResponse, uploadFilesError]);

  return (
    <OfferingFilesUI
      offeringFiles={{
        filesData,
        loading: fetchOfferingFilesStatus.isPending,
        params: offeringFilesQueryParams,
        error: fetchOfferingFilesError || fetchOfferingFilesStatus.isRejected
      }}
      handleParams={handleUpdateQueryParams}
      handleFetchOfferingFiles={handleFetchOfferingFiles}
      handleFileRename={handleFileRename}
      renameLoading={renameStatus.isPending}
      showUploadModal={showUploadModal}
      setShowUploadModal={setShowUploadModal}
      handleUploadFiles={handleUploadFiles}
      uploadLoading={uploadFilesStatus.isPending}
    />
  );
};

export { OfferingFiles };
