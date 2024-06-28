import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  BranchesTable,
  BranchTableActions,
  Button,
  getBranchTableColumns,
  Pagination,
  SettingsPageTitle
} from "components";
import { useUserContext } from "context";
import { useMemo } from "react";

interface OrgBranchesUIProps extends BranchTableActions {
  handleAddBranch: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

const OrgBranchesUI: React.FC<OrgBranchesUIProps> = ({
  handleDeleteBranch,
  handleEditBranch,
  handlePrimaryBranch,
  handleAddBranch,
  setPage,
  setLimit,
  limit,
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

  const { orgBranches } = useUserContext();
  const { currentPage, totalCount, totalPages } = orgBranches?.branchesMetaData || {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
  };
  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handlePageLimit = (limit: number) => {
    setLimit(limit);
  };

  const tableData = orgBranches?.branchesArray || [];

  return (
    <>
      <SettingsPageTitle title="Branches" />
      <section className="pb-8 mb-12 max-w-[800px]">
        <Button onClick={handleAddBranch} className="flex mt-8 mb-6 gap-2 ml-auto" variant={"fill"}>
          <PlusCircledIcon /> New branch
        </Button>
        <BranchesTable columns={columns} data={tableData} />
        <Pagination
          // hidePageLimit
          handleChange={handleChangePage}
          handlePageLimit={handlePageLimit}
          totalCount={totalCount}
          pageLimit={limit}
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
