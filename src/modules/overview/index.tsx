import React, { useMemo } from "react";
import {
  IconArrowBarDown,
  IconColumns3,
  IconPlus,
  IconSearch,
  IconSettings
} from "@tabler/icons-react";
import {
  Button,
  CustomInput,
  Filter,
  getPipelinesTableColumns,
  LoadingSpinner,
  Pagination,
  PipelinesTable,
  PipelineTableActions,
  SortBy,
  TableEmptyState
} from "components";
import { PipelineTableDataProps } from "types";
export interface OverviewUIProps extends PipelineTableActions {
  handleCreatePipeline: () => void;
  allPipelines: {
    pipelinesData: PipelineTableDataProps;
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
}
const OverviewUI: React.FC<OverviewUIProps> = ({
  handleCreatePipeline,
  allPipelines,
  handleParams,
  selectedPipelines,
  handleSelectPipeline,
  handleViewPipeline,
  handleEditTitle,
  handleEditStages,
  handleViewForms,
  handleDeletePipeline
}) => {
  const {
    pipelinesData: { data: pipelinesData, metaData },
    loading
  } = allPipelines;
  const pipelinesColumns = useMemo(
    () =>
      getPipelinesTableColumns({
        selectedPipelines,
        handleSelectPipeline,
        handleViewPipeline,
        handleEditTitle,
        handleEditStages,
        handleViewForms,
        handleDeletePipeline
      }),
    [
      selectedPipelines,
      handleSelectPipeline,
      handleViewPipeline,
      handleEditTitle,
      handleEditStages,
      handleViewForms,
      handleDeletePipeline
    ]
  );

  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <Button onClick={handleCreatePipeline} className="flex gap-2" variant={"fill"}>
          <IconPlus size={18} /> Create New Pipeline
        </Button>

        <div className="flex items-center gap-3 text-vobb-neutral-80">
          <CustomInput
            icon={<IconSearch size={16} />}
            placeholder="Search Pipelines"
            parentClassName="mb-0"
          />
          <Button onClick={console.log} className="flex gap-2 ml-auto" variant={"outline"}>
            <IconSettings size={16} color="#667085" /> View Settings
          </Button>
          <Button onClick={console.log} className="flex gap-2 ml-auto" variant={"outline"}>
            <IconArrowBarDown size={16} color="#667085" /> Export/Import
          </Button>
        </div>
      </div>
      <div className="flex gap-2 my-4">
        <SortBy
          isClearable
          sort={{
            active: { label: "", value: "" },
            items: [],
            handleChange: console.log
          }}
          order={{
            show: true,
            active: "asc",
            handleChange: console.log
          }}
        />

        <Filter className="mb-0 h-9 w-20" filters={[]} setFilter={console.log} attributes={[]} />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : !pipelinesData?.length ? (
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
            totalCount={metaData?.totalCount}
            pageLimit={metaData?.pageLimit ?? 20}
            totalPages={metaData?.totalPages}
            currentPage={metaData?.currentPage}
            className="mt-4 mb-28"
            testId="pagination"
          />
        </>
      )}
    </div>
  );
};

export { OverviewUI };
