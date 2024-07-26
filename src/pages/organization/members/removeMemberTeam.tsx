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
            Are you sure you want to remove <b>{name}</b> from <b>{team}</b>?
          </>
        }
        handleContinue={handleContinue}
        close={close}
        show={show}
      />
    </>
  );
};

export { RemoveMemberTeam };
