import { ConfirmationModal } from "components";
import { ModalProps } from "types";

interface RemoveMemberTeamProps extends ModalProps {
  id: string;
  team: string;
  name: string;
}

const RemoveMemberTeam = ({ show, close, id, team, name }: RemoveMemberTeamProps) => {
  const handleContinue = () => {
    console.log(id, name, team);
  };

  return (
    <>
      <ConfirmationModal
        text={
          <>
            <p>
              Are you sure you want to remove <b>{name}</b> from the <b>{team}</b> team?
            </p>
            <br />
            <p className="text-xs">
              NB: Branch access is tied to team membership, so removing a user from their only team
              in a branch will remove their access to that branch.
            </p>
          </>
        }
        handleContinue={handleContinue}
        close={close}
        show={show}
        loading={false}
      />
    </>
  );
};

export { RemoveMemberTeam };
