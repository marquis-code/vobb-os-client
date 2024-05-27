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
import { useFetchBranches } from "hooks";
import { BranchTableMock } from "lib";
import { useMemo } from "react";

interface OrgBranchesUIProps extends BranchTableActions {
  handleAddBranch: () => void;
}

const OrgBranchesUI: React.FC<OrgBranchesUIProps> = ({
  handleDeleteBranch,
  handleEditBranch,
  handlePrimaryBranch,
  handleAddBranch
}) => {
  const columns = useMemo(
    () => getBranchTableColumns({ handleEditBranch, handleDeleteBranch, handlePrimaryBranch }),
    [handleEditBranch, handleDeleteBranch, handlePrimaryBranch]
  );

  const { fetchOrgBranches } = useFetchBranches();
  const { orgBranches } = useUserContext();
  const { currentPage, totalCount, totalPages } = orgBranches?.branchesMetaData || {
    currentPage: 1,
    totalCount: 15,
    totalPages: 0
  };
  const handleChangePage = (page: number) => {
    fetchOrgBranches({ page, limit: totalCount });
  };

  const handlePageLimit = (limit: number) => {
    fetchOrgBranches({ page: currentPage, limit });
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
          pageLimit={totalCount}
          totalPages={totalPages}
          currentPage={currentPage}
          className="mt-4"
        />
      </section>
    </>
  );
};

export { OrgBranchesUI };
