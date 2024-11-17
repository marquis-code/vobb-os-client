import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Button, LoadingSpinner, Pagination } from "components";
import { Modal } from "components/modal";
import { MemberTeamsDataProps } from "pages";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";

interface MemberTeamsModalProps extends ModalProps {
  name: string;
  handleRemoveTeam: ({ id, name }: { id: string; name: string }) => void;
  handleAddTeam: () => void;
  memberTeams: {
    data: MemberTeamsDataProps;
    loading: boolean;
    handlePagination: (page: number) => void;
  };
}

const MemberTeamsModal = ({
  show,
  close,
  name,
  handleRemoveTeam,
  handleAddTeam,
  memberTeams
}: MemberTeamsModalProps) => {
  const { data, loading, handlePagination } = memberTeams;
  const { teams, metaData } = data;
  const { currentPage, totalCount, totalPages } = metaData;
  return (
    <>
      <Modal contentClassName="max-w-[500px] p-0" show={show} close={close}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">{name}'s Teams</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
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
        {loading ? (
          <LoadingSpinner />
        ) : (
          <section className="max-h-[calc(100vh-220px)] overflow-auto border border-input rounded-md divide-y-[1px]">
            {teams?.map((team) => (
              <div className="flex justify-between items-center gap-1 p-2" key={team.id}>
                <div className="">
                  <p>
                    <Link target="blank" to={Routes.branch(team.id)} className="font-medium">
                      {team.name}
                    </Link>
                  </p>
                  <span className="text-xs ml-auto">Added on {team.dateAdded}</span>
                </div>
                <Cross1Icon
                  role="button"
                  onClick={() => handleRemoveTeam({ id: team.id, name: team.name })}
                  stroke="var(--error-20)"
                  strokeWidth={1}
                />
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

export { MemberTeamsModal };
