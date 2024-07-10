import { ModalProps } from "types/interfaces";
import { Modal } from "../modal";
import { Button, Checkbox } from "../ui";
import { Cross1Icon, ThickArrowRightIcon } from "@radix-ui/react-icons";

interface BranchMemberData {
  name: string;
  id: string;
  teams: string[];
}

interface PreventDeleteBranchModalProps extends ModalProps {
  handleContinue: (team: string, memberIds: string[]) => void;
  name: string;
  branchMembers: BranchMemberData[];
  handleSetIds: {
    selected: string[];
    handleSelectMember: (member: BranchMemberData) => void;
    handleSelectAll: () => void;
  };
}

const PreventDeleteBranchModal: React.FC<PreventDeleteBranchModalProps> = ({
  show,
  close,
  handleContinue,
  name,
  branchMembers,
  handleSetIds: { selected, handleSelectMember, handleSelectAll }
}) => {
  return (
    <>
      <Modal contentClassName="max-w-[600px]" show={show} close={close}>
        <section className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Unable to delete branch - {name}</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </section>
        <section className="mb-8">
          <p className="text-sm text-vobb-neutral-70 mb-4">
            You cannot delete a non-empty branch. Please transfer the users under this branch to a
            different branch or remove all team members.
          </p>
          <div className="">
            <Button
              onClick={handleSelectAll}
              variant={"link"}
              className="text-vobb-primary-70 p-0 items-center gap-2">
              <Checkbox
                checked={selected.length === branchMembers.length}
                onCheckedChange={() => handleSelectAll()}
              />
              {selected.length === branchMembers.length ? "Unselect" : "Select"} all
            </Button>
            <ul className="max-h-[calc(100vh-300px)] overflow-scroll leading-7 text-vobb-neutral-70">
              {branchMembers.map((member) => {
                const { id, name, teams } = member;
                return (
                  <li className="flex items-center gap-2 ">
                    <Checkbox
                      checked={selected.find((selectedId) => selectedId === id) ? true : false}
                      onCheckedChange={() => handleSelectMember(member)}
                    />
                    <span>{name}</span>
                    <span className="font-semibold ml-auto mr-2 text-vobb-neutral-100 text-xs">
                      {teams.join(", ")}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="flex justify-end gap-2">
          <Button onClick={close} size={"default"} variant={"outline"}>
            Cancel
          </Button>
          <Button
            className="gap-1"
            size={"default"}
            variant={"fill"}
            onClick={() => handleContinue(name, selected)}
            disabled={!selected.length}>
            Transfer{" "}
            {selected.length > 0 && selected.length !== branchMembers.length ? "selected" : "all"}{" "}
            <ThickArrowRightIcon />
          </Button>
        </section>
      </Modal>
    </>
  );
};

export { PreventDeleteBranchModal };
