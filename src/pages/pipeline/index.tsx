import { PipelinesUI } from "modules";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useApiRequest } from "hooks";
import { editPipelineTitleService, fetchPipelinesService } from "api";
import { PipelineTableDataProps } from "types";
import { toast } from "components";
import { CreatePipeline } from "pages/pipeline/createPipeline";
import { EditPipelineStages } from "./editPipelineStages";

export const Pipelines = () => {
  const {
    run: runFetchPipelines,
    data: fetchPipelinesResponse,
    error: fetchPipelinesError,
    requestStatus: fetchPipelinesStatus
  } = useApiRequest({});

  const {
    run: runEditPipelineTitle,
    data: editPipelineTitleResponse,
    error: editPipelineTitleError,
    requestStatus: editPipelineTitleStatus
  } = useApiRequest({});

  const [pipelinesQueryParams, setPipelinesQueryParams] = useState({
    page: 1,
    limit: 20,
    search: "",
    sector: "",
    sortOrder: "",
    sortProperty: ""
  });

  const { page, limit, search, sector, sortOrder, sortProperty } = pipelinesQueryParams;

  const handleUpdateQueryParams = (param: string, value: string | number) => {
    setPipelinesQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const [createPipelineModal, setCreatePipelineModal] = useState(false);
  const [editStages, setEditStages] = useState(false);
  const [pipeline, setPipeline] = useState("");

  const handleOpenCreatePipeline = () => setCreatePipelineModal(true);
  const handleCloseCreatePipeline = () => setCreatePipelineModal(false);

  const handleOpenStages = (id: string) => {
    setPipeline(id);
    setEditStages(true);
  };
  const handleCloseStages = () => {
    setEditStages(false);
    setPipeline("");
  };

  const handleFetchPipelines = useCallback(() => {
    runFetchPipelines(
      fetchPipelinesService({
        page,
        limit,
        search,
        sector,
        sort_order: sortOrder,
        sort_property: sortProperty
      })
    );
  }, [limit, page, runFetchPipelines, search, sector, sortOrder, sortProperty]);

  const pipelinesData = useMemo<PipelineTableDataProps>(() => {
    if (fetchPipelinesResponse?.status === 200) {
      const data = fetchPipelinesResponse.data.data.pipelines.map((item) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        sector: item.sector,
        creator: {
          id: item.creator?._id ?? "",
          avatar: item.creator?.avatar ?? null,
          name: item.creator?.name ?? "admin user"
        },
        clients: item.clients === 0 ? "-" : item.clients,
        stages: item.stages === 0 ? "-" : item.stages,
        package: {
          id: item?.pacakge?.id ?? "-",
          name: item?.pacakge?.name ?? "-"
        },
        date: item.date,
        time: item.time
      }));
      const metaData = {
        currentPage: fetchPipelinesResponse?.data?.data?.page ?? 1,
        totalPages: fetchPipelinesResponse?.data?.data?.total_pages,
        totalCount: fetchPipelinesResponse?.data?.data?.total_count
      };
      return { data, metaData };
    } else if (fetchPipelinesError) {
      toast({ description: fetchPipelinesError?.response?.data.error });
    }

    return {} as PipelineTableDataProps;
  }, [fetchPipelinesResponse, fetchPipelinesError]);

  const handleEditPipelineTitle = (id, data) => {
    runEditPipelineTitle(editPipelineTitleService(id, data));
  };

  useMemo(() => {
    if (editPipelineTitleResponse?.status === 201) {
      toast({
        description: editPipelineTitleResponse?.data?.message
      });
      handleFetchPipelines();
    } else if (editPipelineTitleError) {
      toast({
        variant: "destructive",
        description: editPipelineTitleError?.response?.data?.error
      });
    }
  }, [editPipelineTitleResponse, editPipelineTitleError]);

  useEffect(() => {
    handleFetchPipelines();
  }, [pipelinesQueryParams]);
  return (
    <>
      <PipelinesUI
        data-testid="pipelines-ui"
        handleCreatePipeline={handleOpenCreatePipeline}
        allPipelines={{
          pipelinesData,
          loading: fetchPipelinesStatus.isPending,
          params: pipelinesQueryParams
        }}
        handleParams={handleUpdateQueryParams}
        handleViewPipeline={console.log}
        handleEditTitle={({ id, data }) => handleEditPipelineTitle(id, data)}
        editPipelineTitleStatus={editPipelineTitleStatus}
        handleViewForms={console.log}
        handleDeletePipeline={console.log}
        handleEditStages={handleOpenStages}
      />
      <EditPipelineStages
        pipeline={pipeline}
        mode="edit"
        show={editStages}
        close={handleCloseStages}
        callback={handleFetchPipelines}
      />
      <CreatePipeline
        data-testid="createPipeline-modal"
        show={createPipelineModal}
        close={handleCloseCreatePipeline}
        handleStages={handleOpenStages}
        callback={handleFetchPipelines}
      />
    </>
  );
};

export * from "./createClient";
