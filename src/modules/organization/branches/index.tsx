import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  BranchesTable,
  BranchTableActions,
  Button,
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

  const { currentPage, totalCount, totalPages, pageLimit } = orgBranches?.branchesMetaData || {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  };

  const tableData = orgBranches?.branchesArray || [];

  return (
    <>
      <SettingsPageTitle title="Branches" />
      <section className="pb-8 mb-12 max-w-[800px]">
        <Button onClick={handleAddBranch} className="flex mt-8 mb-6 gap-2 ml-auto" variant={"fill"}>
          <PlusCircledIcon /> New branch
        </Button>
        {loading ? <LoadingSpinner /> : <BranchesTable columns={columns} data={tableData} />}
        <Pagination
          // hidePageLimit
          handleChange={(val) => handlePagination("page", val)}
          handlePageLimit={(val) => handlePagination("limit", val)}
          totalCount={totalCount}
          pageLimit={pageLimit ?? 10}
          totalPages={totalPages}
          currentPage={currentPage}
          className="mt-4"
        />
      </section>
    </>
  );
};

export { OrgBranchesUI };
export * from "./branch";
