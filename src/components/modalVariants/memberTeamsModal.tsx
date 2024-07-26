import { Cross1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Pagination } from "components";
import { Modal } from "components/modal";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";

interface MemberTeamsModalProps extends ModalProps {
  name: string;
  handleRemoveTeam: ({ id, name }: { id: string; name: string }) => void;
  handleAddTeam: () => void;
}

const MemberTeamsModal = ({
  show,
  close,
  name,
  handleRemoveTeam,
  handleAddTeam
}: MemberTeamsModalProps) => {
  return (
    <>
      <Modal contentClassName="max-w-[500px]" show={show} close={close}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">{name}'s Teams</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <p className="mb-4">This shows the teams the member can access within their branches</p>
        <Button
          onClick={handleAddTeam}
          className="flex mb-4 ml-auto gap-2"
          variant={"fill"}
          size={"sm"}>
          <PlusIcon /> Add
        </Button>
        <section className="max-h-[calc(100vh-220px)] overflow-auto border border-input rounded-md">
          <div className="border-b flex justify-between items-center gap-1 p-2">
            <div className="">
              <p>
                <Link target="blank" to={Routes.branch("123")} className="font-medium">
                  Finance
                </Link>
              </p>
              <span className="text-xs ml-auto">Added on 13/12/2024</span>
            </div>
            <Cross1Icon
              role="button"
              onClick={() => handleRemoveTeam({ id: "123", name: "Finance" })}
              stroke="var(--error-20)"
              strokeWidth={1}
            />
          </div>
          <div className="border-b flex justify-between items-center gap-1 p-2">
            <div className="">
              <p>
                <Link target="blank" to={Routes.branch("123")} className="font-medium">
                  Customer Happiness
                </Link>
              </p>
              <span className="text-xs ml-auto">Added on 13/12/2024</span>
            </div>
            <Cross1Icon
              role="button"
              onClick={() => handleRemoveTeam({ id: "123", name: "Branch Two" })}
              stroke="var(--error-20)"
              strokeWidth={1}
            />
          </div>
          <div className="flex justify-between items-center gap-1 p-2">
            <div className="">
              <p>
                <Link target="blank" to={Routes.branch("123")} className="font-medium">
                  Human Resources
                </Link>
              </p>
              <span className="text-xs ml-auto">Added on 13/12/2024</span>
            </div>
            <Cross1Icon
              role="button"
              onClick={() => handleRemoveTeam({ id: "123", name: "Branch Two" })}
              stroke="var(--error-20)"
              strokeWidth={1}
            />
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
      </Modal>
    </>
  );
};

export { MemberTeamsModal };
