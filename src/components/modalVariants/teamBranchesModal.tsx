import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, LoadingSpinner, Pagination } from "components";
import { Modal } from "components/modal";
import { teamBranchDataProps } from "pages/organization/teams/teamBranches";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";

interface TeamBranchesModalProps extends ModalProps {
  branchesDetails: {
    loading: boolean;
    teamBranches: teamBranchDataProps;
    handlePagination: (val: number) => void;
  };
}

const TeamBranchesModal = ({
  show,
  close,
  branchesDetails: { loading, teamBranches, handlePagination }
}: TeamBranchesModalProps) => {
  const { teamBranchData, metaData } = teamBranches;
  const { currentPage, totalCount, totalPages, pageLimit = 8 } = metaData;
  return (
    <>
      <Modal contentClassName="max-w-[944px] p-0" show={show} close={close}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Team Branches</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"} className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <p className="mb-4 p-4">This shows the branches in which this team has been activated</p>
        <section className="max-h-[calc(100vh-220px)] overflow-auto -mr-4 pr-4">
          {loading ? (
            <LoadingSpinner />
          ) : !teamBranchData.length ? (
            <p>No activated branches.</p>
          ) : (
            teamBranchData?.map((branch) => (
              <p className="px-4 border-b pb-1 mb-2 flex items-center gap-1" key={branch.id}>
                <Link target="blank" to={Routes.branch(branch.id)} className="font-medium">
                  {branch.name} -
                </Link>
                <span className="text-xs">
                  ({branch.city}, {branch.state}, {branch.country})
                </span>
                <span className="text-xs ml-auto">on {branch.date}</span>
              </p>
            ))
          )}
        </section>
        <Pagination
          hidePageLimit
          handleChange={(val) => handlePagination(val)}
          handlePageLimit={console.log}
          totalCount={totalCount}
          pageLimit={pageLimit}
          totalPages={totalPages}
          currentPage={currentPage}
          className="mt-2 px-4 pb-4"
        />
      </Modal>
    </>
  );
};

export { TeamBranchesModal };
