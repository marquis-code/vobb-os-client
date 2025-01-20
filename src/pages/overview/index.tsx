import { OverviewUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { CreatePipeline } from "./createPipeline";
import { EditPipelineStages } from "./editPipelineStages";
import { useApiRequest } from "hooks";
import { editPipelineTitleService, fetchPipelinesService } from "api";
import { PipelineTableDataProps } from "types";
import { toast } from "components";

const Overview = () => {
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

  const [singlePipelineModal, setSinglePipelineModal] = useState({ id: "", name: "" });
  const [createPipelineModal, setCreatePipelineModal] = useState(false);
  const handleOpenCreatePipeline = () => setCreatePipelineModal(true);
  const handleCloseCreatePipeline = () => setCreatePipelineModal(false);

  const [editPipelineStagesModal, setEditPipelineStagesModal] = useState(false);

  const handleOpenEditPipelineStages = () => setEditPipelineStagesModal(true);
  const handleCloseEditPipelineStages = () => setEditPipelineStagesModal(false);

  const handleFetchPipelines = () => {
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
  };

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
      setSinglePipelineModal({ id: "", name: "" });
      handleOpenEditPipelineStages();
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
      <OverviewUI
        handleCreatePipeline={handleOpenCreatePipeline}
        allPipelines={{
          pipelinesData,
          loading: fetchPipelinesStatus.isPending,
          params: pipelinesQueryParams
        }}
        handleParams={handleUpdateQueryParams}
        selectedPipelines={[]}
        handleSelectPipeline={console.log}
        handleViewPipeline={console.log}
        handleEditTitle={({ id, name }) => setSinglePipelineModal({ id, name })}
        handleEditStages={console.log}
        handleViewForms={console.log}
        handleDeletePipeline={console.log}
      />
      <EditPipelineStages show={editPipelineStagesModal} close={handleCloseEditPipelineStages} />
      <CreatePipeline
        show={createPipelineModal}
        close={handleCloseCreatePipeline}
        handleOpenEditPipelineStages={handleOpenEditPipelineStages}
        handleCloseEditPipelineStages={handleCloseEditPipelineStages}
      />
    </>
  );
};

export { Overview };
