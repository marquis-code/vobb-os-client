import { Cross1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, LoadingSpinner, Pagination } from "components";
import { Modal } from "components/modal";
import { MemberTeamsDataProps } from "pages/organization/members/memberTeams";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";

interface MemberTeamsModalProps extends ModalProps {
  name: string;
  handleRemoveTeam: ({ id, name }: { id: string; name: string }) => void;
  handleAddTeam: () => void;
  handleViewTeams: {
    memberTeams: MemberTeamsDataProps;
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
  handleViewTeams
}: MemberTeamsModalProps) => {
  const { memberTeams, loading, handlePagination } = handleViewTeams;
  const { teams, metaData } = memberTeams;
  const { currentPage, totalCount, totalPages } = metaData;
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
