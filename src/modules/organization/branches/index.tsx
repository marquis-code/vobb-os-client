import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  BranchesTable,
  BranchTableActions,
  Button,
  getBranchTableColumns,
  Pagination
} from "components";
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

  return (
    <>
      <section className="border-b border-vobb-neutral-20 mb-4 max-w-[800px]">
        <h1 className="text-lg font-bold mb-4">Branches</h1>
      </section>
      <section className="pb-8 mb-12 max-w-[800px]">
        <Button onClick={handleAddBranch} className="flex mt-8 mb-6 gap-2 ml-auto" variant={"fill"}>
          <PlusCircledIcon /> New branch
        </Button>
        <BranchesTable columns={columns} data={BranchTableMock} />
        <Pagination
          // hidePageLimit
          handleChange={console.log}
          handlePageLimit={console.log}
          totalCount={3}
          pageLimit={3}
          totalPages={1}
          currentPage={1}
          className="mt-4"
        />
      </section>
    </>
  );
};

export { OrgBranchesUI };
