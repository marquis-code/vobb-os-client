import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Button, LoadingSpinner, Pagination } from "components";
import { Modal } from "components/modal";
import { MemberBranchesDataProps } from "pages";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";

interface MemberBranchesModalProps extends ModalProps {
  name: string;
  handleRemoveBranch: ({ id, name }: { id: string; name: string }) => void;
  handleAddBranch: () => void;
  memberBranches: {
    data: MemberBranchesDataProps;
    loading: boolean;
    handlePagination: (page: number) => void;
  };
}

const MemberBranchesModal = ({
  show,
  close,
  name,
  handleRemoveBranch,
  handleAddBranch,
  memberBranches
}: MemberBranchesModalProps) => {
  const { data, loading, handlePagination } = memberBranches;
  const { branches, metaData } = data;
  const { currentPage, totalCount, totalPages } = metaData;
  return (
    <>
      <Modal contentClassName="max-w-[500px]" show={show} close={close}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">{name}'s Branches</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <p className="mb-4">This shows the branches the member can access</p>
        <Button
          onClick={handleAddBranch}
          className="flex mb-4 ml-auto gap-2"
          variant={"fill"}
          size={"sm"}>
          <PlusIcon /> Add
        </Button>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <section className="max-h-[calc(100vh-220px)] overflow-auto border border-input rounded-md divide-y-[1px]">
            {branches?.map((branch) => (
              <div className=" justify-between items-center gap-1 p-2" key={branch.id}>
                <div className="flex justify-between mb-1">
                  <p>
                    <Link target="blank" to={Routes.branch(branch.id)} className="font-medium">
                      {branch.name}
                    </Link>
                  </p>
                  <Cross1Icon
                    role="button"
                    onClick={() => handleRemoveBranch({ id: branch.id, name: branch.name })}
                    stroke="var(--error-20)"
                    strokeWidth={1}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">{`${branch.city}, ${branch.province}, ${branch.country}`}</span>
                  <span className="text-xs ml-auto">Added on {branch.dateAdded}</span>
                </div>
              </div>
            ))}
          </section>
        )}
        <Pagination
          hidePageLimit
          handleChange={(val) => handlePagination(val)}
          handlePageLimit={console.log}
          totalCount={totalCount}
          pageLimit={totalCount}
          totalPages={totalPages}
          currentPage={currentPage}
          className="mt-2"
        />
      </Modal>
    </>
  );
};

export { MemberBranchesModal };
