import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Pagination } from "components";
import { Modal } from "components/modal";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";

interface TeamBranchesModalProps extends ModalProps {}

const TeamBranchesModal = ({ show, close }: TeamBranchesModalProps) => {
  return (
    <>
      <Modal contentClassName="max-w-[600px]" show={show} close={close}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Team Branches</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <p className="mb-4">This shows the branches in which this team has been activated</p>
        <section className="max-h-[calc(100vh-220px)] overflow-auto -mr-4 pr-4">
          <p className="border-b pb-1 mb-2 flex items-center gap-1">
            <Link target="blank" to={Routes.branch("123")} className="font-medium">
              Headquarters -
            </Link>
            <span className="text-xs">(Ketu, Lagos, Nigeria)</span>
            <span className="text-xs ml-auto">on 13/12/2024</span>
          </p>
          <p className="border-b pb-1 mb-2 flex items-center gap-1">
            <Link target="blank" to={Routes.branch("123")} className="font-medium">
              Lagos LI -
            </Link>
            <span className="text-xs">(Ketu, Lagos, Nigeria)</span>
            <span className="text-xs ml-auto">on 13/12/2024</span>
          </p>
          <p className="border-b pb-1 mb-2 flex items-center gap-1">
            <Link target="blank" to={Routes.branch("123")} className="font-medium">
              Branch Two -
            </Link>
            <span className="text-xs">(Ketu, Lagos, Nigeria)</span>
            <span className="text-xs ml-auto">on 13/12/2024</span>
          </p>
        </section>
        <Pagination
          hidePageLimit
          handleChange={console.log}
          handlePageLimit={console.log}
          totalCount={3}
          pageLimit={3}
          totalPages={1}
          currentPage={1}
          className="mt-2"
        />
      </Modal>
    </>
  );
};

export { TeamBranchesModal };
