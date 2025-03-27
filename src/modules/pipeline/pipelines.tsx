import React, { useCallback, useMemo, useState } from "react";
import { IconColumns3, IconPlus, IconSearch } from "@tabler/icons-react";
import {
  Button,
  CustomInput,
  getPipelinesTableColumns,
  LoadingSpinner,
  Pagination,
  PipelinesTable,
  PipelineTableActions,
  SortBy,
  TableEmptyState
} from "components";
import { optionType, PipelineTableData, PipelineTableDataProps } from "types";
import { EditPipelineStages } from "pages/pipeline/editPipelineStages";

export interface PipelinesUIProps extends PipelineTableActions {
  handleCreatePipeline: () => void;
  allPipelines: {
    pipelinesData: PipelineTableDataProps | null | undefined;
    loading: boolean;
    params: {
      page: number;
      limit: number;
      search: string;
      sector: string;
      sortOrder: string;
      sortProperty: string;
    };
  };
  handleParams: (param: string, value: string | number) => void;
  onPipelineUpdate: () => void;
}
const PipelinesUI: React.FC<PipelinesUIProps> = ({
  handleCreatePipeline,
  allPipelines,
  handleParams,
  handleViewPipeline,
  handleEditTitle,
  editPipelineTitleStatus,
  handleViewForms,
  handleDeletePipeline,
  onPipelineUpdate
}) => {
  const [editPipelineStagesModal, setEditPipelineStagesModal] = useState(false);
  const [selectedPipelineData, setSelectedPipelineData] = useState<PipelineTableData | null>(null);

  const handleOpenEditPipelineStages = useCallback((data: PipelineTableData) => {
    setSelectedPipelineData(data);
    setEditPipelineStagesModal(true);
  }, []);

  const handleCloseEditPipelineStages = () => {
    setEditPipelineStagesModal(false);
    setSelectedPipelineData(null);
  };
  const pipelinesData = allPipelines.pipelinesData?.data || [];
  const metaData = allPipelines.pipelinesData?.metaData || { 
    totalCount: 0, 
    currentPage: 1, 
    totalPages: 1, 
    pageLimit: 20 
  };
  const { loading } = allPipelines;
  const pipelinesColumns = useMemo(
    () =>
      getPipelinesTableColumns({
        handleViewPipeline,
        handleEditTitle,
        editPipelineTitleStatus,
        handleEditStages: handleOpenEditPipelineStages,
        handleViewForms,
        handleDeletePipeline
      }),
    [
      handleViewPipeline,
      handleEditTitle,
      editPipelineTitleStatus,
      handleOpenEditPipelineStages,
      handleViewForms,
      handleDeletePipeline
    ]
  );

  const handleSortChange = (option: optionType | undefined) => {
    if (option) {
      handleParams("sortProperty", option.value);
    }
  };

  return (
    <>
      <div className="" data-testId="pipelines-ui">
        <section className="flex justify-between items-center px-4 py-2 h-[54px] border-b">
          <Button onClick={handleCreatePipeline} className="flex gap-2" variant={"fill"}>
            <IconPlus size={18} /> Create new pipeline
          </Button>

          <div className="flex items-center gap-3 text-vobb-neutral-80">
            <CustomInput
              icon={<IconSearch size={14} />}
              placeholder="Search Pipelines"
              parentClassName="mb-0 min-w-[250px] text-xs font-medium"
              data-testid="search-input"
            />
          </div>
        </section>
        <section className="flex gap-2 my-4 px-4">
          <SortBy
            sort={{
              items: [
                { label: "Date created", value: "date" },
                { label: "Client", value: "client" },
                { label: "Stage", value: "stage" }
              ],
              handleChange: handleSortChange
            }}
            order={{
              show: true,
              active: allPipelines.params.sortOrder,
              handleChange: (val) => handleParams("sortOrder", val!!)
            }}
            isClearable
          />
        </section>

        <section>
          {loading ? (
            <LoadingSpinner />
          ) : pipelinesData.length === 0 ? (
            <TableEmptyState
              title="No pipelines yet."
              description="Get started by creating your first pipeline."
              pageIcon={<IconColumns3 />}
              btnText="Create Pipeline"
              ctaFunction={handleCreatePipeline}
            />
          ) : (
            <>
              <PipelinesTable columns={pipelinesColumns} data={pipelinesData} />
              <Pagination
                // hidePageLimit
                handleChange={(val) => handleParams("page", val)}
                handlePageLimit={(val) => handleParams("limit", val)}
                totalCount={metaData.totalCount}
                pageLimit={metaData.pageLimit ?? 20}
                totalPages={metaData.totalPages}
                currentPage={metaData.currentPage}
                testId="pagination"
              />
            </>
          )}
        </section>
      </div>
      {selectedPipelineData && (
        <EditPipelineStages
          pipelineTableData={selectedPipelineData}
          mode="edit"
          show={editPipelineStagesModal}
          close={handleCloseEditPipelineStages}
          callback={onPipelineUpdate}
        />
      )}
    </>
  );
};

export { PipelinesUI };
