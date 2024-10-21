import { Cross1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Pagination } from "components";
import { Modal } from "components/modal";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";

interface MemberBranchesModalProps extends ModalProps {
  name: string;
  handleRemoveBranch: ({ id, name }: { id: string; name: string }) => void;
  handleAddBranch: () => void;
}

const MemberBranchesModal = ({
  show,
  close,
  name,
  handleRemoveBranch,
  handleAddBranch
}: MemberBranchesModalProps) => {
  return (
    <>
      <Modal contentClassName="max-w-[500px] p-0" show={show} close={close}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-15">
          <h2 className="text-lg font-medium text-vobb-neutral-95">{name}'s Branches</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <div className="p-4">
          <p className="mb-4">This shows the branches the member can access</p>
          <Button
            onClick={handleAddBranch}
            className="flex mb-4 ml-auto gap-2"
            variant={"fill"}
            size={"sm"}>
            <PlusIcon /> Add
          </Button>
          <section className="max-h-[calc(100vh-220px)] overflow-auto border border-input rounded-md">
            <div className="border-b justify-between items-center gap-1 p-2">
              <div className="flex justify-between mb-1">
                <p>
                  <Link target="blank" to={Routes.branch("123")} className="font-medium">
                    Branch Two
                  </Link>
                </p>
                <Cross1Icon
                  role="button"
                  onClick={() => handleRemoveBranch({ id: "123", name: "Branch Two" })}
                  stroke="var(--error-20)"
                  strokeWidth={1}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-xs">Ketu, Lagos, Nigeria</span>
                <span className="text-xs ml-auto">Added on 13/12/2024</span>
              </div>
            </div>
            <div className="border-b justify-between items-center gap-1 p-2">
              <div className="flex justify-between mb-1">
                <p>
                  <Link target="blank" to={Routes.branch("123")} className="font-medium">
                    Branch Two
                  </Link>
                </p>
                <Cross1Icon stroke="var(--error-20)" strokeWidth={1} />
              </div>
              <div className="flex justify-between">
                <span className="text-xs">Ketu, Lagos, Nigeria</span>
                <span className="text-xs ml-auto">Added on 13/12/2024</span>
              </div>
            </div>
            <div className=" justify-between items-center gap-1 p-2">
              <div className="flex justify-between mb-1">
                <p>
                  <Link target="blank" to={Routes.branch("123")} className="font-medium">
                    Branch Two
                  </Link>
                </p>
                <Cross1Icon stroke="var(--error-20)" strokeWidth={1} />
              </div>
              <div className="flex justify-between">
                <span className="text-xs">Ketu, Lagos, Nigeria</span>
                <span className="text-xs ml-auto">Added on 13/12/2024</span>
              </div>
            </div>
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
        </div>
      </Modal>
    </>
  );
};

export { MemberBranchesModal };
