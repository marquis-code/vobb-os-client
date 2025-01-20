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

export interface PipelinesUIProps extends PipelineTableActions {
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
const PipelinesUI: React.FC<PipelinesUIProps> = ({
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
    <div className="">
      <section className="flex justify-between items-center px-4 py-2 border-b">
        <Button onClick={handleCreatePipeline} className="flex gap-2" variant={"fill"}>
          <IconPlus size={18} /> Create new pipeline
        </Button>

        <div className="flex items-center gap-3 text-vobb-neutral-80">
          <CustomInput
            icon={<IconSearch size={16} />}
            placeholder="Search Pipelines"
            parentClassName="mb-0 min-w-[250px] text-sm"
          />
        </div>
      </section>
      <section className="flex gap-2 my-4 px-4">
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
      </section>

      <section className="px-2">
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
      </section>
    </div>
  );
};

export { PipelinesUI };
