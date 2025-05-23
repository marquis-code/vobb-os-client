import { IconHome, IconPlus } from "@tabler/icons-react";
import {
  BranchesTable,
  BranchTableActions,
  Button,
  TableEmptyState,
  getBranchTableColumns,
  LoadingSpinner,
  Pagination,
  SettingsPageTitle
} from "components";
import { useMemo } from "react";
import { BranchesDataProps } from "types";

interface OrgBranchesUIProps extends BranchTableActions {
  loading: boolean;
  orgBranches: BranchesDataProps;
  handleAddBranch: () => void;
  handlePagination: (param: string, value: number) => void;
}

const OrgBranchesUI: React.FC<OrgBranchesUIProps> = ({
  loading,
  orgBranches,
  handleDeleteBranch,
  handleEditBranch,
  handlePrimaryBranch,
  handleAddBranch,
  handlePagination,
  handleViewBranch
}) => {
  const columns = useMemo(
    () =>
      getBranchTableColumns({
        handleEditBranch,
        handleDeleteBranch,
        handlePrimaryBranch,
        handleViewBranch
      }),
    [handleEditBranch, handleDeleteBranch, handlePrimaryBranch, handleViewBranch]
  );

  const {
    currentPage,
    totalCount,
    totalPages,
    pageLimit = 20
  } = orgBranches?.branchesMetaData || {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  };

  const tableData = orgBranches?.branchesArray || [];

  return (
    <div>
      <SettingsPageTitle title="Branches" className="max-w-full" />
      <section className="pb-8 mb-12">
        <Button onClick={handleAddBranch} className="flex mt-8 mb-6 gap-2 ml-auto" variant={"fill"}>
          <IconPlus size={18} /> New branch
        </Button>
        {loading ? (
          <LoadingSpinner />
        ) : !tableData.length ? (
          <TableEmptyState
            pageIcon={<IconHome size={25} color="#101323" />}
            title="No branches have been created yet."
            description="Create a branch to manage clients, assign staff, and track performance for each location."
            ctaFunction={handleAddBranch}
            btnText="New Branch"
          />
        ) : (
          <>
            <BranchesTable columns={columns} data={tableData} />
            <Pagination
              // hidePageLimit
              handleChange={(val) => handlePagination("page", val)}
              handlePageLimit={(val) => handlePagination("limit", val)}
              totalCount={totalCount}
              pageLimit={pageLimit}
              totalPages={totalPages}
              currentPage={currentPage}
              className="mt-4"
            />
          </>
        )}
      </section>
    </div>
  );
};

export { OrgBranchesUI };
export * from "./branch";
